const express = require('express');
const { getSinglePostSlug } = require('../controllers/upload');
const multipart = require('connect-multiparty');
const path = require("path");

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

 const multipartMiddleware = multipart({ uploadDir: './upload' });




//router.route('/').get(getPosts).post(createPost);

router.use('/', express.static('upload'));

router.use('/', multipartMiddleware);

router.route('/').post(getSinglePostSlug)



module.exports = router;
