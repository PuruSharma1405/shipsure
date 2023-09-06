"use client";
import React, { useState, useEffect } from "react";
import {
  AiOutlineInfoCircle,
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineClose,
  AiOutlineArrowRight,
} from "react-icons/ai";
import HorizontalLinearStepper from '../components/createRequisitionSpares/Stepper'
import { CgMenuGridO } from "react-icons/cg";
import ProfileDropDown from "../components/createRequisition/ProfileDropDown";
import { IoMdNotificationsOutline } from "react-icons/io";
import ToggleButton from "@/components/toggle";
import RequisitionDataContainer from "../components/createRequisition/RequisitionDataContainer";
import { SelectBox } from '@/components/common/SelectBox';
import { SelectWithSearch } from '@/components/common/selectWithSearch';
import { getToken } from '@/services/localstorageService';
import { getDepartmentList, getSparePartList, getAccountCode, getPurchAttributCode, getInsuranceClaimCoyid, 
  getAuxList, getNationalityList, getCrewRankList, getVesselAUXList, getProjectsList, getAuxForVessel } from '@/services/operations/deliveryDetailsApi';
import FormControl from '@mui/material/FormControl';
import { MultiLineTextBox } from '@/components/common/multiLineTextBox';
import CommonDialog from '@/components/common/dailog';
import { useRouter } from 'next/router';
import { selectRequisitionState, setOrderDetails } from "@/redux/reducers/requisitionSlice";
import { useSelector, useDispatch } from "react-redux";
import { COMMON_TEXT_CONFIG } from "@/config/common";
import Link from "next/link";
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

const OrderDetails = () => {
  const [item, setItem] = useState("normal");
  const [vesselName, setVesselName] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch()
  const requisitionState = useSelector(selectRequisitionState);
  const confirmContent = COMMON_TEXT_CONFIG.CREATE_REQUISITION_URGENT_CONFIRM_TEXT;



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

  const [projectsOptions, setProjectsOptions] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState(null);

  const [isHazardousMaterial, setIsHazardousMaterial] = useState(false);
  const [isRequiredDryDock, setIsRequiredDryDock] = useState(false);

  const [auxForVessel, setAuxForVessel] = useState({});

  const [justification, setJustification] = useState('');
  const itemName=localStorage.getItem('itemName')

  //for dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogSave = () => {
    setIsDialogOpen(false);
  }

  const handleDialogCancel = () => {
    setItem('normal')
    setIsDialogOpen(false);
  }

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const dialogActions = [
    {
      label: 'Cancel',
      onClick: handleDialogCancel,
      color: 'secondary',
    },
    {
      label: 'Save',
      onClick: handleDialogSave,
      color: 'primary',
    },
  ];


  useEffect(() => {
    async function fetchData(){
      const token = await getToken();
      if(selectedAccountCode && selectedAccountCode.value) {
        const auxForVesselRes = await getAuxForVessel(token, {
          CoyId: requisitionState.coyId,
          AccId: selectedAccountCode.value
        });
        const auxForVesselResult = auxForVesselRes.result;
        if(auxForVesselResult.recordset) {
          setAuxForVessel(auxForVesselResult.recordset[0]);
        }
      }
    }
    fetchData();
  }, [selectedAccountCode])

  useEffect(() => {
    async function fetchData() {
      const token = await getToken();
    
      const promises = [
        getSparePartList(token, {}),
        getDepartmentList(token, {}),
        getAccountCode(token, {
          VesId: requisitionState.vesId,
          CoyId: requisitionState.coyId,
        }),
        getPurchAttributCode(token, {
          LookupCode: 'UrgentPriorityReason',
        }),
        getPurchAttributCode(token, {
          LookupCode: 'FastTrackPriorityReason',
        }),
        getInsuranceClaimCoyid(token, {
          CoyId: requisitionState.coyId,
        }),
        getAuxList(token, {
          AuxCodeType: 6,
        }),
        getNationalityList(token, {}),
        getCrewRankList(token, {}),
        getVesselAUXList(token, {}),
        getAuxList(token, {
          AuxCodeType: 7,
        }),
        getAuxList(token, {
          AuxCodeType: 10,
        }),
        getProjectsList(token, {
          VesId: requisitionState.vesId,
        }),
      ];

      Promise.all(promises).then(([
        sparePartListRes, 
        departListRes, 
        accountCodeRes, 
        purchAttributCode, 
        fastTrackPriorityCode, 
        insuranceClaim,
        auxList,
        nationalityList,
        crewRankList,
        vesselAux,
        general1List,
        general2List,
        projects,
        ...all]: any[]) => {
        const { recordset: sparePartRecordset } = sparePartListRes.result;
        if(sparePartRecordset) {
          const sparePartOptions = sparePartRecordset.map((el: any) => {
            return {
              label: el.SptName,
              value: el.SptId
            }
          });
          setSparePartTypeOptions(sparePartOptions);
        }

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

        const purchAttributCodeResult = purchAttributCode.result;
        if(purchAttributCodeResult.recordset) {
          const purchAttributCodeOptions = purchAttributCodeResult.recordset.map((el: any) => {
            return {
              label: el.PatDescription,
              value: el.PatId
            }
          });
          setUrgentPriorityReasonOptions(purchAttributCodeOptions);
        }

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

        const insuranceClaimResult = insuranceClaim.result;
        if(insuranceClaimResult.recordset) {
          const departmentOptions = insuranceClaimResult.recordset.map((el: any) => {
            return {
              label: el.IclName,
              value: el.IclId
            }
          });
          setInsuranceClaimOptions(departmentOptions);
        }

        const auxListResult = auxList.result;
        if(auxListResult.recordset) {
          const departmentOptions = auxListResult.recordset.map((el: any) => {
            return {
              label: el.AuxDesc,
              value: el.AuxId
            }
          });
          setSeasonalOptions(departmentOptions);
        }
        
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

        const crewRankListResult = crewRankList.result;
        if(crewRankListResult.recordset && crewRankListResult.recordset) {
          const crewRankListOptions = crewRankListResult.recordset.map((el: any) => {
            return {
              label: el.RnkDesc,
              value: el.RnkId
            }
          });
          setRankOptions(crewRankListOptions);
        }

        const vesselAuxResult = vesselAux.result;
        if(vesselAuxResult.recordset) {
          const vesselAuxOptions = vesselAuxResult.recordset.map((el: any) => {
            return {
              label: el.RnkDesc,
              value: el.RnkId
            }
          });
          setVesselAuxOptions(vesselAuxOptions);
        }

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

        const projectsResult = projects.result;
        if(projectsResult.recordset) {
          const projectsOptions = projectsResult.recordset.map((el: any) => {
            return {
              label: el.PrjDesc,
              value: el.PrjId
            }
          });
          setProjectsOptions(projectsOptions);
        }
      }).catch((error)=> {
        console.log('something went wrong', error.message);
      })

    }
    fetchData();
  }, []);

  const updateSelectedSparePartType = (e: any) => {
    setSelectedSparePartType(e.target.value)
  }

  const updateJustification = (e: any) => {
    setJustification(e.target.value);
  }

  const updateSelectedDepartment = (e: any) => {
    setSelectedDepartment(e.target.value)
  }

  const changePriority = (e: any) => {
    setItem(e.target.value);
  };

  const changeHandler = (e: any) => {
    setVesselName(e.target.value.toLowerCase());
  };

  const updateIsHazardousMaterial = (event: any) => { 
    setIsHazardousMaterial(event.target.checked);
  }

  const updateIsRequiredDryDock = (event: any) => { 
    setIsRequiredDryDock(event.target.checked);
  }

  useEffect(() => {
    if(item === "urgent") {
      handleOpenDialog()
      setIsUrgent(true)
    } else {
      setIsUrgent(false);
    }
  }, [item]);

  const handleNext = () => {
    dispatch(setOrderDetails({
      accountCode: selectedAccountCode,
      sparePartType: selectedSparePartType,
      fastTrackPriorityReason: selectedFastTrackPriorityReason,
      urgentPriorityReason: selectedUrgentPriorityReason,
      department: selectedDepartment,
      insuranceClaim: selectedInsuranceClaim,
      seasonal: selectedSeasonal,
      nationality: selectedNationality,
      rank: selectedRank,
      vesselAux: selectedVesselAux,
      general1: selectedGeneral1,
      general2: selectedGeneral2,
      projects: selectedProjects,
      justification: justification,
      isRequiredDryDock: isRequiredDryDock,
      isHazardousMaterial: isHazardousMaterial,
      priority: item
    }));
    setTimeout(()=> {
      router.push('/deliveryDetails');
    }, 100)
  }

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

        <CommonDialog
          open={isDialogOpen}
          onClose={handleDialogSave}
          title="Confirm"
          icon={<HelpOutlineOutlinedIcon className="color-golden" />}
          content={confirmContent}
          actions={dialogActions}
        />

        <div className="h-full w-full flex flex-row overflow-y-auto">
          <div className=" w-8/12 mt-7 ml-36 relative">

          <div className="flex flex-row justify-between">
            <h1 className="text-2xl font-semibold">
              Create Requisition-{itemName}
            </h1>
            <Link href="/createRequisition"><AiOutlineClose style={{ fontSize: "25px" }} /></Link>
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

                {auxForVessel && auxForVessel['ChdAuxClaims'] ? (
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
                ) : null}

                {auxForVessel && auxForVessel['ChdAuxSeasonal'] ? (
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
                ): null}

              {auxForVessel && auxForVessel['ChdAuxNationality'] ? (
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
              ): null }

              {auxForVessel && auxForVessel['ChdAuxRank'] ? (
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
              ): null}

              {auxForVessel &&  auxForVessel !== null && auxForVessel?.ChdAuxVessel ? (
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
              ): null}

              {auxForVessel &&  auxForVessel !== null && auxForVessel?.ChdAuxGen1 ? (
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
              ): null}

              {auxForVessel &&  auxForVessel !== null && auxForVessel?.ChdAuxgen3 ? (
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
              ): null}


                  <div style={{ margin: "0 8%" }}>
                    <div
                      className="flex flex-col"
                      style={{ margin: "5% 0", borderBottom: "1px solid black" }}
                    >
                      <label>Order Title<span style={{color: 'red'}}>*</span></label>
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
                  <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                      <SelectWithSearch 
                        options={projectsOptions} 
                        value={selectedProjects} 
                        placeholder={'Projects'} 
                        label="Projects" 
                        onChange={setSelectedProjects}/>
                    </FormControl>
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
                            onChange={updateJustification}
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
                    <SelectWithSearch 
                          options={sparePartTypeOptions} 
                          value={selectedSparePartType} 
                          placeholder={'Select Spare Part Type'} 
                          label="Spare Part Type" 
                          onChange={setSelectedSparePartType}/>
                  </FormControl>
                  </div>
                  <div style={{ margin: "0 8%" }}>
                  <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                    <SelectWithSearch 
                          options={departmentListOptions} 
                          value={selectedDepartment} 
                          placeholder={'Select Department'} 
                          label="Department" 
                          onChange={setSelectedDepartment}/>
                  </FormControl>
                  </div>
                  <div style={{ margin: "0 8%" }}>
                    <div
                      className="flex flex-row order-details-switch"
                      style={{ margin: "5% 0" }}
                    >
                      <label className="flex items-center">
                        <span className="mw-300">Hazardous Material Requested</span>
                        <ToggleButton onToggle={updateIsHazardousMaterial} isChecked={isHazardousMaterial} />
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
                        <ToggleButton onToggle={updateIsRequiredDryDock} isChecked={isRequiredDryDock} />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div onClick={handleNext} className="flex flex-row uppercase justify-center items-center p-2 w-[106px] text-center rounded-full font-bold text-white bg-[#11110E] absolute -bottom-14 right-0 hover:scale-95 transition-all duration-200">
              <p className="text-[14px]">Next</p>
              <AiOutlineArrowRight className="ml-1" />
            </div>
          </div>
          <div className="w-4/12 bg-[#E8ECED] ml-[50px] h-[100vh]">
            <div className="flex flex-row flex-wrap mt-[60px] ml-[50px]">
              <RequisitionDataContainer basketValues="" vesselBasicDetails=""/>
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
