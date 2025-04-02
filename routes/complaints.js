const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");

// Submit a new complaint
router.post("/", async (req, res) => {
    try {
        const { text, email } = req.body;
        if (!email) {
            return res.status(400).json({ error: "Email is required!" });
        }

        const newComplaint = new Complaint({ 
            text: text,
            email: email // Store email
        });

        await newComplaint.save();
        res.json(newComplaint);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Fetch all complaints
router.get("/", async (req, res) => {
    try {
        const complaints = await Complaint.find().sort({ createdAt: -1 }); // Latest first
        res.json(complaints);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Handle upvotes and downvotes
router.post("/vote", async (req, res) => {
    const { complaintId, type } = req.body;
    try {
        const complaint = await Complaint.findById(complaintId);
        if (!complaint) return res.status(404).json({ error: "Complaint not found" });

        if (type === "up") {
            complaint.upvotes += 1;
        } else if (type === "down") {
            complaint.downvotes += 1;
        }

        await complaint.save();
        res.json({ success: true, upvotes: complaint.upvotes, downvotes: complaint.downvotes });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
