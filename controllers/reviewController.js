const User = require('../models/userModel');
const appError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Tour = require('../models/tourModel');
const Review = require('../models/reviewModel');
const factory = require('./handlerFactory');

exports.getAllReviews = catchAsync(async(req,res,next) =>{
    let filter = {};
    if(req.params.tourId) filter = {tour : req.params.tourId};

    const reviews =await Review.find(filter);
    res.status(200).json({
        status : 'Succes',
        results : reviews.length,
        data : {
            reviews
        }
    })
});

// This for create review for logined acc 
exports.setTourReviewIds = (req,res,next)=>{
    //  Allow nested routes
    if(!req.body.tour) req.body.tour = req.params.tourId;
    if(!req.body.user) req.body.user = req.user.id;
    next();
};
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createoOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);