const mongoose = require('mongoose');

const DocumentCollectionTemplateSchema = new mongoose.Schema({
    collectionName: {
        type: String,
        required: [true, 'Please add a main category name']
    },
   collectionCategory: {
        type: String,
        required: [true, 'Please add a collection category ']
    },
    collectionList: {
        type: Array,
        required: [true, 'Please add a userId']
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

module.exports = mongoose.model('DocumentCollectionTemplate', DocumentCollectionTemplateSchema);
