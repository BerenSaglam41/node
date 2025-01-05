const Tour = require('./../models/tourModel');

exports.getAllTours = (req,res)=>{
    res.status(200).json({
       status: 'Succes',
    //    results : tours.length,
    //    requestedAt : req.requestTime,
    //    data:{
    //        tours
    //    }
    });
};
exports.getTour = (req,res)=>{
    const id = req.params.id * 1;
    // const tour = tours.find(el => el.id === id);

    // // İstenilen turu geri döndürür
    // res.status(200).json({
    //    status: 'Success',
    //    data:{
    //        tour
    //    }
    // });
};
exports.createTour =async (req,res)=>{
    try{
                // const newTour = new Tour({ });
        // newTour.save();

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
            message: 'Invalid data sent!'
        })
    };
};
//selam
exports.updateTour = (req,res)=>{

    res.status(200).json({
        status: 'Success',
        data:{ 
            // tour : '<Updated tour here>'
        }
    })
};

exports.deleteTour = (req,res)=>{
    
    res.status(204).json({
        status: 'Success',
        data:null
    })
};