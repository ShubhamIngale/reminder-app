const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_LINK;

mongoose.set('strictQuery', true).connect(mongoURI)
.then(() => {
        console.log("Connected to DB");
})
.catch(err => {
        console.log(err);
});

module.exports = mongoose;