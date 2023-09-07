"use client";
import React, { useState, useEffect } from "react";
import {
  AiOutlineSearch,
  AiOutlineClose,
} from "react-icons/ai";
import { CgMenuGridO } from "react-icons/cg";
import ProfileDropDown from "@/components/createRequisition/ProfileDropDown";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import HorizontalLinearStepper from '../components/createRequisitionSpares/Stepper'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { setDeliveryDetailsState, selectDeliveryDetailsState } from "@/redux/reducers/deliveryDetailsSlice";
import CustomDatePicker from "@/components/common/datePicker";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { getToken } from '@/services/localstorageService';
import { getHomeList, getOtherPortList, getPositionList } from '@/services/operations/deliveryDetailsApi';
import { SelectBox } from '@/components/common/SelectBox';
import { MultiLineTextBox } from '@/components/common/multiLineTextBox';
import { SelectWithSearch } from '@/components/common/selectWithSearch';
import { selectRequisitionState, setDeliveryDetails } from "@/redux/reducers/requisitionSlice";
import { useRouter } from 'next/router';
import Link from "next/link";
import { IOption } from '@/interfaces/index';
import Layout from '@/components/common/requisitionLayout';
import { Button, Grid, FormHelperText } from '@mui/material';

const DeliveryDetails = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const requisitionStateData = useSelector(selectRequisitionState);
  const [item, setItem] = useState("position_list");
  const [homePortOptions, setHomePortOptions] = useState([]);
  const [selectedHomePort, setSelectedHomePort] = useState<IOption>({});
  const [selectedHomePortError, setSelectedHomePortError] = useState('');

  const [otherPortOptions, setOtherPortOptions] = useState([]);
  const [selectedOtherPort, setSelectedOtherPort] = useState<IOption>({});
  const [selectedOtherPortError, setSelectedOtherPortError] = useState('');

  const [positionListOptions, setPositionListOptions] = useState([]);
  const [selectedPositionList, setSelectedPositionList] = useState<IOption>({});
  const [selectedPositionListError, setSelectedPositionListError] = useState('');

  const itemName = localStorage.getItem('itemName')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDateError, setSelectedDateError] = useState('');


  // for error handling
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    setIsFormSubmitted(false);
  }, [selectedHomePort, selectedOtherPort, selectedPositionList, selectedDate])

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  const fetchData = async () => {
    const token = await getToken();
    let homeListParams: any = {};
    if (requisitionStateData.vesId) {
      homeListParams['VesId'] = requisitionStateData.vesId
    }
    if (requisitionStateData.coyId) {
      homeListParams['CoyId'] = requisitionStateData.coyId
    }
    const homePortRes = await getHomeList(token, homeListParams);
    const { recordset } = homePortRes;
    if (recordset) {
      const homePortOptions = recordset.map((el: any) => {
        return {
          label: el.PrtIdDefHome,
          value: el.PrtName
        }
      });
      setHomePortOptions(homePortOptions);
    }

    const otherPortRes = await getOtherPortList(token, {});
    if (otherPortRes?.result?.recordset) {
      const otherPortOptions = otherPortRes.result.recordset.map((el: any) => {
        return {
          value: el.PrtId,
          label: el.PrtName
        }
      });
      setOtherPortOptions(otherPortOptions);
    }

    let positionListParams: any = {};
    if (requisitionStateData.vesId) {
      positionListParams.VesselId = requisitionStateData.vesId
    }
    if (selectedDate) {
      positionListParams.ExpectedDeliveryDate = selectedDate
    }
    const positionList = await getPositionList(token, positionListParams);
    if (positionList?.recordset) {
      const positionListOptions = positionList.recordset.map((el: any) => {
        return {
          label: el.PrtName,
          value: el.PrtIdDefHome
        }
      });
      if(positionListOptions && positionListOptions.length > 0) {
        setPositionListOptions(positionListOptions);
      }
    }
  }


  const [notes, setNotes] = useState('');
  const updateNotes = (e: any) => {
    setNotes(e.target.value);
  }
  const validateData = (): boolean => {
    let isValid = true;
    setIsFormSubmitted(true);

    if (!selectedDate) {
      setSelectedDateError('Please Select Date');
      isValid = false;
    } else {
      setSelectedDateError('');
    }

    if (item === 'position_list' && (!selectedPositionList || !selectedPositionList.value || !selectedPositionList.value.trim())) {
      setSelectedPositionListError('Please Position');
      isValid = false;
    } else {
      setSelectedPositionListError('');
    }

    if (item === 'home_port' && (!selectedHomePort || !selectedHomePort.value || !selectedHomePort.value.trim())) {
      setSelectedHomePortError('Please Position');
      isValid = false;
    } else {
      setSelectedHomePortError('');
    }

    if (item === 'other_port' && (!selectedOtherPort || !selectedOtherPort.value || !selectedOtherPort.value.trim())) {
      setSelectedOtherPortError('Please Position');
      isValid = false;
    } else {
      setSelectedOtherPortError('');
    }

    return isValid;

  }

  const handleNext = () => {
    if (!validateData()) {
      return;
    }

    dispatch(setDeliveryDetails({
      deliveryDate: selectedDate,
      deliveryHomePort: selectedHomePort,
      deliveryOtherPort: selectedOtherPort,
      selectedPosition: selectedPositionList,
      deliveryLocation: item,
      note: notes,
    }));
    setTimeout(() => {
      router.push('/orderSummary');
    }, 100)
  }


  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const itemChange = (e: any) => {
    setItem(e.target.value);
  };

  const handlePrevious = () => {
    router.push('/orderDetails');
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
              <CustomDatePicker label="select Date" value={selectedDate} onChange={handleDateChange} />
              {(selectedDateError && isFormSubmitted) &&
                  <FormHelperText error={true}>{selectedDateError}</FormHelperText>
              }
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="position_list" control={<Radio checked={item === 'position_list'} onChange={itemChange} />} label="Position List" />
                <FormControlLabel value="home_port" control={<Radio checked={item === 'home_port'} onChange={itemChange} />} label="Home Port" />
                <FormControlLabel value="other_port" control={<Radio checked={item === 'other_port'} onChange={itemChange} />} label="Other Port" />
              </RadioGroup>
            </FormControl>
            {item === 'position_list' ? (
              <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                <SelectWithSearch
                  label='Position List'
                  options={positionListOptions}
                  onChange={setSelectedPositionList}
                  value={selectedPositionList}
                  placeholder="Position List"
                />
                {(selectedPositionListError && isFormSubmitted) &&
                  <FormHelperText error={true}>{selectedPositionListError}</FormHelperText>
                }
              </FormControl>

            ) : item === 'home_port' ?
              <FormControl fullWidth sx={{ m: 1 }} variant="filled">

                <SelectWithSearch
                  label='select port'
                  options={homePortOptions}
                  onChange={setSelectedHomePort}
                  value={selectedHomePort}
                  placeholder="Select Delivery Port"
                />
                {(selectedHomePortError && isFormSubmitted) &&
                  <FormHelperText error={true}>{selectedHomePortError}</FormHelperText>
                }
              </FormControl>
              :
              <FormControl fullWidth sx={{ m: 1 }} variant="filled">

                <SelectWithSearch
                  label='select port'
                  options={otherPortOptions}
                  onChange={setSelectedOtherPort}
                  value={selectedOtherPort}
                  placeholder="Select Delivery Port"
                />
                {(selectedHomePortError && isFormSubmitted) &&
                  <FormHelperText error={true}>{selectedHomePortError}</FormHelperText>
                }
              </FormControl>
            }


            <FormControl fullWidth sx={{ m: 1 }} variant="filled" className="notes">
              <MultiLineTextBox
                label="Notes"
                value={notes}
                onChange={updateNotes}
              />

            </FormControl>
          </CardContent>
        </Card>
      </div>
      <Grid container spacing={2} alignItems="center" justifyContent="center" className="mt-20">
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

export default DeliveryDetails;
