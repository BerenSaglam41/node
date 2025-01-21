const express = require('express');
const router = express.Router();
const userControllers = require('./../controllers/userController');
const authController = require('./../controllers/authController');

router.route('/login')
    .post(authController.login);
router.get('/logout',authController.logout);
router.route('/signup')
    .post(authController.signup);
router.route('/forgotPassword')
    .post(authController.forgotPassword);
router.route('/resetPassword/:token')
    .patch(authController.resetPassword);

    // PROTECT ALL ROUTES AFTER THIS
router.use(authController.protect);

router.get('/me',
    userControllers.getMe,
    userControllers.getUser);
router.route('/deleteMe')
    .delete(userControllers.deleteMe);
router.route('/updateMe')
    .patch(userControllers.uploadUserPhoto,userControllers.resizeUserPhoto,userControllers.updateMe)
router.route('/updateMyPassword')
    .patch(authController.updatePassword);

    // AFTER THIS CODE ONLY FOR ADMINS
router.use(authController.restrictTo('admin'));

router.route('/')
    .get(userControllers.getAllUsers)
    .post(userControllers.createUser);
router.route('/:id')
    .get(userControllers.getUser)
    .patch(userControllers.updateUser);


module.exports = router;