const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');
const User = require('./userModel');

// turlar için klasik belirlenen şemayı hazırla
const tourSchema = new mongoose.Schema({
    name : {
        type: String,
        required : [true,'A tour must have a name'],
        unique : true,
        trim : true,
        maxlength : [40,'A tour name must have less or equal then 40 characters'],
        minlength : [10,'A tour name must have more or equal then 10 characters'],
        // bu kod ile sadece harf içeren isimler alınır
        // validate : [validator.isAlpha,'Tour name must only contain characters']
    },
    slug : String,
    duration : {
        type : Number,
        required : [true,'A tour must have a duration']
    },
    maxGroupSize : {
        type : Number,
        required : [true,'A tour must have a group size']
    },
    difficulty : {
        type : String,
        required : [true,'A tour must have a difficulty'],
        enum : {
            values : ['easy','medium','difficult'],
            message : 'Difficulty is either : easy, medium, difficult'
        }
    },
    ratingsAverage : {
        type: Number,
        default : 4.5
    },
    ratingsQuantity : {
        type : Number,
        default : 0
    },
    price : {
        type:Number,
        required : [true,'A tour must have a price']
    },
    priceDiscount : {
        type: Number,
        validate : {
                message : 'Discount price ({VALUE}) should be below regular price',
                // this is only for creating new document
                validator : function(val){
                    return val < this.price;
            }
        }
    },
    summary : {
        type : String,
        trim : true,
        required : [true,'A tour must have a description']
    },
    description :{
        type : String,
        trim : true,
    },
    imageCover : {
        type : String,
        required : [true,'A tour must have an cover image']
    },
    images : [String],
    createdAt : {
        type : Date,
        default : Date.now()
    },
    startDates : [Date],
    secretTour : {
        type : Boolean,
        default : false
    },
    startLocation : {
        // GeoJSON
        type : {
            type : String,
            default : 'Point',
            enum : ['Point']
        },
        coordinates : [Number],
        address : String,
        description : String
    },
    locations : [
        {
            type : {
                type : String,
                default : 'Point',
                enum : ['Point']
            },
            coordiantes : [Number],
            address : String,
            description : String,
            day : Number
        }
    ],
    guides : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'User'
        }
    ],
    reviews : [{
        type : mongoose.Schema.ObjectId,
        ref : 'review'
    }]
},
{
    // virtual için aratırken görüntü verir
    toJSON : { virtuals : true},
    toObject : { virtual : true }
}
);

// virtual aratırken görünür kaydedlmez
tourSchema.virtual('durationWeeks').get(function (){
    return this.duration/7;
});

// Virtual populate for reviews 
tourSchema.virtual('review',{
    ref : 'Review',
    foreignField : 'tour',
    localField : '_id'
});

// Document Middleware runs before the .save() and .create() methods
tourSchema.pre('save',function (next){
    this.slug = slugify(this.name, { lower:true});
    next();
});

// tourSchema.pre('save',async function(next){
//     const guidesPromises = this.guides.map(async id =>await User.findById(id));
//     this.guides = await Promise.all(guidesPromises);
//     next();
// });

// tourSchema.pre('save',function (next){
//     console.log('Will save document...');
//     next();
// });

// tourSchema.post('save',function(doc,next){
//     console.log(doc);
//     next();
// })

        // QUERY MİDDLEWARE if request is find secret tours are hidden 
tourSchema.pre(/^find/,function(next){
    this.find({ secretTour : {$ne : 'true'}});
    this.start = Date.now();
    next();
});
tourSchema.pre(/^find/,async function(next){
    this.populate({
        path : 'guides',    
        select : '-__v -passwordChangedAt'
    });
    next();
});
tourSchema.post(/^find/,function(docs,next){
    console.log(`Query took ${Date.now() - this.start} miliseconds.`);
    next();
});



// AGGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function(next) {
    // that code will hide secret tours in aggregation on stats
    this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
    console.log(this.pipeline());
    next();
  });

// turlar için hazırlanan şemayı Tour adında bi model oluşturup ona kaydet
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;