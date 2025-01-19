const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');

exports.getoverView = catchAsync(async(req,res)=>{
    // 1) Get tour data from collection
    const tours = await Tour.find();
    // 2) Build template

    // 3)Render the template using data from 1)
    res.status(200).render('overview',{
        title : 'All Tours',
        tours
    });
});

exports.getTour = async(req,res)=>{
    const tour = await Tour.findOne({slug : req.params.slug}).populate({
        path : 'review',
        select : 'review rating user'
    });
    console.log(tour);
    res.status(200).render('tour',{
        title : 'The Forest Hiker Tour',
        tour
    });
};