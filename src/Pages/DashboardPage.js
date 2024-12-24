import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const username = location?.state?.username || localStorage.getItem('username')

  const handleLogout = async (e) => {
    navigate('/');
  }

    return (
      <div>
      Hello, {username}
      <div className="login-container">
        <form onSubmit={handleLogout} className="login-form">
            <div className="button-group">
                <button type="submit">Logout</button>
            </div>
        </form>
      </div>
      </div>
    );
  }

export default DashboardPage;