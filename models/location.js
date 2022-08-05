const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },

    address1: {
        type: String,
        required: [true, 'Please add a addres 1']
    },

    address2: {
        type: String,
        required: [true, 'Please add a address 2']
    },

    locationType: {
        type: String,
        required: [true, 'Please add a location type']
    },

    city: {
        type: String,
        required: [true, 'Please add a city']
    },
    country: {
        type: String,
        required: [true, 'Please add a country']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please add a phone number']
    },

    email: {
        type: String,
        required: [true, 'Please add a email']
    },

    web: {
        type: String,
        required: [true, 'Please add a web']
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
