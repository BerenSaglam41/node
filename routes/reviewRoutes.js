const express = require('express');
const reviewControllers = require('../controllers/reviewController');
const router = express.Router();

router.route('/')
    .get(reviewControllers.getAllReviews)
    .post(reviewControllers.createReviesw);
    
module.exports = router;