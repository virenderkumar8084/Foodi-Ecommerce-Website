const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentSchema = new Schema({
    transactionId: {
        type: String
    },
    email: {
        type: String,
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number
    },
    status: {
        type: String
    },
    itemName: {
        type: Array
    },
    cartItems: {
        type: Array
    },
    menuItems: {
        type: Array,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;