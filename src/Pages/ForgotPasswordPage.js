import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

function PasswordPage() {

    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPopup, setShowPopup] = useState(false); 
    const navigate = useNavigate();

const handleForgotPassword = async (e) => {
    e.preventDefault();

    if(!userEmail){
        setErrorMessage('Please enter your email first');
        return;
    }

    try {
        const response =await axios.post("http://localhost:8080/api/users/forgotPassword", {
            userEmail
        }) 
        if(response.status === 200){
            setIsOtpSent(true);
            setErrorMessage(''); 
        }
    } catch (error) {
        console.error('Error occured ',error)
        setErrorMessage('There was an issue with sending the OTP. Please try again later.');
    }
}

const handleOtpSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
        setErrorMessage('Please enter the OTP.');
        return;
    }

    try {
        const response = await axios.post("http://localhost:8080/api/users/verifyOtp", {
            userEmail,
            otp
        });
        if (response.status === 200) {
            setIsOtpVerified(true);
            setErrorMessage('');
        }
    } catch (error) {
        console.error('Error occurred while verifying OTP', error);
        setErrorMessage('Invalid OTP. Please try again.');
    }
}

const handlePasswordUpdate = async (e) => {
    e.preventDefault();

if (userPassword !== confirmPassword) {
    setErrorMessage("Passwords do not match.");
    return;
  }

  try {
    const response = await axios.post("http://localhost:8080/api/users/updatePassword", {
        userEmail,
        userPassword: userPassword
    });

    if(response.status == 200){
        setShowPopup(true);
        setErrorMessage('');

        setTimeout(() => {
            setShowPopup(false)
            navigate("/");
        }, 3000)
    }

  } catch (error) {
    console.error('Error occurred while updating password', error);
    setErrorMessage('There was an issue updating the password. Please try again later.');
    }
}

    return (
        <div className="login-container">
            <h2>Forgot Password</h2>
            <form onSubmit={isOtpSent && isOtpVerified ? handlePasswordUpdate : isOtpSent ? handleOtpSubmit : handleForgotPassword} className="login-form">
            {!isOtpSent && (
                <div className="input-group">
                    <label>Email</label>
                    <input 
                        type="email" 
                        value={userEmail} 
                        onChange={(e) => setUserEmail(e.target.value)} 
                        placeholder="Enter your email" 
                    />
                    {errorMessage && <p className="error">{errorMessage}</p>}
                    <div className="button-group">
                        <button type="submit" disabled={isOtpSent}>Get OTP</button>
                    </div>
                </div>
            )}
            {isOtpSent && !isOtpVerified && (
                <div className="input-group">
                    <label>OTP</label>
                        <input 
                            type="text" 
                            value={otp} 
                            onChange={(e) => setOtp(e.target.value)} 
                            placeholder="Please enter your OTP" 
                        />
                        {errorMessage && <p className="error">{errorMessage}</p>}
                        <div className="button-group">
                            <button type="submit">
                                Submit
                            </button>
                        </div>
                </div>
            )}
            {isOtpVerified && (
                    <div className="success-message">
                        <p>OTP verified successfully. You can now reset your password.</p>

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
          {errorMessage && <p className="error">{errorMessage}</p>}
          <div className="button-group">
                            <button type="submit">Update Password</button>
                        </div>
        </div>                    
                )}
                {showPopup && (
                <div className="popup">
                    <p>Password updated successfully!</p>
                </div>
            )}
            </form>
        </div>
    );
}

export default PasswordPage; 
