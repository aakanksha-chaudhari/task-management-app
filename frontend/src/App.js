import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importing page components
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddAgent from "./pages/AddAgent";
import UploadTasks from "./pages/UploadTasks";
import ViewAgentsTasks from "./pages/ViewAgentsTasks";

function App() {
  return (
    <Router>
      <Routes>
      
        <Route path="/" element={<Login />} />

       
        <Route path="/dashboard" element={<Dashboard />} />

   
        <Route path="/add-agent" element={<AddAgent />} />

        
        <Route path="/upload" element={<UploadTasks />} />

  
        <Route path="/view-agents-tasks" element={<ViewAgentsTasks />} />
      </Routes>
    </Router>
  );
}

export default App;
