const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
    referenceNo: {
        type: String,
        required: [false, 'Please add a referenceNo']
    },

    mainCategory: {
        type: String,
        required: [true, 'Please add a  mainCategory']
    },

      subCategory: {
        type: String,
        required: [true, 'Please add a  subCategory']
    },

    remarks: {
        type: String,
        required: [false, 'Please add a remarks']
    },

    userId: {
        type: String,
        required: [true, 'Please add a userId']
    },
    documentName: {
        type: String,
        required: [true, 'Please add a main documentName']
    },
    status: {
        type: String,
        required: [true, 'Please add a main status']
    },
    fileUrl: {
        type: String,
        required: [true, 'Please add a main fileUrl']
    },
    fileName: {
        type: String,
        required: [true, 'Please add a main fileName']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Document', DocumentSchema);
