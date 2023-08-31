import React from "react";
import "./DropDown.css";

const mockMainBearings = [
  "55.05 FLOOR MAINTENANCE",
  "Available Main Lines",
  "GE-1 Main Bearing No.",
  "GE-1 Main Bearing No. 2",
  "GE-1 Main Bearing No. 3",
  "GE-1 Main Bearing No. 4",
  "GE-1 Main Bearing No. 5",
  "GE-1 Main Bearing No. 6",
  "GE-1 Main Bearing No. 7"
];

const DropDown = () => {
  return (
    <div className="profile-dropdown">
      {mockMainBearings.map((bearing, index) => (
        <div className="frame-wrapper" key={index}>
          <div className="div">
            <p className="text-wrapper">{bearing}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DropDown;
