import  { useState } from "react";
import "./dropDown.css"; // Assuming you have a CSS file for styling

const options = ["Option 1", "Option 2", "Option 3"];

const DropDown = ( props:any ) => {
  const [selectedOption, setSelectedOption] = useState(""); // Single selected option

  const handleChange = (event: { target: { value: any; }; }) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="dropDownMain">
      
      <div>
        <select value={selectedOption} onChange={handleChange} className="highlight-select">
          <option className="dropdowntitle" value="" disabled><div className="propOptiontitle">{props.title}</div></option>
          {options.map((option, i) => (
            <option key={i} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DropDown;
