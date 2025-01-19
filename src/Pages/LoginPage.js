import { useState } from "react";
import "../CSS/LoginPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [responseMessageType, setResponseMessageType] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!userEmail || !userPassword) {
      setErrorMessage("Please fill all fields correctly.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_APP_API_URL}/login`,
        {
          userName: userEmail,
          password: userPassword,
        }
      );
      
      if (response.status === 200) {
        const userDetails = response.data.data;
        const { firstName, lastName, userEmail, mobile, dob, loginTime } = userDetails;
        localStorage.setItem("userDetails", JSON.stringify(userDetails));

        console.log(JSON.stringify(userDetails));
        

        setResponseMessage(response.data.message || "Login successful");
        setResponseMessageType("success");

        setUserEmail("");
        setUserPassword("");
        setErrorMessage("");

         navigate("/DashboardPage", { state: { userDetails } });
      } else if (response.status === 404) {
        setResponseMessage(
          response.data.message || "User is inactive. Please contact support."
        );
        setResponseMessageType("error");
      } else {
        setResponseMessage(response.data.message || "Invalid credentials.");
        setResponseMessageType("error");
      }
    } catch (error) {
      if (error.response) {
        setResponseMessage(
          error.response.data.message || "An error occurred during login."
        );
        setResponseMessageType("error");
      } else {
        setResponseMessage("An unexpected error occurred. Please try again.");
        setResponseMessageType("error");
      }
    }
  };

  const handleSignUp = () => {
    navigate("/SignupPage");
  };

  const handleForgotPassword = () => {
    navigate("ForgotPasswordPage");
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        {errorMessage && <p className="error">{errorMessage}</p>}
        {responseMessage && (
          <p
            className={responseMessageType === "success" ? "success" : "error"}
            style={{
              fontWeight: "bold",
              color: responseMessageType === "error" ? "red" : "green",
            }}
          >
            {responseMessage}
          </p>
        )}

        <div className="button-group">
          <button type="submit">Login</button>
        </div>

        <div className="button-group">
          <button type="button" onClick={handleForgotPassword}>
            Forgot Password
          </button>
        </div>

        <div className="button-group">
          <button type="button" onClick={handleSignUp}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
