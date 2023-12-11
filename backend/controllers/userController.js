const User = require("../models/userModal");
const TempUser = require("../models/tempUserModal");
const jwt = require("jsonwebtoken");
const otpMailer = require("../utils/otpMailer");

const createUser = async (req, res) => {
        let tempUser = await TempUser.findOne({'email': req.body.email, 'otp.code': req.body.otp_code});

        if(!tempUser) {
                return res.status(301).json({success: false, message: 'No OTP Found'})
        }
        if(tempUser) {
                let currentTime = new Date().getTime()
                let diff = tempUser.otp.expireIn - currentTime;

                if(diff < 0) {
                        return res.json({success: false, message: "OTP expired"});
                }

                User.create({
                        name: tempUser?.name,
                        email: tempUser?.email,
                        'otp.code': tempUser?.otp?.code,
                        'otp.expireIn': tempUser?.otp?.expireIn,
                        reminders: []
                })
                .then(data => {
                        let resData = {
                                id: data?._id,
                                name: data?.name,
                                email: data?.email,
                                reminders: data?.reminders
                        }

                        const authToken = jwt.sign(resData, process.env.JWT_SECRET);

                        res.json({success: true, message: "User created successfully", authToken})
                })
                .catch(err => res.json({success: false, message: "Error occured", data: err}))
        }
}

const registrationOtp = async (req, res) => {
        let existingUser = await User.findOne({'email': req.body.email});

        if(existingUser) {
                return res.status(400).json({success: false, message: "User with entered email id already existing"})
        }
        else {
                TempUser.create({
                        name: req.body.name,
                        email: req.body.email,
                        'otp.code': Math.floor((Math.random()*10000) + 1),
                        'otp.expireIn': new Date().getTime() + 600000
                })
                .then(data => {
                        otpMailer(data);
                        res.json({success: true, message: "OTP sent on provided email id"});
                })
                .catch(err => res.json({success: false, message: "Error occured", data: err}))
        }
}

const loginOtp = async (req, res) => {
        let existingUser = await User.findOne({'email': req.body.email});

        if(!existingUser) {
                return res.status(400).json({success: false, message: "User with entered email id is not present"})
        }
        else {
                User.updateOne({email: req.body.email}, {
                        'otp.code': Math.floor((Math.random()*10000) + 1),
                        'otp.expireIn': new Date().getTime() + 600000
                }, { returnOriginal: false },)
                .then(async (data) => {
                        let updatedData = await User.findOne({'email': req.body.email});
                        otpMailer(updatedData);
                        res.json({success: true, message: "OTP sent on provided email id"});
                })
                .catch(err => res.json({success: false, message: "Error occured", data: err}))
        }
}

const loginUser = async (req, res) => {
        let user = await User.findOne({'email': req.body.email, 'otp.code': req.body.otp_code}).populate({path: 'reminders', select: "-user"});

        if(!user) {
                return res.status(301).json({success: false, message: 'No OTP Found'})
        }
        if(user) {
                let currentTime = new Date().getTime();
                let diff = user.otp.expireIn - currentTime;

                if(diff < 0) {
                        return res.json({success: false, message: "OTP expired"});
                } 

                let resData = {
                        id: user?._id,
                        name: user?.name,
                        email: user?.email,
                        reminders: user?.reminders
                }

                const authToken = jwt.sign(resData, process.env.JWT_SECRET);

                res.json({success: true, message: "User logged in successfully", authToken})
        }
}

const getUsers = (req, res) => {
        User.find()
        .populate({path: 'reminders', select: "-user"})
        .then((data) => res.json({success: true, message: "Users", data}))
        .catch(err => res.json({success: false, message: "Error occured", data: err}))
}

module.exports = {createUser, registrationOtp, getUsers, loginOtp, loginUser}