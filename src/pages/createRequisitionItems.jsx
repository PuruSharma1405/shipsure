"use client";
import React, { useState, useEffect, useRef } from "react";
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
import { setItemsDetails, setVesselDetails } from "../redux/reducers/requisitionSlice";
import { RightPanelSection } from '../components/common/order-basket'

const CreateRequisitionSpares = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [componentName, setComponentName] = useState("");
  const [componentId, setComponentId] = useState("");
  const [partName, setPartName] = useState("");
  const [makersRefNo, setMakersRefNo] = useState("");
  const itemName = useSelector((state) => state.requisition);
  const itemValue = localStorage.getItem("itemName");
  const [selectedData, setSelectedData] = useState([]);
  const [basketValues, setBasketValues] = useState([]);
  const [vesselBasicDetails, setVesselBasicDetails] = useState();
  const [searchComponent, setSearchComponent] = useState();
  const coyId = localStorage.getItem("coyId");
  const vesselId = localStorage.getItem("vesselId");
  const token = JSON.parse(localStorage.getItem("token"))?.access_token;
  const [showSection, setShowSection] = useState(false);
  const [showAccordion, setShowAccordion] = useState(false);
  const [accordionDetails, setAccordionDetails] = useState();
  const [currentStep, setCurrentStep] = useState(0)
  const myRef = useRef("")
  const [reqQty, setReqQty] = useState(1);
  // const [expandSectionIndex, setExpandSectionIndex] = useState(null);
  const changeHandler = (e) => {
    setComponentName(e.target.value);
    setShowDropDown(true);
  };

  const dispatch = useDispatch()

  console.log("itemNameeeee", itemName);

  const fechingItem = (currItem) => {
    setComponentName(currItem?.ComponentName);
    setComponentId(currItem?.ComponentId);
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
  };

  // const showHideSection = (index) => {
  //   if (expandSectionIndex === index) {
  //     setExpandSectionIndex(null)
  //   } else {
  //     setExpandSectionIndex(index);
  //   }
  // };

  // const getTotalCost = (values = []) => {
  //   let total = 0;

  //   for (const value of values) {
  //     for (const part of value.SpareParts) {
  //       total += (part.RequestQuantity ? part.RequestQuantity : 0 )* part.EstimatePrice;
  //     }
  //   }
  //   return total ? total.toFixed(2) : 0;
  // }



  const addToBasket = () => {
    const cloneAccordionDetails = JSON.parse(JSON.stringify(accordionDetails));
    const selectedItems = cloneAccordionDetails.filter(comp => comp.SpareParts.filter(x => x.isChecked).length > 0).map((c) => { c.SpareParts = c.SpareParts.filter(x => x.isChecked); c.showSection = false; return c; })
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
        `http://192.168.201.232:3012/search-component-paged?PageNumber=1&PageSize=100&VesId=${vesselId}&SearchText=${componentName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("responsee", response);
      setSearchComponent(response?.data?.result?.recordset);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    searchComponents();
  }, [componentName]);

  const searchAccordion = () => {
    if (componentName.length > 0) {
      setShowAccordion(true)
    }
    accordionValue()
  }

  function groupByProperties(data, properties) {
    const groups = new Map()

    for (const item of data) {
      const key = properties.map(prop => item[prop]).join('-')

      if (!groups.has(key)) {
        groups.set(key,
          {
            VIV_ID: item.VIV_ID,
            PTR_ID: item.PTR_ID,
            VES_ID: item.VES_ID,
            PTR_NAME: item.PTR_NAME,
            SerialNumber: item.SerialNumber,
            MakerId: item.MakerId,
            Maker: item.Maker,
            DesignType: item.DesignType,
            IsCriticalComponent: item.IsCriticalComponent,
            ComponentNotes: item.ComponentNotes,
            WarrantyEndDate: item.WarrantyEndDate,
            VIV_NAME: item.VIV_NAME,
            Par_Id: item.Par_Id,
            VIV_MakersRef: item.VIV_MakersRef,
            VIV_DrawingPos: item.VIV_DrawingPos,
            MUN_ID: item.MUN_ID,
            VIV_Critical: item.MUN_ID,
            VIV_ROB: item.VIV_ROB,
            VIV_MinStock: item.VIV_MinStock,
            ComponentType: item.ComponentType,
            VIV_DangerousGoods: item.VIV_DangerousGoods,
            Viv_CertificateRequired: item.Viv_CertificateRequired,
            VIV_Comment: item.VIV_Comment,
            PendingOrders: item.PendingOrders,
            EstimatePrice: item.EstimatePrice,
            IsMarketPlacePart: item.IsMarketPlacePart,
            IsMarketPlaceComponent: item.IsMarketPlaceComponent,
            RequestQuantity: 0,
            SpareParts: []
          })
      }
      groups.get(key).SpareParts.push(item)
    }

    return [...groups.values()]
  }


  const accordionValue = async () => {
    try {
      const response = await axios.get(
        `http://192.168.201.232:3012/parts-vessel-component?VES_ID=${vesselId}&PTR_ID=${componentId}&COY_ID=${coyId}&OrderNo=&PartName=${partName}&MakerRerference=${makersRefNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('responseee', response);

      if (response?.data?.result?.recordset) {
        const grouped = groupByProperties(response?.data?.result?.recordset,
          ['PTR_ID', 'VES_ID', 'PTR_NAME', 'SerialNumber', 'MakerId', 'Maker', 'DesignType', 'IsCriticalComponent', 'ComponentNotes']);
        setAccordionDetails(grouped);
      } else {
        setAccordionDetails([]);
      }


    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log('', currentStep);

  const nextStepToOrderDetails = () => {
    setCurrentStep(1)
  }

  useEffect(() => {
    localStorage.setItem('currentStep', currentStep)
  }, [currentStep])

  useEffect(()=>{
    console.log('myRef',myRef);
  },[myRef])

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
                Create Requisition - {itemValue}
              </h1>
              <Link href="/createRequisition"><AiOutlineClose style={{ fontSize: "25px" }} /></Link>
            </div>
            <HorizontalLinearStepper nextStepToOrderDetails={nextStepToOrderDetails} ref={myRef}/>
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
                  <BsSearch onClick={searchAccordion} className="cursor-pointer" />
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
            {
              accordionDetails && (
                <div className="flex flex-row items-center justify-end mt-7">
                  <IoMdAddCircleOutline style={{ fontSize: "25px" }} />
                  <p
                    className="ml-2 text-1xl underline font-semibold cursor-pointer"
                    onClick={addToBasket}
                  >
                    Add To Order Basket
                  </p>
                </div>
              )
            }

            <div className="mt-5">
              <p className="text-center text-[#7B8BA3] mb-7">
                {componentName.length === 0 && (
                  <div>Please select a Component to view the {itemValue?.toLowerCase()}</div>
                )}
              </p>
            </div>
            {showAccordion && <AccordionComponent addToBasketCallback={addToBasketCallback} accordionDetails={accordionDetails} setAccordionDetails={setAccordionDetails} />}
            <div className="flex flex-row uppercase justify-center items-center p-2 w-[106px] text-center rounded-full font-bold text-white bg-[#11110E] absolute -bottom-14 right-0 hover:scale-95 transition-all duration-200">
              <Link href="/orderDetails"><p className="text-[14px]" onClick={()=>myRef.current.handleNext()}>Next</p></Link>
              <AiOutlineArrowRight className="ml-1" />
            </div>
          </div>
          <RightPanelSection></RightPanelSection>
        </div>
      </div>
    </div>
  );
};

export default CreateRequisitionSpares;
