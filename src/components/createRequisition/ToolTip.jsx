import React from "react";
import "./ToolTip.css";

const RichTooltip = () => {
  return (
    <div className="rich-tooltip">
      <div className="content">
        <div className="frame">
          <div className="div">
            <div className="label-text">
              <div className="text-wrapper">Pur. Start</div>
            </div>
            <div className="input-text">10 Feb 2014</div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="frame">
          <div className="div">
            <div className="label-text">
              <div className="text-wrapper">Pur. End</div>
            </div>
            <div className="input-text">-</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RichTooltip
