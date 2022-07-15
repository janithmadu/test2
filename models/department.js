const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },

    branchId: {
        type: String,
        required: [true, 'Please add a branch Id']
    },

    businessId: {
        type: String,
        required: [true, 'Please add a business Id']
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

module.exports = mongoose.model('Department', DepartmentSchema);
