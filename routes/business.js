const express = require('express');
const {
    getPosts,
    createBusiness,
    getSinglePost,
    getSinglePostSlug,
    updatePost,
    deletePost,
    getAllLoaction,
    createLocation,
    getAllBusinessUnit,
    createBusinessUnit
} = require('../controllers/business');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

//router.route('/').get(getPosts).post(protect, authorize('publisher','admin'),createBusiness);

router.route('/').get(getPosts).post(createBusiness);

router.route('id/:id').get(getSinglePost).put(updatePost).delete(deletePost);

router.route('/location').get(getAllLoaction).post(createLocation);

router.route('/unit').get(getAllBusinessUnit).post(createBusinessUnit);

router.route('/slug/:slug').get(getSinglePostSlug);

module.exports = router;
