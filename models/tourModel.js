const mongoose = require('mongoose');

// turlar için klasik belirlenen şemayı hazırla
const tourSchema = new mongoose.Schema({
    name : {
        type: String,
        required : [true,'A tour must have a name'],
        unique : true,
        trim : true
    },
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
        required : [true,'A tour must have a difficulty']
    },
    ratingsAverage : {
        type: Number,
        default : 4.5
    },
    ratingdQuantity : {
        type : Number,
        default : 0
    },
    price : {
        type:Number,
        required : [true,'A tour must have a price']
    },
    priceDiscount : Number,
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
    startDates : [Date]
});

// turlar için hazırlanan şemayı Tour adında bi model oluşturup ona kaydet
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;