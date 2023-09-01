import React, { useState, useEffect,useRef } from 'react';
import './MegaDropDown.css';
import { dropDownData } from '@/app/data/DropDownData';
import useOnClickOutside from '@/hooks/useOnClickOutside';

// interface MegaDropDownProps {
//   showDropdown: boolean;
//   setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
//   vesselName: string;
//   fetchingDropDownData: (vesselName) => void;
// }

const MegaDropDown = ({
  showDropdown,
  setShowDropdown,
  vesselName,
  fetchingDropDownData,
}) => {
  const [megaMenu, setMegaMenu] = useState(dropDownData);
  const [typedValue, setTypedValue] = useState('');
  const ref = useRef(null);

  
  const clickHandler = (currData) => {
    fetchingDropDownData(currData['Vessel Name']);
  };
  
  useOnClickOutside(ref, () => setShowDropdown(false));

  const filteredDropDown=()=>{
    const filteredData =megaMenu.filter((currData)=>{
      return currData["Vessel Name"].toLowerCase().includes(vesselName.toLowerCase());
    })
    if(filteredData?.length===0){
      setShowDropdown(false);
      return;
    }
    setMegaMenu(filteredData)
  }

  useEffect(()=>{
    filteredDropDown()
  },[vesselName,filteredDropDown])

  return (
    <div className="mega-dropdown" ref={ref}>
      {showDropdown && (
        <div className="mega-dropdown-content">
          <div className="row">
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
      )}
    </div>
  );
};

export default MegaDropDown;
