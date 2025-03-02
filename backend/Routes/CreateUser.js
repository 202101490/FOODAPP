const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const jwtsecret="Mynameisvimal&mysurnameissonagara"

router.post("/createuser", [
    body('email', "Incorrect Email").isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', "Incorrect password").isLength({ min: 5 })
],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt=await bcrypt.genSalt(10);
        let secpassword=await bcrypt.hash(req.body.password,salt);
        try {
            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secpassword,
                location: req.body.location
            })

            res.json({ success: true });
        }
        catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })

router.post("/loginuser", [
    body('email', "Incorrect Email").isEmail(),
    body('password', "Incorrect password").isLength({ min: 5 })
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let email = req.body.email;
        try {
            let userdata = await User.findOne({email})

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
    })



    
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

//         try {
//             await User.create({
//                 name: req.body.name,
//                 email: req.body.email,
//                 password: req.body.password,
//                 location: req.body.location
//             })

//             res.json({ success: true });
//         }
//         catch (error) {
//             console.log(error);
//             res.json({ success: false });
//         }
//     })

module.exports = router;