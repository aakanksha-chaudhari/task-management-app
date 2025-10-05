import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [stats, setStats] = useState({ agentsCount: 0, tasksCount: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // If user is not logged in, redirect to login page
      return navigate("/");
    }

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/dashboard/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setStats(response.data))
      .catch((error) => console.error("Error fetching dashboard stats:", error));
  }, [navigate]);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* Sidebar Section */}
      <div
        style={{
          width: "220px",
          backgroundColor: "#2c3e50",
          color: "#ecf0f1",
          padding: "30px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <h3 style={{ textAlign: "center", marginBottom: "30px" }}>Admin Menu</h3>

        <button
          onClick={() => navigate("/add-agent")}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#34495e",
            color: "#ecf0f1",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1abc9c")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#34495e")}
        >
          Add Agent
        </button>

        <button
          onClick={() => navigate("/upload")}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#34495e",
            color: "#ecf0f1",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1abc9c")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#34495e")}
        >
          Upload CSV
        </button>

        <button
          onClick={() => navigate("/view-agents-tasks")}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#34495e",
            color: "#ecf0f1",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1abc9c")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#34495e")}
        >
          View Agents & Tasks
        </button>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: "40px" }}>
        <h2 style={{ marginBottom: "30px", color: "#2c3e50" }}>Welcome, Admin</h2>

        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {/* Card for Total Agents */}
          <div
            style={{
              flex: "1 1 200px",
              padding: "25px",
              borderRadius: "12px",
              backgroundColor: "#1abc9c",
              color: "#fff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            <h3>Total Agents</h3>
            <p style={{ fontSize: "36px", fontWeight: "bold", margin: "10px 0 0 0" }}>
              {stats.agentsCount}
            </p>
          </div>

          {/* Card for Total Tasks */}
          <div
            style={{
              flex: "1 1 200px",
              padding: "25px",
              borderRadius: "12px",
              backgroundColor: "#3498db",
              color: "#fff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            <h3>Total Tasks</h3>
            <p style={{ fontSize: "36px", fontWeight: "bold", margin: "10px 0 0 0" }}>
              {stats.tasksCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
