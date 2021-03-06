import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Axios from 'axios';
import { config } from '../config';
import styled from 'styled-components'
import { FormControl } from '@material-ui/core';



const MyFormControl = styled(FormControl)`
    width: 100%;
    display: flex;
    flex: 1 1;
`;
const MyTextField = styled(TextField)`
.MuiSelect-iconOutlined{
    color: white;
    font-size: 25px;
  }
  .MuiFormLabel-root {
    color: white;
    font-size: 25px;
    margin-left: 16px;
    margin-top: 3px;
  }

  .MuiInputBase-root {
    color: white;
    height: 79px;
    font-size: 25px;
  }
  .MuiInputLabel-outlined.MuiInputLabel-shrink{
    margin-left: 0;
    margin-top: 0;
    padding-top: 5px;
  }
  .MuiSvgIcon-root{
      color: white;
    }
  label.Mui-focused {
    color: white;
    font-size: 25px;
    margin-left: 0 !important;
    margin-top: 0 !important;
  }
  .MuiOutlinedInput-root {
    fieldset {
      border-color: white;
      font-size: 25px;
    }
    &:hover fieldset {
      border-color: white;
      font-size: 25px;
    }
    &.Mui-focused fieldset {
      border-color: white;
      font-size: 25px;
    }
  }
`;



export default function AutoComplitName({onSelect}){
    
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;
  
    React.useEffect(() => {
      let active = true;
  
      if (!loading) {
        return undefined;
      }
  
      (async () => {
        const response = await Axios.get(`${config.host}/autocomplete/name/`);
        const names = await response.data;
        console.log(names)
        if (active) {
            setOptions(names);
          }
        })();
  
      return () => {
        active = false;
      };
    }, [loading]);
  
    React.useEffect(() => {
      if (!open) {
        setOptions([]);
      }
    }, [open]);
  
    return (
    <MyFormControl>
      <Autocomplete
        id="asynchronous-demo"
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        getOptionSelected={(option, value) => option === value}
        getOptionLabel={(option) => option}
        options={options}
        loading={loading}
        onChange={(c, v) => onSelect(v)}
        renderInput={(params) => (
          <MyTextField
            {...params}
            label="ФИО"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
      </MyFormControl>
    );
  }