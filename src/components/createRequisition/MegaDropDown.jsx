'use client';
import React, { useEffect, useState } from 'react'
import './MegaDropDown.css';
import axios from 'axios'
import { dropDownData } from '@/app/data/DropDownData';

const MegaDropDown = ({showDropdown,vesselName,fetchingDropDownData}) => {
  const [megaMenu, setMegaMenu] = useState(dropDownData);
  const[typedValue,setTypedValue]=useState("")

  const clickHandler=(currData)=>{
    fetchingDropDownData(currData["Vessel Name"])
  }

  return (
    <div className="mega-dropdown">
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
                      onClick={()=>clickHandler(currData)}
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
  )
}

export default MegaDropDown
