const express = require("express");
const Complaint = require("../models/Complaint");
const Comment = require("../models/Comment");
const router = express.Router();

// Get all comments for a complaint
router.get("/:complaintId", async (req, res) => {
    try {
        const comments = await Comment.find({ complaintId: req.params.complaintId }).sort({ createdAt: -1 });
        res.json(comments);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// Post a new comment
router.post("/", async (req, res) => {
    try {
        const { complaintId, text } = req.body;
        if (!text) return res.status(400).json({ error: "Comment text is required" });

        const newComment = new Comment({ complaintId, text });
        await newComment.save();

        await Complaint.findByIdAndUpdate(complaintId, { $push: { comments: newComment._id } });

        res.status(201).json({ message: "Comment added successfully" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
