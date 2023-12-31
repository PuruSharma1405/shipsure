import React from 'react';
import { BsSearch} from "react-icons/bs";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export const  SelectWithSearch = (props: any) => {
  const { options, label, value, onChange, placeholder } = props;
  return (
    <Autocomplete
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      options={options}
      autoComplete
      includeInputInList
      id="auto-complete"
      isOptionEqualToValue={(option, value) =>
        option && label && option.label === value.label
      }
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <>
        <div>
            <TextField
            {...params}
            label={label}
            variant="standard"
            placeholder={placeholder}
            // InputProps={{
            //     endAdornment: <BsSearch />,
            //   }}
            />
        </div>
        </>
      )}
    />
  );
}

