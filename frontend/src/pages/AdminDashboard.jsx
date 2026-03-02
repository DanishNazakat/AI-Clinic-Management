import { useEffect, useState } from "react";
import API from "../api/axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await API.get("/admin/stats"); // backend API
      setStats(res.data.stats);
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch stats");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div>
          <h4>Total Patients</h4>
          <p>{stats.totalPatients}</p>
        </div>
        <div>
          <h4>Total Doctors</h4>
          <p>{stats.totalDoctors}</p>
        </div>
        <div>
          <h4>Total Prescriptions</h4>
          <p>{stats.totalPrescriptions}</p>
        </div>
        <div>
          <h4>Total Revenue</h4>
          <p>${stats.totalRevenue}</p>
        </div>
        <div>
          <h4>Active Plan</h4>
          <p>{stats.activePlan}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;