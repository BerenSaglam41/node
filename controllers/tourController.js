const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');

exports.aliasTopTours = async (req,res,next) =>{
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,difficulty,'
    next();
};

exports.getAllTours =async (req,res)=>{
    try{
        // APIFeatures in utils doc with codes
        // EXECUTE Query
        const features = new APIFeatures(Tour.find(),req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
        const tours =await features.query;
    // Outputs.
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