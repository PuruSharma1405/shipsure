import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";


interface DatePickerProps {
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
}

const CustomDatePicker: React.FC<DatePickerProps> = ({ label, value, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker 
             label={label}
             value={value}
             onChange={onChange}
        />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
