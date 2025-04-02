const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema({
    text: { type: String, required: true },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    email: { type: String, required: true }, // Add email field
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Complaint", ComplaintSchema);
