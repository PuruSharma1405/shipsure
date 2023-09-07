import React from "react";
import "./RequisitionDataContainer.css";

const RequisitionDataContainer = ({basketValues,vesselBasicDetails}) => {

  console.log('vesselBasicDetails',vesselBasicDetails);

  const dateBuilt = vesselBasicDetails?.VES_DateBuilt
  ? new Date(vesselBasicDetails?.VES_DateBuilt).toLocaleDateString()
  : "N/A";

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
              <div className="label-text">{ `${vesselBasicDetails?.VesselName?vesselBasicDetails?.VesselName:'Seaways Athens - 9597109'}-${vesselBasicDetails?.IMOnumber?vesselBasicDetails?.IMOnumber:''}`||'Seaways Athens - 9597109'}</div>
              {localStorage.setItem('VESSEL_NAME',vesselBasicDetails?.IMOnumber?vesselBasicDetails?.VesselName:'Seaways Athens - 9597109')}
            </div>
          </div>
        </div>
        <div className="div-2">
          <div className="div-4">
          <div className="div-wrapper">
              <div className="div-5">
                <div className="text-wrapper">IMO</div>
                <div className="text-wrapper-2">{vesselBasicDetails?.IMOnumber}</div>
              </div>
            </div>
            <div className="div-wrapper">
              <div className="div-5">
                <div className="text-wrapper">Type of vessel</div>
                <div className="text-wrapper-2">{vesselBasicDetails?.VesselType}</div>
              </div>
            </div>
            <div className="div-wrapper">
              <div className="div-5">
                <div className="text-wrapper">Vessel Build Date</div>
                <div className="text-wrapper-2">{dateBuilt}</div>
              </div>
            </div>
            <div className="div-wrapper">
              <div className="div-5">
                <div className="text-wrapper">Age</div>
                <div className="text-wrapper-2">{vesselBasicDetails?.VesselAgeInYears}</div>
              </div>
            </div>
            <div className="div-wrapper">
              <div className="div-5">
                <div className="text-wrapper">Budget-Actual YTD</div>
                <div className="text-wrapper-2">{vesselBasicDetails?.Budget?vesselBasicDetails?.Budget:'392.4M'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequisitionDataContainer;