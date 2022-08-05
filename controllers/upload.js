const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
//User Model
const Business = require('../models/branch');
const { Query } = require('mongoose');
const slugify = require('slugify');
const path = require("path");



//@desc   Get single post using Slug
//@route  GET /api/v1/user/:id
//access  Public
exports.getSinglePostSlug = asyncHandler(async (req, res, next,resp) => {
 console.log(req.body, req.files);
   const fileName = req.files.upload.path.split('\\')[1]
   console.log(fileName)
res.status(201).json({success : true,
        file:{
            url:`http://localhost:5000/api/v1/upload/${fileName}`,
            originalFilename:`${req.files.upload.originalFilename}`,
            uplaodFileName:`${fileName}`
        }
    })

});

//@desc   Post Post
//@route  POST /api/v1/post
//@access Public
exports.createPost = asyncHandler(async (req, res, next) => {
    const dataSave = new Business({
        name: req.body.name,
        address: req.body.address,
        contactName: req.body.contactName,
        email: req.body.email,
        businessId: req.body.businessId,
        userId: req.body.userId
    });

    console.log(dataSave);
    const result = await dataSave.save();
    res.status(201).json({ success: true, data: result });
});

