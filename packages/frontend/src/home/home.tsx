import './home.css'
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom'


function Home() {

  return (
    <div className="wrapper">
      <form>
        <h1>
           YourStories
        </h1>
        <Link to="/login">
          <button>Try it!</button>
        </Link>
    
      </form>

      
       
      </div>

  )
}

export default Home;
