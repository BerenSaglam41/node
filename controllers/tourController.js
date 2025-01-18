const appError = require('../utils/appError');
const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');

exports.aliasTopTours = async (req,res,next) =>{
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,difficulty,'
    next();
};

exports.getAllTours =catchAsync(async (req,res,next)=>{
        // EXECUTE Query
        const features = new APIFeatures(Tour.find(),req.query)
        .filter().
        sort()
        .limitFields()
        .paginate();
        const tours =await features.query;
    res.status(200).json({
    status: 'Succes', 
    results : tours.length,
    data:{
        tours
    }
    });
});

exports.getTour = catchAsync(async (req,res,next)=>{
        const tour = await Tour.findById(req.params.id).populate('review');
        if(!tour){
            return next(new appError('No tour found with that ID',404));
        }
        res.status(200).json({
            status: 'Success',
            data:{
                tour
            }
        });
});

exports.createTour = catchAsync(async (req,res,next)=>{
    const newTour = await Tour.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            tour: newTour
        }
    });
});

exports.updateTour =catchAsync( async (req,res,next)=>{
        const tour = await Tour.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            // runvalidators true olursa schema'daki validasyonlar çalışır
            runValidators: true
        });
        if(!tour){
            return next(new appError('No tour found with that ID',404));
        }
        res.status(200).json({
            status: 'Success',
            data:{ 
                 tour
            }
        });   

});

exports.deleteTour =catchAsync(async (req,res,next)=>{
        const tour = await Tour.findByIdAndDelete(req.params.id,);
        if(!tour){
            return next(new appError('No tour found with that ID',404));
        }
        res.status(204).json({
            status: 'Success',
            data:null,
        });
});

exports.getTourStats = catchAsync(async (req,res,next) => {
        const stats =await Tour.aggregate([
            // Shows greater than 4.5 
            {
                $match: { ratingsAverage : { $gte : 4.5 }}
            },
            // Group by difficulty level and gives others stats
            {
                $group: {
                     _id : {$toUpper : '$difficulty'},
                     num : { $sum : 1}, 
                     numRating : {$sum : '$ratingsQuantity'},
                     avgRating : {$avg : '$ratingsAverage'},
                     avgPrice : { $avg : '$price'},
                     minPrice : { $min : '$price'},
                     maxPrice : { $max : '$price'},
                }
            }, 
            {
                $sort : { avgPrice : 1}
            },
            // Shows which is the not easy
            // {
            //     $match :  { _id :{ $ne : 'EASY'}}
            // }
        ]);
        res.status(200).json({
            status: 'Success',
            data:{ 
                stats
            }
        });
});
exports.getMonthlyPlan =catchAsync(async (req,res,next) =>{
        // we get the year and we modified it to integer
        const year = req.params.year *1;  // 2021
        const plan = await Tour.aggregate([
            {
                $unwind : '$startDates'
            },
            {
                $match : {
                    startDates : {
                        $gte : new Date(`${year}-01-01`),
                        $lte : new Date(`${year}-12-31`)
                    }
                }
            },
            {
                $group : {
                    _id : { $month : '$startDates'},
                    numTourStats : {$sum : 1},
                    tours : {$push : '$name'},
                    date : {$push : '$startDates'}
                }
            },
            {
                $sort : { numTourStats : -1}
            },
            {
                $addFields : { month : '$_id'}
            },
            {
                $project : { 
                    _id : 0
                }
            },
            // 12 tane gösterir
            {
                $limit : 12  
            }
        ]);
        res.status(200).json({
            status: 'Success',
            data:{ 
                plan
            }
        });
});