
import { InputLabel, NativeSelect } from "@mui/material";


interface SelectBoxProps {
  label: string;
  value: any;
  options: Array<any>;
  onChange: (e: any | null) => void;
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
              className : "native-select-box-global",
            }}
        >
        {options.map((option, index) => {
            return (
                <option style={{backgroundColor: '#F2EEEB'}} key={index} value={option.value}>{option.label}</option>
            )
        })}
        </NativeSelect>
    </>
  );
};

