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
    updateCategory,
    createCollecion,
    getAllCollection,
    getAllCollectionTemplate,
    createCollecionTemplate,
    createDocument,
    updateDocument,
    getAllCategoryDocument,
    getAllCategorySubDocument,
    getAllMainCategory,
    getAllSubCategoryForDocument,
    getAllCategoryCollection,
    getAllCategorySubCollection
} = require('../controllers/document');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

//router.route('/').get(getPosts).post(protect, authorize('publisher','admin'),createPost);


router.route('/').get(getPosts).post(createDocument);


router.route('/type/document/:id').get(getAllSubCategoryForDocument).post(createDocument);

router.route('/documentId/:id').get(getSingleItem).put(updateDocument).delete(deletePost);

router.route('/category').get(getCategory).post(createCategory);

router.route('/category/type/main').get(getAllMainCategory)

router.route('/category/type/collection/sub/:id').get(getAllCategorySubCollection)



router.route('/category/type/document').get(getAllCategoryDocument);

router.route('/category/type/collection').get(getAllCategoryCollection);

router.route('/category/type/document/:id').get(getAllCategorySubDocument);

router.route('/category/:id').get(getOneCategory).put(updateCategory);

router.route('/collection').get(getAllCollection).post(createCollecion);

router.route('/collection/template').get(getAllCollectionTemplate).post(createCollecionTemplate);


router.route('/products').get(getAllProducts);

router.route('/slug/:slug').get(getSinglePostSlug);

module.exports = router;
