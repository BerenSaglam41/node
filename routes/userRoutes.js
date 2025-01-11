const express = require('express');
const router = express.Router();
const userControllers = require('./../controllers/userController');
const authController = require('./../controllers/authController');


router.route('/login').post(authController.login);
router.route('/signup').post(authController.signup);
router.route('/').get(userControllers.getAllUsers).post(userControllers.createUser);
router.route('/:id').get(userControllers.getUser).patch(userControllers.updateUser).delete(userControllers.deleteUser);

module.exports = router;