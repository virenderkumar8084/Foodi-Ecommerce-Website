const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create Schema Object for Menu Items
const menuSchema = new Schema({
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
    createdAt: {
        type: Date, 
        default: Date.now
    }
});

// Create Model from the Schema
const Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;