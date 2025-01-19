import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/LoginPage.css";
import axios from "axios";

const validateForm = (fields) => {
  const errors = {};

  if (!fields.firstName) errors.firstName = "First Name is required.";
  if (!fields.lastName) errors.lastName = "Last Name is required.";
  if (!fields.username) errors.username = "Username is required.";
  if (!fields.userEmail) errors.userEmail = "Email is required.";
  if (!fields.userPassword) errors.userPassword = "Password is required.";
  if (fields.userPassword !== fields.confirmPassword)
    errors.passwordMismatch = "Passwords do not match.";
  if (!fields.mobile) errors.mobile = "Mobile number is required.";
  if (fields.mobile.length !== 10 || isNaN(fields.mobile))
    errors.mobile = "Mobile number must be exactly 10 digits.";
  if (!fields.dob) errors.dob = "Date of Birth is required.";

  return errors;
};

function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    userEmail: "",
    userPassword: "",
    mobile: "",
    dob: "",
  });

  const [errorMessages, setErrorMessages] = useState({});

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      return;
    }
    try {
      const apiUrl = process.env.REACT_APP_BACKEND_APP_API_URL;
      const response = await axios.post(`${apiUrl}/signup`, formData);

      if (response.status === 200) {
        alert(response.data.message);
        navigate("/");
      } else {
        setErrorMessages({
          general:
            response.data.message ||
            "Email already exists, please click on login.",
        });
        alert(response.data.message || "An error occurred, please try again.");
      }
    } catch (error) {
      if (error.response) {
        setErrorMessages({
          general:
            error.response.data.message ||
            "An error occurred during sign-up, please try again.",
        });
      } else if (error.request) {
        setErrorMessages({
          general: "No response from the server. Please try again later.",
        });
      } else {
        setErrorMessages({
          general: "An unexpected error occurred. Please try again.",
        });
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="login-container">
        <h2>Sign Up</h2>
        <h5>Welcome, please Sign Up!</h5>
        <form onSubmit={handleSignUp} className="login-form">
          <div className="input-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Enter your first name"
            />
            {errorMessages.firstName && (
              <p className="error">{errorMessages.firstName}</p>
            )}
          </div>

          <div className="input-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Enter your last name"
            />
            {errorMessages.lastName && (
              <p className="error">{errorMessages.lastName}</p>
            )}
          </div>

          <div className="input-group">
            <label>username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter your username"
            />
            {errorMessages.username && (
              <p className="error">{errorMessages.username}</p>
            )}
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="userEmail"
              value={formData.userEmail}
              onChange={handleInputChange}
              placeholder="Enter your email"
            />
            {errorMessages.userEmail && (
              <p className="error">{errorMessages.userEmail}</p>
            )}
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="userPassword"
              value={formData.userPassword}
              onChange={handleInputChange}
              placeholder="Enter your password"
            />
            {errorMessages.userPassword && (
              <p className="error">{errorMessages.userPassword}</p>
            )}
          </div>

          <div className="input-group">
            <label>Confirm password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
            />
            {errorMessages.passwordMismatch && (
              <p className="error">{errorMessages.passwordMismatch}</p>
            )}
          </div>

          <div className="input-group">
            <label>Mobile No.</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              placeholder="Enter your mobile number"
              maxLength={10}
            />
            {errorMessages.mobile && (
              <p className="error">{errorMessages.mobile}</p>
            )}
          </div>

          <div className="input-group">
            <label>DOB</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
            />
            {errorMessages.dob && <p className="error">{errorMessages.dob}</p>}
          </div>

          {errorMessages.general && (
            <p className="error">{errorMessages.general}</p>
          )}

          <div className="button-group">
            <button type="submit">Sign Up</button>
          </div>

          <p>Already have an account? Please click below login button.</p>

          <div className="button-group">
            <button type="button" onClick={handleLogin}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
