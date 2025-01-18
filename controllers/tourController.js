const Tour = require('./../models/tourModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');


exports.aliasTopTours = async (req,res,next) =>{
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,difficulty,'
    next();
};

exports.getAllTours =factory.getAll(Tour);
exports.getTour = factory.getOne(Tour,{ path : 'review'});
exports.createTour = factory.createoOne(Tour);
exports.updateTour = factory.updateOne(Tour);
exports.deleteTour = factory.deleteOne(Tour)

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