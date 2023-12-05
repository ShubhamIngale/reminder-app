const mongoose = require("mongoose");

var reminderSchema = new mongoose.Schema({
        title: {
                type : String
        },
        description: {
                type: String
        },
        date: {
                type: Date
        },
        notified: {
                type: Boolean
        },
        user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
        }
}, {timestamps: true});

module.exports = mongoose.model("reminder", reminderSchema);