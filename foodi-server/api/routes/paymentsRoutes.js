const express = require('express');
const mongoose = require('mongoose');
const Payments = require('../models/Payments');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const Cart = require('../models/Carts');
const ObjectId = mongoose.Types.ObjectId;

// post informationto db
router.post('/', verifyToken, async (req, res) => {
    const payment = req.body;
    try {
        const paymentRequest = await Payments.create(payment);

        // delete cart after payment
        const cartIds = payment.cartItems.map(id => new ObjectId(id));
        const deletedCartRequest = await Cart.deleteMany({ _id: {$in: cartIds} });
        res.status(200).json({paymentRequest, deletedCartRequest}); 
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})

router.get('/', verifyToken, async (req, res) => {
    const email = req.query.email;
    const query = { email: email };
    try {   
        const decodedEmail = req.decoded.email;
        if (email != decodedEmail) {
            res.status(403).json({ message: "Forbidden Access" });
        }
        const result = await Payments.find(query).sort({ createdAt: -1 }).exec();
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})
module.exports = router;