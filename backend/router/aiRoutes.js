const express = require("express");
const router = express.Router();
const { analyzeSymptoms } = require("../controllers/aiController");
const { authMiddleware, authorizeRoles } = require("../middleware/verifyToken");

// Sirf doctor hi access kar sakay
router.post("/analyze", authMiddleware, authorizeRoles("doctor"), analyzeSymptoms);

module.exports = router;