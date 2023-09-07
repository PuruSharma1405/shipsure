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
import { SelectWithSearch } from '@/components/common/selectWithSearch';
import { getToken } from '@/services/localstorageService';
import {
  getDepartmentList, getSparePartList, getAccountCode, getPurchAttributCode, getInsuranceClaimCoyid,
  getAuxList, getNationalityList, getCrewRankList, getVesselAUXList, getProjectsList, getAuxForVessel
} from '@/services/operations/deliveryDetailsApi';
import FormControl from '@mui/material/FormControl';
import { MultiLineTextBox } from '@/components/common/multiLineTextBox';
import CommonDialog from '@/components/common/dailog';
import { useRouter } from 'next/router';
import { selectRequisitionState, setOrderDetails } from "@/redux/reducers/requisitionSlice";
import { useSelector, useDispatch } from "react-redux";
import { COMMON_TEXT_CONFIG } from "@/config/common";
import Link from "next/link";
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { IAuxForVessel } from '@/interfaces/index';
import Layout from '@/components/common/requisitionLayout';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';

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

  const [auxForVessel, setAuxForVessel] = useState<IAuxForVessel>({});

  const [justification, setJustification] = useState('');
  const itemName = localStorage.getItem('itemName')

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
    async function fetchData() {
      const token = await getToken();
      if (selectedAccountCode && selectedAccountCode.value) {
        const auxForVesselRes = await getAuxForVessel(token, {
          CoyId: requisitionState.coyId,
          AccId: selectedAccountCode.value
        });
        const auxForVesselResult = auxForVesselRes.result;
        if (auxForVesselResult.recordset) {
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
        if (sparePartRecordset) {
          const sparePartOptions = sparePartRecordset.map((el: any) => {
            return {
              label: el.SptName,
              value: el.SptId
            }
          });
          setSparePartTypeOptions(sparePartOptions);
        }

        const departListResult = departListRes.result;
        if (departListResult.recordset) {
          const departmentOptions = departListResult.recordset.map((el: any) => {
            return {
              label: el.DepName,
              value: el.DepId
            }
          });
          setDepartmentListOptions(departmentOptions);
        }

        const accountCodeResult = accountCodeRes.result;
        if (accountCodeResult.recordset) {
          const departmentOptions = accountCodeResult.recordset.map((el: any) => {
            return {
              label: el.ChdDesc,
              value: el.AccId
            }
          });
          setAccountCodeOptions(departmentOptions);
        }

        const purchAttributCodeResult = purchAttributCode.result;
        if (purchAttributCodeResult.recordset) {
          const purchAttributCodeOptions = purchAttributCodeResult.recordset.map((el: any) => {
            return {
              label: el.PatDescription,
              value: el.PatId
            }
          });
          setUrgentPriorityReasonOptions(purchAttributCodeOptions);
        }

        const fastTrackPriorityCodeResult = fastTrackPriorityCode.result;
        if (fastTrackPriorityCodeResult.recordset) {
          const fastTrackPriorityCodeOptions = fastTrackPriorityCodeResult.recordset.map((el: any) => {
            return {
              label: el.PatDescription,
              value: el.PatId
            }
          });
          setFastTrackPriorityReasonOptions(fastTrackPriorityCodeOptions);
        }

        const insuranceClaimResult = insuranceClaim.result;
        if (insuranceClaimResult.recordset) {
          const departmentOptions = insuranceClaimResult.recordset.map((el: any) => {
            return {
              label: el.IclName,
              value: el.IclId
            }
          });
          setInsuranceClaimOptions(departmentOptions);
        }

        const auxListResult = auxList.result;
        if (auxListResult.recordset) {
          const departmentOptions = auxListResult.recordset.map((el: any) => {
            return {
              label: el.AuxDesc,
              value: el.AuxId
            }
          });
          setSeasonalOptions(departmentOptions);
        }

        const nationalityListResult = nationalityList.result;
        if (nationalityListResult.recordset) {
          const nationalityListOptions = nationalityListResult.recordset.map((el: any) => {
            return {
              label: el.NatDescription,
              value: el.NatId
            }
          });
          setNationalityOptions(nationalityListOptions);
        }

        const crewRankListResult = crewRankList.result;
        if (crewRankListResult.recordset && crewRankListResult.recordset) {
          const crewRankListOptions = crewRankListResult.recordset.map((el: any) => {
            return {
              label: el.RnkDesc,
              value: el.RnkId
            }
          });
          setRankOptions(crewRankListOptions);
        }

        const vesselAuxResult = vesselAux.result;
        if (vesselAuxResult.recordset) {
          const vesselAuxOptions = vesselAuxResult.recordset.map((el: any) => {
            return {
              label: el.RnkDesc,
              value: el.RnkId
            }
          });
          setVesselAuxOptions(vesselAuxOptions);
        }

        const general1ListResult = general1List.result;
        if (general1ListResult.recordset) {
          const general1ListOptions = general1ListResult.recordset.map((el: any) => {
            return {
              label: el.AuxDesc,
              value: el.AuxId
            }
          });
          setGeneral1Options(general1ListOptions);
        }

        const general2ListResult = general2List.result;
        if (general2ListResult.recordset) {
          const general2ListOptions = general2ListResult.recordset.map((el: any) => {
            return {
              label: el.AuxDesc,
              value: el.AuxId
            }
          });
          setGeneral2Options(general2ListOptions);
        }

        const projectsResult = projects.result;
        if (projectsResult.recordset) {
          const projectsOptions = projectsResult.recordset.map((el: any) => {
            return {
              label: el.PrjDesc,
              value: el.PrjId
            }
          });
          setProjectsOptions(projectsOptions);
        }
      }).catch((error) => {
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
    if (item === "urgent") {
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
    setTimeout(() => {
      router.push('/deliveryDetails');
    }, 100)
  }

  return (
    <Layout>
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
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-semibold">
          Create Requisition - {itemName}
        </h1>
        <Link href="/createRequisition"><AiOutlineClose style={{ fontSize: "25px" }} /></Link>
      </div>
      <CommonDialog
        open={isDialogOpen}
        onClose={handleDialogSave}
        title="Confirm"
        icon={<HelpOutlineOutlinedIcon className="color-golden" />}
        content={confirmContent}
        actions={dialogActions}
      />



      <HorizontalLinearStepper />
      <div className="flex justify-center">
        <Card variant="outlined" sx={{
          width: {
            xs: '90%',
            sm: '65%',
            md: '54%',
            lg: '45%',
          }
        }}>
          <CardContent sx={{ padding: '2em' }}>
            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
              <SelectWithSearch
                options={accountCodeOptions}
                value={selectedAccountCode}
                placeholder={'Enter Account Code'}
                label="Account Code"
                onChange={setSelectedAccountCode} />
            </FormControl>

            {auxForVessel && auxForVessel['ChdAuxClaims'] ? (
              <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                <SelectWithSearch
                  options={insuranceClaimOptions}
                  value={selectedInsuranceClaim}
                  placeholder={'Select Insurance Claim'}
                  label="Insurance Claim"
                  onChange={setSelectedInsuranceClaim} />
              </FormControl>
            ) : null}

            {auxForVessel && auxForVessel['ChdAuxSeasonal'] ? (
              <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                <SelectWithSearch
                  options={seasonalOptions}
                  value={selectedSeasonal}
                  placeholder={'Seasonal'}
                  label="Seasonal"
                  onChange={setSelectedSeasonal} />
              </FormControl>
            ) : null}

            {auxForVessel && auxForVessel['ChdAuxNationality'] ? (
              <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                <SelectWithSearch
                  options={nationalityOptions}
                  value={selectedNationality}
                  placeholder={'Nationality'}
                  label="Nationality"
                  onChange={setSelectedNationality} />
              </FormControl>
            ) : null}

            {auxForVessel && auxForVessel['ChdAuxRank'] ? (
              <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                <SelectWithSearch
                  options={rankOptions}
                  value={selectedRank}
                  placeholder={'Rank'}
                  label="Rank"
                  onChange={setSelectedRank} />
              </FormControl>
            ) : null}

            {auxForVessel && auxForVessel !== null && auxForVessel?.ChdAuxVessel ? (
              <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                <SelectWithSearch
                  options={vesselAuxOptions}
                  value={selectedVesselAux}
                  placeholder={'Vessel Aux'}
                  label="Vessel Aux"
                  onChange={setSelectedVesselAux} />
              </FormControl>
            ) : null}

            {auxForVessel && auxForVessel !== null && auxForVessel?.ChdAuxGen1 ? (
              <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                <SelectWithSearch
                  options={general1Options}
                  value={selectedGeneral1}
                  placeholder={'General 1'}
                  label="General 1"
                  onChange={setSelectedGeneral1} />
              </FormControl>
            ) : null}

            {auxForVessel && auxForVessel !== null && auxForVessel?.ChdAuxgen3 ? (
              <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                <SelectWithSearch
                  options={general2Options}
                  value={selectedGeneral2}
                  placeholder={'General 2'}
                  label="General 2"
                  onChange={setSelectedGeneral2} />
              </FormControl>
            ) : null}


            <FormControl fullWidth variant="filled" sx={{ m: 1, width: '100%' }}>
              <InputLabel htmlFor="input-field">Order Title<span style={{ color: 'red' }}>*</span></InputLabel>
              <Input
                id="input-field"
                type="text"
                placeholder="Order title"
                value={vesselName}
                onChange={changeHandler}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
              <SelectWithSearch
                options={projectsOptions}
                value={selectedProjects}
                placeholder={'Projects'}
                label="Projects"
                onChange={setSelectedProjects} />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
              <FormLabel component="legend">Priority</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value={item} control={<Radio checked={item === 'normal'} onChange={changePriority} />} label={'normal'} />
                <FormControlLabel value={item} control={<Radio checked={item === 'urgent'} onChange={changePriority} />} label={'urgent'} />
                <FormControlLabel value={item} control={<Radio checked={item === 'fasttrack'} onChange={changePriority} />} label={'fasttrack'} />
                <FormControlLabel value={item} control={<Radio checked={item === 'local'} onChange={changePriority} />} label={'local'} />
              </RadioGroup>
            </FormControl>
            {isUrgent && (
              <div>
                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                  <SelectWithSearch
                    options={urgentPriorityReasonOptions}
                    value={selectedUrgentPriorityReason}
                    placeholder={'Select Priority Reason'}
                    label="Priority Reason"
                    onChange={setSelectedUrgentPriorityReason} />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }} variant="filled" className="notes">
                  <MultiLineTextBox
                    label="Justification"
                    value={justification}
                    onChange={updateJustification}
                  />
                </FormControl>
              </div>
            )}
            {item === 'fasttrack' && (
              <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                <SelectWithSearch
                  options={fastTrackPriorityReasonOptions}
                  value={selectedFastTrackPriorityReason}
                  placeholder={'Select Priority Reason'}
                  label="Priority Reason"
                  onChange={setSelectedFastTrackPriorityReason} />
              </FormControl>
            )}

            <FormControl fullWidth sx={{ m: 1 }} variant="filled" className="global-native-select">
              <SelectWithSearch
                options={sparePartTypeOptions}
                value={selectedSparePartType}
                placeholder={'Select Spare Part Type'}
                label="Spare Part Type"
                onChange={setSelectedSparePartType} />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
              <SelectWithSearch
                options={departmentListOptions}
                value={selectedDepartment}
                placeholder={'Select Department'}
                label="Department"
                onChange={setSelectedDepartment} />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
              <div className="flex">
                <span className="toogle-label">Hazardous Material Requested</span>
                <ToggleButton onToggle={updateIsHazardousMaterial} label="Hazardous Material Requested" isChecked={isHazardousMaterial} />
              </div>
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
              <div className="flex">
                <span className="toogle-label">Required For Dry Dock</span>
                <ToggleButton onToggle={updateIsRequiredDryDock} label="Required For Dry Dock" isChecked={isRequiredDryDock} />
              </div>
            </FormControl>
          </CardContent>
        </Card>
      </div>
      <div onClick={handleNext} className="flex flex-row uppercase justify-center items-center p-2 w-[106px] text-center rounded-full font-bold text-white bg-[#11110E] absolute -bottom-14 right-0 hover:scale-95 transition-all duration-200">
        <p className="text-[14px]">Next</p>
        <AiOutlineArrowRight className="ml-1" />
      </div>

    </Layout>
  );
};

export default OrderDetails;
