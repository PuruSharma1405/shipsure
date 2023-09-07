import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export const  SelectWithSearch = (props: any) => {
  const [inputValue, setInputValue] = useState('');
  const { options, label, value, onChange, placeholder } = props;
  const filterOptions = (options: any[], { inputValue }: {inputValue: string}) => {
    return options.filter(
      (option) =>{
        if(option.label && option.value) {
          return option.label.toLowerCase().includes(inputValue.toLowerCase()) ||
          option.value.toLowerCase().includes(inputValue.toLowerCase())
        } else {
          return true;
        }
      }
    );
  };
  
  // Check if the value is a blank object and set it to null
  const sanitizedValue = value && Object.keys(value).length === 0 ? null : value;


  return (
    <Autocomplete
      value={sanitizedValue}
      onChange={(_, newValue) => onChange(newValue)}
      options={options}
      autoComplete
      filterOptions={filterOptions}
      includeInputInList
      id="auto-complete"
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
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

