const mongoose = require('mongoose');

const ProductAndServiceCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },

    itemType: {
        type: String,
        required: [true, 'Please add a item type']
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

module.exports = mongoose.model('ProductAndServiceCategory', ProductAndServiceCategorySchema);
