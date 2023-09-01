import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { RiArrowDropDownLine } from "react-icons/ri";

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

          <AccordionDetails>lorem ipsum</AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};
