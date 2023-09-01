"use client";
import React, { useState, useEffect } from "react";
import {
  AiOutlineSearch,
  AiOutlineClose,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { CgMenuGridO } from "react-icons/cg";
import ProfileDropDown from "../components/createRequisition/ProfileDropDown";
import { IoMdNotificationsOutline } from "react-icons/io";
import RequisitionDataContainer from "../components/createRequisition/RequisitionDataContainer";
import { useSelector, useDispatch } from "react-redux";
import HorizontalLinearStepper from '../components/createRequisitionSpares/Stepper'

import { TextField, Button, Container } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { setDeliveryDetailsState, selectDeliveryDetailsState } from "@/redux/reducers/deliveryDetailsSlice";
import CustomDatePicker from "@/components/common/datePicker";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { getToken } from '@/services/localstorageService';
import { getPortList } from '@/services/operations/deliveryDetailsApi';
import { SelectBox } from '@/components/common/SelectBox';
import { SearchWithDropDown } from '@/components/common/SearchWithDropdown';
import { MultiLineTextBox } from '@/components/common/multiLineTextBox';

const DeliveryDetails = () => {
  const itemValue = localStorage.getItem("itemName");


  useEffect(() => {
    async function fetchData() {
      const token = await getToken();
      const res = await getPortList(token, {});
      console.log('@@@data', res);
    }

    // fetchData();
  }, []);
  const dispatch = useDispatch();
  const [item, setItem] = useState("position_list");
  const deliveryDetailsState = useSelector(selectDeliveryDetailsState);
  const [formData, setFormData] = useState({
    deliveryDate: deliveryDetailsState?.deliveryDate || '',
    deliveryPort: deliveryDetailsState?.deliveryPort || '',
    notes: deliveryDetailsState?.notes || '',
  });

  const [positionList, setPositionList] = useState(10);
  const [componentName, setComponentName] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [notes, setNotes] = useState('');

  const updateNotes = () => {
    setNotes(e.target.value);
  }

  const changeHandler = (e: any): void => {
    setComponentName(e.target.value);
    setShowDropDown(true);
  };

  const fechingItem = (currItem: string) => {
    setComponentName(currItem);
    setShowDropDown(false);
  };

  const updatePositionList = (e: any) => {
    setPositionList(e.target.value);
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(setDeliveryDetailsState({
      ...formData
    }))
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const itemChange = (e: any) => {
    setItem(e.target.value);
  };

  const options = [10,20,30];

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
              <AiOutlineClose style={{ fontSize: "25px" }} />
            </div>
            <HorizontalLinearStepper />
              <div className='delivery-details'>
                <Container>
                  <Card variant="outlined" sx={{ maxWidth: '60%' }}>
                    <CardContent>
                      <form onSubmit={handleSubmit}>
                        <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                          <CustomDatePicker label="select Date" value={selectedDate} onChange={handleDateChange} />
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
                        <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                          {item === 'position_list' ? (
                            <SelectBox options={options} value={positionList} label="Position List" onChange={updatePositionList}/>
                          ) : item === 'home_port' ? 
                          <SearchWithDropDown 
                            label='Select Delivery Port'
                            value={componentName}
                            showDropDown={showDropDown}
                            onChange={changeHandler}
                            setShowDropDown={setShowDropDown}
                            fechingItem={fechingItem}
                           />
                          : ''}
                        </FormControl>


                        <FormControl fullWidth sx={{ m: 1 }} variant="filled" className="notes">
                          <MultiLineTextBox 
                            label="Notes"
                            value={notes}
                            onChange={updateNotes}
                          />
                          
                        </FormControl>
                      </form>

                    </CardContent>
                  </Card>
                </Container>
              {/* </div> */}
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
              />
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

export default DeliveryDetails;
