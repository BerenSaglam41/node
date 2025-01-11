const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,'Please tell us your name'],
    },
    email : {
        type : String,
        required : [true,'Please provide your email'],
        unique : true,
        lowercase : true,
        validate : [validator.isEmail,'Please provide a valid email']
    },
    photo : {
        type : String
    },
    password : {
        type : String,
        required : [true,'Please provide a password'],
        minlength : 8
    },
    passwordConfirm: {
        type : String,
        required : [true,'Please confirm your password'],
        validate : {
                // THis is only works on CREATE and SAVE!!!
            validator : function(el){
                return el === this.password; // if passwordConfirm is equal to password return true
            },
            message : 'Passwords are not the same!'
        }
    }
});

userSchema.pre('save',function(next){
    if(!this.isModified('password')) return next();
    else{

    }
});

const User = mongoose.model('User',userSchema);
module.exports = User;