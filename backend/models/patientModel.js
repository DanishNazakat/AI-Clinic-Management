const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
name: {
type: String,
required: true,
trim: true
},
age: {
type: Number,
required: true
},
gender: {
type: String,
enum: ['Male', 'Female', 'Other'],
required: true
},
contact: {
type: String,
required: true
},
address: {
type: String
},
medicalHistory: {
type: String
},
createdBy: {
type: mongoose.Schema.Types.ObjectId,
ref: 'EcoUser',
required: true
}
}, { timestamps: true });

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;