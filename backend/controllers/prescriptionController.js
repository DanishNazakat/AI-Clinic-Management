const Prescription = require("../models/prescriptionModel");
const User = require("../models/userModel"); // Ye line add karein agar nahi hai
const Patient = require("../models/patientModel");
// 1. Naya Prescription likhna (Sirf Doctor)
const createPrescription = async (req, res) => {
    try {
        const { patientId, medicines, diagnosis, notes } = req.body;

        const newPrescription = new Prescription({
            patientId,
            doctorId: req.user.id, // Auth middleware se doctor ki ID
            medicines, // Ye array hoga: [{name: 'Panadol', dosage: '1-0-1', duration: '3 days'}]
            diagnosis,
            notes
        });

        await newPrescription.save();
        res.status(201).json({ success: true, message: "Prescription saved!", data: newPrescription });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// 2. Patient ki saari purani history (Timeline ke liye)
// Get History Function
const getPatientHistory = async (req, res) => {
    try {
        const { patientId } = req.params;

        // Populate karte waqt model ka naam wahi dein jo User schema mein define kiya hai
        const history = await Prescription.find({ patientId })
            .populate({
                path: 'doctorId',
                model: 'User', // <--- Explicitly model name batayein
                select: 'fname email role' // Sirf zaroori fields uthayein
            })
            .populate('patientId');
        
        if (!history || history.length === 0) {
            return res.status(404).json({ success: false, message: "No history found for this patient" });
        }

        res.status(200).json({ success: true, history });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = { createPrescription, getPatientHistory };