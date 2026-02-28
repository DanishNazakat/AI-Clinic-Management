const Patient = require("../models/patientModel");

// 1. Naya Patient Add karna (Sirf Receptionist ya Admin)
const addPatient = async (req, res) => {
    try {
        const { name, age, gender, contact } = req.body;

        const newPatient = new Patient({
            name,
            age,
            gender,
            contact,
            createdBy: req.user.id // Token se doctor/receptionist ki ID nikal li
        });

        await newPatient.save();
        res.status(201).json({ success: true, message: "Patient Registered Successfully", data: newPatient });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// 2. Saare Patients dekhna
const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).json({ success: true, patients });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = { addPatient, getAllPatients };