const AppError = require('../utils/appError');

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
};

const handleDuplicateFieldsDB = err => {
    const message = `Duplicate field value: "${err.keyValue.name}". Please use another value!`;
    return new AppError(message, 400);
};

const handleValidationErrorDb = err => {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
};

const handleJWTError = () => new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = () => new AppError('Your token has expired! Please log in again!', 401);

const sendErrorDev = (err,req,res) => {
    if(req.originalUrl.startsWith('/api')){
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    }else{
        res.status(err.statusCode).render('error',{
            title : 'Something went wrong!',
            msg : err.message
        })
    }
};

const sendErrorProd = (err, req, res) => {
    const statusCode = err.statusCode || 500; // Varsayılan hata kodu
    const status = err.status || 'error'; // Varsayılan durum

    // API hataları
    if (req.originalUrl.startsWith('/api')) {
        if (err.isOperational) {
            return res.status(statusCode).json({
                status: status,
                message: err.message,
            });
        } else {
            // Bilinmeyen hata
            return res.status(500).json({
                status: 'error',
                message: 'Something went wrong!',
            });
        }
    }

    // Normal HTML hataları
    if (err.isOperational) {
        return res.status(statusCode).render('error', {
            title: 'Something went wrong!',
            msg: err.message,
        });
    } else {
        // Bilinmeyen hata
        return res.status(500).render('error', {
            title: 'Something went wrong!',
            msg: 'Please try again later.',
        });
    }
};


module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV.trim() === 'development') {
        sendErrorDev(err,req,res);
    } else if (process.env.NODE_ENV.trim() === 'production') {
        let error = { ...err };
        error.message = err.message;
        error.name = err.name;
        error.code = err.code;
        error.keyValue = err.keyValue;

        if (err.name === 'CastError') error = handleCastErrorDB(error);
        if (err.code === 11000) error = handleDuplicateFieldsDB(error);
        if (err.name === 'ValidationError') error = handleValidationErrorDb(error);
        if (err.name === 'JsonWebTokenError') error = handleJWTError();
        if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();

        sendErrorProd(error,req,res);
    }
};