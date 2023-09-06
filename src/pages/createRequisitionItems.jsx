"use client";
import React, { useState, useEffect } from "react";
import {
  AiOutlineSearch,
  AiOutlineClose,
  AiOutlineArrowRight,
  AiOutlineShoppingCart,
  AiOutlineDown,
  AiOutlineRight,
} from "react-icons/ai";
import { BsSearch, BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import { CgMenuGridO } from "react-icons/cg";
import CTAButton from "../components/createRequisition/Button";
import ProfileDropDown from "../components/createRequisition/ProfileDropDown";
import { IoMdNotificationsOutline } from "react-icons/io";
import RequisitionDataContainer from "../components/createRequisition/RequisitionDataContainer";
import {
  Accordion,
  AccordionComponent,
} from "../components/createRequisitionSpares/Accordion";
import DropDown from "../components/createRequisitionSpares/DropDown";
import useOnClickOutside from "../hooks/useOnClickOutside";
// import VesselImage from "../../src/images/VesselImage.png";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import HorizontalLinearStepper from "../components/createRequisitionSpares/Stepper";
import axios from "axios";
import Link from "next/link";
import { useDispatch } from 'react-redux';
import { setItemsDetails,setVesselDetails } from "../redux/reducers/requisitionSlice";

const CreateRequisitionSpares = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [componentName, setComponentName] = useState("");
  const [partName, setPartName] = useState("");
  const [makersRefNo, setMakersRefNo] = useState("");
  const itemName = useSelector((state) => state.requisition);
  const itemValue = localStorage.getItem("itemName");
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [basketValues, setBasketValues] = useState([]);
  const [vesselBasicDetails, setVesselBasicDetails] = useState();
  const [searchComponent, setSearchComponent] = useState();
  const coyId = localStorage.getItem("coyId");
  const vesselId = localStorage.getItem("vesselId");
  const token = JSON.parse(localStorage.getItem("token"))?.access_token;
  const [showSection, setShowSection] = useState(false);
  const [showAccordion, setShowAccordion] = useState(false);
  const[accordionDetails,setAccordionDetails]=useState();
  const[currentStep,setCurrentStep]=useState(0)
  const [reqQty, setReqQty] = useState(1);
  const changeHandler = (e) => {
    setComponentName(e.target.value);
    setShowDropDown(true);
  };

  const dispatch = useDispatch()

  console.log("itemNameeeee", itemName);

  const fechingItem = (currItem) => {
    setComponentName(currItem);
    setShowDropDown(false);
  };

  const partNameChangeHandler = (e) => {
    setPartName(e.target.value);
    setShowDropDown(true);
  };

  const makersRefNoChangeHandler = (e) => {
    setMakersRefNo(e.target.value);
    setShowDropDown(true);
  };

  const addToBasketCallback = (accordionData) => {
    setSelectedItems([...selectedItems, { accordionData }]);
  };

  console.log("selectedComponent", selectedItems);

  const addToBasket = () => {
    setBasketValues(selectedItems);
    dispatch(setItemsDetails(selectedItems))
  };

  console.log("basketValues", basketValues);

  const fetchingVesselBasicDetails = async () => {
    try {
      const response = await axios.get(
        `http://192.168.201.232:3012/vessel-basic-details?VesId=${vesselId}&CoyId=${coyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setVesselBasicDetails(response?.data?.result?.recordset[0]);
    dispatch(setVesselDetails(response?.data?.result?.recordset[0]))
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchingVesselBasicDetails();
  }, []);

  const searchComponents = async () => {
    try {
      const response = await axios.get(
        `  http://192.168.201.232:3012/search-component?PageNumber=1&VesROBCondition=SYST00000004,SYST00000005&VES_ID=${vesselId}&ComponentName=${componentName}&SearchBycomponent=1&SearchConsumablesComponent=0&PageSize=100`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("responsee", response);
      setSearchComponent(response?.data?.result?.result?.recordset);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    searchComponents();
  }, [componentName]);

  const searchAccordion=()=>{
    if(componentName.length>0){
    setShowAccordion(true)
    }
    accordionValue()
  }

  const accordionValue = async () => {
    try {
      const response = await axios.get(
        `http://192.168.201.232:3012/search-component?VES_ID=${vesselId}&SearchConsumablesComponent=1&PageNumber=1&PageSize=100&ComponentName=${componentName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('responseee',response);
      setAccordionDetails(response?.data?.result?.result?.recordset)
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log('',currentStep);

  const nextStep=()=>{
    setCurrentStep(1)
  }

  useEffect(()=>{
    localStorage.setItem('currentStep',currentStep)
  },[currentStep])

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
          <div className=" w-8/12 mt-7 ml-36 relative">
            <div className="flex flex-row justify-between">
              <h1 className="text-2xl font-semibold">
                Create Requisition-{itemValue}
              </h1>
              <Link href="/createRequisition"><AiOutlineClose style={{ fontSize: "25px" }} /></Link>
            </div>
            <HorizontalLinearStepper/>
            <div
              className="flex flex-row justify-around bg-[#F2EEEB] h-[140px] w-full mt-9 relative"
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
                    value={componentName}
                    onChange={changeHandler}
                  />
                  <BsSearch onClick={searchAccordion} className="cursor-pointer"/>
                </div>
                <div className="border border-[#052E2B] w-[310px] mt-2"></div>
                {componentName.length > 0 && showDropDown && (
                  <DropDown
                    fetchingItem={fechingItem}
                    showDropDown={showDropDown}
                    setShowDropDown={setShowDropDown}
                    componentName={componentName}
                    searchComponent={searchComponent}
                    setSearchComponent={setSearchComponent}
                  />
                )}
              </div>
              <div className="flex flex-col mt-5">
                <p className="ml-2">Part Name</p>
                <div className="flex flex-row ">
                  <input
                    type="text"
                    placeholder="Enter Part Name"
                    className="outline-none bg-transparent ml-2 mt-2"
                    value={partName}
                    onChange={partNameChangeHandler}
                  />
                </div>
                <div className="border border-[#052E2B] w-[310px] mt-2"></div>
                {/* {partName.length>0 && showDropDown && <DropDown fechingItem={fechingItem} showDropDown={showDropDown} setShowDropDown={setShowDropDown} componentName={componentName}/>} */}
              </div>
              <div className="flex flex-col mt-5">
                <p className="ml-2">Maker&apos;s Ref No.</p>
                <div className="flex flex-row ">
                  <input
                    type="text"
                    placeholder="Enter Maker's Ref No. "
                    className="outline-none bg-transparent ml-2 mt-2"
                    value={makersRefNo}
                    onChange={makersRefNoChangeHandler}
                  />
                </div>
                <div className="border border-[#052E2B] w-[310px] mt-2"></div>
                {/* {makersRefNo.length>0 && showDropDown && <DropDown fechingItem={fechingItem} showDropDown={showDropDown} setShowDropDown={setShowDropDown} componentName={componentName}/>} */}
              </div>
              <div
                className="flex flex-row items-center absolute bottom-2 right-6 p-1 rounded-full"
                style={{ border: "1px solid black" }}
              >
                <p className="uppercase text-1xl ml-3 cursor-pointer" onClick={searchAccordion}>Search</p>
                <BsSearch className="ml-2 mr-3" />
              </div>
            </div>
            <div className="flex flex-row items-center justify-end mt-7">
              <IoMdAddCircleOutline style={{ fontSize: "25px" }} />
              <p
                className="ml-2 text-1xl underline font-semibold cursor-pointer"
                onClick={addToBasket}
              >
                Add To Order Basket
              </p>
            </div>
            <div className="mt-5">
              <p className="text-center text-[#7B8BA3] mb-7">
                {componentName.length === 0 && (
                  <div>Please Select a Component to view the {itemValue}</div>
                )}
              </p>
            </div>
            {showAccordion && <AccordionComponent addToBasketCallback={addToBasketCallback} accordionDetails={accordionDetails} setAccordionDetails={setAccordionDetails}/>}
            <div className="flex flex-row uppercase justify-center items-center p-2 w-[106px] text-center rounded-full font-bold text-white bg-[#11110E] absolute -bottom-14 right-0 hover:scale-95 transition-all duration-200">
              <Link href="/orderDetails"><p className="text-[14px]" onClick={nextStep}>Next</p></Link>
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
                vesselBasicDetails={vesselBasicDetails}
              />
              <div
                className="flex flex-col mt-5 bg-white shadow-lg rounded-lg  w-[350px] max-h-fit"
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
                    {showSection ? (
                      <AiOutlineDown
                        style={{ fontSize: "25px", color: "green" }}
                        onClick={() => setShowSection(!showSection)}
                      />
                    ) : (
                      <AiOutlineRight
                        style={{ fontSize: "25px", color: "green" }}
                        onClick={() => setShowSection(!showSection)}
                      />
                    )}
                    <h2 className="uppercase font-semibold ml-1 text-green-600">
                      {basketValues[0]?.accordionData?.accordionData?.VIV_Name ||
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
                    {basketValues[0]?.accordionData?.accordionData?.SerialNo ||
                      "HT 487167/HT 487168"}
                  </p>
                </div>
                {showSection &&
                  basketValues?.map((currData,index) => {
                    console.log('currDataa',currData);
                    return (
                      <div key={index} className="flex flex-col" style={{borderBottom:'1px solid grey'}}>
                        <div className="flex flex-row  justify-between items-center m-5 relative left-3">
                          <div className="flex flex-row ">
                            <h2 className="uppercase font-semibold" style={{width:'70%'}}>
                            {currData?.accordionData?.tableData?.VIV_Name}
                            </h2>
                          </div>
                          <p className="font-bold relative right-16">{currData?.accordionData?.tableData?.reqQty?currData?.accordionData+'pieces'?.tableData?.reqQty:'1 piece'} </p>
                        </div>
                        <div>
                          <div className="flex flex-row justify-around">
                            <p>Maker&apos;s Ref</p>
                            <p>Drawing Pos</p>
                          </div>
                          <div className="flex flex-row justify-around mt-5 font-semibold items-center relative right-5">
                            <p className="relative mb-1 left-3">{currData?.accordionData?.tableData?.VIV_MakersRef}</p>
                            <p>{currData?.accordionData?.tableData?.VIV_DrawingPos?currData?.accordionData?.tableData?.VIV_DrawingPos:'-'}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRequisitionSpares;
