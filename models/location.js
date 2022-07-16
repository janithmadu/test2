const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },

    address1: {
        type: String,
        required: [true, 'Please add a email']
    },

    address2: {
        type: String,
        required: [true, 'Please add a email']
    },

    city: {
        type: String,
        required: [true, 'Please add a contact name']
    },
    country: {
        type: String,
        required: [true, 'Please add a contact name']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please add a phone number']
    },

    email: {
        type: String,
        required: [true, 'Please add a contact name']
    },

    web: {
        type: String,
        required: [true, 'Please add a contact name']
    },

    userId: {
        type: String,
        required: [true, 'Please add a userId']
    },
    businessId: {
        type: String,
        required: [true, 'Please add a userId']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Location', LocationSchema);
