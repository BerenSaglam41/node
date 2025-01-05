const mongoose = require('mongoose');

// turlar için klasik belirlenen şemayı hazırla
const tourSchema = new mongoose.Schema({
    name : {
        type: String,
        required : [true,'A tour must have a name'],
        unique : true
    },
    rating : {
        type: Number,
        default : 4.5
    },
    price : {
        type:Number,
        required : [true,'A tour must have a price']
    }
});

// turlar için hazırlanan şemayı Tour adında bi model oluşturup ona kaydet
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;