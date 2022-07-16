const mongoose = require('mongoose');

const HeadOfficeSchema = new mongoose.Schema({
    headOfficeAddress1: {
        type: String,
        required: [true, 'Please add a address']
    },
    headOfficeAddress2: {
        type: String,
        required: [true, 'Please add a address']
    },
    headOfficeCity: {
        type: String,
        required: [true, 'Please add a city']
    },

    headOfficeCountry: {
        type: String,
        required: [true, 'Please add a country']
    },
    headOfficeEmail: {
        type: String,
        required: [true, 'Please add a email']
    },

    headOfficePhoneNumber: {
        type: String,
        required: [true, 'Please add a phone number']
    },

    headOffice: {
        type: Boolean,
        required: [true, 'Please add a head office true or false']
    },

    businessId: {
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

module.exports = mongoose.model('HeadOffice', HeadOfficeSchema);
