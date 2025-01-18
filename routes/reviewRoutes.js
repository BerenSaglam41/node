const express = require('express');
const reviewControllers = require('../controllers/reviewController');
const router = express.Router({ mergeParams : true});
const authController = require('../controllers/authController');

router.use(authController.protect);

router.route('/')
    .get(reviewControllers.getAllReviews)
    .post(
        authController.restrictTo('user'),
        reviewControllers.setTourReviewIds,
        reviewControllers.createReview
    );

router.route('/:id')
        .delete(reviewControllers.deleteReview)
        .patch(authController.restrictTo('user','admin'),reviewControllers.updateReview)
        .get(authController.restrictTo('user','admin'),reviewControllers.getReview); 
module.exports = router;