const dotenv = require('dotenv');
dotenv.config({ path: '../../config.env' }); // Dosyanın en başında olmalı

const mongoose = require('mongoose');
const fs = require('fs');
const Tour = require('./../../models/tourModel');
const User = require('./../../models/userModel');
const Review = require('./../../models/reviewModel');

console.log(process.env.DATABASE); // undefined dönerse, yol hatalıdır

// db ile sunucuya bağlancağımız linki ayarlamak. config.env de yazan bilgiler ile
const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
}).then(()=>console.log('Db connection successful')).catch(err => {
    console.error('Db connection error:', err);
});

// Json dosyalarını okuma
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));

// import data to db
const importData = async() =>{
    try{
        await User.create(users,{validateBeforeSave : false});
        await Review.create(reviews)
        await Tour.create(tours)
        console.log('Data imported successfully');
    }
    catch (err){
        console.log(err);
    }
    process.exit();
};

// Hazır olarak Kaydedilmiş koleksiyondakileri silme
const deleteData = async () =>{
    try{
        await Review.deleteMany()
        await User.deleteMany()
        await Tour.deleteMany()
        console.log('Data deleted successfully');
   }
   catch (err){
       console.log(err);
   }
    process.exit();
};

if(process.argv[2] === '--import'){
    importData();
}
else if(process.argv[2] === '--delete'){
    deleteData();
}

