const dotenv = require('dotenv');
dotenv.config({ path: './config.env' }); // Doğru format
const app = require('./app');
const mongoose = require('mongoose');

// db ile sunucuya bağlancağımız linki ayarlamak. config.env de yazan bilgiler ile
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {
}).then(()=>console.log('Db connection successful')).catch(err => {
    console.error('Db connection error:', err);
});


const port = process.env.PORT || 3001;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});

