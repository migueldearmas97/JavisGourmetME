const mongoose = require("mongoose")

const { Schema, model } = require('mongoose');

const MenuSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

})

module.exports = model('Menu', MenuSchema);