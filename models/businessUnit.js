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
    location: {
        type: Boolean,
        required: [true, 'Please add a Loaction true or false']
    }, 
    locationId: {
        type: String,
        required: [false, 'Please add a locationId']
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
