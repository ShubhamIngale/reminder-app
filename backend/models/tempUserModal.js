const mongoose = require("mongoose");

var tempUserSchema = new mongoose.Schema({
        name: String,
        email: {
                type: String,
                unique: true
        },
        otp: {
                code: Number,
                expireIn: Number
        }
}, {timestamps: true});

module.exports = mongoose.model("tempUser", tempUserSchema);