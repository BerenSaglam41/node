const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/userModel');

exports.getoverView = catchAsync(async(req,res)=>{
    // 1) Get tour data from collection
    const tours = await Tour.find();
    // 2) Build template
    // 3
    res.status(200).render('overview',{
        title : 'All Tours',
        tours
    });
});

exports.getTour = catchAsync(async(req,res,next)=>{
    const tour = await Tour.findOne({ slug: req.params.slug }).populate({
        path: 'reviews',
        fields: 'review rating user'
      });
      if(!tour){
        return next(new AppError('There is no tour with that name',404));
      }
    res.status(200).render('tour',{
        title : `${tour.name} Tour`,
        tour
    });
});

exports.getLoginForm  = async(req,res)=>{
  res.status(200).render('login',{
    title : 'Log into your account'
  });
};

exports.getAccount = async(req,res)=>{
  res.status(200).render('account',{
    title : 'Your account'
  });
};
exports.updateUserData = catchAsync(async(req,res,next)=>{
  console.log("selam");
    const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    {
      new: true,
      runValidators: true
    }
  );
  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser
  });
});