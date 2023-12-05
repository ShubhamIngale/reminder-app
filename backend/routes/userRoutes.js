const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// registration otp
router.post('/registration-otp', userController.registrationOtp);

// login otp
router.post('/login-otp', userController.loginOtp);

// create reminder
router.post('/create', userController.createUser);

// login
router.post('/login', userController.loginUser);

// get reminders
router.get('/', userController.getUsers);

module.exports = router