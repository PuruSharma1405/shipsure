"use client";
import React, { useState } from "react";
import {
  AiOutlineSearch,
  AiOutlineClose,
  AiOutlineArrowRight,
  AiOutlineShoppingCart,
  AiOutlineRight,
} from "react-icons/ai";
import { CgMenuGridO } from "react-icons/cg";
import ProfileDropDown from "../components/createRequisition/ProfileDropDown";
import { IoMdNotificationsOutline } from "react-icons/io";
import RequisitionDataContainer from "../components/createRequisition/RequisitionDataContainer";
import { useSelector } from "react-redux";
import HorizontalLinearStepper from "../components/createRequisitionSpares/Stepper";
import { OrderSummaryAccordion } from "../components/summary/SummaryAccordion";
const OrderSummary = () => {
  // const itemName = useSelector();
  const itemValue = localStorage.getItem("itemName");
  const [selectedItems, setSelectedItems] = useState([]);
  const [basketValues, setBasketValues] = useState([]);

  const notes = `SUPPLY CERTIFICATE item 1. Width - 3 mtrs Length - 2,5 mtrs Dear Ms Jayme: Good day I will ro-back to re-order, tks. Thanks & Best Regards.Luo Pei Xin Fleet Superintendent Vships Asia Group Pte Ltd As agent and manager only for and on behalf of Owner Tel: 65-68850610DID: 65-68850345 Mob: 65-98506724 Emails:luo.peixin@vships.com Fleet-2 From: Jayme - Glazar, Ederlyn Sent: Tuesday, 29 August, 20179:47 AM To: PeiXin, Luo Subject: FW: BRIGHTOL LEAGUE CANCEL PO 3658-01255 & 3658-01245 Dear Luo, Kindly cancel following PO/ roll...`;

  // console.log("itemNameeeee", itemName);


  const addToBasketCallback = (accordionData) => {
    setSelectedItems([...selectedItems, { accordionData }]);
  };

  console.log("selectedComponent", selectedItems);


  console.log("basketValues", basketValues);

  return (
    <div
      className="h-[100vh]  relative w-[100vw] bg-[#FFFFFF] overflow-x-hidden overflow-y-auto"
    >
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
          <div className=" w-8/12 mt-7 ml-36 relative">
            <div className="flex flex-row justify-between">
              <h1 className="text-2xl font-semibold">
                Create Requisition-{itemValue}
              </h1>
              <AiOutlineClose style={{ fontSize: "25px" }} />
            </div>
            <HorizontalLinearStepper />
            <div
              className="bg-[#F2EEEB] pl-20 pt-5 pb-16 mt-10 mb-20"
              style={{ borderRadius: "20px" }}
            >
              <div className="flex flex-col mt-5">
                <p className="ml-2" style={{ fontWeight: "600" }}>
                  Order Details
                </p>
              </div>
              <div className="flex flex-col mt-5">
                <p className="ml-2" style={{ color: "#04487F", fontWeight: '500' }}>
                  GARZA FLORES HERMANOS
                </p>
              </div>
              <div className="flex flex-row justify-left w-full relative">
                <div className="flex flex-col mt-5">
                  <p style={{ color: "#697E85" }} className="ml-2">
                    Account Code
                  </p>
                  <div className="flex flex-row items-center">
                    <p className="ml-2">AG0309 - GARZA FLORES HERMANOS</p>
                  </div>
                  <div className="w-[310px] mt-2"></div>
                </div>
                <div className="flex flex-col mt-5">
                  <p style={{ color: "#697E85" }} className="ml-2">
                    Project
                  </p>
                  <div className="flex flex-row ">
                    <p className="ml-2">Lorem Ipsum Dolor Sit Amet</p>
                  </div>
                  <div className="w-[310px] mt-2"></div>
                </div>
                <div className="flex flex-col mt-5">
                  <p style={{ color: "#697E85" }} className="ml-2">
                    Spare Part Type
                  </p>
                  <div className="flex flex-row ">
                    <p className="ml-2">OEM- Original Equipment manufacturer</p>
                  </div>
                  <div className="w-[310px] mt-2"></div>
                </div>
                <div className="flex flex-col mt-5">
                  <p style={{ color: "#697E85" }} className="ml-2">
                    Priority
                  </p>
                  <div className="flex flex-row ">
                    <p className="ml-2">Normal</p>
                  </div>
                  <div className="w-[310px] mt-2"></div>
                </div>
              </div>

              <div className="flex flex-row justify-left w-full mt-1 relative">
                <div className="flex flex-col mt-5">
                  <p style={{ color: "#697E85" }} className="ml-2">
                    Department
                  </p>
                  <div className="flex flex-row items-center">
                    <p className="ml-2">-</p>
                  </div>
                  <div className="w-[310px] mt-2"></div>
                </div>
                <div className="flex flex-col mt-5">
                  <p style={{ color: "#697E85" }} className="ml-2">
                    Hazaourdous Material Requested
                  </p>
                  <div className="flex flex-row ">
                    <p className="ml-2">No</p>
                  </div>
                  <div className="w-[310px] mt-2"></div>
                </div>
                <div className="flex flex-col mt-5">
                  <p style={{ color: "#697E85" }} className="ml-2">
                    Required For Dry Dock
                  </p>
                  <div className="flex flex-row ">
                    <p className="ml-2">No</p>
                  </div>
                  <div className="w-[310px] mt-2"></div>
                </div>
              </div>
              <div className="w-[310px] mt-2"></div>
              <div className="w-[310px] mt-2"></div>
              <div className="flex flex-col mt-5">
                <p className="ml-2" style={{ fontWeight: "600" }}>
                  Delivery Details
                </p>
              </div>

              <div className="flex flex-row justify-left w-full mt-1 relative">
                <div className="flex flex-col mt-5">
                  <p style={{ color: "#697E85" }} className="ml-2">
                    Requested Delivery Date
                  </p>
                  <div className="flex flex-row items-center">
                    <p className="ml-2">30 Aug 2023</p>
                  </div>
                  <div className="w-[310px] mt-2"></div>
                </div>
                <div className="flex flex-col mt-5">
                  <p style={{ color: "#697E85" }} className="ml-2">
                    Requested Delivery Port
                  </p>
                  <div className="flex flex-row ">
                    <p className="ml-2">Lorem Ipsum Dolor Sit Amet</p>
                  </div>
                  <div className="w-[310px] mt-2"></div>
                </div>
              </div>
              <div className="mt-9">
                <div className="flex flex-col mt-5 mr-20">
                  <p style={{ color: "#697E85" }} className="ml-2">
                    Notes
                  </p>
                  <div className="flex flex-row items-center">
                    <textarea
                      placeholder=""
                      className="bg-transparent h-32 w-full  border border-black focus:outline-none"
                      value={notes}
                      disabled
                    />
                  </div>
                  <div className="w-[310px] mt-2"></div>
                </div>
              </div>
            </div>
            <OrderSummaryAccordion addToBasketCallback={addToBasketCallback} />
            <div className="flex flex-row uppercase justify-center items-center p-2 w-[106px] text-center rounded-full font-bold text-white bg-[#11110E] absolute -bottom-14 right-0 hover:scale-95 transition-all duration-200">
              <p className="text-[14px]">Finish</p>
              <AiOutlineArrowRight className="ml-1" />
            </div>
          </div>
          <div className="w-4/12 bg-[#E8ECED] ml-[50px] h-[100vh]">
            <div className="flex flex-row flex-wrap mt-[60px] ml-[50px]">
              <RequisitionDataContainer
                height="320px"
                width="370px"
                title="Seaways Athens-9597109"
                heading="Financials"
                desc1="Budget:Actual YTD"
                desc1Value="1.95M-2.34M"
                desc2="Accrual"
                desc2Value="-39.46%"
                desc3="Variance"
                desc3Value="386.1K"
                basketValues={basketValues}
              />
              <div
                className="flex flex-col mt-5 bg-white shadow-lg rounded-lg  w-[350px] h-[250px]"
                style={{ borderRadius: "15px" }}
              >
                <div className="flex flex-row  justify-between items-center m-5">
                  <div className="flex flex-row ">
                    <AiOutlineShoppingCart style={{ fontSize: "25px" }} />
                    <h2 className="uppercase font-semibold ml-1">
                      Order Basket
                    </h2>
                  </div>
                  <p className="font-bold">$0.00</p>
                </div>
                <div className="flex flex-row justify-between ml-10">
                  <p className="font-semibold">{basketValues?.length} item</p>
                  <h3 className="relative right-4 font-bold">estimated</h3>
                </div>
                <div
                  className="h-[10px]"
                  style={{
                    borderBottom: "1px solid #CDD6DB",
                    width: "80%",
                    margin: "0 auto",
                  }}
                ></div>
                <div className="flex flex-row  justify-between items-center m-5">
                  <div className="flex flex-row ">
                    <AiOutlineRight style={{ fontSize: "25px" }} />
                    <h2 className="uppercase font-semibold ml-1">
                      {basketValues[0]?.accordionData?.accordionData?.name ||
                        "M/E TURBOCHARGER#2"}
                    </h2>
                  </div>
                  <p className="font-bold">{basketValues?.length} item</p>
                </div>
                <div className="flex flex-row justify-around ml-3">
                  <p>Maker</p>
                  <p>
                    {basketValues[0]?.accordionData?.accordionData?.Maker ||
                      "ABB TURBO SYSTEM AG"}
                  </p>
                </div>
                <div className="flex flex-row justify-around mt-3 relative left-2">
                  <p>Type</p>
                  <p>
                    {basketValues[0]?.accordionData?.accordionData?.Serial ||
                      "TPL77-B11"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
