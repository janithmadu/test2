const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please add a first name']
    },
    lastName: {
        type: String,
        required: [true, 'Please add a last name']
    },

    roleId: {
        type: String,
        required: [true, 'Please add a roleId']
    },
    email: {
        type: String,
        required: [true, 'Please add a email'],
        unique: true,
        match: [/^\w+([\.-]?w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add valid email']
    },

    designation: {
        type: String,
        required: [true, 'Please add a designation']
    },

    businessId: {
        type: String,
        required: [true, 'Please add a businessId']
    },

    businessUnitId: {
        type: String,
        required: [true, 'Please add a businessUnitId']
    },

    locationId: {
        type: String,
        required: [true, 'Please add a locationId']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please add a Phone Number']
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createAt: {
        type: Date,
        default: Date.now
    }
});

//Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

//sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and set to resetPasswordToken field
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Set expire
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

module.exports = mongoose.model('User', UserSchema);
