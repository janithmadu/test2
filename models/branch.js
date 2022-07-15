const mongoose = require('mongoose');

const BranchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },

    address: {
        type: String,
        required: [true, 'Please add a address']
    },

    email: {
        type: String,
        required: [true, 'Please add a email']
    },

    contactName: {
        type: String,
        required: [true, 'Please add a contact name']
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

module.exports = mongoose.model('Branch', BranchSchema);
