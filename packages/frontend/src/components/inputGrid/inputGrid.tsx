import React, { useState } from 'react';
import './inputGrid.css';

const options = ["Option 1", "Option 2", "Option 3"];

const HighlightGrid: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(Array(6).fill(""));

  const handleSelectChange = (index: number, value: string) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = value;
    setSelectedOptions(newSelectedOptions);
  };

  return (
    <div className="highlight-grid">
      {[0, 1].map(row => (
        <div className="highlight-row" key={row}>
          {[0, 1, 2].map(cell => {
            const index = row * 3 + cell;
            return (
              <div className="highlight-cell" key={index}>
                <select 
                  value={selectedOptions[index]}
                  onChange={(e) => handleSelectChange(index, e.target.value)}
                  className="highlight-select"
                >
                  <option value="" disabled>Select an option</option>
                  {options.map((option, i) => (
                    <option key={i} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default HighlightGrid;

