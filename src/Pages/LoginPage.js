import { useState } from "react";
import "../CSS/LoginPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!userEmail || !userPassword) {
            setErrorMessage('Please fill all fields correctly.');
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/api/users/login", {
                userEmail, userPassword
            });

            if (response.status === 200) {
                const userDetails = response.data.data;
                const username = userDetails.username;
                localStorage.setItem('username', username);
                console.log("Logged in successfully with user details:", {email: userEmail, password : userPassword});
                setUserEmail('');
                setUserPassword('');
                setErrorMessage('');
                navigate('/DashboardPage', { state : { username }});
            } else if(response.status === 401){
                setErrorMessage(response.data.message || "Invalid password.");
            } else if(response.status === 404){
                setErrorMessage(response.data.message || "Invalid email.");
            }
        } catch (error) {
            console.error("Error occurred", error);
            if (error.response) {
                if (error.response.status === 401) {
                    setErrorMessage("Incorrect password, please try again.");
                } else if (error.response.status === 404) {
                    setErrorMessage("Invalid email, please check your credentials.");
                } else {
                    setErrorMessage("An error occurred during login, please try again.");
                }
            } else {
                setErrorMessage("An unexpected error occurred.");
            }
        }
    };

    const handleSignUp = () => {
        navigate('/SignupPage');
    };

    const handleForgotPassword = () => {
        navigate('ForgotPasswordPage');
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

                <div className="button-group">
                    <button type="submit">Login</button>
                </div>
            </form>

            <div className="button-group">
                <button onClick={handleForgotPassword}>Forgot Password</button>
            </div>
            <div className="button-group">
                <button onClick={handleSignUp}>Sign Up</button>
            </div>
        </div>
    );
}

export default LoginPage;
