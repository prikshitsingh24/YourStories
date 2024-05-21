import './signUp.css'
import { Link } from 'react-router-dom';
function SignUp(){
    return(
        <div>
        <div className="title">Welcome to YourStories</div>
        <div className="logincard">
        
        <div className="usernameBox">
            <div className="name-user">
                Username
            </div>

            <div className="input-box">
                <input type="text" placeholder="Enter your username" required></input>
            </div>
            </div>
            <div className="passwordBox">
            <div className="name-pass">
                Password
            </div>

            <div className="input-box">
                <input  type="password" placeholder="Enter your password" required></input>
            </div>
            </div>
        <Link to="/login">
        <button className="btn">Sign Up</button>
        </Link>
        
        
        
    </div>
    </div>
    )
}



export default SignUp;