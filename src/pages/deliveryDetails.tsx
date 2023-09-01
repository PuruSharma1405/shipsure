// components/MyForm.tsx
import React, { useState, useEffect } from 'react';
import { TextField, Button, Container } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { setDeliveryDetailsState, selectDeliveryDetailsState } from "@/redux/reducers/deliveryDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import CustomDatePicker from "@/components/common/datePicker";
import DropDown from "../components/createRequisitionSpares/DropDown"
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import NativeSelect from '@mui/material/NativeSelect';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { getToken } from '@/services/localstorageService';

interface MyFormProps {
  onSubmit: (formData: FormData) => void;
}

interface FormData {
  deliveryDate: string;
  deliveryPort: string;
  notes: string;
}

const DeliveryDetails: React.FC<MyFormProps> = ({ onSubmit }) => {
    useEffect(() => {
    async function fetchData() {
      const token = await getToken();
      const res = await fetch('http://192.168.201.232:3012/department-list?IsValidPO=1', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      const data = await res.json();
      console.log('@@@data', data);
    }

    // fetchData();
  }, []);
  const dispatch = useDispatch();
  const [item, setItem] = useState("position_list");
  const deliveryDetailsState = useSelector(selectDeliveryDetailsState);
  const [formData, setFormData] = useState<FormData>({
    deliveryDate: deliveryDetailsState?.deliveryDate || '',
    deliveryPort:  deliveryDetailsState?.deliveryPort || '',
    notes:  deliveryDetailsState?.notes || '',
  });

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

  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const itemChange = (e: any) => {
    setItem(e.target.value);
  };


  return (
    <div className='delivery-details'>
        <Container>
          <Card variant="outlined" sx={{ maxWidth: '60%' }}>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                  <CustomDatePicker label="select Date" value={selectedDate} onChange={handleDateChange}/>
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel value="position_list" control={<Radio checked={item === 'position_list'} onChange={itemChange}/>} label="Position List" />
                    <FormControlLabel value="home_port" control={<Radio checked={item === 'home_port'} onChange={itemChange}/>} label="Home Port" />
                    <FormControlLabel value="other_port" control={<Radio checked={item === 'other_port'} onChange={itemChange}/>} label="Other Port" />
                  </RadioGroup>
                </FormControl>
              
                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                  <InputLabel variant="standard" className="position-list-label" htmlFor="uncontrolled-native">
                    Position List
                    </InputLabel>
                    <NativeSelect
                      defaultValue={30}
                      inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                      }}
                    >
                      <option value={10}>Ten</option>
                      <option value={20}>Twenty</option>
                      <option value={30}>Thirty</option>
                    </NativeSelect>
                </FormControl>


                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                  <TextField id="outlined-basic" className='notes-text' label="Notes" variant="standard" multiline/>
                </FormControl>
                {/* <TextField
                  label="First Name"
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Last Name"
                  name="deliveryPort"
                  value={formData.deliveryPort}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                /> */}
                {/* <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button> */}
              </form>

            </CardContent>
          </Card>
        </Container>
    </div>
  );
};

export default DeliveryDetails;
