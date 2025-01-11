const mongoose = require('mongoose');
const validator = require('validator');
const bcrpyt = require('bcryptjs');

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
        minlength : 8,
        select : false   // It makes password hidden in the output
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
    },
    passwordChangedAt : {
        type : Date
    }
});

userSchema.pre('save',async function(next){
        // Only run this function if password was actually modified
    if(!this.isModified('password')) return next();
        // this code makes password hashed
    this.password =await bcrpyt.hash(this.password,12);
        // Delete passwordConfirm field
    this.passwordConfirm = undefined;

    next();
});

userSchema.methods.correctPassword = async function(candidatePassword,userPassword){
    return await bcrpyt.compare(candidatePassword,userPassword);
}

userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
    console.log(this.passwordChangedAt);
    if(this.passwordChangedAt){
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000);
        return JWTTimestamp < changedTimestamp;
    }
    return false;
};

const User = mongoose.model('User',userSchema);
module.exports = User;