"use client";
import React, { useState, useEffect } from "react";
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
import { selectAuthState } from "@/redux/reducers/user";
import { useSelector } from "react-redux";
import { useRouter } from 'next/router';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {getVesselPart} from "../services/operations/createVesselApi"
import { useDispatch } from "react-redux"
import AuthService from '@/services/authService';

const CreateRequisition = () => {
  const [item, setItem] = useState("consumables");
  const router = useRouter();
  const[vesselName,setVesselName]=useState()
  const [showDropdown, setShowDropdown] = useState(false);
  const authState = useSelector(selectAuthState);
  const dispatch = useDispatch()
  const authService = new AuthService();
 
  const itemChange = async(e) => {
    const userData = await authService.getUser();
    console.log('userData',userData);
    setItem(e.target.value);
    getVesselPart(e.target.value,userData?.access_token)
  };

  useEffect(() => {
    // for redirect to login page
    if(!authState.isAuthenticated) {
      router.push('/');
    }
  }, []);

  if(!authState.isAuthenticated) {
      return null;
  }
  const changeHandler=(e)=>{
    setVesselName(e.target.value.toLowerCase())
    setShowDropdown(true)
  }

  const fetchingDropDownData=(vesselName)=>{
    setVesselName(vesselName)
    setShowDropdown(false)
  }

  console.log("item", item);
  return (
      <div className="h-[100vh]  relative w-[100vw] bg-[#F5F5F5] overflow-x-hidden overflow-y-auto create-requisition">
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
                    <div className="flex flex-row p-2 items-center relative">
                      <MdOutlineDirectionsBoat className="relative right-[15px]" />
                      <input
                        type="text"
                        placeholder="Search vessel"
                        className="border-none outline-none bg-transparent ml-2 relative"
                        value={vesselName}
                        onChange={changeHandler}
                      />
                    </div>
                    <div style={{ fontSize: "25px" }}>
                      <AiOutlineSearch />
                    </div>
                  </div>
                  {vesselName?.length>0 && <MegaDropDown showDropdown={showDropdown} setShowDropdown={setShowDropdown} vesselName={vesselName} fetchingDropDownData={fetchingDropDownData}/>}
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel value="consumables" control={<Radio checked={item === 'consumables'} onChange={itemChange}/>} label="consumables" />
                      <FormControlLabel value="materials" control={<Radio checked={item === 'materials'} onChange={itemChange}/>} label="materials" />
                      <FormControlLabel value="Spares" control={<Radio checked={item === 'Spares'} onChange={itemChange}/>} label="Spares" />
                    </RadioGroup>
                </div>
                <div className="flex gap-7 mt-7 w-[500px]">
                  <CTAButton linkTo={"/createRequisition"} className="w-[500px]">
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
