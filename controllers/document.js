const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
//User Model
const ProductAndService = require('../models/productAndService');
const ProductAndServiceCategory = require('../models/documentCategory');

const DocumentCollection = require('../models/documentCollection');
const Document = require('../models/document');
const DocumentCollectionTemplate  = require('../models/documentCollectionTemplate')
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
    query = Document.find(JSON.parse(queryStr));

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
    const total = await Document.countDocuments();

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
exports.getAllSubCategoryForDocument = asyncHandler(async (req, res, next) => {

    const doc = await Document.find({subCategory:req.params.id}).sort({ createdAt: -1 }).exec();

console.log(doc)

    if (!doc) {
        return next(new ErrorResponse(`Post not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, data: doc });
});


//@desc   Get single post
//@route  GET /api/v1/user/:id
//access  Public
exports.getSingleItem = asyncHandler(async (req, res, next) => {
    const oneDocument = await Document.findById(req.params.id);
       const category = await ProductAndServiceCategory.findOne({_id:oneDocument.subCategory})
   
    if (!oneDocument) {
        return next(new ErrorResponse(`document not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, document: oneDocument, category:category });
});

//@desc   Get single post using Slug
//@route  GET /api/v1/user/:id
//access  Public
exports.getSinglePostSlug = asyncHandler(async (req, res, next) => {
    const post = await Document.findOne({ slug: req.params.slug });
    if (!post) {
        return next(new ErrorResponse(`Post not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, data: post });
});

//@desc   Post Post
//@route  POST /api/v1/post
//@access Public
exports.createDocument = asyncHandler(async (req, res, next) => {
    console.log(req.body)
    const dataSave = new Document({
            referenceNo: req.body.referenceNo,
            mainCategory: req.body.mainCategory,
            subCategory: req.body.subCategory,
            remarks: req.body.remarks,
            documentName: req.body.documentName,
            status: req.body.status,
            fileUrl: req.body.fileUrl,
            fileName: req.body.fileName,
            userId:req.body.userId
    });

    console.log(dataSave);
    const result = await dataSave.save();
    res.status(201).json({ success: true, data: result });
});



//@desc   Put Post
//@route  PUT /api/v1/post
//@access Public
exports.updateDocument = asyncHandler(async (req, res, next) => {
    const post_id = await Document.findById(req.params.id);

    const update = {
         referenceNo: req.body.referenceNo,
            mainCategory: req.body.mainCategory,
            subCategory: req.body.subCategory,
            remarks: req.body.remarks,
            documentName: req.body.documentName,
            status: req.body.status,
            fileUrl: req.body.fileUrl,
            fileName: req.body.fileName,
            userId:req.body.userId
    };

    const updateData = await Document.findByIdAndUpdate(post_id, update, {
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
exports.getAllMainCategory = asyncHandler(async (req, res, next) => {
    const category = await ProductAndServiceCategory.find().sort({ createdAt: -1 }).exec();
    
    const filter = category.filter((filter) => filter.type==='main');

    console.log('filter :', filter);
    if (!category) {
        return next(new ErrorResponse(`category not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, data: filter });
});


//@desc   Post Category
//@route  POST /api/v1/item/category
//@access Public
exports.getAllCategoryDocument = asyncHandler(async (req, res, next) => {
    const category = await ProductAndServiceCategory.find().sort({ createdAt: -1 }).exec();
    
    const filter = category.filter((filter) => filter.documentType === 'Documents' && filter.type==='main');

    console.log('filter :', filter);
    if (!category) {
        return next(new ErrorResponse(`category not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, data: filter });
});


//@desc   Post Category
//@route  POST /api/v1/item/category
//@access Public
exports.getAllCategoryCollection = asyncHandler(async (req, res, next) => {
    const category = await ProductAndServiceCategory.find().sort({ createdAt: -1 }).exec();
    
    const filter = category.filter((filter) => filter.documentType === 'Collections' && filter.type==='main');

    console.log('filter :', filter);
    if (!category) {
        return next(new ErrorResponse(`category not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, data: filter });
});

//@desc   Post Category
//@route  POST /api/v1/item/category
//@access Public
exports.getAllCategorySubCollection = asyncHandler(async (req, res, next) => {
    const category = await ProductAndServiceCategory.find({mainCategoryId:req.params.id}).sort({ createdAt: -1 }).exec();
    console.log('category',category);
    const filter = category.filter((filter) => filter.documentType === 'Collections');

    console.log('filter :', filter);
    if (!category) {
        return next(new ErrorResponse(`category not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, data: filter });
});

//@desc   Post Category
//@route  POST /api/v1/item/category
//@access Public
exports.getAllCategorySubDocument = asyncHandler(async (req, res, next) => {
    const category = await ProductAndServiceCategory.find({mainCategoryId:req.params.id}).sort({ createdAt: -1 }).exec();
    console.log('category',category);
    const filter = category.filter((filter) => filter.documentType === 'Documents');

    console.log('filter :', filter);
    if (!category) {
        return next(new ErrorResponse(`category not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, data: filter });
});

//@desc   Post Category
//@route  POST /api/v1/item/category
//@access Public
exports.getAllCollection = asyncHandler(async (req, res, next) => {
    const collections = await DocumentCollection.find().sort({ createdAt: -1 }).exec();
    if (!collections) {
        return next(new ErrorResponse(`Collections not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, data: collections });
});

//@desc   Post Category
//@route  POST /api/v1/item/category
//@access Public
exports.createCollecion = asyncHandler(async (req, res, next) => {
    console.log(req.body);
    const dataSave = new DocumentCollection({
        collectionName: req.body.collectionName,
        collectionCategory:req.body.collectionCategory,
        collectionTemplate:req.body.collectionTemplate,
        collectionList: req.body.collectionList,
        userId: req.body.userId
    });

    console.log(dataSave);
    const result = await dataSave.save();
    res.status(201).json({ success: true, data: result });
});

//@desc   Post Category
//@route  POST /api/v1/item/category
//@access Public
exports.getAllCollectionTemplate = asyncHandler(async (req, res, next) => {
    const collections = await DocumentCollectionTemplate.find().sort({ createdAt: -1 }).exec();
    if (!collections) {
        return next(new ErrorResponse(`Collections not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, data: collections });
});

//@desc   Post Category
//@route  POST /api/v1/item/category
//@access Public
exports.createCollecionTemplate = asyncHandler(async (req, res, next) => {
    console.log(req.body);
    const dataSave = new DocumentCollectionTemplate({
        collectionName: req.body.collectionName,
        collectionCategory:req.body.collectionCategory,
        collectionList: req.body.collectionList,
        userId: req.body.userId
    });

    console.log(dataSave);
    const result = await dataSave.save();
    res.status(201).json({ success: true, data: result });
});


//@desc   Post Category
//@route  POST /api/v1/item/category
//@access Public
exports.createCategory = asyncHandler(async (req, res, next) => {
    const dataSave = new ProductAndServiceCategory({
        documentType: req.body.documentType,
        templateType:req.body.templateType,
        mainCategoryName: req.body.mainCategoryName,
        type: req.body.type,
        subCategoryName: req.body.subCategoryName,
        userId: req.body.userId,
        mainCategoryId: req.body.mainCategoryId
    });

    console.log(dataSave);
    const result = await dataSave.save();
    res.status(201).json({ success: true, data: result });
});

//@desc     Get all Category
//@route    GET /api/v1/item/category
//@access   Public
exports.getCategory = asyncHandler(async (req, res, next) => {
    console.log('this')
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
        templateType:req.body.templateType,
        documentType: req.body.documentType,
        mainCategoryName: req.body.mainCategoryName,
        type: req.body.type,
        subCategoryName: req.body.subCategoryName,
        mainCategoryId: req.body.mainCategoryId
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
