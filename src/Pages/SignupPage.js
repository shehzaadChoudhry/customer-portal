import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/LoginPage.css";
import axios from "axios";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [mobileError, setMobileError] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !userEmail || !userPassword || !mobile || !dob || !firstName || !lastName) {
      setErrorMessage("Please fill all fields correctly.");
      return;
    }

    if (userPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (mobile.length !== 10 || isNaN(mobile)) {
      setMobileError("Mobile number must be exactly 10 digits.");
      return;
    } else {
      setMobileError("");
    }

    try {
      const response = await axios.post("http://localhost:8080/api/users/signup", {
        username, userEmail, userPassword, mobile, dob, firstName, lastName
      });
      if (response.status === 200) {
        alert("Details captured successfully.");
        navigate("/");
      } else if (response.status === 409) {
        setErrorMessage(response.data.message || "Email already exists, please click on login.");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error occurred: ", error);
        setErrorMessage(error.response.data.message || "An error occurred during sign-up, please try again.");
      } else if (error.request) {
        console.error("No response received:", error.request);
        setErrorMessage("No response from the server. Please try again later.");
      } else {
        console.error("Error setting up the request:", error.message);
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }

    setUsername("");
    setUserEmail("");
    setUserPassword("");
    setConfirmPassword("");
    setMobile("");
    setDob("");
    setFirstName("");
    setLastName("");
  };

  const handleLogin = () => {
    navigate("/");
  };

  const handleMobileChange = (e) => {
    const input = e.target.value;
    if (/^\d{0,10}$/.test(input)) {
      setMobile(input);
    }
  };

  return (
    <div>
      <div className="signup-container">
        <h2>Sign Up</h2>
        <h5>Welcome, please Sign Up!</h5>
        <form onSubmit={handleSignUp} className="signup-form">
          <div className="input-group">
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
            />
          </div>

          <div className="input-group">
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
            />
          </div>

          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>

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

          <div className="input-group">
            <label>Confirm password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />
          </div>

          <div className="input-group">
            <label>Mobile No.</label>
            <input
              type="tel"
              value={mobile}
              onChange={handleMobileChange}
              placeholder="Enter your mobile number"
              maxLength={10}
            />
            {mobileError && <p className="error">{mobileError}</p>}
          </div>

          <div className="input-group">
            <label>DOB</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              placeholder="Enter your date of birth"
            />
          </div>

          {errorMessage && <p className="error">{errorMessage}</p>}

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
