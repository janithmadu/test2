const express = require('express');
const {
    getPartners,
    createPartner,
    getSinglePost,
    getSinglePostSlug,
    updatePost,
    deletePost,
    getAllCustomer,
    getAllVendors,
    getAllOthers
} = require('../controllers/partners');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

//router.route('/').get(getPartners).post(protect, authorize('publisher','admin'),createPartner);

router.route('/').get(getPartners).post(createPartner);

router.route('/partnerId/:id').get(getSinglePost).put(updatePost).delete(deletePost);

router.route('/customers').get(getAllCustomer);

router.route('/vendors').get(getAllVendors);

router.route('/others').get(getAllOthers);

router.route('/slug/:slug').get(getSinglePostSlug);

module.exports = router;
