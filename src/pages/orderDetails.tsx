"use client";
import React, { useState, useEffect } from "react";
import {
  AiOutlineInfoCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import { CgMenuGridO } from "react-icons/cg";
import ProfileDropDown from "../components/createRequisition/ProfileDropDown";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import ToggleButton from "@/components/toggle";

const OrderDetails = () => {
  const [item, setItem] = useState("normal");
  const [vesselName, setVesselName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);
  const itemChange = (e: any) => {
    setItem(e.target.value);
  };

  const changeHandler = (e: any) => {
    setVesselName(e.target.value.toLowerCase());
    setShowDropdown(true);
  };

  const handleToggle = (event : boolean) => {}

  const fetchingDropDownData = (vesselName: any) => {
    setVesselName(vesselName);
    setShowDropdown(false);
  };
  useEffect(() => {
    item === "urgent" ? setIsUrgent(true) : setIsUrgent(false);
  }, [item]);

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
            <IoMdNotificationsOutline style={{ fontSize: "25px" }} />
            <CgMenuGridO style={{ fontSize: "25px" }} />
            <ProfileDropDown />
          </div>
        </div>

        <div className="h-[100vh] flex flex-col justify-center items-center">
          <div className="w-full flex flex-col items-center  overflow-y-auto">
            <div className="w-1/3 bg-[#F2EEEB] flex flex-col mt-[35px] mb-4 shadow-md rounded-3xl overflow-y-auto">
              <div style={{ margin: "0 8%" }}>
                <div
                  className="flex flex-col"
                  style={{ margin: "5% 0", borderBottom: "1px solid black" }}
                >
                  <label>Account Code</label>
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-row pr-2 pt-2 pb-2 pl-0">
                      <input
                        type="text"
                        placeholder="Enter Account Code"
                        className="border-none outline-none bg-transparent"
                        value={vesselName}
                        onChange={changeHandler}
                      />
                    </div>
                    <div style={{ fontSize: "25px", padding: "20px"}}>
                      <AiOutlineSearch />
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ margin: "0 8%" }}>
                <div
                  className="flex flex-col"
                  style={{ margin: "5% 0", borderBottom: "1px solid black" }}
                >
                  <label>Order Title</label>
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-row pr-2 pt-2 pb-2 pl-0">
                      <input
                        type="text"
                        placeholder="Order title"
                        className="border-none outline-none bg-transparent"
                        value={vesselName}
                        onChange={changeHandler}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ margin: "0 8%" }}>
                <div
                  className="flex flex-col"
                  style={{ margin: "5% 0", borderBottom: "1px solid black" }}
                >
                  <label>Project</label>
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-row pr-2 pt-2 pb-2 pl-0">
                      <input
                        type="text"
                        placeholder="Select Project"
                        className="border-none outline-none bg-transparent"
                        value={vesselName}
                        onChange={changeHandler}
                      />
                    </div>
                    <div style={{ fontSize: "25px", padding: "20px" }}>
                      <AiOutlineSearch />
                    </div>
                  </div>
                </div>
              </div>
              {/* {vesselName.length > 0 && (
                <MegaDropDown
                  showDropdown={showDropdown}
                  vesselName={vesselName}
                  fetchingDropDownData={fetchingDropDownData}
                />
              )} */}
              <div style={{ margin: "0 8%" }}>
                <div
                  className="flex flex-col"
                  //   style={{ margin: "5% 0", borderBottom: "1px solid black" }}
                >
                  <label>Priority</label>
                  <div className="flex flex-row justify-around items-center mt-5">
                    <label className="ml-[-20px]">
                      <input
                        type="radio"
                        value="normal"
                        checked={item === "normal"}
                        onChange={itemChange}
                      />
                      <span className="ml-[5px]">Normal</span>
                    </label>
                    <label className="relative right-2 flex flex-row">
                      <input
                        type="radio"
                        value="urgent"
                        checked={item === "urgent"}
                        onChange={itemChange}
                      />
                      <span className="ml-[5px]">Urgent</span>
                      {isUrgent && (
                        <div
                          style={{
                            fontSize: "20px",
                            paddingLeft: "10px",
                            color: "red",
                          }}
                        >
                          <AiOutlineInfoCircle />
                        </div>
                      )}
                    </label>
                    <label className="relative right-2">
                      <input
                        type="radio"
                        value="fasttrack"
                        checked={item === "fasttrack"}
                        onChange={itemChange}
                      />
                      <span className="ml-[5px]">Fast Track</span>
                    </label>
                    <label className="relative right-2">
                      <input
                        type="radio"
                        value="local"
                        checked={item === "local"}
                        onChange={itemChange}
                      />
                      <span className="ml-[5px]">Local</span>
                    </label>
                  </div>
                </div>
              </div>
              {/* <div className="flex flex-row justify-around items-center mt-5">
                <label className="ml-[10px]">
                  <input
                    type="radio"
                    value="normal"
                    checked={item === "normal"}
                    onChange={itemChange}
                  />
                  <span className="ml-[5px]">Normal</span>
                </label>
                <label className="relative right-2">
                  <input
                    type="radio"
                    value="urgent"
                    checked={item === "urgent"}
                    onChange={itemChange}
                  />
                  <span className="ml-[5px]">Urgent</span>
                </label>
                <label className="relative right-2">
                  <input
                    type="radio"
                    value="fasttrack"
                    checked={item === "fasttrack"}
                    onChange={itemChange}
                  />
                  <span className="ml-[5px]">Fast Track</span>
                </label>
                <label className="relative right-2">
                  <input
                    type="radio"
                    value="local"
                    checked={item === "local"}
                    onChange={itemChange}
                  />
                  <span className="ml-[5px]">Local</span>
                </label>
              </div> */}

              {isUrgent && (
                <div>
                  <div style={{ margin: "0 8%" }}>
                    <div
                      className="flex flex-col"
                      style={{
                        margin: "5% 0",
                        borderBottom: "1px solid black",
                      }}
                    >
                      <label>Priority Reason</label>
                      <div className="flex flex-row justify-between">
                        <div className="flex flex-row pr-2 pt-2 pb-2 pl-0">
                          <input
                            type="text"
                            placeholder="Select Priority Reason"
                            className="border-none outline-none bg-transparent"
                            value={vesselName}
                            onChange={changeHandler}
                          />
                        </div>
                        <div style={{ fontSize: "25px", padding: "10px" }}>
                          <RiArrowDropDownLine />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ margin: "0 8%" }}>
                    <div
                      className="flex flex-col"
                      style={{
                        margin: "5% 0",
                      }}
                    >
                      <label>Justification</label>
                        <div className="flex flex-row pr-2 pt-2 pb-2 pl-0">
                          <textarea
                            // type="textarea"
                            placeholder="Enter Justification"
                            className="outline-none bg-transparent w-full h-32 px-3 py-2 border border-black focus:outline-none"
                            value={vesselName}
                            onChange={changeHandler}
                          />
                        </div>
                    </div>
                  </div>{" "}
                </div>
              )}

              <div style={{ margin: "0 8%" }}>
                <div
                  className="flex flex-col"
                  style={{ margin: "5% 0", borderBottom: "1px solid black" }}
                >
                  <label>Spare Part Type</label>
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-row pr-2 pt-2 pb-2 pl-0">
                      <input
                        type="text"
                        placeholder="Select Spare Part Type"
                        className="border-none outline-none bg-transparent"
                        value={vesselName}
                        onChange={changeHandler}
                      />
                    </div>
                    <div style={{ fontSize: "25px", padding: "10px" }}>
                      <RiArrowDropDownLine />
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ margin: "0 8%" }}>
                <div
                  className="flex flex-col"
                  style={{ margin: "5% 0", borderBottom: "1px solid black" }}
                >
                  <label>Department</label>
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-row pr-2 pt-2 pb-2 pl-0">
                      <input
                        type="text"
                        placeholder="Select Department"
                        className="border-none outline-none bg-transparent"
                        value={vesselName}
                        onChange={changeHandler}
                      />
                    </div>
                    <div style={{ fontSize: "25px", padding: "10px" }}>
                      <RiArrowDropDownLine />
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ margin: "0 8%" }}>
              <div
                  className="flex flex-row"
                  style={{ margin: "5% 0"}}
                >
                <label className="flex items-center">
                      <span>Hazardous Material Requested</span>
                    <ToggleButton onToggle={handleToggle} />
                    </label>
                    </div>
              </div>
              <div style={{ margin: "0 8%" }}>
              <div
                  className="flex flex-row"
                  style={{ margin: "5% 0" }}
                >
                <label className="flex items-center">
                      <span>Required For Dry Dock</span>
                    <ToggleButton onToggle={handleToggle} />
                    </label>
                    </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
