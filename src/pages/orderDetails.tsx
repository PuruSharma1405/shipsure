"use client";
import React, { useState, useEffect } from "react";
import {
  AiOutlineInfoCircle,
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineClose,
} from "react-icons/ai";
import HorizontalLinearStepper from '../components/createRequisitionSpares/Stepper'
import { CgMenuGridO } from "react-icons/cg";
import ProfileDropDown from "../components/createRequisition/ProfileDropDown";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import ToggleButton from "@/components/toggle";
import RequisitionDataContainer from "../components/createRequisition/RequisitionDataContainer";
import { SelectBox } from '@/components/common/SelectBox';
import { SelectWithSearch } from '@/components/common/selectWithSearch';
import { getToken } from '@/services/localstorageService';
import { getDepartmentList, getSparePartList, getAccountCode, getPurchAttributCode, getInsuranceClaimCoyid, 
  getAuxList, getNationalityList, getCrewRankList, getVesselAUXList } from '@/services/operations/deliveryDetailsApi';
import FormControl from '@mui/material/FormControl';
import { MultiLineTextBox } from '@/components/common/multiLineTextBox';

const OrderDetails = () => {
  const [item, setItem] = useState("normal");
  const [vesselName, setVesselName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);

  const [sparePartTypeOptions, setSparePartTypeOptions] = useState([]);
  const [selectedSparePartType, setSelectedSparePartType] = useState(null);

  const [departmentListOptions, setDepartmentListOptions] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const [accountCodeOptions, setAccountCodeOptions] = useState([]);
  const [selectedAccountCode, setSelectedAccountCode] = useState(null);

  const [urgentPriorityReasonOptions, setUrgentPriorityReasonOptions] = useState([]);
  const [selectedUrgentPriorityReason, setSelectedUrgentPriorityReason] = useState(null);

  const [fastTrackPriorityReasonOptions, setFastTrackPriorityReasonOptions] = useState([]);
  const [selectedFastTrackPriorityReason, setSelectedFastTrackPriorityReason] = useState(null);

  const [insuranceClaimOptions, setInsuranceClaimOptions] = useState([]);
  const [selectedInsuranceClaim, setSelectedInsuranceClaim] = useState(null);

  const [seasonalOptions, setSeasonalOptions] = useState([]);
  const [selectedSeasonal, setSelectedSeasonal] = useState(null);

  const [nationalityOptions, setNationalityOptions] = useState([]);
  const [selectedNationality, setSelectedNationality] = useState(null);

  const [rankOptions, setRankOptions] = useState([]);
  const [selectedRank, setSelectedRank] = useState(null);

  const [vesselAuxOptions, setVesselAuxOptions] = useState([]);
  const [selectedVesselAux, setSelectedVesselAux] = useState(null);

  const [general1Options, setGeneral1Options] = useState([]);
  const [selectedGeneral1, setSelectedGeneral1] = useState(null);

  const [general2Options, setGeneral2Options] = useState([]);
  const [selectedGeneral2, setSelectedGeneral2] = useState(null);

  const [justification, setJustification] = useState('');

  useEffect(() => {
    async function fetchData() {
      const token = await getToken();
      const sparePartListRes = await getSparePartList(token, {});
      const { recordset } = sparePartListRes.result;
      if(recordset) {
        const sparePartOptions = recordset.map((el: any) => {
          return {
            label: el.SptName,
            value: el.SptId
          }
        });
        setSparePartTypeOptions(sparePartOptions);
      }

      const departListRes = await getDepartmentList(token, {});
      const departListResult = departListRes.result;
      if(departListResult.recordset) {
        const departmentOptions = departListResult.recordset.map((el: any) => {
          return {
            label: el.DepName,
            value: el.DepId
          }
        });
        setDepartmentListOptions(departmentOptions);
      }

      const accountCodeRes = await getAccountCode(token, {});
      const accountCodeResult = accountCodeRes.result;
      if(accountCodeResult.recordset) {
        const departmentOptions = accountCodeResult.recordset.map((el: any) => {
          return {
            label: el.ChdDesc,
            value: el.AccId
          }
        });
        setAccountCodeOptions(departmentOptions);
      }
      const purchAttributCode = await getPurchAttributCode(token, {
        LookupCode: 'UrgentPriorityReason'
      });
      const purchAttributCodeult = purchAttributCode.result;
      if(purchAttributCodeult.recordset) {
        const purchAttributCodeOptions = purchAttributCodeult.recordset.map((el: any) => {
          return {
            label: el.PatDescription,
            value: el.PatId
          }
        });
        setUrgentPriorityReasonOptions(purchAttributCodeOptions);
      }

      const fastTrackPriorityCode = await getPurchAttributCode(token, {
        LookupCode: 'FastTrackPriorityReason'
      });
      const fastTrackPriorityCodeResult = fastTrackPriorityCode.result;
      if(fastTrackPriorityCodeResult.recordset) {
        const fastTrackPriorityCodeOptions = fastTrackPriorityCodeResult.recordset.map((el: any) => {
          return {
            label: el.PatDescription,
            value: el.PatId
          }
        });
        setFastTrackPriorityReasonOptions(fastTrackPriorityCodeOptions);
      }

      
      const insuranceClaim = await getInsuranceClaimCoyid(token, {});
      const insuranceClaimResult = insuranceClaim.result;
      if(insuranceClaimResult.recordset) {
        const departmentOptions = insuranceClaimResult.recordset.map((el: any) => {
          return {
            label: el.ChdDesc,
            value: el.AccId
          }
        });
        setInsuranceClaimOptions(departmentOptions);
      }
      
      const auxList = await getAuxList(token, {});
      const auxListResult = auxList.result;
      if(auxListResult.recordset) {
        const departmentOptions = auxListResult.recordset.map((el: any) => {
          return {
            label: el.NatDescription,
            value: el.NatId
          }
        });
        setSeasonalOptions(departmentOptions);
      }
      
      const nationalityList = await getNationalityList(token, {});
      const nationalityListResult = nationalityList.result;
      if(nationalityListResult.recordset) {
        const nationalityListOptions = nationalityListResult.recordset.map((el: any) => {
          return {
            label: el.NatDescription,
            value: el.NatId
          }
        });
        setNationalityOptions(nationalityListOptions);
      }
      
      const crewRankList = await getCrewRankList(token, {});
      const crewRankListResult = crewRankList.result;
      if(crewRankListResult.recordset) {
        const crewRankListOptions = crewRankListResult.recordset.map((el: any) => {
          return {
            label: el.RnkDesc,
            value: el.RnkId
          }
        });
        setVesselAuxOptions(crewRankListOptions);
      }
      
      const vesselAux = await getVesselAUXList(token, {});
      const vesselAuxResult = vesselAux.result;
      if(vesselAuxResult.recordset) {
        const vesselAuxOptions = vesselAuxResult.recordset.map((el: any) => {
          return {
            label: el.RnkDesc,
            value: el.RnkId
          }
        });
        setRankOptions(vesselAuxOptions);
      }
      
      const general1List = await getAuxList(token, {
        AuxCodeType: 6
      });
      const general1ListResult = general1List.result;
      if(general1ListResult.recordset) {
        const general1ListOptions = general1ListResult.recordset.map((el: any) => {
          return {
            label: el.AuxDesc,
            value: el.AuxId
          }
        });
        setGeneral1Options(general1ListOptions);
      }
      
      const general2List = await getAuxList(token, {
        AuxCodeType: 6
      });
      const general2ListResult = general2List.result;
      if(general2ListResult.recordset) {
        const general2ListOptions = general2ListResult.recordset.map((el: any) => {
          return {
            label: el.AuxDesc,
            value: el.AuxId
          }
        });
        setGeneral2Options(general2ListOptions);
      }
    }
    fetchData();
  }, []);

  const updateSelectedSparePartType = (e: any) => {
    setSelectedSparePartType(e.target.value)
  }

  const updateSelectedDepartment = (e: any) => {
    setSelectedDepartment(e.target.value)
  }

  const changePriority = (e: any) => {
    setItem(e.target.value);
  };

  const changeHandler = (e: any) => {
    setVesselName(e.target.value.toLowerCase());
    setShowDropdown(true);
  };

  const handleToggle = (event: boolean) => { }

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

        <div className="h-full w-full flex flex-row overflow-y-auto">
          <div className=" w-8/12 mt-7 ml-36 relative">

          <div className="flex flex-row">
            <h1 className="text-2xl font-semibold">
              Create Requisition-
            </h1>
            <AiOutlineClose style={{ fontSize: "25px" }} />
          </div>
            <div className="flex flex-col justify-center items-center">
              <div className="w-full flex flex-col items-center  overflow-y-auto">
                <HorizontalLinearStepper />
                <div className="w-1/2 bg-[#F2EEEB] flex flex-col mt-[35px] mb-4 shadow-md rounded-3xl order-details">
                  <div style={{ margin: "0 8%" }}>
                    <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                      <SelectWithSearch 
                        options={accountCodeOptions} 
                        value={selectedAccountCode} 
                        placeholder={'Enter Account Code'} 
                        label="Account Code" 
                        onChange={setSelectedAccountCode}/>
                    </FormControl>
                  </div>

                  <div style={{ margin: "0 8%" }}>
                    <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                      <SelectWithSearch 
                        options={insuranceClaimOptions} 
                        value={selectedInsuranceClaim} 
                        placeholder={'Select Insurance Claim'} 
                        label="Insurance Claim" 
                        onChange={setSelectedInsuranceClaim}/>
                    </FormControl>
                  </div>

                  <div style={{ margin: "0 8%" }}>
                    <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                      <SelectWithSearch 
                        options={seasonalOptions} 
                        value={selectedSeasonal} 
                        placeholder={'Seasonal'} 
                        label="Seasonal" 
                        onChange={setSelectedSeasonal}/>
                    </FormControl>
                  </div>

                  <div style={{ margin: "0 8%" }}>
                    <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                      <SelectWithSearch 
                        options={nationalityOptions} 
                        value={selectedNationality} 
                        placeholder={'Nationality'} 
                        label="Nationality" 
                        onChange={setSelectedNationality}/>
                    </FormControl>
                  </div>

                  <div style={{ margin: "0 8%" }}>
                    <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                      <SelectWithSearch 
                        options={rankOptions} 
                        value={selectedRank} 
                        placeholder={'Rank'} 
                        label="Rank" 
                        onChange={setSelectedRank}/>
                    </FormControl>
                  </div>

                  <div style={{ margin: "0 8%" }}>
                    <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                      <SelectWithSearch 
                        options={vesselAuxOptions} 
                        value={selectedVesselAux} 
                        placeholder={'Vessel Aux'} 
                        label="Vessel Aux" 
                        onChange={setSelectedVesselAux}/>
                    </FormControl>
                  </div>

                  <div style={{ margin: "0 8%" }}>
                    <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                      <SelectWithSearch 
                        options={general1Options} 
                        value={selectedGeneral1} 
                        placeholder={'General 1'} 
                        label="General 1" 
                        onChange={setSelectedGeneral1}/>
                    </FormControl>
                  </div>

                  <div style={{ margin: "0 8%" }}>
                    <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                      <SelectWithSearch 
                        options={general2Options} 
                        value={selectedGeneral2} 
                        placeholder={'General 2'} 
                        label="General 2" 
                        onChange={setSelectedGeneral2}/>
                    </FormControl>
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
                  <div style={{ margin: "0 8%" }}>
                    <div
                      className="flex flex-col"
                    >
                      <label>Priority</label>
                      <div className="flex flex-row justify-around items-center mt-5">
                        <label className="ml-[-20px]">
                          <input
                            type="radio"
                            value="normal"
                            checked={item === "normal"}
                            onChange={changePriority}
                          />
                          <span className="ml-[5px]">Normal</span>
                        </label>
                        <label className="relative right-2 flex flex-row">
                          <input
                            type="radio"
                            value="urgent"
                            checked={item === "urgent"}
                            onChange={changePriority}
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
                            onChange={changePriority}
                          />
                          <span className="ml-[5px]">Fast Track</span>
                        </label>
                        <label className="relative right-2">
                          <input
                            type="radio"
                            value="local"
                            checked={item === "local"}
                            onChange={changePriority}
                          />
                          <span className="ml-[5px]">Local</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  {isUrgent && (
                    <div>
                      <div style={{ margin: "0 8%" }}>
                      <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                        <SelectWithSearch 
                          options={urgentPriorityReasonOptions} 
                          value={selectedUrgentPriorityReason} 
                          placeholder={'Select Priority Reason'} 
                          label="Priority Reason" 
                          onChange={setSelectedUrgentPriorityReason}/>
                      </FormControl>
                      </div>
                      <div style={{ margin: "0 8%" }}>
                      <FormControl fullWidth sx={{ m: 1 }} variant="filled" className="notes">
                          <MultiLineTextBox 
                            label="Justification"
                            value={justification}
                            onChange={setJustification}
                          />                          
                        </FormControl>
                      </div>{" "}
                    </div>
                  )}
                  {item === 'fasttrack' && (
                    <div>
                      <div style={{ margin: "0 8%" }}>
                      <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                        <SelectWithSearch 
                          options={fastTrackPriorityReasonOptions} 
                          value={selectedFastTrackPriorityReason} 
                          placeholder={'Select Priority Reason'} 
                          label="Priority Reason" 
                          onChange={setSelectedFastTrackPriorityReason}/>
                      </FormControl>
                      </div>
                    </div>
                  )}

                  <div style={{ margin: "0 8%" }}>
                  <FormControl fullWidth sx={{ m: 1 }} variant="filled" className="global-native-select">
                    <SelectBox options={sparePartTypeOptions} value={selectedSparePartType} label="Spare Part Type" onChange={updateSelectedSparePartType}/>
                  </FormControl>
                  </div>
                  <div style={{ margin: "0 8%" }}>
                  <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                    <SelectBox options={departmentListOptions} value={selectedDepartment} label="Department" onChange={updateSelectedDepartment}/>
                  </FormControl>
                  </div>
                  <div style={{ margin: "0 8%" }}>
                    <div
                      className="flex flex-row order-details-switch"
                      style={{ margin: "5% 0" }}
                    >
                      <label className="flex items-center">
                        <span className="mw-300">Hazardous Material Requested</span>
                        <ToggleButton onToggle={handleToggle} />
                      </label>
                    </div>
                  </div>
                  <div style={{ margin: "0 8%" }}>
                    <div
                      className="flex flex-row w-[200px]"
                      style={{ margin: "5% 0" }}
                    >
                      <label className="flex items-center">
                        <span className="mw-300">Required For Dry Dock</span>
                        <ToggleButton onToggle={handleToggle} />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className="w-4/12 bg-[#E8ECED] ml-[50px] h-[100vh]">
            <div className="flex flex-row flex-wrap mt-[60px] ml-[50px]">
              <RequisitionDataContainer/>
              <div
                className="flex flex-col mt-5 bg-white shadow-lg rounded-lg  w-[350px] h-[100px]"
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

export default OrderDetails;
