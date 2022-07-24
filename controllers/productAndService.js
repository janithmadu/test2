const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
//User Model
const ProductAndService = require('../models/productAndService');
const ProductAndServiceCategory = require('../models/productAndServiceCategory');
const { Query } = require('mongoose');
const slugify = require('slugify');

//@desc     Get all Posts
//@route    GET /api/v1/posts
//@access   Public
exports.getPosts = asyncHandler(async (req, res, next) => {
    console.log(req.query);
    let query;

    // Copy req.query
    const reqQuery = { ...req.query };

    //Field to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];

    //Loop over removeFields and delete the from reqQuery
    removeFields.forEach((param) => delete reqQuery[param]);

    console.log(reqQuery);

    // Create reqery string
    let queryStr = JSON.stringify(reqQuery);

    console.log(queryStr);

    //Finding resource
    query = ProductAndService.find(JSON.parse(queryStr));

    //Select Fields
    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort('-createdAt');
    }

    //Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 100;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await ProductAndService.countDocuments();

    query = query.skip(startIndex).limit(limit);

    //Executing query
    const getData = await query;

    //Pagination result
    const pagination = {};

    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        };
    }

    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        };
    }

    res.status(200).json({ success: true, count: getData.length, pagination: pagination, data: getData });

    //res.status(200).json({ success: true, msg: 'Show all users' });
});

//@desc   Get single post
//@route  GET /api/v1/user/:id
//access  Public
exports.getSingleItem = asyncHandler(async (req, res, next) => {
    const post = await ProductAndService.findById(req.params.id);
    if (!post) {
        return next(new ErrorResponse(`Post not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, data: post });
});

//@desc   Get single post using Slug
//@route  GET /api/v1/user/:id
//access  Public
exports.getSinglePostSlug = asyncHandler(async (req, res, next) => {
    const post = await ProductAndService.findOne({ slug: req.params.slug });
    if (!post) {
        return next(new ErrorResponse(`Post not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, data: post });
});

//@desc   Post Post
//@route  POST /api/v1/post
//@access Public
exports.createPost = asyncHandler(async (req, res, next) => {
    const dataSave = new ProductAndService({
        name: req.body.name,
        categoryId: req.body.categoryId,
        itemsType: req.body.itemsType,
        description: req.body.description,
        sellAll: req.body.sellAll,
        buyThis: req.body.buyThis,
        businessId: req.body.businessId,
        userId: req.body.userId
    });

    console.log(dataSave);
    const result = await dataSave.save();
    res.status(201).json({ success: true, data: result });
});

//@desc   Put Post
//@route  PUT /api/v1/post
//@access Public
exports.updateItem = asyncHandler(async (req, res, next) => {
    const post_id = await ProductAndService.findById(req.params.id);

    const update = {
        name: req.body.name,
        categoryId: req.body.categoryId,
        itemsType: req.body.itemsType,
        description: req.body.description,
        sellAll: req.body.sellAll,
        buyThis: req.body.buyThis,
        businessId: req.body.businessId,
        userId: req.body.userId
    };

    const updateData = await ProductAndService.findByIdAndUpdate(post_id, update, {
        new: true,
        runValidators: true
    });
    if (!updateData) {
        return next(new ErrorResponse(`Business not found with id of ${req.params.id}`, 404));
    }

    return res.status(200).json({ success: true, data: updateData });
});

//@desc   Delete Post
//@route  DELETE /api/v1/post
//@access Public
exports.deletePost = asyncHandler(async (req, res, next) => {
    const user_id = await ProductAndService.findById(req.params.id);

    const deleteData = await ProductAndService.findByIdAndDelete(user_id);

    if (!deleteData) {
        return next(new ErrorResponse(`Business not found with id of ${req.params.id}`, 404));
    }

    return res.status(200).json({ success: true, data: {} });
});

//@desc   Post Category
//@route  POST /api/v1/item/category
//@access Public
exports.createCategory = asyncHandler(async (req, res, next) => {
    const dataSave = new ProductAndServiceCategory({
        name: req.body.name,
        itemType: req.body.itemType,
        businessId: req.body.businessId,
        userId: req.body.userId
    });

    console.log(dataSave);
    const result = await dataSave.save();
    res.status(201).json({ success: true, data: result });
});

//@desc     Get all Category
//@route    GET /api/v1/item/category
//@access   Public
exports.getCategory = asyncHandler(async (req, res, next) => {
    console.log(req.query);
    let query;

    // Copy req.query
    const reqQuery = { ...req.query };

    //Field to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];

    //Loop over removeFields and delete the from reqQuery
    removeFields.forEach((param) => delete reqQuery[param]);

    console.log(reqQuery);

    // Create reqery string
    let queryStr = JSON.stringify(reqQuery);

    console.log(queryStr);

    //Finding resource
    query = ProductAndServiceCategory.find(JSON.parse(queryStr));

    //Select Fields
    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort('-createdAt');
    }

    //Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 100;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await ProductAndServiceCategory.countDocuments();

    query = query.skip(startIndex).limit(limit);

    //Executing query
    const getData = await query;

    //Pagination result
    const pagination = {};

    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        };
    }

    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        };
    }

    res.status(200).json({ success: true, count: getData.length, pagination: pagination, data: getData });

    //res.status(200).json({ success: true, msg: 'Show all users' });
});

//@desc     Get all Products
//@route    GET /api/v1/products
//@access   Public
exports.getAllProducts = asyncHandler(async (req, res, next) => {
    const products = await ProductAndService.find().sort({ createdAt: -1 }).exec();
    const filter = products.filter((filter) => filter.itemsType === 'Product');

    console.log('filter :', filter);

    res.status(200).json({ success: true, data: filter });

    //res.status(200).json({ success: true, msg: 'Show all users' });
});

//@desc     Get one category
//@route    GET /api/v1/business/unit
//@access   Public
exports.getOneCategory = asyncHandler(async (req, res, next) => {
    const category = await ProductAndServiceCategory.findOne({ _id: req.params.id }).sort({ createdAt: -1 }).exec();

    res.status(200).json({ success: true, data: category });
});

//@desc   Put Post
//@route  PUT /api/v1/post
//@access Public
exports.updateCategory = asyncHandler(async (req, res, next) => {
    const post_id = await ProductAndServiceCategory.findById(req.params.id);

    const update = {
        name: req.body.name,
        itemType: req.body.itemType
    };

    const updateData = await ProductAndServiceCategory.findByIdAndUpdate(post_id, update, {
        new: true,
        runValidators: true
    });
    if (!updateData) {
        return next(new ErrorResponse(`Business not found with id of ${req.params.id}`, 404));
    }

    return res.status(200).json({ success: true, data: updateData });
});
