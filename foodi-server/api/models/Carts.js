const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
    menuItemId: {
        type: String
    },
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 3
    },
    recipe: {
        type: String
    },
    image: {
        type: String
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number
    },
    email: {
        type: String,
        true: true,
        required: true
    },
    price: {
        type: Number
    }
})

const Carts = mongoose.model("Cart", cartSchema);
module.exports = Carts;