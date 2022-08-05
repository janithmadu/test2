const express = require('express');
const {
    getPosts,
    createPost,
    getSingleItem,
    getSinglePostSlug,
    updateItem,
    deleteItem,
    createCategory,
    getCategory,
    getAllProducts,
    getOneCategory,
    updateCategory,
    getAllService,
    getAllProductsCategory,
    getAllServicesCategory,
    deleteCategory
} = require('../controllers/productAndService');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

//router.route('/').get(getPosts).post(protect, authorize('publisher','admin'),createPost);

router.route('/').get(getPosts).post(createPost);

router.route('/itemId/:id').get(getSingleItem).put(updateItem).delete(deleteItem);

router.route('/category').get(getCategory).post(createCategory);

router.route('/category/:id').get(getOneCategory).put(updateCategory).delete(deleteCategory);;

router.route('/products').get(getAllProducts);

router.route('/services').get(getAllService);

router.route('/category/filter/products').get(getAllProductsCategory);

router.route('/category/filter/services').get(getAllServicesCategory);

router.route('/slug/:slug').get(getSinglePostSlug);

module.exports = router;
