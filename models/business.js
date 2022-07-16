const mongoose = require('mongoose');

const BusinessSchema = new mongoose.Schema({
    registationNumber: {
        type: String,
        required: [true, 'Please add a register number']
    },

    businessName: {
        type: String,
        required: [true, 'Please add a business name']
    },

    businessAddress1: {
        type: String,
        required: [true, 'Please add a business address 1']
    },

    businessAddress2: {
        type: String,
        required: [true, 'Please add a business address 2']
    },

    businessCity: {
        type: String,
        required: [true, 'Please add a  business city']
    },

    businessCountry: {
        type: String,
        required: [true, 'Please add a business country']
    },

    businessPhoneNumber: {
        type: String,
        required: [true, 'Please add a business phone number']
    },

    businessEmail: {
        type: String,
        required: [true, 'Please add a busiess email']
    },

    businessWeb: {
        type: String,
        required: [true, 'Please add a business web']
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
