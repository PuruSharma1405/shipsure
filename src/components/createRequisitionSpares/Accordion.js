import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { accordionData } from "../../app/data/accordionData";

export const AccordionComponent = ({ addToBasketCallback, accordionItems }) => {
  const [expanded, setExpanded] = useState(false);
  const [expandedAccordionIndex, setExpandedAccordionIndex] = useState(null);
  const [accordionIndexValue, setAccordionIndexValue] = useState();

  const handleChange = (panel, index) => (event, isExpanded) => {
    console.log("expanded", expanded, panel);
    setExpanded(isExpanded ? panel : false);
    console.log("panel", panel.slice(-1), accordionData[panel.slice(-1)]);
    setAccordionIndexValue(accordionData[panel.slice(-1)]);
  };

  console.log("accordionIndexValue", accordionIndexValue);

  const [mockTableData, setMockTableData] = useState(accordionItems);

  const handleCheckboxChange = (index, item) => {
    console.log("index,iten", index, item);
    const updatedTableData = [...mockTableData];
    updatedTableData[index].isChecked = !updatedTableData[index].isChecked;
    setMockTableData(updatedTableData);

    const selectedAccordionData = item;

    const selectedData = {
      accordionData: accordionIndexValue,
      tableData: updatedTableData[index],
    };

    addToBasketCallback(selectedData);
  };

  const [reqQtyValues, setReqQtyValues] = useState(mockTableData.map(() => ""));

  const handleReqQtyChange = (index, value) => {
    const updatedMockTableData = [...mockTableData];
    updatedMockTableData[index].reqQty = value;
    setMockTableData(updatedMockTableData);
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
                  <th
                    style={{
                      textAlign: "left",
                      position: "relative",
                      left: "10px",
                    }}
                  >
                    {mockTableData[0]?.item ? "" : <input type="checkbox" />}
                  </th>
                  <th style={{ textAlign: "center" }}>Part Name</th>
                  <th style={{ textAlign: "left" }}>Maker&apos;s Ref. No</th>
                  <th style={{ textAlign: "left" }}>Drawing Pos</th>
                  <th style={{ textAlign: "left" }}>UOM</th>
                  <th style={{ textAlign: "left" }}>ROB</th>
                  <th style={{ textAlign: "left" }}>Pending Orders</th>
                  <th style={{ textAlign: "left" }}>Req Qty</th>
                  <th style={{ textAlign: "left" }}>Last Purchase Cost(USD)</th>
                </tr>
              </thead>
              <tbody>
                {mockTableData.map((rowData, rowIndex) => {
                  const item = accordionData.find(
                    (accordionItem) => accordionItem.id === rowData.id
                  );
                  return (
                    <tr
                      key={rowIndex}
                      style={{ borderBottom: "1px solid #DCE1E5" }}
                    >
                      <td style={{ width: "5%", padding: "9px" }}>
                        {rowData?.item ? (
                          rowData?.item
                        ) : (
                          <input
                            type="checkbox"
                            checked={rowData.isChecked}
                            onChange={() =>
                              handleCheckboxChange(rowIndex, item)
                            }
                          />
                        )}
                      </td>
                      <td style={{ width: "20%", padding: "9px" }}>
                        {rowData.partName}
                      </td>
                      <td style={{ width: "15%" }}>{rowData.makerRef}</td>
                      <td style={{ width: "15%" }}>{rowData.drawingPos}</td>
                      <td style={{ width: "10%" }}>{rowData.uom}</td>
                      <td style={{ width: "10%" }}>{rowData.rob}</td>
                      <td style={{ width: "10%" }}>{rowData.pendingOrders}</td>
                      <td style={{ width: "9%" }}>
                        <input
                          type="number"
                          value={rowData.reqQty > 0 ? rowData.reqQty : 0}
                          onChange={(e) =>
                            handleReqQtyChange(rowIndex, e.target.value)
                          }
                          style={{ width: "50%" }}
                        />
                      </td>
                      <td style={{ width: "15 %" }}>{rowData.lastPurchase}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};
