import { showAlert  } from '@/redux/reducers/alertSlice';
import { useDispatch } from "react-redux";
import { AlertProps } from '@mui/material';

export const useAlertService = () => {
    const dispatch = useDispatch();
    const showAlertMessage = (message: string, severity: string) => {
      dispatch(showAlert({ message: message, severity: severity }));
    };
  
    return { showAlertMessage };
  };