const mongoose = require('mongoose');

const BusinessSchema = new mongoose.Schema({
    registationNumber: {
        type: String,
        required: [true, 'Please add a name']
    },

    bussinessName: {
        type: String,
        required: [true, 'Please add a address']
    },

    bussinessAddress1: {
        type: String,
        required: [true, 'Please add a email']
    },

    bussinessAddress2: {
        type: String,
        required: [true, 'Please add a email']
    },

    city: {
        type: String,
        required: [true, 'Please add a contact name']
    },

    phone: {
        type: String,
        required: [true, 'Please add a contact name']
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
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Business', BusinessSchema);
