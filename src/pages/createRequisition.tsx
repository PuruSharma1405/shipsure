"use client";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsBoxSeamFill } from "react-icons/bs";
import { MdOutlineDirectionsBoat } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { CgMenuGridO } from "react-icons/cg";
import CTAButton from "../components/createRequisition/Button";
import ProfileDropDown from "../components/createRequisition/ProfileDropDown"
import {IoMdNotificationsOutline} from 'react-icons/io'
import MegaDropDown from "../components/createRequisition/MegaDropDown";
import SuggestedRequisitions from "../components/createRequisition/SuggestedRequisitions";
const CreateRequisition = () => {
  const [item, setItem] = useState("consumables");
  const[vesselName,setVesselName]=useState("")
  const [showDropdown, setShowDropdown] = useState(false);
  const itemChange = (e:any) => {
    setItem(e.target.value);
  };

  const changeHandler=(e:any)=>{
    setVesselName(e.target.value.toLowerCase())
    setShowDropdown(true)
  }

  const fetchingDropDownData=(vesselName:any)=>{
    setVesselName(vesselName)
    setShowDropdown(false)
  }

  console.log("item", item);
  return (
    <div className="h-[100vh]  relative w-[100vw] bg-[#F5F5F5] overflow-x-hidden overflow-y-auto">
      <div className="mx-auto">
        <div className="flex justify-between w-10/12 items-center mx-auto">
          <div className="text-2xl font-bold mt-3">
            <h2>Procurement</h2>
          </div>
          <div className="search-icon mt-3 gap-3 flex items-center">
            <AiOutlineSearch style={{ fontSize: "25px" }} />
            <IoMdNotificationsOutline style={{ fontSize: "25px" }}/>
            <CgMenuGridO style={{ fontSize: "25px" }} />
            <ProfileDropDown />
          </div>
        </div>

        <div className="h-[100vh] flex flex-col  justify-center items-center">
          <div className="w-full flex flex-col items-center">
            <div className="flex flex-row items-center">
              <BsBoxSeamFill style={{ fontSize: "25px" }}/>
              <h2 className="uppercase ml-3 font-bold">Create Requisition</h2>
            </div>
              <div className="w-[500px] h-[180px] requisition-form flex flex-col mt-[35px] mb-4 shadow justify-center rounded-md">
                <div
                  className="flex flex-row justify-around items-center bg-[#EBE8DF] rounded-full p-2 border border-solid border-gray-300"
                  style={{ margin: "0 8%" }}
                >
                  <div className="flex flex-row p-2 items-center">
                    <MdOutlineDirectionsBoat className="relative right-[15px]" />
                    <input
                      type="text"
                      placeholder="Search vessel"
                      className="border-none outline-none bg-transparent ml-2"
                      value={vesselName}
                      onChange={changeHandler}
                    />
                  </div>
                  <div style={{ fontSize: "25px" }}>
                    <AiOutlineSearch />
                  </div>
                </div>
                {vesselName.length>0 && <MegaDropDown showDropdown={showDropdown} setShowDropdown={setShowDropdown} vesselName={vesselName} fetchingDropDownData={fetchingDropDownData}/>}
                <div className="flex flex-row justify-around items-center mt-5">
                  <label className="ml-[10px]">
                    <input
                      type="radio"
                      value="consumables"
                      checked={item === "consumables"}
                      onChange={itemChange}
                    />
                    <span className="ml-[5px]">Consumables</span>
                  </label>
                  <label className="relative right-2">
                    <input
                      type="radio"
                      value="materials"
                      checked={item === "materials"}
                      onChange={itemChange}
                    />
                    <span className="ml-[5px]">Materials</span>
                  </label>
                  <label className="relative right-2">
                    <input
                      type="radio"
                      value="spares"
                      checked={item === "spares"}
                      onChange={itemChange}
                    />
                    <span className="ml-[5px]">Spares</span>
                  </label>
                </div>
              </div>
              <div className="flex gap-7 mt-7 w-[500px]">
                <CTAButton linkTo="/createRequisition" className="w-[500px]">
                  <div className="flex gap-2 items-center w-full justify-center p-2">
                    <AiOutlinePlus />
                    <span className="uppercase">Create</span>
                  </div>
                </CTAButton>
              </div>
          </div>
           <SuggestedRequisitions/>
        </div>
      </div>
    </div>
  );
};

export default CreateRequisition;
