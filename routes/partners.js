const express = require('express');
const { getPartners, createPartner, getSinglePost, getSinglePostSlug, updatePost, deletePost } = require('../controllers/partners');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

//router.route('/').get(getPartners).post(protect, authorize('publisher','admin'),createPartner);

router.route('/').get(getPartners).post(createPartner);

router.route('/:id').get(getSinglePost).put(updatePost).delete(deletePost);

router.route('/slug/:slug').get(getSinglePostSlug);

module.exports = router;
