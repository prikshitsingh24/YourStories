import React, { useState } from 'react';
import { characterState, topicState } from '../../states/dropDownState';
import {useRecoilState} from 'recoil';
import './inputPrompt.css';

const CharacterPrompts: React.FC = () => {
  const [topic, setTopic] = useRecoilState(topicState)
  const [characterName, setCharacterName] = useRecoilState(characterState);

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
    </div>
  );
};

export default CharacterPrompts;

