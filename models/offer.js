const mongoose = require("mongoose")

const { Schema, model } = require('mongoose');

const OfferSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: String,
        required: true,
    },
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

})

module.exports = model('Offer', OfferSchema);