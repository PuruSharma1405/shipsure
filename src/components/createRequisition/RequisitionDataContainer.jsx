import React from "react";
import "./RequisitionDataContainer.css";

const RequisitionDataContainer = () => {
  return (
    <div className="frame">
      <img
        className="image"
        alt="Image"
        src="https://generation-sessions.s3.amazonaws.com/abf5a8a71923e0f58e2282f69b36fd15/img/image-11@2x.png"
      />
      <div className="div">
        <div className="input-chip-wrapper">
          <div className="input-chip">
            <div className="state-layer">
              <img
                className="path"
                alt="Path"
                src="https://generation-sessions.s3.amazonaws.com/abf5a8a71923e0f58e2282f69b36fd15/img/path-117.svg"
              />
              <div className="label-text">Seaways Athens - 9597109</div>
            </div>
          </div>
        </div>
        <div className="div-2">
          <div className="div-3">
            <img
              className="vector"
              alt="Vector"
              src="https://generation-sessions.s3.amazonaws.com/abf5a8a71923e0f58e2282f69b36fd15/img/vector.svg"
            />
            <div className="financials">FINANCIALS</div>
          </div>
          <div className="div-4">
            <div className="frame-wrapper">
              <div className="div-5">
                <div className="text-wrapper">Budget : Actual YTD</div>
                <div className="text-wrapper-2">1.95M - 2.34M</div>
              </div>
            </div>
            <div className="div-wrapper">
              <div className="div-5">
                <div className="text-wrapper">Accrual</div>
                <div className="text-wrapper-2">-39.46%</div>
              </div>
            </div>
            <div className="div-wrapper">
              <div className="div-5">
                <div className="text-wrapper">Variance</div>
                <div className="text-wrapper-2">386.1K</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequisitionDataContainer;