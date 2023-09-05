import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsCheckCircle } from "react-icons/bs";
import Switch from '@mui/material/Switch';

export interface ToggleButtonProps {
  isChecked: boolean;
  onToggle: any;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ isChecked, onToggle }) => {


  return (
    <Switch checked={isChecked} onChange={onToggle}/>
    // <button
    //   onClick={toggleButton}
    //   className="relative w-16 rounded-full p-1 bg-gray-300"
    // >
    //   <div
    //     className={`absolute left-0 w-1/2 h-full rounded-full`}
    //   ></div>
    //   {isActive ? <BsCheckCircle /> : <AiOutlineCloseCircle />}
    // </button>
  );
};

export default ToggleButton;
