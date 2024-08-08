import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import "./dropDown.css"; // Assuming you have a CSS file for styling
import { DropdownData } from '../../types/dropdownTypes';
import { genreState, settingState, lengthState, ageState } from '../../states/dropDownState';

interface DropDownProps {
  data: DropdownData;
}

const DropDown: React.FC<DropDownProps> = ({ data }) => {
  const [selectedOption, setSelectedOption] = useState(""); // Single selected option
  const [genre, setGenre] = useRecoilState(genreState);
  const [setting, setSetting] = useRecoilState(settingState);
  const [length, setLength] = useRecoilState(lengthState);
  const [age, setAge] = useRecoilState(ageState);

  const setValue = (value: string) => {
    switch (data.title) {
      case 'Genre':
        setGenre(value);
        break;
      case 'Setting':
        setSetting(value);
        break;
      case 'Length':
        setLength(value);
        break;
      case 'Age':
        setAge(value);
        break;
      default:
        break;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption(event.target.value);
    setValue(value);
  };


  return (
    <div className="dropDownMain">
      <div>
        <select value={selectedOption} onChange={handleChange} className="highlight-select">
          <option className="dropdowntitle" value="" disabled>{data.title}</option>
          {data.options.map((option, i) => (
            <option key={i} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DropDown;
