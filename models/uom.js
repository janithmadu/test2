const mongoose = require('mongoose');

const UomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
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

module.exports = mongoose.model('Uom', UomSchema);
