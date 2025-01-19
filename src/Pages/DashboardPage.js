import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../CSS/DashboardPage.css";

function DashboardPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const userDetails =
    location.state?.userDetails ||
    JSON.parse(localStorage.getItem("userDetails "));

  if (!userDetails) {
    return <div>No user data available!</div>
  }

  const handleLogout = async (e) => {
    e.preventDefault();
    localStorage.removeItem("username");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("mobile");
    navigate("/", { replace: true });
    window.history.replaceState(null, "", "/");
  };

  return (
    <div className="dashboard-container">
      <div className="logout-button-container">
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <h3>Welcome to customer portal, {userDetails.username || "Guest"}</h3>
        <p><strong>First Name:</strong> {userDetails.firstName}</p>
        <p><strong>Last Name:</strong> {userDetails.lastName}</p>
        <p><strong>Email:</strong> {userDetails.userEmail}</p>
        <p><strong>Mobile:</strong> {userDetails.mobile}</p>
        <p><strong>Date of Birth:</strong> {userDetails.dob}</p>
        <p><strong>Login Time:</strong> {new Date(userDetails.loginTime).toLocaleString()}</p>
      </div>
    </div>
  );
}

export default DashboardPage;
