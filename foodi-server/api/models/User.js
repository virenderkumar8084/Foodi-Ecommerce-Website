const mongoose = require("mongoose");
const { Schema } = mongoose;

// Create Schema Object for User
const userSchema = new Schema({
	name: {
		type: String,
	},
	email: {
		type: String,
		trim: true,
		minlength: 3,
	},
	photoURL: {
		type: String,
	},
	role: {
		type: String,
		enum: ["user", "admin"],
		default: "user",
	},
});

// Create Model from the Schema
const User = mongoose.model("User", userSchema);
module.exports = User;
