const express = require('express');
const reviewControllers = require('../controllers/reviewController');
const router = express.Router({ mergeParams : true});
const authController = require('../controllers/authController');

router.route('/')
    .get(reviewControllers.getAllReviews)
    .post(authController.protect,authController.restrictTo('user'),reviewControllers.createReview);

module.exports = router;