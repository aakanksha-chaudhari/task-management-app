import React, { useState } from "react";
import axios from "axios";

const UploadTasks = () => {
  const [file, setFile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file before uploading");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/tasks/upload",
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
        padding: "30px",
        maxWidth: "900px",
        margin: "40px auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#f9f9f9",
        borderRadius: "12px",
        boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#333",
          marginBottom: "25px",
          fontSize: "28px",
        }}
      >
        Upload CSV / Excel and Distribute Tasks
      </h2>

      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <a
          href="/sample-tasks.csv"
          download="sample-tasks.csv"
          style={{
            textDecoration: "none",
            color: "#fff",
            backgroundColor: "#007BFF",
            padding: "10px 18px",
            borderRadius: "6px",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")}
        >
          Download Sample CSV for Testing
        </a>
      </div>

      {error && (
        <p
          style={{
            color: "white",
            backgroundColor: "#dc3545",
            padding: "10px 15px",
            borderRadius: "6px",
            textAlign: "center",
            marginBottom: "15px",
          }}
        >
          {error}
        </p>
      )}

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <input
          type="file"
          accept=".csv, .xlsx, .xls"
          onChange={handleFileChange}
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        />
        <button
          onClick={handleUpload}
          style={{
            marginLeft: "10px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#1e7e34")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
        >
          Upload
        </button>
      </div>

      {tasks.length > 0 && (
        <div style={{ marginTop: "30px", overflowX: "auto" }}>
          <h3
            style={{
              textAlign: "center",
              marginBottom: "15px",
              color: "#333",
            }}
          >
            Distributed Tasks
          </h3>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <thead style={{ backgroundColor: "#007BFF", color: "white" }}>
              <tr>
                <th style={{ padding: "12px" }}>First Name</th>
                <th style={{ padding: "12px" }}>Phone</th>
                <th style={{ padding: "12px" }}>Notes</th>
                <th style={{ padding: "12px" }}>Assigned Agent</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr
                  key={task._id}
                  style={{
                    textAlign: "center",
                    backgroundColor: "#fdfdfd",
                    transition: "0.2s",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f1f1f1")}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#fdfdfd")}
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
