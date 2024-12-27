const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    image: { type: String, required: true },
    price: { type: Number, required: true },
    name: { type: String, required: true },
    owner: { type: String, required: true },
    city: { type: String, required: true },
    type: { type: String, required: true, enum: ["Flat", "Bungalow", "Residential Land", "Commercial Land", "Shop"] },
}, { timestamps: true });

const PropertyModel = mongoose.model('Property', PropertySchema);

module.exports = PropertyModel;
