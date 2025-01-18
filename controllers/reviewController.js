const User = require('../models/userModel');
const appError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Tour = require('../models/tourModel');
const Review = require('../models/reviewModel');

exports.getAllReviews = catchAsync(async(req,res,next) =>{
    const reviews =await Review.find({});
    res.status(200).json({
        status : 'Succes',
        results : reviews.length,
        data : {
            reviews
        }
    })
});

exports.createReview = catchAsync(async(req,res,next) =>{
    const newReview = await Review.create(req.body);
    res.status(201).json({
        status : 'Succes',
        data : {
            review : newReview
        }
    })
});