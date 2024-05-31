import './home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="wrapper">
      
        <section className="landing-page">
          <div className="section-content">
            <h1 className='mainHeadHome'>YourStories</h1>
            <div className='homeText'>Welcome to YourStories, where your imagination meets technology!</div>
            
            <Link to="/login">
              <button>Try it!</button>
            </Link>
          </div>
        </section>
        
        <section className="section-how-it-works">
          <div className="section-content">
            <h1 className="section-title">How It Works</h1>
            <p className="section-description">
              <strong>1. Tell Us What You Like:</strong> Begin by providing some details about the kind of story you want. You can choose the genre, setting, characters, themes, and more.<br />
              <strong>2. Personalize Your Experience:</strong> Add specific elements or preferences to tailor the story to your liking. Want a heroic protagonist or a plot twist? Just let us know!<br />
              <strong>3. Generate and Enjoy:</strong> Our advanced AI will craft a unique story based on your inputs. In a matter of moments, you’ll have a custom story ready to read and share.
            </p>
          </div>
        </section>
        
        <section className="section-why-choose">
          <div className="section-content">
            <h1 className="section-title">Why Choose YourStories?</h1>
            <p className="section-description">
              <strong>Endless Possibilities:</strong> With countless combinations of genres, characters, and plots, each story is unique to your taste.<br />
              <strong>User-Friendly Interface:</strong> Easy and intuitive design to make story creation fun and effortless.<br />
              <strong>Instant Gratification:</strong> Get your personalized story within minutes of submitting your preferences.<br />
              <strong>Shareable Content:</strong> Enjoy your story alone or share it with friends and family for their enjoyment.
            </p>
          </div>
        </section>
        
        <section className="section-join-community">
          <div className="section-content">
            <h1 className="section-title">Join Our Community</h1>
            <p className="section-description">
              Follow us on social media to stay updated on new features, share your favorite stories, and connect with other story lovers. YourStories – where every story is yours to tell.
            </p>
          </div>
        </section>
      
    </div>
  );
}

export default Home;
