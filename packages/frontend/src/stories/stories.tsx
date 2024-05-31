import React, { useState } from 'react';
import './stories.css'; 
import Setting from "../assets/stories/Setting.png"
import MyBook from '../components/book/book';


// Hamburger component
const Hamburger: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div>
        <div className="hamburger" onClick={onClick}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        
    </div>
    
  </div>
    
  );
};

// Sidebar component
const Sidebar: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? 'expanded' : ''}`}>
      <div className="sidebar-icons">
        {/* Sidebar icons go here */}
        
        <div className="icon_setting"><img width='20' src={Setting} alt="" /></div>
        <div className="icon_taskbar"><a href="#">↻</a></div>
        <div className="icon_taskbar"><a href="#">+</a></div>
        
      </div>
      <div className="sidebar-content">
        {/* Expanded sidebar content */}
        <a href="#">Link 1</a>
        <a href="#">Link 2</a>
      </div>
    </div>
  );
};

// Main Stories component
const Stories: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);




  return (
    <div className="stories">
      <Hamburger onClick={() => setIsOpen(!isOpen)} />

      <Sidebar isOpen={isOpen} />
      <div className='bookBody'>
        <MyBook/>
      </div>
    </div>
  );
};

export default Stories;
