const express = require("express");
const cors = require("cors")
const app = express();
var cron = require('node-cron');
const Reminder = require("./models/reminderModal");
const mailer = require("./utils/mailer");

const PORT = process.env.PORT || 3001;

const getReminders = () => {
        let newArr = [];
        let dt1 = new Date();
        Reminder.find({
                $and: [
                        { date:  new Date(dt1.getTime() + 19800000).toISOString().split('T')[0] },
                        { notified: false}
                      ],
        })
        .then((data) => {
                newArr = data;
                data?.map(item => (
                        mailer(["singale864@gmail.com"], item)
                ))
        })
        .then(() => {
                if(newArr?.length) {
                        Reminder.updateMany({
                                $and: [
                                        { date:  new Date(dt1.getTime() + 19800000) },
                                        { notified: false}
                                      ],
                        }, {$set: {notified: true}})
                        .then(data => console.log(data))
                        .catch(err => console.log({success: false, message: "Error occured", data: err}))
                }
        })
        .catch(err => console.log({success: false, message: "Error occured", data: err}))
}

// cron
// cron.schedule("00 00 09 * * *", () => {
//         getReminders();
// });
cron.schedule("*/5 * * * * *", () => {
        getReminders();
        // console.log("fsogfjd")
});
      

// dotenv
require('dotenv').config()

// cors
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// DB connect
require('./config/db');

// base app link
app.get("/api", (req, res) => {
        res.status(200).json({success: true, message: "Hey there! Reminder server is up and running!!"});
});

// reminder links
app.use("/api/reminders", require("./routes/reminderRoutes"));

// user links
app.use("/api/users", require("./routes/userRoutes"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));