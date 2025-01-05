const express = require('express');
const app = express();
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// 1)Middlewares
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// Bundan sonraki fonksiyonlarda bi istek oluşturulursa çalışır.
app.use((req, res, next) => {
    console.log('Helo from the middleware 😊');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();    
});
// 3) Routes
app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);
// 4) Start Server 


module.exports = app;