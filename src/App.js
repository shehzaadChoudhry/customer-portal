import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import DashboardPage from "./Pages/DashboardPage"

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<LoginPage />} /> 
        <Route path="/SignupPage" element={<SignupPage />} /> 
        <Route path="/ForgotPasswordPage" element={<ForgotPasswordPage />}/>
        <Route path="/DashboardPage" element={<DashboardPage />}/>
      </Routes>
    
  );
}

export default App;
