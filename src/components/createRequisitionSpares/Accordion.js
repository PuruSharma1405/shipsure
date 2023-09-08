import React, { useEffect, useState } from "react"
import Accordion from "@mui/material/Accordion"
import AccordionDetails from "@mui/material/AccordionDetails"
import AccordionSummary from "@mui/material/AccordionSummary"
import Typography from "@mui/material/Typography"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { selectClasses } from "@mui/material"
import { setVivItems } from '../../redux/reducers/requisitionSlice'
import { useDispatch } from "react-redux"
var groupArray = require('group-array')

export const AccordionComponent = ({ addToBasketCallback,accordionDetails = [],setAccordionDetails }) => {
  const [expanded, setExpanded] = useState(false)
  const dispatch=useDispatch()
  const [expandedAccordionIndex, setExpandedAccordionIndex] = useState(null)
  const [accordionIndexValue, setAccordionIndexValue] = useState()
  const [newStockValues, setNewStockValues] = useState(
    accordionDetails?.map(() => 0)
  )

  const handleChange = (panel, index) => (event, isExpanded) => {
    console.log("expanded", expanded, panel)
    setExpanded(isExpanded ? panel : false)
    console.log('panel',panel)
    setAccordionIndexValue(isExpanded ? accordionDetails[panel.slice(-1)] : null)
  }

  console.log("accordionIndexValue", accordionIndexValue)

  const handleCheckboxChange = (index, item) => {
  
    item.isChecked = !item.isChecked;

    setAccordionDetails([].concat(accordionDetails))

    // const updatedAccordionDetails = [...accordionDetails]
  
    // const updatedItem = { ...updatedAccordionDetails[index] }
  
    // updatedItem.isChecked = !updatedItem.isChecked
  
    // updatedAccordionDetails[index] = updatedItem
  
    // const selectedData = {
    //   accordionData: accordionIndexValue,
    //   tableData: updatedItem,
    // }
    // console.log('selectedData', selectedData)
  
    // setAccordionDetails(updatedAccordionDetails)


    const cloneAccordionDetails = JSON.parse(JSON.stringify(accordionDetails));

    const selectedItems =   cloneAccordionDetails.filter(comp => comp.SpareParts.filter(x=>x.isChecked).length> 0)
                                            .map((c) => {  c.SpareParts = c.SpareParts.filter(x=>x.isChecked);  return c;})

    addToBasketCallback(selectedItems);
  }
  
  
  


  return (
    <div>
      {accordionDetails?.slice(0,10)?.map((item, index) => {
        console.log('item',item)
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
              {item.VIV_NAME}
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
                  <th style={{ textAlign: "left" }}>Maker&apos; Ref. No</th>
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
                  console.log(rowData);
                  return (
                    <tr
                      key={rowIndex}
                      style={{ borderBottom: "1px solid #DCE1E5" }}
                    >
                      <td style={{ width: "5%", padding: "9px" }}>
                        <input
                          type="checkbox"
                          checked={rowData.isChecked}
                          onChange={() => handleCheckboxChange(rowIndex, rowData)}
                        />
                      </td>
                      <td style={{ width: "20%", padding: "9px" }}>
                        {rowData?.VIV_NAME}
                      </td>
                      <td style={{ width: "15%" }}>{rowData?.VIV_MakersRef}</td>
                      <td style={{ width: "15%",textAlign:'center' }}>{rowData?.VIV_DrawingPos?rowData?.VIV_DrawingPos:'-'}</td>
                      <td style={{ width: "10%" }}>{rowData.MUN_ID}</td>
                      <td style={{ width: "10%" }}>{rowData.VIV_ROB}</td>
                      <td style={{ width: "10%" }}>{rowData.PendingOrders}</td>
                      <td style={{ width: "9%" }}>
                        <input
                          type="number"
                          value={rowData.RequestQuantity ||0}
                          style={{ width: "50%" }}
                          onChange={(event)=> {
                            rowData.RequestQuantity = event.target.value;
                            setAccordionDetails([].concat(accordionDetails))
                          }}
                        />
                      </td>
                      <td style={{ width: "15 %" }}>{rowData.EstimatePrice}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </AccordionDetails>
        </Accordion>
       )
})}
    </div>
  )
}
