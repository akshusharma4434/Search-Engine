const mongoose = require("mongoose");

const detailsSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Name is required"] },
    location: { type: String, required: [true, "Location is required"] }
});

const Details = mongoose.model("details", detailsSchema,"details");

module.exports = Details;