const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
const Tour =  require('./../../models/tourModel');
dotenv.config({ path: './../../config.env' }); // Doğru format

// db ile sunucuya bağlancağımız linki ayarlamak. config.env de yazan bilgiler ile
const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
}).then(()=>console.log('Db connection successful')).catch(err => {
    console.error('Db connection error:', err);
});

// Json dosyalarını okuma
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

// import data to db
const importData = async() =>{
    try{
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
        await Tour.deleteMany()
        console.log('Data imported successfully');
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

