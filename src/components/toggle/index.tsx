import Switch from '@mui/material/Switch';

export interface ToggleButtonProps {
  isChecked: boolean;
  onToggle: any;
  label: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ isChecked, onToggle, label }) => {


  return (
    <Switch
      checked={isChecked}
      onChange={onToggle}
      name="toggleSwitch"
      color="primary"
    />
  );
};

export default ToggleButton;
