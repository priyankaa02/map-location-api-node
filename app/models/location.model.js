const mongoose = require('mongoose');

const LocationSchema = mongoose.Schema({
    location: String,
    lat: String,
    lng: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Location', LocationSchema);
