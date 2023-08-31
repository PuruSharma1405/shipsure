// components/MyForm.tsx
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { setDeliveryDetailsState } from "@/redux/reducers/deliveryDetailsSlice";
import { useDispatch } from "react-redux";

interface MyFormProps {
  onSubmit: (formData: FormData) => void;
}

interface FormData {
  deliveryDate: string;
  deliveryPort: string;
  notes: string;
}

const DeliveryDetails: React.FC<MyFormProps> = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<FormData>({
    deliveryDate: '',
    deliveryPort: '',
    notes: '',
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

  return (
    <Card variant="outlined" sx={{ minWidth: 275 }}>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <TextField
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
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>

      </CardContent>
    </Card>
  );
};

export default DeliveryDetails;
