import React from 'react';

const ToolTip = ({ visible, onClose, data }) => {
  return (
    <div className={`T ${visible ? 'visible' : ''}`}>
      <div className="tooltip-content">
        <div>
          <span>Mgmt Start:</span> {data.startDate}
        </div>
        <div>
          <span>Mgmt End:</span> {data.endDate}
        </div>
      </div>
      <button className="tooltip-close" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default ToolTip;
