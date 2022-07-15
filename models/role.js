const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    roleName: {
        type: String,
        required: [true, 'Please add a role name']
    },

    business: {
        type: Boolean,
        required: [true, 'Please add a business']
    },

    locations: {
        type: Boolean,
        required: [true, 'Please add a email']
    },

    units: {
        type: Boolean,
        required: [true, 'Please add a email']
    },
    users: {
        type: Boolean,
        required: [true, 'Please add a email']
    },
    roles: {
        type: Boolean,
        required: [true, 'Please add a email']
    },
   products: {
        type: Boolean,
        required: [true, 'Please add a email']
    },
   services: {
        type: Boolean,
        required: [true, 'Please add a email']
    },
   itemsCategories: {
        type: Boolean,
        required: [true, 'Please add a email']
    },
   itemsUom: {
        type: Boolean,
        required: [true, 'Please add a email']
    },
   partnersCustomers: {
        type: Boolean,
        required: [true, 'Please add a email']
    },
   partnersVendors: {
        type: Boolean,
        required: [true, 'Please add a email']
    },
   partnersOther: {
        type: Boolean,
        required: [true, 'Please add a email']
    },
 documentsCategory: {
        type: Boolean,
        required: [true, 'Please add a email']
    },
 documentsCollections: {
        type: Boolean,
        required: [true, 'Please add a email']
    },
 documents: {
        type: Boolean,
        required: [true, 'Please add a email']
    },

    userId: {
        type: String,
        required: [true, 'Please add a userId']
    },
        businessId: {
        type: String,
        required: [true, 'Please add a userId']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Role', RoleSchema);
