// components/MyForm.tsx
import React, { useState, useEffect } from 'react';
import { TextField, Button, Container } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { setDeliveryDetailsState, selectDeliveryDetailsState } from "@/redux/reducers/deliveryDetailsSlice";
import { useDispatch, useSelector } from "react-redux";

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

  return (
    <div className='delivery-details'>
        <Container>
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
        </Container>
    </div>
  );
};

export default DeliveryDetails;
