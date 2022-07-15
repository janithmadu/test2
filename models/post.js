const mongoose = require('mongoose');
const slugify = require('slugify');
const shortid = require('shortid');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        unique: true
    },
    slug: String,

    link: {
        type: String,
        required: [true, 'Please add a description']
    },

    imageUrl: {
        type: Object,
        required: [true, 'Please add a image url']
    },

    author: {
        type: String,
        required: [true, 'Please add a author']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

/*
// Create post slug from name
PostSchema.pre('save', function(next){
  console.log('slugify ran', this.title);
  this.slug = slugify(this.title, {lower:true});
  next();
})
*/

// Create post slug from name
PostSchema.pre('save', function (next) {
    const short = shortid.generate();
    console.log('shord id ran', short);
    this.slug = short;
    next();
});

module.exports = mongoose.model('Post', PostSchema);
