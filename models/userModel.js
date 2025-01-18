const mongoose = require('mongoose');
const validator = require('validator');
const bcrpyt = require('bcryptjs');
const crypto = require('crypto');

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
    role : {
        type : String,
        enum : ['user','guide','lead-guide','admin'],
        default : 'user',
        message : 'Role is either : user, guide, lead-guide, admin'
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
    },
    passwordResetToken : String,
    passwordResetExpires : Date,
    active : {
        type : Boolean,
        default : true,
        select : false
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

// If password is changed, then passwordChangedAt field is updated
userSchema.pre('save',function(next){
    if(!this.isModified('password') || this.isNew) return next();
    this.passwordChangedAt = Date.now() - 1000;
    next();
});

// for When we find anything that code block to not active users.
userSchema.pre(/^find/,function(next){
    // this points to the current query
    this.find({active : {$ne : false}});
    next();
});

// This code checks is that password is true to current password
userSchema.methods.correctPassword = async function(candidatePassword,userPassword){
    return await bcrpyt.compare(candidatePassword,userPassword);
}

// This is for check to Token expire time
userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
    if(this.passwordChangedAt){
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000);
        return JWTTimestamp < changedTimestamp;
    }
    return false;
};

// When we create new pass this code changes tokens
userSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex');  
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    console.log({resetToken},this.passwordResetToken);
    this.passwordResetExpires = Date.now() + 10*60*1000;
    return resetToken;
};

const User = mongoose.model('User',userSchema);
module.exports = User;