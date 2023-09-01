import React, { useState,useEffect,useRef } from "react";
import "./DropDown.css";
import useOnClickOutside from '../../hooks/useOnClickOutside';


const menuDropDownData = [
  "55.05 FLOOR MAINTENANCE",
  "Available Main Lines",
  "GE-1 Main Bearing No",
  "GE-1 Main Bearing No 2",
  "GE-1 Main Bearing No 3",
  "GE-1 Main Bearing No 4",
  "GE-1 Main Bearing No 5",
  "GE-1 Main Bearing No 6",
  "GE-1 Main Bearing No 7"
];

const DropDown = ({fechingItem,showDropDown,setShowDropdown,componentName}) => {
  const [menu, setMenu] = useState(menuDropDownData);
  const ref = useRef(null);

  const filteredDropDown=()=>{
    const filteredData =menu.filter((currData)=>{
      return currData.toLowerCase().includes(componentName.toLowerCase());
    })
    if(filteredData?.length===0){
      return;
    }
    setMenu(filteredData)
  }

  useEffect(()=>{
    filteredDropDown()
  },[filteredDropDown])

  const fetchingItemValue=(currData)=>{
    fechingItem(currData)
  }

  return (
    <div className="component-dropdown" ref={ref}>
      {menu.map((currData, index) => (
        <div className="frame-wrapper" key={index}>
          <div className="div">
            <p className="text-wrapper" onClick={()=>fetchingItemValue(currData)}>{currData}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DropDown;
