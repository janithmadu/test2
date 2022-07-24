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
    getHeadOffice
} = require('../controllers/business');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

//router.route('/').get(getPosts).post(protect, authorize('publisher','admin'),createBusiness);

router.route('/').get(getPosts).post(createBusiness);

router.route('/businessId/:id').get(getSingleBusiness).put(updatePost).delete(deletePost);

router.route('/head-office/:id').get(getHeadOffice)



router.route('/location').get(getAllLoaction).post(createLocation);

router.route('/location/:id').get(getSingleLocation).put(updateLocation);

router.route('/location/businessId/:id').get(getOneBusinessForLoaction);

router.route('/unit').get(getAllBusinessUnit).post(createBusinessUnit);

router.route('/unit/:id').get(getBusinessForUnits);

router.route('/location/unit/:id').get(getLocationForUnits);

router.route('/unit/unitId/:id').get(getOneBusinessUnit).put(updateBusinessUnit);

router.route('/slug/:slug').get(getSinglePostSlug);

module.exports = router;
