const mongoose = require('mongoose');
const { Schema } = mongoose

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    completedRegistration: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    },
})

const UserModel = mongoose.model("User", userSchema)

module.exports = UserModel