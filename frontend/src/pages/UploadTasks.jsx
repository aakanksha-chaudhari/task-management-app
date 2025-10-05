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
    <div style={{ padding: "20px" }}>
      <h2>Upload CSV / Excel and Distribute Tasks</h2>

      {/* Sample CSV download link */}
      <div style={{ marginBottom: "15px" }}>
        <a href="/sample-tasks.csv" download="sample-tasks.csv">
          Download Sample CSV for Testing
        </a>
      </div>

      {/* Display error if any */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input type="file" accept=".csv, .xlsx, .xls" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginLeft: "10px" }}>
        Upload
      </button>

      {/* Show table if tasks are available */}
      {tasks.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Distributed Tasks</h3>
          <table
            border="1"
            cellPadding="10"
            style={{ borderCollapse: "collapse", width: "100%" }}
          >
            <thead style={{ backgroundColor: "#f2f2f2" }}>
              <tr>
                <th>First Name</th>
                <th>Phone</th>
                <th>Notes</th>
                <th>Assigned Agent</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id}>
                  <td>{task.firstName}</td>
                  <td>{task.phone}</td>
                  <td>{task.notes}</td>
                  <td>
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
