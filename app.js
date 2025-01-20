// ************************Server *******************
const express = require('express');
const app = express();
const path = require('path');
// for security
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
// **
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');
const appError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController')
const hpp = require('hpp');
// ***********************************

app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', 
      "script-src 'self' https://api.mapbox.com; " + // Mapbox'a izin veriyoruz
      "style-src 'self' https://api.mapbox.com; " +  // Mapbox stil dosyalarına da izin veriyoruz
      "img-src 'self' https://api.mapbox.com; " +    // Mapbox resim dosyalarına izin veriyoruz
      "font-src 'self' https://api.mapbox.com; " +   // Mapbox font dosyalarına izin veriyoruz
      "object-src 'none';"
    );
    next();
  });
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));


// 1)       GLOBAL Middlewares

//  serve static files such as HTML, CSS, JavaScript, images, and other assets from the /public directory.
app.use(express.static(path.join(__dirname,'public')));

// This is for use req.body as a json 
app.use(express.json({
    limit : '10kb'
}));

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
app.use(mongoSanitize({
    replaceWith: '', // Potansiyel saldırı karakterlerini alt çizgi ile değiştirir
}));
// This code takes sanitizes mission if it dont work

// DATA sanitization against XSS
app.use(xss());
// PREVEnt parameter pollution
app.use(hpp({
    whitelist : [
        'duration','ratingsQuantity','ratingsAverage','maxGroupSize','difficulty','price'
    ]
}));
// Body parser , reading data from body into req.body

// for devolopment login
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    // console.log(req.headers);
    next();    
});

// 3) Routes
app.use('/',viewRouter);
app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/reviews',reviewRouter);
app.all('*',(req,res,next)=>{
    next(new appError(`Can't find ${req.originalUrl} on this server`,404));
});

app.use(globalErrorHandler);

// 4) Export app for the server.js to use 

module.exports = app;