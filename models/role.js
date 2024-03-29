const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    roleName: {
        type: String,
        required: [true, 'Please add a role name']
    },
    admin: {
        type: Boolean,
        required: [true, 'Please add a admin']
    },

    businessView: {
        type: Boolean,
        required: [true, 'Please add a business view']
    },

    businessAdd: {
        type: Boolean,
        required: [true, 'Please add a business add']
    },

    businessEdit: {
        type: Boolean,
        required: [true, 'Please add a business edit']
    },

    usersView: {
        type: Boolean,
        required: [true, 'Please add a user view']
    },

    usersAdd: {
        type: Boolean,
        required: [true, 'Please add a user add']
    },

    usersEdit: {
        type: Boolean,
        required: [true, 'Please add a user edit']
    },

    rolesView: {
        type: Boolean,
        required: [true, 'Please add a role view']
    },

    rolesAdd: {
        type: Boolean,
        required: [true, 'Please add a role add']
    },

    rolesEdit: {
        type: Boolean,
        required: [true, 'Please add a role edit']
    },
    productsView: {
        type: Boolean,
        required: [true, 'Please add a product view']
    },

    productsAdd: {
        type: Boolean,
        required: [true, 'Please add a product add']
    },

    productsEdit: {
        type: Boolean,
        required: [true, 'Please add a product edit']
    },
    servicesView: {
        type: Boolean,
        required: [true, 'Please add a service view']
    },

    servicesAdd: {
        type: Boolean,
        required: [true, 'Please add a service add']
    },
    servicesEdit: {
        type: Boolean,
        required: [true, 'Please add a service edit']
    },

    itemsCategoriesView: {
        type: Boolean,
        required: [true, 'Please add a items-categories view']
    },

    itemsCategoriesAdd: {
        type: Boolean,
        required: [true, 'Please add a items-categories add']
    },

    itemsCategoriesEdit: {
        type: Boolean,
        required: [true, 'Please add a items-categories edit']
    },
    itemsUomView: {
        type: Boolean,
        required: [true, 'Please add a item-uom view']
    },

    itemsUomAdd: {
        type: Boolean,
        required: [true, 'Please add a item-uom add']
    },
    itemsUomEdit: {
        type: Boolean,
        required: [true, 'Please add a item-uom edit']
    },

    partnersCustomersView: {
        type: Boolean,
        required: [true, 'Please add a partners-customers view']
    },

    partnersCustomersAdd: {
        type: Boolean,
        required: [true, 'Please add a partners-customers add']
    },

    partnersCustomersEdit: {
        type: Boolean,
        required: [true, 'Please add a partners-customers edit']
    },
    partnersVendorsView: {
        type: Boolean,
        required: [true, 'Please add a partners-vendors view']
    },

    partnersVendorsAdd: {
        type: Boolean,
        required: [true, 'Please add a partners-vendors add']
    },

    partnersVendorsEdit: {
        type: Boolean,
        required: [true, 'Please add a partners-vendors edit']
    },
    partnersOtherView: {
        type: Boolean,
        required: [true, 'Please add a partners-other view']
    },
    partnersOtherAdd: {
        type: Boolean,
        required: [true, 'Please add a partners-other add']
    },
    partnersOtherEdit: {
        type: Boolean,
        required: [true, 'Please add a partners-other edit']
    },
    documentsCategoryView: {
        type: Boolean,
        required: [true, 'Please add a documents-category view']
    },
    documentsCategoryAdd: {
        type: Boolean,
        required: [true, 'Please add a documents-category add']
    },
    documentsCategoryEdit: {
        type: Boolean,
        required: [true, 'Please add a documents-category edit']
    },
    documentsCollectionsView: {
        type: Boolean,
        required: [true, 'Please add a documents-collections View']
    },
    documentsCollectionsAdd: {
        type: Boolean,
        required: [true, 'Please add a documents-collections View']
    },
    documentsCollectionsEdit: {
        type: Boolean,
        required: [true, 'Please add a documents-collections View']
    },
    documentsView: {
        type: Boolean,
        required: [true, 'Please add a documents view']
    },
    documentsAdd: {
        type: Boolean,
        required: [true, 'Please add a documents add']
    },
    documentsEdit: {
        type: Boolean,
        required: [true, 'Please add a documents edit']
    },
    documentsPrint: {
        type: Boolean,
        required: [true, 'Please add a documents print']
    },
    documentsApprove: {
        type: Boolean,
        required: [true, 'Please add a documents approve']
    },

 businessDelete: {
        type: Boolean,
        required: [true, 'Please add a business delete']
    },
 usersDelete: {
        type: Boolean,
        required: [true, 'Please add a users delete']
    },
 rolesDelete: {
        type: Boolean,
        required: [true, 'Please add a roles delete']
    },
 productsDelete: {
        type: Boolean,
        required: [true, 'Please add a products delete']
    },
 servicesDelete: {
        type: Boolean,
        required: [true, 'Please add a services delete']
    },
     itemsCategoriesDelete: {
        type: Boolean,
        required: [true, 'Please add a items Categories Delete']
    },
     itemsUomDelete: {
        type: Boolean,
        required: [true, 'Please add a products itemsUomDelete']
    },
     partnersCustomersDelete: {
        type: Boolean,
        required: [true, 'Please add a products partnersCustomersDelete']
    },
     partnersVendorsDelete: {
        type: Boolean,
        required: [true, 'Please add a products partnersVendorsDelete']
    },
     partnersOtherDelete: {
        type: Boolean,
        required: [true, 'Please add a products partnersOtherDelete']
    },
     documentsCategoryDelete: {
        type: Boolean,
        required: [true, 'Please add a products documentsCategoryDelete']
    },
     documentsCollectionsDelete: {
        type: Boolean,
        required: [true, 'Please add a products documentsCollectionsDelete']
    },
     documentsDelete: {
        type: Boolean,
        required: [true, 'Please add a products documentsDelete']
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

module.exports = mongoose.model('Role', RoleSchema);
