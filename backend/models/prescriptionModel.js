const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient", // Patient model se link
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // User model mein doctor se link
        required: true
    },
    diagnosis: {
        type: String,
        required: true,
        trim: true
    },
    medicines: [
        {
            name: { type: String, required: true },
            dosage: { type: String, required: true }, // e.g., "1-0-1" ya "Morning/Night"
            duration: { type: String, required: true }, // e.g., "5 days"
            instructions: { type: String } // e.g., "After meal"
        }
    ],
    notes: {
        type: String,
        trim: true
    },
    // AI analysis result save karne ke liye (Optionally)
    aiExplanation: {
        type: String
    }
}, { timestamps: true });

// Indexing for faster history lookup
prescriptionSchema.index({ patientId: 1 });
prescriptionSchema.index({ doctorId: 1 });

module.exports = mongoose.model("Prescription", prescriptionSchema);