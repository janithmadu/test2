const mongoose = require('mongoose');

const DocumentCollectionSchema = new mongoose.Schema({
    collectionName: {
        type: String,
        required: [true, 'Please add a main category name']
    },
    collectionCategory: {
        type: String,
        required: [true, 'Please add a collection category ']
    },
collectionTemplate: {
        type: String,
        required: [false, 'Please add a collection template ']
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

module.exports = mongoose.model('DocumentCollection', DocumentCollectionSchema);
