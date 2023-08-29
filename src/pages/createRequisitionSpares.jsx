"use client";
import React, { useState } from "react";
import {
  AiOutlineSearch,
  AiOutlineClose,
  AiOutlineArrowRight,
  AiOutlineShoppingCart
} from "react-icons/ai";
import { BsSearch, BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import { CgMenuGridO } from "react-icons/cg";
import CTAButton from "../components/createRequisition/Button";
import ProfileDropDown from "../components/createRequisition/ProfileDropDown";
import SideBar from "../components/common/SideBar";
import { IoMdNotificationsOutline } from "react-icons/io";
import RequisitionDataContainer from "../components/createRequisition/RequisitionDataContainer";
const CreateRequisitionSpares = () => {
  return (
    <div className="h-[100vh]  relative w-[100vw] bg-[#FFFFFF] overflow-x-hidden overflow-y-auto">
      <div className="mx-auto">
        <div className="flex justify-between w-11/12 items-center mx-auto">
          <div className="text-2xl font-bold mt-3">
            <h2>Procurement</h2>
          </div>
          <div className="search-icon mt-3 gap-3 flex items-center">
            <AiOutlineSearch style={{ fontSize: "25px" }} />
            <IoMdNotificationsOutline style={{ fontSize: "25px" }} />
            <CgMenuGridO style={{ fontSize: "25px" }} />
            <ProfileDropDown />
          </div>
        </div>
        <div className="h-full w-full flex flex-row">
          <div className="h-[90vh] w-8/12 mt-7 ml-36 relative">
            <div className="flex flex-row justify-between">
              <h1 className="text-2xl font-semibold">
                Create Requisition-Spares
              </h1>
              <AiOutlineClose style={{ fontSize: "25px" }} />
            </div>
            <div
              className="flex flex-row justify-around bg-[#F2EEEB] h-[140px] w-full mt-9"
              style={{ borderRadius: "20px" }}
            >
              <div className="flex flex-col mt-5">
                <p className="ml-2">
                  Component <sup className="text-red-500">*</sup>
                </p>
                <div className="flex flex-row items-center">
                  <input
                    type="text"
                    placeholder="Search Component"
                    className="outline-none bg-transparent ml-2 mt-2"
                  />
                  <BsSearch />
                </div>
                <div className="border border-[#052E2B] w-[310px] mt-2"></div>
              </div>
              <div className="flex flex-col mt-5">
                <p className="ml-2">Part Name</p>
                <div className="flex flex-row ">
                  <input
                    type="text"
                    placeholder="Enter Part Name"
                    className="outline-none bg-transparent ml-2 mt-2"
                  />
                </div>
                <div className="border border-[#052E2B] w-[310px] mt-2"></div>
              </div>
              <div className="flex flex-col mt-5">
                <p className="ml-2">Maker's Ref No.</p>
                <div className="flex flex-row ">
                  <input
                    type="text"
                    placeholder="Enter Maker's Ref No. "
                    className="outline-none bg-transparent ml-2 mt-2"
                  />
                </div>
                <div className="border border-[#052E2B] w-[310px] mt-2"></div>
              </div>
            </div>
            <div className="mt-20">
              <p className="text-center text-[#7B8BA3]">
                Please Select a Component to view the spares
              </p>
            </div>
            <div className="flex flex-row uppercase justify-center items-center p-2 w-[106px] text-center rounded-full font-bold text-white bg-[#11110E] absolute bottom-2 right-0 hover:scale-95 transition-all duration-200">
              <p className="text-[14px]">Next</p>
              <AiOutlineArrowRight className="ml-1" />
            </div>
          </div>
          <div className="w-4/12 bg-[#E8ECED] ml-[50px]">
            <div className="flex flex-row flex-wrap mt-[60px] ml-[50px]">
              <RequisitionDataContainer height="320px" width="370px" title="Seaways Athens-9597109" heading="Financials" desc1="Budget:Actual YTD" desc1Value="1.95M-2.34M"
              desc2="Accrual" desc2Value="-39.46%" desc3="Variance" desc3Value="386.1K"
              /> 
              <div
                className="flex flex-col mt-5 bg-white shadow-lg rounded-lg  w-[370px] h-[100px]"
                style={{ borderRadius: "15px" }}
              >
                <div className="flex flex-row  justify-between items-center m-5">
                <div className="flex flex-row ">
                  <AiOutlineShoppingCart style={{fontSize:'25px'}}/>
                  <h2 className="uppercase font-semibold ml-1">Order Basket</h2>
                </div>
                <p className="font-bold">$0.00</p>
                </div>
                <div className="flex flex-row justify-between ml-10">
                  <p className="font-semibold">0 items</p>
                  <h3 className="relative right-4 font-bold">estimated</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRequisitionSpares;
