const express = require("express");
const router = express.Router();

// Controllers import karein
const { addPatient, getAllPatients } = require("../controllers/patientController");

// Auth Middlewares import karein
const { authMiddleware, authorizeRoles } = require("../middleware/verifyToken");

// Route: Naya patient add karna (Sirf Admin aur Receptionist allow hain)
router.post("/add", authMiddleware, authorizeRoles("admin", "receptionist"), addPatient);

// Route: Patients ki list dekhna (Admin, Doctor, aur Receptionist dekh saktay hain)
router.get("/all", authMiddleware, authorizeRoles("admin", "doctor", "receptionist"), getAllPatients);

module.exports = router;