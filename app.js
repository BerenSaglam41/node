const express = require('express');
const app = express();
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const appError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController')

// 1)GLOBAL Middlewares
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}
// for limit server requests for attacks.
const limiter = rateLimit({
    max : 100,
    windowMs : 60 * 60 * 1000,
    message : 'Too many requests from this IP , please try again in a hour!'
});
app.use('/api',limiter);
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    // console.log(req.headers);
    next();    
});

// 3) Routes
app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);
app.all('*',(req,res,next)=>{
    next(new appError(`Can't find ${req.originalUrl} on this server`,404));
});

app.use(globalErrorHandler);

// 4) Export app for the server.js to use 

module.exports = app;