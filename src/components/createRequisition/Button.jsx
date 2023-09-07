import Link from 'next/link';
import Button from '@mui/material/Button';
import React, { ReactNode } from 'react';

// interface ButtonProps {
//   children: ReactNode;
//   linkTo: string;
// }

const CTAButton = ({ children, linkTo,vesselName }) => {
  const buttonStyle = {
    backgroundColor: '#68DA6A', 
    borderRadius:'50px',
    color:'black',
    fontWeight:'700',
    height:'47px',
    cursor: vesselName?.length === 0 ? 'not-allowed' : 'pointer',
    '&:hover': {
      transform: 'scale(0.95)',
      fontWeight: '700',
    },
  };
  return (
    <div>
      <Link href={`${vesselName?.length==0?'':linkTo}`}>
      <Button
            variant="contained"
            color="primary"
            className="w-[500px] text-center rounded-full cta-button"
            style={buttonStyle}
            sx={{"@media (max-width: 768px)": {
              height: "270px",
            },
            "@media (max-width: 480px)": {
              width: "120px",
            }, }}
          >
            {children}
          </Button>
      </Link>
    </div>
  );
};

export default CTAButton;
