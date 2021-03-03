const mongoose = require("mongoose")

const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    }
})

module.exports = model('User', UserSchema);