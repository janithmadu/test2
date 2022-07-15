const mongoose = require('mongoose');

const ProductAndServiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },

    categoryId: {
        type: String,
        required: [true, 'Please add a name']
    },
    itemsType: {
        type: String,
        required: [true, 'Please add a items type']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    sellAll: {
        type: Boolean,
        required: [true, 'Please add a name']
    },
    buyThis: {
        type: Boolean,
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

module.exports = mongoose.model('ProductAndService', ProductAndServiceSchema);
