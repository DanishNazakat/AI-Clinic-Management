const express = require("express");
const router = express.Router();
const { createPrescription, getPatientHistory } = require("../controllers/prescriptionController");
const { authMiddleware, authorizeRoles } = require("../middleware/verifyToken");

// Sirf Doctor prescription likh sakta hai
router.post("/create", authMiddleware, authorizeRoles("doctor"), createPrescription);

// Doctor, Patient aur Receptionist history dekh sakte hain
router.get("/history/:patientId", authMiddleware, authorizeRoles("doctor", "patient", "receptionist"), getPatientHistory);

module.exports = router;