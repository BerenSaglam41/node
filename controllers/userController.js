const User = require('../models/userModel');
const appError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

const filterObj = (obj , ...allowedFields) =>{
    const newObj = {};
    Object.keys(obj).forEach(el =>{
        if(allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

exports.getAllUsers = async (req,res,next)=>{
    const users = await User.find({});
    res.status(201).json({
        status : 'success', 
        results : users.length,
        data : {
            users
        }
    });
};

exports.updateMe = catchAsync (async(req,res,next) => {
    // 1) Create error if user Posts password data
    if(req.body.password || req.body.passwordConfirm){
        return next(new appError('This route is not for password updates.Please use /updateMyPassword',400));
    }
    // 2) Update user Document
    //                  Filter for only name and email from req.body
    const filteredBody = filterObj(req.body,'name','email');
    const updatedUser =await User.findByIdAndUpdate(req.user.id,filteredBody,{
        new : true,
        runValidators : true
    })
    res.status(200).json({
        status : 'Succes',
        data : updatedUser
    });
});

exports.deleteMe = catchAsync(async(req,res,next)=>{
    await User.findByIdAndUpdate(req.user.id,{active :false});
    res.status(204).json({
        status : 'Succes',
        data : null
    })
});

exports.getUser = (req,res)=>{
    res.status(500).json({
        status : 'error',
        message : 'This route is not yet defined'
    });
};

exports.createUser = (req,res)=>{
    res.status(500).json({
        status : 'error',
        message : 'This route is not yet defined'
    });
};

exports.updateUser = (req,res)=>{
    res.status(500).json({
        status : 'error',
        message : 'This route is not yet defined'
    });
};

exports.deleteUser = factory.deleteOne(User);


