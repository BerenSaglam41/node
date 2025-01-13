const express = require('express');
const router = express.Router();
const userControllers = require('./../controllers/userController');
const authController = require('./../controllers/authController');

router.route('/updateMyPassword')
    .patch(authController.protect, authController.updatePassword);
router.route('/login')
    .post(authController.login);
router.route('/signup')
    .post(authController.signup);
router.route('/forgotPassword')
    .post(authController.forgotPassword);
router.route('/resetPassword/:token')
    .patch(authController.resetPassword);
router.route('/')
    .get(userControllers.getAllUsers)
    .post(userControllers.createUser);
router.route('/:id')
    .get(userControllers.getUser)
    .patch(userControllers.updateUser)
    .delete(userControllers.deleteUser);

module.exports = router;