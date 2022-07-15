const ErrorResponse = require('../Utils/errorResponse');
const asyncHandler = require('../middleware/async');
//User Model
const Business = require('../models/role');
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
    query = Business.find(JSON.parse(queryStr));

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
    const total = await Business.countDocuments();

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
exports.getSinglePost = asyncHandler(async (req, res, next) => {
    const post = await Business.findById(req.params.id);
    if (!post) {
        return next(new ErrorResponse(`Post not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, data: post });
});

//@desc   Get single post using Slug
//@route  GET /api/v1/user/:id
//access  Public
exports.getSinglePostSlug = asyncHandler(async (req, res, next) => {
    const post = await Business.findOne({ slug: req.params.slug });
    if (!post) {
        return next(new ErrorResponse(`Post not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, data: post });
});

//@desc   Post Post
//@route  POST /api/v1/post
//@access Public
exports.createPost = asyncHandler(async (req, res, next) => {
    const dataSave = new Business({
        roleName: req.body.roleName,
        business: req.body.business,
        locations: req.body.locations,
        units: req.body.units,
  
    });

    console.log(dataSave);
    const result = await dataSave.save();
    res.status(201).json({ success: true, data: result });
});

//@desc   Put Post
//@route  PUT /api/v1/post
//@access Public
exports.updatePost = asyncHandler(async (req, res, next) => {
    const post_id = await Business.findById(req.params.id);

    const update = {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        content: req.body.content,
        tags: req.body.tags,
        author: req.body.author,
        slug: slugify(req.body.title, { lower: true })
    };

    const updateData = await Business.findByIdAndUpdate(post_id, update, {
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
    const user_id = await Business.findById(req.params.id);

    const deleteData = await Business.findByIdAndDelete(user_id);

    if (!deleteData) {
        return next(new ErrorResponse(`Business not found with id of ${req.params.id}`, 404));
    }

    return res.status(200).json({ success: true, data: {} });
});
