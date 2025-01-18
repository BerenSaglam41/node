const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');


exports.deleteOne = Model => catchAsync(async (req,res,next)=>{
    const doc = await Model.findByIdAndDelete(req.params.id,);
    if(!doc){
        return next(new appError(`No document found with that ID`,404));
    }
    res.status(204).json({
        status: 'Success',
        data:null,
    });
});

exports.updateOne = Model =>catchAsync( async (req,res,next)=>{
    const doc = await Model.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        // runvalidators true olursa schema'daki validasyonlar çalışır
        runValidators: true
    });
    if(!doc){
        return next(new appError('No document found with that ID',404));
    }
    res.status(200).json({
        status: 'Success',
        data:{ 
           data : doc
        }
    });   
});
exports.createoOne = Model =>  catchAsync(async (req,res,next)=>{
    const doc = await Model.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            data: doc
        }
    });
});
exports.getOne = (Model,popOptions) => catchAsync(async (req,res,next)=>{
    let query = Model.findById(req.params.id);
    if(popOptions) query = query.populate(popOptions);
    const doc = await query;
    
    if(!doc){
        return next(new appError('No document found with that ID',404));
    }
    res.status(200).json({
        status: 'Success',
        data:{
            data : doc
        }
    });
});