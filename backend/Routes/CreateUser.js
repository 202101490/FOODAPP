// const express = require('express')
// const router = express.Router()
// const User = require('../models/User')
// const { body, validationResult } = require('express-validator');
// const bcrypt=require("bcryptjs");

// router.post("/createuser", [
//     body('email', "Incorrect Email").isEmail(),
//     body('name').isLength({ min: 5 }),
//     body('password', "Incorrect password").isLength({ min: 5 })
// ],
//     async (req, res) => {

//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }
//         const salt=await bcrypt.genSalt(10);
//         let secpassword=await bcrypt.hash(req.body.password,salt);
//         try {
//             await User.create({
//                 name: req.body.name,
//                 email: req.body.email,
//                 password: secpassword,
//                 location: req.body.location
//             })

//             res.json({ success: true });
//         }
//         catch (error) {
//             console.log(error);
//             res.json({ success: false });
//         }
//     })

// router.post("/loginuser", [
//     body('email', "Incorrect Email").isEmail(),
//     body('password', "Incorrect password").isLength({ min: 5 })
// ],
//     async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         let email = req.body.email;
//         try {
//             let userdata = await User.findOne({email})

//             if (!userdata) {
//                 return res.status(400).json({ errors: "Enter correct Credentail" });
//             }
//             let validp=await bcrypt.compare(req.body.password,userdata.password)
//             if (!validp) {
//                 return res.status(400).json({ errors: "Enter correct password" });
//             }
//             // console.log(userdata);
//             const data={
//                 user:{
//                     id:userdata.id
//                 }
//             }
//             const authtoken=jwt.sign(data,jwtsecret)
//             return res.json({ success: true ,authtoken:authtoken});
//         }
//         catch (error) {
//             console.log(error);
//             res.json({ success: false ,error});
//         }
//     })



    
// // router.post("/createuser", [
// //     body('email', "Incorrect Email").isEmail(),
// //     body('name').isLength({ min: 5 }),
// //     body('password', "Incorrect password").isLength({ min: 5 })
// // ],
// //     async (req, res) => {

// //         const errors = validationResult(req);
// //         if (!errors.isEmpty()) {
// //             return res.status(400).json({ errors: errors.array() });
// //         }

// //         try {
// //             await User.create({
// //                 name: req.body.name,
// //                 email: req.body.email,
// //                 password: req.body.password,
// //                 location: req.body.location
// //             })

// //             res.json({ success: true });
// //         }
// //         catch (error) {
// //             console.log(error);
// //             res.json({ success: false });
// //         }
// //     })

// module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer'); // Import nodemailer
const jwt=require("jsonwebtoken");
const jwtsecret="Mynameisvimal&mysurnameissonagara"
// Create a simple in-memory store to store OTP temporarily for email verification
let OTPStore = {}; // { email: { otp: string, expiresAt: Date } }
let UserStore = {}; // { email: { name, password, location } }

router.post("/createuser", [
    body('email', "Incorrect Email").isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', "Incorrect password").isLength({ min: 5 }),
    body('location', "Location is required").notEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, name, password, location } = req.body;

    // Check if the user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ success: false, message: 'User with this email already exists' });
    }

    // Store the user data temporarily
    UserStore[email] = { name, password, location };

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP

    // Store OTP and its expiration time (e.g., valid for 10 minutes)
    OTPStore[email] = {
        otp: otp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes expiry
    };

    // Set up nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '202101490@daiict.ac.in', // Your email here
            pass: 'wsvocmrjmgvwbecc'  // Your email password here
        }
    });

    // Send OTP email
    const mailOptions = {
        from: '202101490@daiict.ac.in',
        to: email,
        subject: 'Your OTP for Email Verification',
        text: `Your OTP is: ${otp}. It will expire in 10 minutes.`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'OTP sent to your email' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Failed to send OTP' });
    }
});

router.post("/verifyotp", [
    body('email', "Incorrect Email").isEmail(),
    body('otp', "OTP is required").notEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, otp } = req.body;

    // Check if OTP exists and is not expired
    if (OTPStore[email]) {
        const storedOtp = OTPStore[email].otp;
        const expiresAt = OTPStore[email].expiresAt;

        if (new Date() > expiresAt) {
            // OTP expired
            delete OTPStore[email]; // Clean up expired OTP
            return res.status(400).json({ success: false, message: 'OTP has expired' });
        }

        if (otp === storedOtp.toString()) {
            // OTP is correct, create user
            delete OTPStore[email]; // Clean up used OTP

            const { name, password, location } = UserStore[email];

            const salt = await bcrypt.genSalt(10);
            const secpassword = await bcrypt.hash(password, salt); // Hash the password

            try {
                await User.create({
                    name,
                    email,
                    password: secpassword, // Store hashed password
                    location
                });
                delete UserStore[email]; // Clean up the temporary user data
                res.json({ success: true, message: 'User created successfully' });
            } catch (error) {
                console.log(error);
                res.json({ success: false, message: 'Error creating user' });
            }
        } else {
            res.status(400).json({ success: false, message: 'Invalid OTP' });
        }
    } else {
        res.status(400).json({ success: false, message: 'OTP not found or expired' });
    }
});

module.exports = router;

router.post("/loginuser", [
    body('email', "Incorrect Email").isEmail(),
    body('password', "Incorrect password").isLength({ min: 5 })
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("userdata")
            return res.status(400).json({ errors: errors.array() });
        }

        let email = req.body.email;
        try {
            let userdata = await User.findOne({email})
            // console.log("userdata")
            if (!userdata) {
                return res.status(400).json({ errors: "Enter correct Credentail" });
            }
            let validp=await bcrypt.compare(req.body.password,userdata.password)
            if (!validp) {
                return res.status(400).json({ errors: "Enter correct password" });
            }
            // console.log(userdata);
            const data={
                user:{
                    id:userdata.id
                }
            }
            const authtoken=jwt.sign(data,jwtsecret)
            return res.json({ success: true ,authtoken:authtoken});
        }
        catch (error) {
            console.log(error);
            res.json({ success: false ,error});
        }
    });

module.exports = router;
