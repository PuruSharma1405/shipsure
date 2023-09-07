import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import { MdOutlineDirectionsBoat } from 'react-icons/md';
import Image from 'next/image';
import SquareArrow from '../../../src/images/SquareArrow.png';
import { suggestedRequisitionsData } from '../../app/data/suggstedRequisitionsData';

interface SuggestedRequisition {
  map(arg0: (currData: any, index: any) => React.JSX.Element): React.ReactNode;
  requisitionName: string;
  title: string;
  desc1: string;
  desc2: string;
  desc3: string;
  addOn: string;
}

const SuggestedRequisitions: React.FC = () => {
  const [suggestedRequisitions, setSuggestedRequisitions] = useState<SuggestedRequisition>(
    suggestedRequisitionsData
  );

  console.log('suggestedRequisitions', suggestedRequisitions);
  return (
    <Box bgcolor="#E8ECED" width="100vw" py={2} minHeight="45vh" display="flex">
      <Box  mx="auto" className="w-10/12">
        <Typography variant="h5" fontWeight="bold">
          Suggested Requisitions
        </Typography>
        <Grid container spacing={2} style={{marginTop:'5px'}}>
          {suggestedRequisitions?.map((currData, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={2.4}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" color="#208262" className='w-full flex flex-row items-center suggested-requisition-name'>
                    {currData?.requisitionName}
                      <Image src={SquareArrow} alt="Search" height={40} width={40} />
                  </Typography>
                  <Box mt={2} display="flex" flexDirection="column" gap={2}>
                    <Typography variant="subtitle1" color="#1b6697" style={{ display: 'flex'}} className='suggested-requisition-title'>
                      <MdOutlineDirectionsBoat className="relative suggested-requisition-title-icon" />
                      <span className="ml-1 suggested-requisition-title-data">{currData?.title}</span>
                    </Typography>
                    <Typography variant="body1" color="#244845">{currData?.desc1}</Typography>
                    <Typography variant="body1" color="#244845">{currData?.desc2}</Typography>
                    <Typography variant="body1" color="#244845">{currData?.desc3}</Typography>
                    <Typography variant="body1" color="#1E1E19" className='underline'>{currData?.addOn}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default SuggestedRequisitions;

