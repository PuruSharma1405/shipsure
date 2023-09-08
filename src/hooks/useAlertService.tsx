import { showAlert, hideAlert  } from '@/redux/reducers/alertSlice';
import { useDispatch } from "react-redux";
import { AlertProps } from '@mui/material';

export const useAlertService = () => {
    const dispatch = useDispatch();
    const showAlertMessage = (message: string, severity: string) => {
      dispatch(showAlert({ message: message, severity: severity }));
      setTimeout(() => {
        hideAlertMessage();
      }, 6000);
    };

    const hideAlertMessage = () => {
      dispatch(hideAlert());
    };
  
    return { showAlertMessage };
  };