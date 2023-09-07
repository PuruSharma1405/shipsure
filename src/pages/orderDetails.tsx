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
import { IAuxForVessel, IOption } from '@/interfaces/index';
import Layout from '@/components/common/requisitionLayout';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';
import { Button, Grid, FormHelperText } from '@mui/material';

const OrderDetails = () => {
  const [item, setItem] = useState("normal");
  const [orderTitle, setOrderTitle] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch()
  const requisitionState = useSelector(selectRequisitionState);
  const confirmContent = COMMON_TEXT_CONFIG.CREATE_REQUISITION_URGENT_CONFIRM_TEXT;

  const [orderTitleError, setOrderTitleError] = useState("");

  const [sparePartTypeOptions, setSparePartTypeOptions] = useState([]);
  const [selectedSparePartType, setSelectedSparePartType] = useState<IOption>({});
  const [selectedSparePartTypeError, setSelectedSparePartTypeError] = useState('');

  const [departmentListOptions, setDepartmentListOptions] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState<IOption>({});
  const [selectedDepartmentError, setSelectedDepartmentError] = useState('');

  const [accountCodeOptions, setAccountCodeOptions] = useState([]);
  const [selectedAccountCode, setSelectedAccountCode] = useState<IOption>({});
  const [selectedAccountCodeError, setSelectedAccountCodeError] = useState('');

  const [urgentPriorityReasonOptions, setUrgentPriorityReasonOptions] = useState([]);
  const [selectedUrgentPriorityReason, setSelectedUrgentPriorityReason] = useState<IOption>({});
  const [selectedUrgentPriorityReasonError, setSelectedUrgentPriorityReasonError] = useState('');

  const [fastTrackPriorityReasonOptions, setFastTrackPriorityReasonOptions] = useState([]);
  const [selectedFastTrackPriorityReason, setSelectedFastTrackPriorityReason] = useState<IOption>({});
  const [selectedFastTrackPriorityReasonError, setSelectedFastTrackPriorityReasonError] = useState('');

  const [insuranceClaimOptions, setInsuranceClaimOptions] = useState([]);
  const [selectedInsuranceClaim, setSelectedInsuranceClaim] = useState<IOption>({});
  const [selectedInsuranceClaimError, setSelectedInsuranceClaimError] = useState('');

  const [seasonalOptions, setSeasonalOptions] = useState([]);
  const [selectedSeasonal, setSelectedSeasonal] = useState<IOption>({});
  const [selectedSeasonalError, setSelectedSeasonalError] = useState('');

  const [nationalityOptions, setNationalityOptions] = useState([]);
  const [selectedNationality, setSelectedNationality] = useState<IOption>({});
  const [selectedNationalityError, setSelectedNationalityError] = useState('');

  const [rankOptions, setRankOptions] = useState([]);
  const [selectedRank, setSelectedRank] = useState<IOption>({});
  const [selectedRankError, setSelectedRankError] = useState('');

  const [vesselAuxOptions, setVesselAuxOptions] = useState([]);
  const [selectedVesselAux, setSelectedVesselAux] = useState<IOption>({});
  const [selectedVesselAuxError, setSelectedVesselAuxError] = useState('');

  const [general1Options, setGeneral1Options] = useState([]);
  const [selectedGeneral1, setSelectedGeneral1] = useState<IOption>({});
  const [selectedGeneral1Error, setSelectedGeneral1Error] = useState('');

  const [general2Options, setGeneral2Options] = useState([]);
  const [selectedGeneral2, setSelectedGeneral2] = useState<IOption>({});
  const [selectedGeneral2Error, setSelectedGeneral2Error] = useState('');

  const [projectsOptions, setProjectsOptions] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState<IOption>({});
  const [selectedProjectsError, setSelectedProjectsError] = useState('');

  const [isHazardousMaterial, setIsHazardousMaterial] = useState(false);
  const [isRequiredDryDock, setIsRequiredDryDock] = useState(false);

  const [auxForVessel, setAuxForVessel] = useState<IAuxForVessel>({});

  const [justification, setJustification] = useState('');
  const [justificationError, setJustificationError] = useState('');
  const itemName = localStorage.getItem('itemName')

  // for error handling
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    setIsFormSubmitted(false);
  }, [selectedSparePartType, selectedDepartment, selectedAccountCode,
    selectedUrgentPriorityReason, selectedFastTrackPriorityReason,
    selectedInsuranceClaim, selectedSeasonal, selectedNationality,
    selectedRank, selectedVesselAux, selectedGeneral1,
    selectedGeneral2, selectedProjects, justification, orderTitle])
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
    setOrderTitle(e.target.value.toLowerCase());
  };

  const updateIsHazardousMaterial = (event: any) => {
    setIsHazardousMaterial(event.target.checked);
  }

  const updateIsRequiredDryDock = (event: any) => {
    setIsRequiredDryDock(event.target.checked);
  }

  const validateData = (): boolean => {
    let isValid = true;
    setIsFormSubmitted(true);

    if (!selectedAccountCode || !selectedAccountCode?.value || !selectedAccountCode.value.trim()) {
      setSelectedAccountCodeError('Please Select Account Code')
      isValid = false;
    } else {
      setSelectedAccountCodeError('')
    }
    if (!orderTitle || !orderTitle.trim()) {
      setOrderTitleError('Please Enter Order Title')
      isValid = false;
    } else {
      setOrderTitleError('')
    }

    if (!selectedProjects || !selectedProjects.value || !selectedProjects.value.trim()) {
      setSelectedProjectsError('Please Select Projects')
      isValid = false;
    } else {
      setSelectedProjectsError('');

    }

    if (!selectedSparePartType || !selectedSparePartType.value || !selectedSparePartType.value.trim()) {
      setSelectedSparePartTypeError('Please Select Spare Part Type')
      isValid = false;
    } else {
      setSelectedSparePartTypeError('')
    }

    if (!selectedDepartment || !selectedDepartment.value || !selectedDepartment.value.trim()) {
      setSelectedDepartmentError('Please Select Department')
      isValid = false;
    } else {
      setSelectedDepartmentError('');
    }

    // for urgent priority
    if (item === 'urgent') {
      if (!selectedUrgentPriorityReason || !selectedUrgentPriorityReason.value || !selectedUrgentPriorityReason.value.trim()) {
        setSelectedUrgentPriorityReasonError('Please Select Urgent Priority reason')
        isValid = false;
      } else {
        setSelectedUrgentPriorityReasonError('');
      }
      if (!justification || !justification || !justification.trim()) {
        setJustificationError('Please Select Justification')
        isValid = false;
      } else {
        setJustificationError('');
      }
    }

    // for fast track priority
    if (item === 'fasttrack') {
      if (!selectedFastTrackPriorityReason || !selectedFastTrackPriorityReason.value || !selectedFastTrackPriorityReason.value.trim()) {
        setSelectedFastTrackPriorityReasonError('Please Select Urgent Priority reason')
        isValid = false;
      } else {
        setSelectedUrgentPriorityReasonError('');
      }
    }

    // for based on account visible field
    if (auxForVessel) {
      if (auxForVessel['ChdAuxClaims'] && (!selectedInsuranceClaim || !selectedInsuranceClaim.value || !selectedInsuranceClaim.value.trim())) {
        setSelectedInsuranceClaimError('Please Select Insurance Claim')
        isValid = false;
      } else {
        setSelectedInsuranceClaimError('')
      }

      if (auxForVessel['ChdAuxSeasonal'] && (!selectedSeasonal || !selectedSeasonal.value || !selectedSeasonal.value.trim())) {
        setSelectedSeasonalError('Please Select Seasonal')
        isValid = false;
      } else {
        setSelectedSeasonalError('')
      }

      if (auxForVessel['ChdAuxNationality'] && (!selectedNationality || !selectedNationality.value || !selectedNationality.value.trim())) {
        setSelectedNationalityError('Please Select Nationality')
        isValid = false;
      } else {
        setSelectedNationalityError('')
      }

      if (auxForVessel['ChdAuxRank'] && (!selectedRank || !selectedRank.value || !selectedRank.value.trim())) {
        setSelectedRankError('Please Select Rank')
        isValid = false;
      } else {
        setSelectedRankError('')
      }
      // right now we don't have data for vessel AUX So we temparory remove this validation
      // if(auxForVessel.ChdAuxVessel && (!selectedVesselAux || !selectedVesselAux.value || !selectedVesselAux.value.trim())){
      //   setSelectedVesselAuxError('Please Select Vessel Aux')
      //   isValid = false;
      // } else {
      //   setSelectedVesselAuxError('')
      // }

      if (auxForVessel.ChdAuxGen1 && (!selectedGeneral1 || !selectedGeneral1.value || !selectedGeneral1.value.trim())) {
        setSelectedGeneral1Error('Please Select general 1')
        isValid = false;
      } else {
        setSelectedGeneral1Error('')
      }

      if (auxForVessel.ChdAuxgen3 && (!selectedGeneral2 || !selectedGeneral2.value || !selectedGeneral2.value.trim())) {
        setSelectedGeneral2Error('Please Select General 3')
        isValid = false;
      } else {
        setSelectedGeneral2Error('')
      }

    }


    return isValid;
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
    if (!validateData()) {
      return;
    }
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
      priority: item,
      orderTitle: orderTitle
    }));
    setTimeout(() => {
      router.push('/deliveryDetails');
    }, 100)
  }

  const handlePrevious = () => {
    router.push('/createRequisitionItems');
  }

  return (
    <Layout>
      <div className="flex justify-between w-10/12 items-center mx-auto">
        <div className="text-2xl font-bold mt-3">
          {/* <h2>Procurement</h2> */}
        </div>
        <div className="search-icon mt-3 gap-3 flex items-center">
          <AiOutlineSearch style={{ fontSize: "25px" }} />
          <IoMdNotificationsOutline style={{ fontSize: "25px" }} />
          <CgMenuGridO style={{ fontSize: "25px" }} />
          <ProfileDropDown />
        </div>
      </div>
      {/* <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-semibold">
          Create Requisition - {itemName}
        </h1>
        <Link href="/createRequisition"><AiOutlineClose style={{ fontSize: "25px" }} /></Link>
      </div> */}
      <CommonDialog
        open={isDialogOpen}
        onClose={handleDialogSave}
        title="Confirm"
        icon={<HelpOutlineOutlinedIcon className="color-golden" />}
        content={confirmContent}
        actions={dialogActions}
      />



      <HorizontalLinearStepper />
      <div className="flex justify-center margin-top-20-px">
        <Card variant="outlined" sx={{
          backgroundColor: '#F5F5F5',
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
                label={
                  <span>
                    Account Code<span style={{ color: 'red' }}>*</span>
                  </span>
                }
                onChange={setSelectedAccountCode} />
              {(selectedAccountCodeError && isFormSubmitted) &&
                <FormHelperText error={true}>{selectedAccountCodeError}</FormHelperText>
              }
            </FormControl>

            {auxForVessel && auxForVessel['ChdAuxClaims'] ? (
              <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                <SelectWithSearch
                  options={insuranceClaimOptions}
                  value={selectedInsuranceClaim}
                  placeholder={'Select Insurance Claim'}
                  label={
                    <span>
                      Insurance Claim<span style={{ color: 'red' }}>*</span>
                    </span>
                  }
                  onChange={setSelectedInsuranceClaim} />
                {(selectedInsuranceClaimError && isFormSubmitted) &&
                  <FormHelperText error={true}>{selectedInsuranceClaimError}</FormHelperText>
                }
              </FormControl>
            ) : null}

            {auxForVessel && auxForVessel['ChdAuxSeasonal'] ? (
              <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                <SelectWithSearch
                  options={seasonalOptions}
                  value={selectedSeasonal}
                  placeholder={'Seasonal'}
                  label={
                    <span>
                      Seasonal<span style={{ color: 'red' }}>*</span>
                    </span>
                  }
                  onChange={setSelectedSeasonal} />
                {(selectedSeasonalError && isFormSubmitted) &&
                  <FormHelperText error={true}>{selectedSeasonalError}</FormHelperText>
                }
              </FormControl>
            ) : null}

            {auxForVessel && auxForVessel['ChdAuxNationality'] ? (
              <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                <SelectWithSearch
                  options={nationalityOptions}
                  value={selectedNationality}
                  placeholder={'Nationality'}
                  label={
                    <span>
                      Nationality <span style={{ color: 'red' }}>*</span>
                    </span>
                  }
                  onChange={setSelectedNationality} />
                {(selectedNationalityError && isFormSubmitted) &&
                  <FormHelperText error={true}>{selectedNationalityError}</FormHelperText>
                }
              </FormControl>
            ) : null}

            {auxForVessel && auxForVessel['ChdAuxRank'] ? (
              <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                <SelectWithSearch
                  options={rankOptions}
                  value={selectedRank}
                  placeholder={'Rank'}
                  label={
                    <span>
                      Rank<span style={{ color: 'red' }}>*</span>
                    </span>
                  }
                  onChange={setSelectedRank} />
                {(selectedRankError && isFormSubmitted) &&
                  <FormHelperText error={true}>{selectedRankError}</FormHelperText>
                }
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
                {(selectedVesselAuxError && isFormSubmitted) &&
                  <FormHelperText error={true}>{selectedVesselAuxError}</FormHelperText>
                }
              </FormControl>
            ) : null}

            {auxForVessel && auxForVessel !== null && auxForVessel?.ChdAuxGen1 ? (
              <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                <SelectWithSearch
                  options={general1Options}
                  value={selectedGeneral1}
                  placeholder={'General 1'}
                  label={
                    <span>
                      General 1<span style={{ color: 'red' }}>*</span>
                    </span>
                  }
                  onChange={setSelectedGeneral1} />
                {(selectedGeneral1Error && isFormSubmitted) &&
                  <FormHelperText error={true}>{selectedGeneral1Error}</FormHelperText>
                }
              </FormControl>
            ) : null}

            {auxForVessel && auxForVessel !== null && auxForVessel?.ChdAuxgen3 ? (
              <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                <SelectWithSearch
                  options={general2Options}
                  value={selectedGeneral2}
                  placeholder={'General 3'}
                  label={
                    <span>
                      General 3<span style={{ color: 'red' }}>*</span>
                    </span>
                  }
                  onChange={setSelectedGeneral2} />
                {(selectedGeneral2Error && isFormSubmitted) &&
                  <FormHelperText error={true}>{selectedGeneral2Error}</FormHelperText>
                }
              </FormControl>
            ) : null}


            <FormControl fullWidth variant="filled" sx={{ m: 1, width: '100%' }}>
              <InputLabel htmlFor="input-field">Order Title<span style={{ color: 'red' }}>*</span></InputLabel>
              <Input
                id="input-field"
                type="text"
                placeholder="Order title"
                value={orderTitle}
                onChange={changeHandler}
              />
              {(orderTitleError && isFormSubmitted) &&
                <FormHelperText error={true}>{orderTitleError}</FormHelperText>
              }
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
              <SelectWithSearch
                options={projectsOptions}
                value={selectedProjects}
                placeholder={'Projects'}
                label={
                  <span>
                    Projects<span style={{ color: 'red' }}>*</span>
                  </span>
                }
                onChange={setSelectedProjects} />
              {(selectedProjectsError && isFormSubmitted) &&
                <FormHelperText error={true}>{selectedProjectsError}</FormHelperText>
              }
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
              <FormLabel component="legend">Priority</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value={'normal'} control={<Radio checked={item === 'normal'} onChange={changePriority} />} label={'normal'} />
                <FormControlLabel value={'urgent'} control={<Radio checked={item === 'urgent'} onChange={changePriority} />} label={'urgent'} />
                <FormControlLabel value={'fasttrack'} control={<Radio checked={item === 'fasttrack'} onChange={changePriority} />} label={'fasttrack'} />
                <FormControlLabel value={'local'} control={<Radio checked={item === 'local'} onChange={changePriority} />} label={'local'} />
              </RadioGroup>
            </FormControl>
            {isUrgent && (
              <div>
                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                  <SelectWithSearch
                    options={urgentPriorityReasonOptions}
                    value={selectedUrgentPriorityReason}
                    placeholder={'Select Priority Reason'}
                    label={
                      <span>
                        Priority Reason<span style={{ color: 'red' }}>*</span>
                      </span>
                    }
                    onChange={setSelectedUrgentPriorityReason} />
                  {(selectedUrgentPriorityReasonError && isFormSubmitted) &&
                    <FormHelperText error={true}>{selectedUrgentPriorityReasonError}</FormHelperText>
                  }
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }} variant="filled" className="notes">
                  <MultiLineTextBox
                    label="Justification"
                    value={justification}
                    onChange={updateJustification}
                  />
                  {(justificationError && isFormSubmitted) &&
                    <FormHelperText error={true}>{justificationError}</FormHelperText>
                  }
                </FormControl>
              </div>
            )}
            {item === 'fasttrack' && (
              <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                <SelectWithSearch
                  options={fastTrackPriorityReasonOptions}
                  value={selectedFastTrackPriorityReason}
                  placeholder={'Select Priority Reason'}
                  label={
                    <span>
                      Priority Reason<span style={{ color: 'red' }}>*</span>
                    </span>
                  }
                  onChange={setSelectedFastTrackPriorityReason} />
                {(selectedFastTrackPriorityReasonError && isFormSubmitted) &&
                  <FormHelperText error={true}>{selectedFastTrackPriorityReasonError}</FormHelperText>
                }
              </FormControl>
            )}

            <FormControl fullWidth sx={{ m: 1 }} variant="filled" className="global-native-select">
              <SelectWithSearch
                options={sparePartTypeOptions}
                value={selectedSparePartType}
                placeholder={'Select Spare Part Type'}
                label={
                  <span>
                    Spare Part Type<span style={{ color: 'red' }}>*</span>
                  </span>
                }
                onChange={setSelectedSparePartType} />
              {(selectedSparePartTypeError && isFormSubmitted) &&
                <FormHelperText error={true}>{selectedSparePartTypeError}</FormHelperText>
              }
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
              <SelectWithSearch
                options={departmentListOptions}
                value={selectedDepartment}
                placeholder={'Select Department'}
                label={
                  <span>
                    Department<span style={{ color: 'red' }}>*</span>
                  </span>
                }
                onChange={setSelectedDepartment} />
              {(selectedDepartmentError && isFormSubmitted) &&
                <FormHelperText error={true}>{selectedDepartmentError}</FormHelperText>
              }
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
      <Grid container spacing={2} alignItems="center" justifyContent="center" className="button-div">
        <Grid item xs={12} sm={8} md={6}>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item xs={10} sm={4} md={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handlePrevious}
                fullWidth
              >
                Previous
              </Button>
            </Grid>
            <Grid item xs={10} sm={4} md={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                fullWidth
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

    </Layout>
  );
};

export default OrderDetails;
