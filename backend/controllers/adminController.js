const User = require("../models/userModel");
const Patient = require("../models/patientModel");
const Prescription = require("../models/prescriptionModel");

const getDashboardStats = async (req, res) => {
    try {
        // Ek saath saare counts nikalne ke liye Promise.all use karenge (Fast Performance)
        const [totalPatients, totalDoctors, totalPrescriptions] = await Promise.all([
            Patient.countDocuments(),
            User.countDocuments({ role: "doctor" }), // Sirf doctors ka count
            Prescription.countDocuments()
        ]);

        // Simulated Revenue (SaaS Feature)
        const revenue = totalPrescriptions * 500; // Farz karein har checkup ki fees 500 hai

        res.status(200).json({
            success: true,
            stats: {
                totalPatients,
                totalDoctors,
                totalPrescriptions,
                totalRevenue: revenue,
                activePlan: "Pro" // SaaS simulation
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = { getDashboardStats };