import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { selectClasses } from "@mui/material";
import { setVivItems } from '../../redux/reducers/requisitionSlice';
import { useDispatch } from "react-redux";
export const AccordionComponent = ({ addToBasketCallback,accordionDetails,setAccordionDetails }) => {
  const [expanded, setExpanded] = useState(false);
  const dispatch=useDispatch();
  const [expandedAccordionIndex, setExpandedAccordionIndex] = useState(null);
  const [accordionIndexValue, setAccordionIndexValue] = useState();
  const [newStockValues, setNewStockValues] = useState(
    accordionDetails?.map(() => 0)
  );

  const handleChange = (panel, index) => (event, isExpanded) => {
    console.log("expanded", expanded, panel);
    setExpanded(isExpanded ? panel : false);
    console.log('panel',panel);
    setAccordionIndexValue(accordionDetails[panel.slice(-1)]);
  };

  console.log("accordionIndexValue", accordionIndexValue);

  const handleCheckboxChange = (index, item) => {
    console.log("index,iten", index, item);
    const updatedTableData = [...accordionDetails];
    updatedTableData[index].isChecked = !updatedTableData[index].isChecked;

    const selectedData = {
      accordionData: accordionIndexValue,
      tableData: updatedTableData[index],
    };
    console.log('selectedData',selectedData);

    addToBasketCallback(selectedData);

    // dispatch(setVivItems(selectedData))
  };


  return (
    <div>
      {accordionDetails?.slice(0,10)?.map((item, index) => {
        console.log('item',item);
       return( <Accordion
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}bh-content`}
            id={`panel${index}bh-header`}
          >
            <Typography sx={{ width: "30%", flexShrink: 0 }}>
              {item.VIV_Name}
            </Typography>
            <Typography sx={{ width: "20%", color: "text.secondary" }}>
              Maker
              <br />
              <span className="mt-1 font-semibold">{item.Maker?item.Maker:'-'}</span>
            </Typography>
            <Typography sx={{ width: "25%", color: "text.secondary" }}>
              Serial
              <br />
              <span className="mt-1 font-semibold">{item.SerialNo?item.SerialNo:'-'}</span>
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Type
              <br />
              <span className="mt-1 font-semibold">{item.CidId?item.CidId:'-'}</span>
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
                    <input type="checkbox" />
                  </th>
                  <th style={{ textAlign: "center" }}>Part Name</th>
                  <th style={{ textAlign: "left" }}>Maker's Ref. No</th>
                  <th style={{ textAlign: "left" }}>Drawing Pos</th>
                  <th style={{ textAlign: "left" }}>UOM</th>
                  <th style={{ textAlign: "left" }}>ROB</th>
                  <th style={{ textAlign: "left" }}>Pending Orders</th>
                  <th style={{ textAlign: "left" }}>Req Qty</th>
                  <th style={{ textAlign: "left" }}>Last Purchase Cost(USD)</th>
                </tr>
              </thead>
              <tbody>
                {accordionDetails?.slice(0,8)?.map((rowData, rowIndex) => {
                  const item = accordionDetails?.find(
                    (accordionItem) => accordionItem.id === rowData.id
                  );
                  console.log('rowData',rowData);
                  return (
                    <tr
                      key={rowIndex}
                      style={{ borderBottom: "1px solid #DCE1E5" }}
                    >
                      <td style={{ width: "5%", padding: "9px" }}>
                        <input
                          type="checkbox"
                          checked={rowData.isChecked}
                          onChange={() => handleCheckboxChange(rowIndex, item)}
                        />
                      </td>
                      <td style={{ width: "20%", padding: "9px" }}>
                        {rowData?.VIV_Name}
                      </td>
                      <td style={{ width: "15%" }}>{rowData?.VIV_MakersRef}</td>
                      <td style={{ width: "15%",textAlign:'center' }}>{rowData?.VIV_DrawingPos?rowData?.VIV_DrawingPos:'-'}</td>
                      <td style={{ width: "10%" }}>{rowData.Unit}</td>
                      <td style={{ width: "10%" }}>{rowData.ROB}</td>
                      <td style={{ width: "10%" }}>0</td>
                      <td style={{ width: "9%" }}>
                        <input
                          type="number"
                          value={rowData.NewStock > 0 ? rowData.NewStock : 0}
                          style={{ width: "50%" }}
                        />
                      </td>
                      <td style={{ width: "15 %" }}>0</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </AccordionDetails>
        </Accordion>
       )
})}
    </div>
  );
};
