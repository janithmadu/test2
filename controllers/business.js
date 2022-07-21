const ErrorResponse = require('../Utils/errorResponse');
const asyncHandler = require('../middleware/async');
//User Model
const Business = require('../models/business');
const HeadOffice = require('../models/HeadOffice');
const Location = require('../models/Location');
const BusinessUnit = require('../models/BusinessUnit');
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
exports.getSingleBusiness = asyncHandler(async (req, res, next) => {
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
exports.createBusiness = asyncHandler(async (req, res, next) => {
    //Create Business
    const dataSave = new Business({
        registationNumber: req.body.registationNumber,
        businessName: req.body.businessName,
        businessAddress1: req.body.businessAddress1,
        businessAddress2: req.body.businessAddress2,
        businessCity: req.body.businessCity,
        businessCountry: req.body.businessCountry,
        businessPhoneNumber: req.body.businessPhoneNumber,
        businessEmail: req.body.businessEmail,
        businessWeb: req.body.businessWeb,
        userId: req.body.userId
    });

    console.log(dataSave);

    const result = await dataSave.save();

if (req.body.headOffice) {
    //Create Head Office
    const headOfficeCreate = new HeadOffice({
        headOfficeAddress1: req.body.headOfficeAddress1,
        headOfficeAddress2: req.body.headOfficeAddress2,
        headOfficeCity: req.body.headOfficeCity,
        headOfficeCountry: req.body.headOfficeCountry,
        headOfficePhoneNumber: req.body.headOfficePhoneNumber,
        headOfficeEmail: req.body.headOfficeEmail,
        businessId: dataSave._id,
        userId: req.body.userId,
        headOffice: req.body.headOffice
    });

    console.log(headOfficeCreate);
    const headOfficeResult = await headOfficeCreate.save();
}
    res.status(201).json({ success: true, msg:"successfully saved" });
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

//@desc     Get all Loaction
//@route    GET /api/v1/business/location
//@access   Public
exports.getAllLoaction = asyncHandler(async (req, res, next) => {
    const locations = await Location.find().sort({ createdAt: -1 }).exec();

    res.status(200).json({ success: true, data: locations });
});

//@desc     Get all Loaction
//@route    GET /api/v1/business/location
//@access   Public
exports.getOneBusinessForLoaction = asyncHandler(async (req, res, next) => {
    console.log(req.params.id)
    const locations = await Location.find({businessId:req.params.id});

    res.status(200).json({ success: true, data: locations });
});

//@desc   Post Location
//@route  POST /api/v1/business/loaction
//@access Public
exports.createLocation = asyncHandler(async (req, res, next) => {
    const dataSave = new Location({
        name: req.body.name,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        country: req.body.country,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        web: req.body.web,
        businessId: req.body.businessId,
        userId: req.body.userId
    });

    console.log(dataSave);
    const result = await dataSave.save();
    res.status(201).json({ success: true, data: result });
});


//@desc   Put Loaction
//@route  PUT /api/v1/business/location
//@access Public
exports.updateLocation = asyncHandler(async (req, res, next) => {
    const post_id = await Location.findById(req.params.id);

    const update = {
        name: req.body.name,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        country: req.body.country,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        web: req.body.web,
        businessId: req.body.businessId,
        userId: req.body.userId
    };

    const updateData = await Location.findByIdAndUpdate(post_id, update, {
        new: true,
        runValidators: true
    });
    if (!updateData) {
        return next(new ErrorResponse(`Business not found with id of ${req.params.id}`, 404));
    }

    return res.status(200).json({ success: true, data: updateData });
});



//@desc   Get single post
//@route  GET /api/v1/user/:id
//access  Public
exports.getSingleLocation = asyncHandler(async (req, res, next) => {
    const post = await Location.findById(req.params.id);
    if (!post) {
        return next(new ErrorResponse(`Post not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, data: post });
});


//@desc     Get all business Units
//@route    GET /api/v1/business/unit
//@access   Public
exports.getAllBusinessUnit = asyncHandler(async (req, res, next) => {
    const businessUnits = await BusinessUnit.find().sort({ createdAt: -1 }).exec();

    res.status(200).json({ success: true, data: businessUnits });
});


//@desc     Get one business one Units
//@route    GET /api/v1/business/unit
//@access   Public
exports.getOneBusinessUnit = asyncHandler(async (req, res, next) => {
    const businessUnits = await BusinessUnit.findOne({_id:req.params.id}).sort({ createdAt: -1 }).exec();

    res.status(200).json({ success: true, data: businessUnits });
});


//@desc   Put Business Unit
//@route  PUT /api/v1/business/location
//@access Public
exports.updateBusinessUnit = asyncHandler(async (req, res, next) => {
    const post_id = await BusinessUnit.findById(req.params.id);

    const update = {
         name: req.body.name,
        type: req.body.type,
        location: req.body.location,
        locationId:req.body.locationId,
        businessId: businessId,
        userId: req.body.userId
    };

    const updateData = await BusinessUnit.findByIdAndUpdate(post_id, update, {
        new: true,
        runValidators: true
    });
    if (!updateData) {
        return next(new ErrorResponse(`Business not found with id of ${req.params.id}`, 404));
    }

    return res.status(200).json({ success: true, data: updateData });
});

//@desc     Get all business Units
//@route    GET /api/v1/business/unit
//@access   Public
exports.getBusinessForUnits = asyncHandler(async (req, res, next) => {
    const businessUnits = await BusinessUnit.find({businessId:req.params.id}).sort({ createdAt: -1 }).exec();
    console.log(businessUnits)
    const filter = businessUnits.filter((filter) => filter.location === false);

    res.status(200).json({ success: true, data: filter });
});


//@desc     Get all business Units
//@route    GET /api/v1/business/unit
//@access   Public
exports.getLocationForUnits = asyncHandler(async (req, res, next) => {
    const businessUnits = await BusinessUnit.find({locationId:req.params.id}).sort({ createdAt: -1 }).exec();
    console.log(businessUnits)
    const filter = businessUnits.filter((filter) => filter.location === true);

    res.status(200).json({ success: true, data: filter });
});


//@desc   Post Businnes Unit
//@route  POST /api/v1/business/unit
//@access Public
exports.createBusinessUnit = asyncHandler(async (req, res, next) => {

let businessId = req.body.businessId;

    if (req.body.location) {
    const location = await Location.findOne({ _id: req.body.locationId});
    businessId = location.businessId;
};

    const dataSave = new BusinessUnit({
        name: req.body.name,
        type: req.body.type,
        location: req.body.location,
        locationId:req.body.locationId,
        businessId: businessId,
        userId: req.body.userId
    });

    console.log(dataSave);
    const result = await dataSave.save();
    res.status(201).json({ success: true, data: result });
});




//@desc   Put Business Unit
//@route  PUT /api/v1/business/location
//@access Public
exports.updateBusinessUnit = asyncHandler(async (req, res, next) => {
    const post_id = await BusinessUnit.findById(req.params.id);

    const update = {
        name: req.body.name,
        type: req.body.type,
     
    };

    console.log(post_id)

    const updateData = await BusinessUnit.findByIdAndUpdate(post_id, update, {
        new: true,
        runValidators: true
    });
    if (!updateData) {
        return next(new ErrorResponse(`Business not found with id of ${req.params.id}`, 404));
    }

    return res.status(200).json({ success: true, data: updateData });
});