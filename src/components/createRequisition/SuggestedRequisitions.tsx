import { suggestedRequisitionsData } from '../../app/data/suggstedRequisitionsData';
import React, { useState } from 'react';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { MdOutlineDirectionsBoat } from 'react-icons/md';
import Image from "next/image";
import SquareArrow from "../../../src/images/SquareArrow.png"

interface SuggestedRequisition {
  requisitionName: string;
  title: string;
  desc1: string;
  desc2: string;
  desc3:string;
  addOn: string;
}

const SuggestedRequisitions: React.FC = () => {
  const [suggestedRequisitions, setSuggestedRequisitions] = useState<SuggestedRequisition[]>(
    suggestedRequisitionsData
  );

  console.log('suggestedRequisitions', suggestedRequisitions);
  return (
    <div className='bg-[#E8ECED] w-[100vw] py-2 mt-44 h-[45vh] flex justify-center items-center'>
      <div className='w-11/12 mx-auto'>
        <h3 className='text-2xl font-semibold ml-5 mt-5 suggested-requisition' style={{fontFamily:'Inter'}}>Suggested Requisitions</h3>
        <div className='flex flex-row justify-around flex-wrap suggested-requisition'>
          {suggestedRequisitions?.map((currData,index) => (
            <div
              key={index} 
              className='flex flex-col mt-5 bg-white shadow-lg rounded-lg p-4 w-[300px] h-[280px]'
            >
              <h3 className='text-xl font-bold text-[#208262] flex flex-row justify-between items-center' style={{fontSize:'1.3rem',fontFamily:'Inter'}}>
                {currData?.requisitionName}
                {/* <BsFillArrowUpRightCircleFill style={{ fontSize: '35px' }} /> */}
                <Image src={SquareArrow} alt="Search" height={40} width={40}/>
              </h3>
              <div className='mt-2 flex flex-col gap-2'>
                <p className='font-semibold bg-[#80E7FF] px-2 py-1 max-w-max flex flex-row items-center text-[#1b6697]' style={{borderRadius:'10px'}}>
                  <MdOutlineDirectionsBoat className='relative' />
                  <span className='ml-1'>{currData?.title}</span>
                </p>
                <p className='text-[#244845] mt-1' style={{fontFamily:'Inter',fontWeight:'500'}}>{currData?.desc1}</p>
                <p className='text-[#244845]' style={{fontFamily:'Inter',fontWeight:'500'}}>{currData?.desc2}</p>
                <p className='text-[#244845]' style={{fontFamily:'Inter',fontWeight:'500'}}>{currData?.desc3}</p>
                <p className='underline mt-2 text-[#1E1E19]' style={{fontFamily:'Inter',fontWeight:'600'}}>{currData?.addOn}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuggestedRequisitions;
