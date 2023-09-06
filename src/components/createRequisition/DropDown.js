import React, { useState, useRef, useEffect } from 'react';
import './DropDown.css';
import { dropDownData } from '@/app/data/DropDownData';
import useOnClickOutside from '@/hooks/useOnClickOutside';

// interface MegaDropDownProps {
//   showDropdown: boolean;
//   setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
//   vesselName: any;
//   fetchingDropDownData: (vesselName: any) => void;
// }

const DropDown= ({
  showDropdown,
  setShowDropdown,
  vesselName,
  fetchingDropDownData,
}) => {
  const [megaMenu, setMegaMenu] = useState(dropDownData);
  const [typedValue, setTypedValue] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  
  const clickHandler = (currData) => {
    fetchingDropDownData(currData['Vessel Name']);
  };

  return (
    <div className="mega-dropdown" ref={ref}>
      
        <div className="mega-dropdown-content">
            {Object.keys(dropDownData[0]).map((key) => (
              <div className="column" key={key}>
                <h2>{key}</h2>
                <ul>
                  {megaMenu.map((currData, index) => (
                    <li
                      key={index}
                      className={`${
                        key === 'Vessel Name'
                          ? 'megamenu-vesselname'
                          : 'different-data'
                      }`}
                      onClick={() => clickHandler(currData)}
                    >
                      {currData[key]} 
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      
    </div>
  );
};

export default DropDown;
