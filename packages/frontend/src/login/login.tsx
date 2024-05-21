import "./login.css"
import { Link } from 'react-router-dom';
function LoginCard()
{
    return (
        <div>
            <div className="titleLogin">YourStories</div>
            <div className="logincard">
            <div className="name-pass">
                Username
            </div>

            <div className="input-box">
                <input type="text" placeholder="Enter your username" required></input>
            </div>

            <div className="name-pass">
                Password
            </div>

            <div className="input-box">
                <input  type="password" placeholder="Enter your password" required></input>
            </div>

            <Link to="/preference">
            <button className="btn">Sign in</button>
            </Link>
            
            <div className="Signup">
                <p>Don't have an account?
                <a href="/signUp">Signup</a></p>
            </div>
        </div>
        </div>
        
    );
}

export default LoginCard;