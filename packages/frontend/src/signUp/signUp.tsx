import './signUp.css'
import { Link } from 'react-router-dom';
function SignUp(){
    return(
        <div>
        <div className="title">Welcome to YourStories</div>
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

        <Link to="/login">
        <button className="btn">Sign Up</button>
        </Link>
        
        
        
    </div>
    </div>
    )
}



export default SignUp;