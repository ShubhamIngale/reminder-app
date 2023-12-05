const express = require("express");
const router = express.Router();
const reminderController = require("../controllers/reminderController");
const tokenCheck = require("../middlewares/tokenCheck");

// create reminder
router.post('/create', tokenCheck, reminderController.createReminder)

// get reminders
router.get('/', tokenCheck, reminderController.getReminders);

module.exports = router