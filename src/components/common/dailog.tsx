import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

interface CommonDialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  content?: React.ReactNode;
  icon?: React.ReactNode;c?: React.ReactNode;
  actions?: Array<{ label: string; onClick: () => void; color?: 'primary' | 'secondary' }>;
}

const CommonDialog: React.FC<CommonDialogProps> = ({ open, onClose, title, content, actions, icon }) => {
    const contentWithNewLine = content?.toLocaleString().split('\n');
  return (
    <Dialog open={open} onClose={onClose}>
      <div className='color-golden dialog-title'>
        {icon && (<Avatar>{icon}</Avatar>)}
        {title && <DialogTitle>{title}</DialogTitle>}
      </div>
      {content && <DialogContent>{contentWithNewLine?.map((el, index) => {
        return (
            <>
                {el ? (
                    <>
                        <p key={index}>{el}</p>
                        <br/>
                    </>
                ): null}
            </>
        )
      })}</DialogContent>}
      {actions && (
        <DialogActions>
          {actions.map((action, index) => (
            <Button
              key={index}
              onClick={action.onClick}
              variant="contained"
              color={action.color || 'primary'}
            >
              {action.label}
            </Button>
          ))}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default CommonDialog;
