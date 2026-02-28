const express = require("express");
const router = express.Router();
const { getDashboardStats } = require("../controllers/adminController");
const { authMiddleware, authorizeRoles } = require("../middleware/verifyToken");

// Sirf Admin hi ye stats dekh sakta hai
router.get("/stats", authMiddleware, authorizeRoles("admin"), getDashboardStats);

module.exports = router;