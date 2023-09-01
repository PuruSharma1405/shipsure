
import { InputLabel, NativeSelect } from "@mui/material";


interface SelectBoxProps {
  label: string;
  value: any;
  options: Array<any>;
  onChange: (date: Date | null) => void;
}

export const SelectBox: React.FC<SelectBoxProps> = ({ label, value, options, onChange }) => {
  return (
    <>
        <InputLabel variant="standard" className="position-list-label" htmlFor="uncontrolled-native">
        {label}
        </InputLabel>
        <NativeSelect
            defaultValue={value}
            inputProps={{
                name: label,
                id: label,
            }}
        >
        {options.map((option, index) => {
            return (
                <option key={index} value={option}>{option}</option>
            )
        })}
        </NativeSelect>
    </>
  );
};

