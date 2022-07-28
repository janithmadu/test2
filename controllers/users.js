const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
//User Model
const User = require('../models/user');
const Role = require('../models/role');

//@desc     Get all Users
//@route    GET /api/v1/users
//@access   Public
exports.getUsers = asyncHandler(async (req, res, next) => {
    const getData = await User.find().sort({ date: -1 }).exec();

 
    res.status(200).json({ success: true, data: getData });

    //res.status(200).json({ success: true, msg: 'Show all users' });
});

//@desc   Get single user
//@route  GET /api/v1/user/:id
//access  Public
exports.getSingleUser = asyncHandler(async (req, res, next) => {

    const role = await Role.findOne({ _id: req.user.roleId });

    if (!role.usersView) {
        return next(new ErrorResponse('Access denied !', 401));
    }    

    if (!req.user) {
        return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, data: req.user });
});

//@desc   Post User
//@route  POST /api/v1/users
//@access Public
exports.createUsers = asyncHandler(async (req, res, next) => {

    

    const dataSave = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        businessId: req.body.businessId,
        businessUnitId: req.body.businessUnitId,
        locationId: req.body.locationId,
        roleId: req.body.roleId,
        designation: req.body.designation,
        email: req.body.email,
        password: req.body.password
    });

    console.log(dataSave);
    const result = await dataSave.save();
    res.status(201).json({ success: true, data: result });
});

//@desc   Put User
//@route  PUT /api/v1/users
//@access Public
exports.updateUser = asyncHandler(async (req, res, next) => {
    const role = await Role.findOne({ _id: req.user.roleId });

    if (!role.usersEdit) {
        return next(new ErrorResponse('Access denied !', 401));
    }    

    const user_id = await User.findById(req.params.id);

    //$2a$10$OS92pBlcXDhe2L7.GKNe/uWFsM39cnXdC4pTxFjStzzdiO0QtGxWq


    const updateData = await User.findByIdAndUpdate(user_id, req.body, {
        new: true,
        runValidators: true
    });
    if (!updateData) {
        return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }

    return res.status(200).json({ success: true, data: updateData });
});

//@desc   Delete User
//@route  DELETE /api/v1/users
//@access Public
exports.deleteUser = asyncHandler(async (req, res, next) => {

    const user_id = await User.findById(req.params.id);

    const deleteData = await User.findByIdAndDelete(user_id);

    if (!deleteData) {
        return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }

    return res.status(200).json({ success: true, data: {} });
});
