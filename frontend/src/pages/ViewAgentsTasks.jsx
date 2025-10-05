import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ViewAgentsTasks() {
  const [agents, setAgents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  // Fetch agents and tasks from API
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const agentsResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/view/agents`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAgents(agentsResponse.data.agents);

      const tasksResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/view/tasks`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTasks(tasksResponse.data.tasks);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Error fetching data. Please try again.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Delete an agent
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/view/agents/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Update state after deletion
      setAgents(agents.filter((agent) => agent._id !== id));
    } catch (err) {
      console.error("Error deleting agent:", err);
      setError("Error deleting agent. Please try again.");
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ color: "#2c3e50" }}>Agents & Tasks Overview</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Agents Table */}
      <h3 style={{ marginTop: "20px" }}>Agents</h3>
      <table
        border="1"
        cellPadding="10"
        style={{ borderCollapse: "collapse", width: "100%", marginBottom: "30px" }}
      >
        <thead style={{ backgroundColor: "#f2f2f2" }}>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent) => (
            <tr key={agent._id}>
              <td>{agent.name}</td>
              <td>{agent.email}</td>
              <td>
                <button
                  onClick={() => handleDelete(agent._id)}
                  style={{
                    padding: "5px 10px",
                    borderRadius: "5px",
                    border: "none",
                    backgroundColor: "#e74c3c",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tasks List as Cards */}
      <h3>Distributed Task Records:</h3>
      <div style={{ display: "grid", gap: "15px", marginTop: "15px" }}>
        {tasks.map((task) => (
          <div
            key={task._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
            }}
          >
            <p>
              <strong>First Name:</strong> {task.firstName}
            </p>
            <p>
              <strong>Phone:</strong> {task.phone}
            </p>
            <p>
              <strong>Notes:</strong> {task.notes}
            </p>
            <p>
              <strong>Assigned To:</strong>{" "}
              {task.assignedAgent
                ? `${task.assignedAgent.name} (${task.assignedAgent.email})`
                : "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
