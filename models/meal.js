const mongoose = require("mongoose")

const { Schema, model } = require('mongoose');

const MealSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    img: {
        type: String
            // required: true,


    },
    dayOfWeek: {
        type: String,
        required: true,


    },
    ingredients: {
        type: String,
        required: true,
    },
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    menu: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Menu'
    },


})

module.exports = model('Meals', MealSchema);