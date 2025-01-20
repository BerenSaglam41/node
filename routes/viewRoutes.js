const express = require('express');
const router = express.Router();
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');

router.get('/',viewController.getoverView);
router.get('/tours/:slug',authController.protect,viewController.getTour);
router.get('/login',viewController.getLoginForm);

module.exports = router;