const express = require('express');
const authController = require('./../controllers/authController');

const userRouter = express.Router();

userRouter.route('/flogin').post(authController.facebookLogin);
// userRouter.route('/glogin').post(authController.googleLogin);

module.exports = userRouter;
