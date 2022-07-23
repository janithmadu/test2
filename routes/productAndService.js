const express = require('express');
const {
    getPosts,
    createPost,
    getSingleItem,
    getSinglePostSlug,
    updateItem,
    deletePost,
    createCategory,
    getCategory,
    getAllProducts,
    getOneCategory,
    updateCategory
} = require('../controllers/productAndService');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

//router.route('/').get(getPosts).post(protect, authorize('publisher','admin'),createPost);

router.route('/').get(getPosts).post(createPost);

router.route('/itemId/:id').get(getSingleItem).put(updateItem).delete(deletePost);

router.route('/category').get(getCategory).post(createCategory);

router.route('/category/:id').get(getOneCategory).put(updateCategory);

router.route('/products').get(getAllProducts);

router.route('/slug/:slug').get(getSinglePostSlug);

module.exports = router;
