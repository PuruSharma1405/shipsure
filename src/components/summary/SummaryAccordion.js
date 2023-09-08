import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LuFileSpreadsheet } from "react-icons/lu";
import { useSelector } from "react-redux";
import { selectRequisitionState } from "@/redux/reducers/requisitionSlice";


export const OrderSummaryAccordion = () => {
  const [expanded, setExpanded] = useState(false);
  const [expandedAccordionIndex, setExpandedAccordionIndex] = useState(null);
  const [accordionIndexValue, setAccordionIndexValue] = useState();

  const handleChange = (panel, index) => (event, isExpanded) => {
    console.log("expanded", expanded, panel);
    setExpanded(isExpanded ? panel : false);
    console.log("panel", panel.slice(-1), accordionData[panel.slice(-1)]);
    setAccordionIndexValue(accordionData[panel.slice(-1)]);
  };
  const requisitionState = useSelector(selectRequisitionState);
  console.log("accordionIndexValue", accordionIndexValue);

  const accordionData = requisitionState?.itemsDetails;
  //  [
  //   {
  //     id: 1,
  //     name: "M/E TURBOCHARGER#1",
  //     Maker: "ABB TURBO SYSTEM AG",
  //     Serial: "HT 487167/HT 487168",
  //     Type: "TPL77-B11",
  //   },
  //   {
  //     id: 2,
  //     name: "M/E TURBOCHARGER#2",
  //     Maker: "ABB TURBO SYSTEM AG",
  //     Serial: "HT 487167/HT 487168",
  //     Type: "TPL77-B11",
  //   },
  //   {
  //     id: 3,
  //     name: "M/E TURBOCHARGER#3",
  //     Maker: "ABB TURBO SYSTEM AG",
  //     Serial: "HT 487167/HT 487168",
  //     Type: "TPL77-B11",
  //   },
  //   {
  //     id: 4,
  //     name: "M/E TURBOCHARGER#4",
  //     Maker: "ABB TURBO SYSTEM AG",
  //     Serial: "HT 487167/HT 487168",
  //     Type: "TPL77-B11",
  //   },
  //   {
  //     id: 5,
  //     name: "M/E TURBOCHARGER#5",
  //     Maker: "ABB TURBO SYSTEM AG",
  //     Serial: "HT 487167/HT 487168",
  //     Type: "TPL77-B11",
  //   },
  // ];

  const [mockTableData, setMockTableData] = useState([
    {
      id: 1,
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
      id: 2,
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
      id: 3,
      partName: "AXIAL BEARING",
      makerRef: "32104",
      drawingPos: "11.2",
      uom: "pcs",
      rob: "0",
      pendingOrders: "4",
      reqQty: "10",
      lastPurchase: "0",
    },
    {
      id: 4,
      partName: "BEARING BUSH",
      makerRef: "32104",
      drawingPos: "11.2",
      uom: "pcs",
      rob: "0",
      pendingOrders: "4",
      reqQty: "10",
      lastPurchase: "98",
    },
    {
      id: 5,
      partName: "BEARING CASINO",
      makerRef: "32104",
      drawingPos: "11.2",
      uom: "pcs",
      rob: "0",
      pendingOrders: "4",
      reqQty: "10",
      lastPurchase: "99767",
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
    },
  ]);

  const handleCheckboxChange = (index, item) => {
    console.log("index,iten", index, item);
    const updatedTableData = [...mockTableData];
    updatedTableData[index].isChecked = !updatedTableData[index].isChecked;
    setMockTableData(updatedTableData);

    const selectedData = {
      accordionData: accordionIndexValue,
      tableData: updatedTableData[index],
    };

    // addToBasketCallback(selectedData);
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
              {item.VIV_NAME}
            </Typography>
            <Typography sx={{ width: "25%", color: "text.secondary" }}>
              Maker
              <br />
              <span className="mt-1 font-semibold">{item.Maker}</span>
            </Typography>
            <Typography sx={{ width: "25%", color: "text.secondary" }}>
              Serial
              <br />
              <span className="mt-1 font-semibold">{item.SerialNo}</span>
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
                  ></th>
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
                {item?.SpareParts?.map((rowData, rowIndex) => {
                
                  return (
                    <tr
                      key={rowIndex}
                      style={{ borderBottom: "1px solid #DCE1E5" }}
                    >
                      <td style={{ width: "5%", padding: "9px" }}>
                        <LuFileSpreadsheet />
                      </td>
                      <td style={{ width: "20%", padding: "9px" }}>
                        {rowData.VIV_NAME}
                      </td>
                      <td style={{ width: "15%" }}>{rowData.VIV_MakersRef}</td>
                      <td style={{ width: "15%" }}>{rowData?.VIV_DrawingPos?rowData?.VIV_DrawingPos:'-'}</td>
                      <td style={{ width: "10%" }}>{rowData.MUN_ID}</td>
                      <td style={{ width: "10%" }}>{rowData.VIV_ROB}</td>
                      <td style={{ width: "10%" }}>{rowData.PendingOrders}</td>
                      <td style={{ width: "9%" }}>
                      {rowData.RequestQuantity > 0 ? rowData.RequestQuantity : 0}
                        {/* <input
                          type="text"
                          value={rowData.RequestQuantity > 0 ? rowData.RequestQuantity : 0}
                          onChange={(e) =>{
                           return rowData.RequestQuantity = e.target.value
                            // dispatchEvent([].concat(accordionDetails))
                           } }
                          style={{ width: "50%" }}
                        /> */}
                      </td>
                      <td style={{ width: "15 %" }}>{rowData.EstimatePrice}</td>
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
