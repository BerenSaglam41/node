const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');

exports.aliasTopTours = async (req,res,next) =>{
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,difficulty,'
    next();
};

exports.aliasTopTours = async (req,res,next) =>{
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,difficulty,'
    next();
};

exports.getAllTours =async (req,res)=>{
    try{
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
    }
    catch(err){
        res.status(400).json({
            status:'Failed',
            message: err.message
        })
    }
};

exports.getTour = async (req,res)=>{
    try{
        const tour = await Tour.findById(req.params.id);
        res.status(200).json({
            status: 'Success',
            data:{
                tour
            }
         });
    }
    catch(err){
        res.status(400).json({
            status:'Failed',
            message: err
        })
    }
};

exports.createTour =async (req,res)=>{
    try{
        const newTour = await Tour.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });
    }
    catch(err){
        res.status(400).json({
            status:'Failed',
            message: err
        })
    };
};

exports.updateTour = async (req,res)=>{
    try{
        const tour = await Tour.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'Success',
            data:{ 
                 tour
            }
        });
    }
    catch(err){
        res.status(400).json({
            status:'Failed',
            message: err
        })
    }
};

exports.deleteTour =async (req,res)=>{
    try{
        await Tour.findByIdAndDelete(req.params.id,);
        res.status(204).json({
            status: 'Success',
            data:null,
        });
    }
    catch(err){
        res.status(400).json({
            status:'Failed',
            message: err
        })
    }
};

exports.getTourStats = async (req,res) => {
    try{
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
            {
                $match :  { _id :{ $ne : 'EASY'}}
            }
        ]);
        res.status(200).json({
            status: 'Success',
            data:{ 
                stats
            }
        });
    }
    catch(err){
        res.status(400).json({
            status:'Failed',
            message: err.message
        })     
    }
};
exports.getMonthlyPlan = async (req,res) =>{
    try{
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
    }
    catch(err){
        res.status(400).json({
            status:'Failed',
            message: err
        })     
    }
}