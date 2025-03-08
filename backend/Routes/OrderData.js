const express = require('express')
const router = express.Router()
const Order = require('../models/Orders')



router.post('/orderData', async (req, res) => {
    // console.log(req.body)
    let data = req.body.order_data
    await data.splice(0, 0, { order_date: req.body.order_date })

    let eid = await Order.findOne({ 'email': req.body.email })
    // console.log(req.body.email);
    if (eid == null) {
        try {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message);
            res.send("server error", error.message)
        }
    }
    else {
        try {
            await Order.findOneAndUpdate({ email: req.body.email },
                { $push: { order_data: data } }).then(() => {
                    res.json({ success: true })
                })
        }
        catch (error) {
            res.send("server error", error.message)
        }
    }
})


// router.post('/MyorderData', async (req, res) => {
//     try {
//         let mydata = await Order.findOne({ 'email': req.body.email })
//         res.send({ orderdata: mydata })
//     } catch (error) {
//         res.send("server error", error.message)
//     }
// })

router.post('/MyorderData', async (req, res) => {
    try {
        let mydata = await Order.findOne({ 'email': req.body.email })
        // console.log(mydata)
        res.json({ orderdata: mydata })  // sending the found data in the 'orderdata' key
    } catch (error) {
        res.send("server error", error.message)  // This won't work properly. You need to use res.status() for error handling.
    }
})

module.exports = router;

// module.exports = router;