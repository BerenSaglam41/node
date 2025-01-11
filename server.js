

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' }); // Doğru format
const app = require('./app');
const mongoose = require('mongoose');

// db ile sunucuya bağlancağımız linki ayarlamak. config.env de yazan bilgiler ile
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {
}).then(()=>console.log('Db connection successful'));


const port = process.env.PORT || 3001;
const server = app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});

process.on('uncaughtException',err=>{
    console.log('Uncaught Exception! Shutting down...');    
    console.log(err.name , err.message);
    server.close(() =>{
        process.exit(1);
    });
});

process.on('unhandledRejection',err=>{
    console.log('UNHANDLED REJECTION! Shutting down...');    
    console.log(err.name , err.message);
    server.close(() =>{
        process.exit(1);
    });
});


