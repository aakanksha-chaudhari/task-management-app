import React, { useState } from "react";
import axios from "axios";

const UploadTasks = () => {
  const [file, setFile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError("");
  };

  // Upload the selected file and fetch tasks
  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file before uploading");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/tasks/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setTasks(response.data.tasks);
    } catch (err) {
      console.error("Error uploading file:", err);
      setError(err.response?.data?.msg || "There was an error uploading the file");
    }
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "30px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0px 0px 15px rgba(0,0,0,0.1)"
      }}
    >
      <h2 style={{ color: "#2c3e50", textAlign: "center", marginBottom: "20px" }}>
        Upload CSV / Excel and Distribute Tasks
      </h2>

      {/* Sample CSV download link */}
      <div style={{ marginBottom: "15px", textAlign: "center" }}>
        <a
          href="/sample-tasks.csv"
          download="sample-tasks.csv"
          style={{ color: "#2980b9", textDecoration: "none", fontWeight: "bold" }}
        >
          Download Sample CSV for Testing
        </a>
      </div>

      {/* Display error if any */}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <input
          type="file"
          accept=".csv, .xlsx, .xls"
          onChange={handleFileChange}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            cursor: "pointer"
          }}
        />
        <button
          onClick={handleUpload}
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#27ae60",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background-color 0.3s"
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#2ecc71")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#27ae60")}
        >
          Upload
        </button>
      </div>

      {/* Show table if tasks are available */}
      {tasks.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3 style={{ textAlign: "center", marginBottom: "10px", color: "#34495e" }}>
            Distributed Tasks
          </h3>
          <table
            style={{
              borderCollapse: "collapse",
              width: "100%",
              boxShadow: "0px 0px 10px rgba(0,0,0,0.1)"
            }}
          >
            <thead style={{ backgroundColor: "#3498db", color: "#fff" }}>
              <tr>
                <th style={{ padding: "10px" }}>First Name</th>
                <th style={{ padding: "10px" }}>Phone</th>
                <th style={{ padding: "10px" }}>Notes</th>
                <th style={{ padding: "10px" }}>Assigned Agent</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr
                  key={task._id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#ecf0f1" : "#fff",
                    transition: "background-color 0.3s",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#dfe6e9")}
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      index % 2 === 0 ? "#ecf0f1" : "#fff")
                  }
                >
                  <td style={{ padding: "10px" }}>{task.firstName}</td>
                  <td style={{ padding: "10px" }}>{task.phone}</td>
                  <td style={{ padding: "10px" }}>{task.notes}</td>
                  <td style={{ padding: "10px" }}>
                    {task.assignedAgent
                      ? `${task.assignedAgent.name} (${task.assignedAgent.email})`
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UploadTasks;
