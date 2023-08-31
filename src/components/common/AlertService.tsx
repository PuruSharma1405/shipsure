// src/AlertService.tsx
import React, { useState, useEffect } from 'react';
import { Snackbar, Alert as MuiAlert, AlertProps } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { selectAlertState } from '@/redux/reducers/alertSlice';
export interface IAlertService {
  showAlert: (message: string, severity: AlertProps['severity']) => void;
}

const AlertProvider= () => {
  const dispatch = useDispatch();
  const alertState = useSelector(selectAlertState);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertProps['severity']>('info');

  useEffect(() => {
    if(alertState.open){
      showAlert(alertState.message, alertState.severity);
    }
  },[alertState.open])
  const showAlert = (message: string, severity: AlertProps['severity']) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
        <MuiAlert elevation={6} variant="filled" onClose={() => setOpen(false)} severity={severity}>
          {message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default AlertProvider;
