const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [
            true,
            "There must be a username!"
        ],
        minlength: [3, 'Username must be at least 3 characters']
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+[\.]+[a-zA-Z]{2,}$/, "Must be a valid email!"]
    },
    showpass: {type:Boolean},
    passwords: [String]
})

const ReviewSchema = new mongoose.Schema({
    sentby: String,
    message: {
        type: String,
        required: [
            true,
            "Please try to make your review as helpful as possible for others"
        ]
    },
    sentat: Date
})

const PasswordSchema = new mongoose.Schema({
    ownedby: String,
    website: String,
    password: String
})

const User = mongoose.model("User", UserSchema);
const Review = mongoose.model("Review", ReviewSchema);
const Passwords = mongoose.model("Passwords", PasswordSchema);

module.exports.User = User;
module.exports.Review = Review
module.exports.Passwords = Passwords;
