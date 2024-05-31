import React, { useState } from 'react';
import './CharacterPrompts.css';

const CharacterPrompts: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [characterName, setCharacterName] = useState('');

  const handleSubmit = () => {
    console.log('Topic:', topic);
    console.log('Character Name:', characterName);
    // Add your submission logic here
  };

  return (
    <div className="container">
      <div className="character-prompts-container">
        <div className="prompt-box">
          <div className="prompt-header">Topic</div>
          <input
            type="text"
            placeholder="Enter topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="prompt-box">
          <div className="prompt-header">Character Name</div>
          <input
            type="text"
            placeholder="Enter character name"
            value={characterName}
            onChange={(e) => setCharacterName(e.target.value)}
            className="input-field"
          />
        </div>
      </div>
      <button className="submit-button" onClick={handleSubmit}>
        Make it Happen !
      </button>
    </div>
  );
};

export default CharacterPrompts;

