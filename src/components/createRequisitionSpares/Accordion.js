import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const AccordionComponent = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const accordionData = [
    {
      name: "M/E TURBOCHARGER#1",
      Maker: "ABB TURBO SYSTEM AG",
      Serial: "HT 487167/HT 487168",
      Type: "TPL77-B11",
    },
    {
      name: "M/E TURBOCHARGER#1",
      Maker: "ABB TURBO SYSTEM AG",
      Serial: "HT 487167/HT 487168",
      Type: "TPL77-B11",
    },
    {
      name: "M/E TURBOCHARGER#1",
      Maker: "ABB TURBO SYSTEM AG",
      Serial: "HT 487167/HT 487168",
      Type: "TPL77-B11",
    },
    {
      name: "M/E TURBOCHARGER#1",
      Maker: "ABB TURBO SYSTEM AG",
      Serial: "HT 487167/HT 487168",
      Type: "TPL77-B11",
    },
    {
      name: "M/E TURBOCHARGER#1",
      Maker: "ABB TURBO SYSTEM AG",
      Serial: "HT 487167/HT 487168",
      Type: "TPL77-B11",
    },
  ];

  const [mockTableData, setMockTableData] = useState([
    {
      partName: "AIR SUCTION BRANCH",
      makerRef: "32104",
      drawingPos: "11.2",
      uom: "pcs",
      rob: "0",
      pendingOrders: "4",
      reqQty: "10",
      lastPurchase: "734.24",
      isChecked: false,
    },
    {
      partName: "AUXILLARY BEARING",
      makerRef: "32104",
      drawingPos: "82000",
      uom: "pcs",
      rob: "0",
      pendingOrders: "4",
      reqQty: "10",
      lastPurchase: "99767",
      isChecked: false,
    },
    {
      partName: "AXIAL BEARING",
      makerRef: "32104",
      drawingPos: "11.2",
      uom: "pcs",
      rob: "0",
      pendingOrders: "4",
      reqQty: "10",
      lastPurchase: "0",
      isChecked: false,
    },
    {
      partName: "BEARING BUSH",
      makerRef: "32104",
      drawingPos: "11.2",
      uom: "pcs",
      rob: "0",
      pendingOrders: "4",
      reqQty: "10",
      lastPurchase: "98",
      isChecked: false,
    },
    {
      partName: "BEARING CASINO",
      makerRef: "32104",
      drawingPos: "11.2",
      uom: "pcs",
      rob: "0",
      pendingOrders: "4",
      reqQty: "10",
      lastPurchase: "99767",
      isChecked: false,
    },
    {
      partName: "AUXILLARY BEARING",
      makerRef: "32104",
      drawingPos: "11.2",
      uom: "pcs",
      rob: "0",
      pendingOrders: "4",
      reqQty: "10",
      lastPurchase: "99767",
      isChecked: false,
    },
    {
      partName: "AUXILLARY BEARING",
      makerRef: "32104",
      drawingPos: "11.2",
      uom: "pcs",
      rob: "0",
      pendingOrders: "4",
      reqQty: "10",
      lastPurchase: "99767",
      isChecked: false,
    },
    {
      partName: "AUXILLARY BEARING",
      makerRef: "32104",
      drawingPos: "11.2",
      uom: "pcs",
      rob: "0",
      pendingOrders: "4",
      reqQty: "10",
      lastPurchase: "99767",
      isChecked: false,
    },
  ]);

  const handleCheckboxChange = (index) => {
    const updatedTableData = [...mockTableData];
    updatedTableData[index].isChecked = !updatedTableData[index].isChecked;
    setMockTableData(updatedTableData);
  };

  return (
    <div>
      {accordionData.map((item, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}bh-content`}
            id={`panel${index}bh-header`}
          >
            <Typography sx={{ width: "25%", flexShrink: 0 }}>
              {item.name}
            </Typography>
            <Typography sx={{ width: "25%", color: "text.secondary" }}>
              Maker
              <br />
              <span className="mt-1 font-semibold">{item.Maker}</span>
            </Typography>
            <Typography sx={{ width: "25%", color: "text.secondary" }}>
              Serial
              <br />
              <span className="mt-1 font-semibold">{item.Serial}</span>
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Type
              <br />
              <span className="mt-1 font-semibold">{item.Type}</span>
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <table className="table">
              <thead>
                <tr>
                  <th style={{textAlign:'left'}}>Part Name</th>
                  <th style={{textAlign:'left'}}>Maker's Ref. No</th>
                  <th style={{textAlign:'left'}}>Drawing Pos</th>
                  <th style={{textAlign:'left'}}>UOM</th>
                  <th style={{textAlign:'left'}}>ROB</th>
                  <th style={{textAlign:'left'}}>Pending Orders</th>
                  <th style={{textAlign:'left'}}>Req Qty</th>
                  <th style={{textAlign:'left'}}>Last Purchase Cost(USD)</th>
                </tr>
              </thead>
              <tbody>
                {mockTableData.map((rowData, rowIndex) => (
                  <tr key={rowIndex} style={{ borderBottom: "1px solid #DCE1E5" }}>
                 
                  <td style={{ width: "20%", padding: "9px" }}>
                    {rowData.partName}
                  </td>
                  <td style={{ width: "15%" }}>{rowData.makerRef}</td>
                  <td style={{ width: "15%" }}>{rowData.drawingPos}</td>
                  <td style={{ width: "10%" }}>{rowData.uom}</td>
                  <td style={{ width: "10%" }}>{rowData.rob}</td>
                  <td style={{ width: "10%" }}>{rowData.pendingOrders}</td>
                  <td style={{ width: "9%" }}>{rowData.reqQty}</td>
                  <td style={{ width: "15 %" }}>{rowData.lastPurchase}</td>
                </tr>
                ))}
              </tbody>
            </table>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};
