import { useEffect, useState } from "react";
import API from "../api/axios";

const DoctorDashboard = () => {
  const [patients, setPatients] = useState([]);

  const fetchPatients = async () => {
    try {
      const res = await API.get("/patients"); // backend endpoint
      setPatients(res.data.patients);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch patients");
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Doctor Dashboard</h2>
      <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Email</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p._id}>
              <td>{p.fname}</td>
              <td>{p.email}</td>
              <td>{p.contact || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorDashboard;