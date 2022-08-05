const express = require('express');
const {
    getPosts,
    createBusiness,
    getSingleBusiness,
    getSinglePostSlug,
    updatePost,
    deletePost,
    getAllLoaction,
    createLocation,
    getAllBusinessUnit,
    createBusinessUnit,
    updateLocation,
    getSingleLocation,
    getOneBusinessForLoaction,
    getBusinessForUnits,
    getOneBusinessUnit,
    updateBusinessUnit,
    getLocationForUnits,
    getHeadOffice,
    updateHeadOffice,
    getHeadOfficeForUnits
} = require('../controllers/business');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

//router.route('/').get(getPosts).post(protect, authorize('publisher','admin'),createBusiness);

router.route('/').get(protect, getPosts).post(protect, createBusiness);

router.route('/businessId/:id').get(protect, getSingleBusiness).put(protect, updatePost).delete(protect, deletePost);

router.route('/head-office/:id').get(protect, getHeadOffice).put(protect, updateHeadOffice);

router.route('/location').get(protect, getAllLoaction).post(protect, createLocation);

router.route('/location/:id').get(protect, getSingleLocation).put(protect, updateLocation);

router.route('/location/businessId/:id').get(protect, getOneBusinessForLoaction);

router.route('/unit').get(protect, getAllBusinessUnit).post(protect, createBusinessUnit);

router.route('/unit/:id').get(protect, getBusinessForUnits);

router.route('/location/unit/:id').get(protect, getLocationForUnits);

router.route('/head-office/unit/:id').get(protect, getHeadOfficeForUnits);

router.route('/unit/unitId/:id').get(protect, getOneBusinessUnit).put(protect, updateBusinessUnit);

router.route('/slug/:slug').get(protect, getSinglePostSlug);

module.exports = router;
