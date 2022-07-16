const mongoose = require('mongoose');

const PartnerSchema = new mongoose.Schema({
    contactPerson: {
        type: String,
        required: [true, 'Please add a contact person']
    },

    businessName: {
        type: String,
        required: [true, 'Please add a business name']
    },

    address1: {
        type: String,
        required: [true, 'Please add a address 1']
    },

    address2: {
        type: String,
        required: [true, 'Please add a address 2']
    },

    country: {
        type: String,
        required: [true, 'Please add a  country']
    },
    city: {
        type: String,
        required: [true, 'Please add a  city']
    },

    phoneNumber: {
        type: String,
        required: [true, 'Please add a  phone Number']
    },

    email: {
        type: String,
        required: [true, 'Please add a email']
    },

    customer: {
        type: Boolean,
        required: [false, 'Please add a customer']
    },

    vendor: {
        type: Boolean,
        required: [false, 'Please add a vendors']
    },
    other: {
        type: Boolean,
        required: [false, 'Please add a other']
    },
    businessId: {
        type: String,
        required: [true, 'Please add a businessId']
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

module.exports = mongoose.model('Partner', PartnerSchema);
