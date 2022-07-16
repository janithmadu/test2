const mongoose = require('mongoose');

const BusinessUnitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },

    type: {
        type: String,
        required: [true, 'Please add a type']
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

module.exports = mongoose.model('BusinessUnit', BusinessUnitSchema);
