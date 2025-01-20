const express = require('express');
const router = express.Router();
const viewController = require('./../controllers/viewController');


router.get('/',viewController.getoverView);
router.get('/tours/:slug',viewController.getTour);
router.get('/login',viewController.getLoginForm);

module.exports = router;