// import React from "react";
// import "./Accordion.css";
// import {RiArrowDropDownLine} from 'react-icons/ri'
// export const Accordion = () => {
//   // Mock data
//   const accordionData = [
//     {
//       name: "M/E TURBOCHARGER#1",
//       Maker: "ABB TURBO SYSTEM AG",
//       Serial: "HT 487167/HT 487168",
//       Type: "TPL77-B11",
//     },
//     {
//       name: "M/E TURBOCHARGER#1",
//       Maker: "ABB TURBO SYSTEM AG",
//       Serial: "HT 487167/HT 487168",
//       Type: "TPL77-B11",
//     },
//     {
//       name: "M/E TURBOCHARGER#1",
//       Maker: "ABB TURBO SYSTEM AG",
//       Serial: "HT 487167/HT 487168",
//       Type: "TPL77-B11",
//     },
//     {
//       name: "M/E TURBOCHARGER#1",
//       Maker: "ABB TURBO SYSTEM AG",
//       Serial: "HT 487167/HT 487168",
//       Type: "TPL77-B11",
//     },
//     {
//       name: "M/E TURBOCHARGER#1",
//       Maker: "ABB TURBO SYSTEM AG",
//       Serial: "HT 487167/HT 487168",
//       Type: "TPL77-B11",
//     },
//     {
//       name: "M/E TURBOCHARGER#1",
//       Maker: "ABB TURBO SYSTEM AG",
//       Serial: "HT 487167/HT 487168",
//       Type: "TPL77-B11",
//     },
//     // Add more mock data items here as needed
//   ];

//   return (
//     <div>
//       {accordionData.map((item, index) => (
//         <div className="element" key={index}>
//           <div className="frame">
//             <div className="div">
//               <div className="frame-wrapper">
//                 <div className="div-wrapper">
//                   <div className="text-wrapper">{item.name}</div>
//                 </div>
//               </div>
//               <div className="frame-2">
//                 <div className="frame-3">
//                   <div className="frame-4">
//                     <div className="text-wrapper-2">Maker</div>
//                     <div className="frame-5">
//                       <div>{item.Maker}</div>
//                       <img
//                         className="vector"
//                         alt="Vector"
//                         src="https://generation-sessions.s3.amazonaws.com/16938a4aae7b9cccc81e092b64a7bfe0/img/vector.svg"
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="frame-3">
//                   <div className="frame-4">
//                     <div className="text-wrapper-2">Serial</div>
//                     <div>{item.Serial}</div>
//                   </div>
//                 </div>
//                 <div className="frame-3">
//                   <div className="frame-4">
//                     <div className="text-wrapper-2">Type</div>
//                     <div className="text-wrapper-5">{item.Type}</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <RiArrowDropDownLine style={{fontSize:'42px',color:'#00704B'}}/>
//         </div>
//       ))}
//     </div>
//   );
// };

import React, { useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { RiArrowDropDownLine } from 'react-icons/ri';

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
    }
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
            <Typography sx={{ width: '25%', flexShrink: 0 }}>
              {item.name}
            </Typography>
            <Typography sx={{ width:'25%',color: 'text.secondary' }}>
              <p>Maker</p>
              <p className="mt-1 font-semibold">{item.Maker}</p>
              </Typography>
              <Typography sx={{ width:'25%',color: 'text.secondary' }}>
              <p>Serial</p>
              <p className="mt-1 font-semibold">{item.Serial}</p>
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
              <p>Type</p>
              <p className="mt-1 font-semibold">{item.Type}</p>
              </Typography>
              
          </AccordionSummary>
          
          <AccordionDetails>
            lorem ipsum
</AccordionDetails>

        </Accordion>
      ))}
    </div>
  );
};

