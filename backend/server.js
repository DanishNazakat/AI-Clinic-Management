const express = require('express');
const cookieParser = require("cookie-parser")
const cors = require('cors')
// const authMiddleware = require("./middleware/verifyToken")
const patientRoutes = require("./router/patientRoutes");
const prescriptionRoutes = require("./router/prescriptionRoutes");
const adminRoutes = require("./router/adminRoutes");
const aiRoutes = require("./router/aiRoutes");
require("dotenv").config();
const dbConnection = require('./db/dbconnection')
const app = express();
const router = require('./router/route');
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use('/api' , router)
app.use("/api/patients", patientRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/ai", aiRoutes);
// app.use(authMiddleware);
dbConnection();
app.listen(process.env.PORT, ()=>{
    console.log(`server is running on PORT ${process.env.PORT}`);
})

