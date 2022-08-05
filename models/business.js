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
        required: [false, 'Please add a business address 2']
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

    headOffice: {
        type: Boolean,
        required: [true, 'Please add a head office true or false']
    },

    headOfficeAddress1: {
        type: String,
        required: [false, 'Please add a Head Office 1 address']
    },
    headOfficeAddress2: {
        type: String,
        required: [false, 'Please add a Head Office 2 address']
    },
    headOfficeCity: {
        type: String,
        required: [false, 'Please add a Head Office city']
    },

    headOfficeCountry: {
        type: String,
        required: [false, 'Please add a Head Office country']
    },
    headOfficeEmail: {
        type: String,
        required: [false, 'Please add a Head Office email']
    },

    headOfficePhoneNumber: {
        type: String,
        required: [false, 'Please add a Head Office Phone Number']
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Business', BusinessSchema);
