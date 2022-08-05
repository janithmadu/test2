const mongoose = require('mongoose');

const DocumentCategorySchema = new mongoose.Schema({
    mainCategoryName: {
        type: String,
        required: [false, 'Please add a main category name']
    },
    
   templateType: {
        type: String,
        required: [true, 'Please add a  templateType']
    },
    
 documentType: {
        type: String,
        required: [true, 'Please add a  documentType']
    },

    type: {
        type: String,
        required: [true, 'Please add a  type']
    },

    subCategoryName: {
        type: String,
        required: [false, 'Please add a sub category name']
    },

    userId: {
        type: String,
        required: [true, 'Please add a userId']
    },
    mainCategoryId: {
        type: String,
        required: [false, 'Please add a main category id']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('DocumentCategory', DocumentCategorySchema);
