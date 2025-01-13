const express = require('express');
const app = express();
// for security
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
// **
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const appError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController')
// ***********************************


// 1)       GLOBAL Middlewares

// for limit server requests for attacks.
const limiter = rateLimit({
    max : 100,
    windowMs : 60 * 60 * 1000,
    message : 'Too many requests from this IP , please try again in a hour!'
});
app.use('/api',limiter);

// Set Security HTTP headers
app.use(helmet());

// DATA sanitization against NoSQL query injection

// DATA sanitization against XSS



// Body parser , reading data from body into req.body
app.use(express.json({
    limit : '10kb'
}));

// for devolopment login
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

//  serve static files such as HTML, CSS, JavaScript, images, and other assets from the /public directory.
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