const express = require('express');
const { getPosts, createPost, getSinglePost, getSinglePostSlug, updatePost, deletePost } = require('../controllers/posts');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

//router.route('/').get(getPosts).post(protect, authorize('publisher','admin'),createPost);

router.route('/').get(getPosts).post(createPost);

router.route('/:id').get(getSinglePost).put(updatePost).delete(deletePost);

router.route('/slug/:slug').get(getSinglePostSlug);

module.exports = router;
