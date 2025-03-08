const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.post('/MyProfile', async (req, res) => {
    try {
        let data = await User.findOne({ 'email': req.body.email })
        // console.log(mydata)
        res.json({ mydata: data })  // sending the found data in the 'mydata' key
    } catch (error) {
        res.send("server error", error.message)  // This won't work properly. You need to use res.status() for error handling.
    }
})

module.exports = router;