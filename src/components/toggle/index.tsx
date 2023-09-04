import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsCheckCircle } from "react-icons/bs";

export interface ToggleButtonProps {
  onToggle: (isActive: boolean) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ onToggle }) => {
  const [isActive, setIsActive] = useState(false);
  console.log(isActive)

  const toggleButton = () => {
    setIsActive(!isActive);
    onToggle(!isActive);
  };

  return (
    <button
      onClick={toggleButton}
      className="relative w-16 rounded-full p-1 bg-gray-300"
    >
      <div
        className={`absolute left-0 w-1/2 h-full rounded-full`}
      ></div>
      {isActive ? <BsCheckCircle /> : <AiOutlineCloseCircle />}
    </button>
  );
};

export default ToggleButton;
