const Reminder = require("../models/reminderModal");
const User = require("../models/userModal");

const createReminder = (req, res) => {
        Reminder.create({
                title: req.body.title,
                description: req.body.description,
                date: req.body.date,
                notified: false,
                user: req.user.id
        })
        .then(data => {

                User.updateOne({_id: req.user.id}, {
                        $push: { reminders: data }
                })
                .then((dataTwo) => res.json({success: true, message: "Reminder created", data}))
                .catch(err => res.json({success: false, message: "Error occured", data: err}))
        })
        .catch(err => res.json({success: false, message: "Error occured", data: err}))
}

const getReminders = (req, res) => {
        Reminder.find({'user': req.user.id})
        // .populate({path: 'user', select: "-otp -reminders"})
        .then((data) => res.json({success: true, message: "Reminders", data}))
        .catch(err => res.json({success: false, message: "Error occured", data: err}))
}

module.exports = {getReminders, createReminder}