const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: String,
    startDate: Date,
    endDate: Date
});

module.exports = mongoose.model('Event', eventSchema);
