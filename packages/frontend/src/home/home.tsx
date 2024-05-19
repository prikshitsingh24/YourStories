import './home.css'
import { Link } from 'react-router-dom';


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
