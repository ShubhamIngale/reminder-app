const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
        name: String,
        email: {
                type: String,
                unique: true
        },
        otp: {
                code: Number,
                expireIn: Number
        },
        reminders: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "reminder"
        }]
}, {timestamps: true});

module.exports = mongoose.model("user", userSchema);