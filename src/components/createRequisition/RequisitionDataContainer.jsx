import React from 'react'
import { MdOutlineDirectionsBoat } from "react-icons/md";
import {ImLoop2} from 'react-icons/im'

const RequisitionDataContainer = ({title,heading,height,width,desc1,desc1Value,desc2,desc2Value,desc3,desc3Value}) => {
  return (
    <div
                className={`flex flex-col mt-5 bg-white shadow-lg rounded-lg h-[${height}] w-[${width}]`}
                style={{ borderRadius: "15px" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1542986386-660ccbbedaf8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hpcHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
                  alt="ship"
                  className="h-[130px] w-full"
                />
                <div className="flex flex-col gap-2 ml-4 mt-4 ">
                  <p className="font-semibold bg-[#80E7FF] px-2 py-1 rounded-md max-w-max flex flex-row items-center text-[#1b6697]">
                    <MdOutlineDirectionsBoat className="relative" />
                    <span className="ml-1">{title}</span>
                  </p>
                  <div className="flex flex-row items-center ml-8">
                    <ImLoop2/>
                  <h2 className="text-[#244845] mt-1 uppercase font-semibold ml-2">{heading}</h2>
                  </div>
                  <div className="flex flex-row justify-evenly">
                  <p className="text-[#244845]">{desc1}</p>
                  <h3 className="font-bold">{desc1Value}</h3>
                  </div>
                  <div className="flex flex-row justify-around">
                  <p className="text-[#244845]">{desc2}</p>
                  <h3 className="font-bold">{desc2Value}</h3>
                  </div>
                  <div className="flex flex-row justify-around">
                  <p className="text-[#244845]">{desc3}</p>
                  <h3 className="font-bold">{desc3Value}</h3>
                  </div>
                </div>
              </div>
  )
}

export default RequisitionDataContainer
