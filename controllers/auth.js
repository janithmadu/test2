const crypto = require('crypto');
const ErrorResponse = require('../Utils/errorResponse');
const asyncHandler = require('../middleware/async');
const sendEmail = require('../utils/sendEmail');
const User = require('../models/user');
const Role = require('../models/role');

//@desc   Register user
//@route  GET /api/v1/auth/register
//@access Public
exports.register = asyncHandler(async (req, res, next) => {
    const { firstName, lastName, email, password, phoneNumber, designation } = req.body;

    //Create user
    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        designation
    });

    //Create token
    sendTokenResponse(user, 200, res);
});

//@desc   Login user
//@route  GET /api/v1/auth/login
//@access Public
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    //Validate email & password
    if (!email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400));
    }

    //Check for user
    const user = await User.findOne({ email }).select('+password');

    const permission = await Role.findOne({ _id: user.roleId });

    if (!user) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    //Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    //Create token
    //permission

    sendTokenResponseWithPermission(user, permission, 200, res);
});

//@desc   Get current logged in user
//@route  GET /api/v1/auth/me
//@access Private

exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    const role = await Role.findOne({ _id: user.roleId });

    res.status(200).json({
        success: true,
        user,
        role

    });
});

//@desc     Update user details
//@route    GET /api/v1/auth/updatedetails
//@access   Private

exports.updateDetails = asyncHandler(async (req, res, next) => {
    const fieldsToUpdate = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    };

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: user
    });
});

//@desc   Update password
//@route  GET /api/v1/auth/updatepassword
//@access Private

exports.updatePassword = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    //Check current password
    if (!(await user.matchPassword(req.body.currentPassword))) {
        return next(new ErrorResponse('Password is incorrect', 401));
    }

    user.password = req.body.newPassword;
    await user.save();

    sendTokenResponse(user, 200, res);
});

//@desc   Forgot password
//@route  POST /api/v1/auth/forgotpassword
//@access Public

exports.forgotPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorResponse('There is no user with that email', 404));
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    console.log('this', resetToken);
    await user.save({ validateBeforeSave: false });

    // Create rest url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${resetToken}`;

    const message = `your token - \n\n ${resetUrl}`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password reset token',
            message
        });
        return res.status(200).json({ success: true, data: 'Email sent' });
        //return res.status(200).json({ data: "result" });
    } catch (err) {
        console.log(err);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorResponse('Email could not be sent', 500));
    }

    /*
  res.status(200).json({
    success: true,
    data: user

  })
  */
});

//@desc   Reset password
//@route  PUT /api/v1/auth/resetpassword/:resettoken
//@access Private

exports.resetPassword = asyncHandler(async (req, res, next) => {
    console.log('srt', req.params.resettoken);
    // Get hashed token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resettoken).digest('hex');

    console.log('rstt', resetPasswordToken);

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    console.log(user);

    if (!user) {
        return next(new ErrorResponse('Invalid token', 400));
    }

    //Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendTokenResponse(user, 200, res);
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create Token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    };
    /*
  if(process.env.NODE_ENV === 'production') {
    options.secure = true;
  }
*/
    console.log(options);
    console.log('cookies not working');
    console.log('some error cookie parser in auth.js');

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token
    });
};

//For permission
// Get token from model, create cookie and send response
const sendTokenResponseWithPermission = (user, permission, statusCode, res) => {
    // Create Token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    };
    /*
  if(process.env.NODE_ENV === 'production') {
    options.secure = true;
  }
*/
    console.log(options);
    console.log('cookies not working');
    console.log('some error cookie parser in auth.js');

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token,
        permission
    });
};
