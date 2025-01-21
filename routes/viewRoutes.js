const express = require('express');
const router = express.Router();
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');


router.get('/',authController.isLoggedin,viewController.getoverView);
router.get('/tours/:slug',authController.isLoggedin,viewController.getTour);
router.get('/login',authController.isLoggedin,viewController.getLoginForm);
router.get('/me',authController.protect,viewController.getAccount);
router.post('/submit-user-data',authController.protect,viewController.updateUserData);
module.exports = router;