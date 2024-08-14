import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signUp.css';

function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async () => {
        if (!firstName || !lastName || !email || !password) {
            setErrorMessage('All fields are required');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/user/signUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_Name: firstName,
                    last_Name: lastName,
                    user_Email: email,
                    user_Password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                navigate('/login');
            } else {
                setErrorMessage(data.message || 'Signup failed');
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div>
            <div className="titleSignUp">Welcome to YourStories</div>
            <div className="logincard">
                
                {/* First Name */}
                <div className="usernameBox">
                    <div className="name-user">First Name</div>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Enter your first name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {/* Last Name */}
                <div className="usernameBox">
                    <div className="name-user">Last Name</div>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Enter your last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="usernameBox">
                    <div className="name-user">Email</div>
                    <div className="input-box" style={{ width: '500px', height: '30px' ,marginLeft:'95px'}}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                borderRadius: '5px',
                                border: '2px solid',
                                outline: 'none',
                                paddingLeft: '3%',
                            }}
                        />
                    </div>
                </div>

                {/* Password */}
                <div className="passwordBox">
                    <div className="name-pass">Password</div>
                    <div className="input-box" style={{ width: '500px', height: '30px' ,marginLeft:'70px'}}>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                borderRadius: '5px',
                                border: '2px solid',
                                outline: 'none',
                                paddingLeft: '3%',
                            }}
                        />
                    </div>
                </div>

                {/* Error Message */}
                {errorMessage && <div className="error-message">{errorMessage}</div>}

                {/* Sign Up Button */}
                <button className="btn" onClick={handleSignUp}>Sign Up</button>

                {/* Already have an account */}
                <div className="Signup">
                    <p>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
