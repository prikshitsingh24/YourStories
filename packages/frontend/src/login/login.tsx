import  { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For redirection
import "./login.css";

function LoginCard() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // API URL and body
    const url = 'http://localhost:8000/api/user/logIn';
    const body = {
      user_Email: username,
      user_Password: password
    };

    try {
      // Send POST request to API
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (response.ok) {
        // Store user data in local storage
        localStorage.setItem('sessionId', data.sessionId);
        localStorage.setItem('userId', data.userId);
    ;
        // Redirect to /stories
        navigate('/stories');
      } else {
        // Handle error (e.g., show an error message)
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred while logging in');
    }
  };

  return (
    <div>
      <div className="titleLogin">YourStories</div>

      <div className="logincard">
        <form onSubmit={handleLogin}>
          <div className="usernameBox">
            <div className="name-user">Username</div>
            <div className="input-box">
              <input
                type="text"
                placeholder="Enter your username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="passwordBox">
            <div className="name-pass">Password</div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn">Sign in</button>
        </form>

        <div className="Signup">
          <p>Don't have an account? <a href="/signUp">Signup</a></p>
        </div>
      </div>
    </div>
  );
}

export default LoginCard;
