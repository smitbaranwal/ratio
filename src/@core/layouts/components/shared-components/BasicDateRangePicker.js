import * as React from 'react';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

export default function BasicDateRangePicker(props) {
    const {updateDate} = props
    function updateDaten(newValue){
        updateDate(newValue)
    }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* <DemoContainer components={['DateRangePicker']}> */}
        <DateRangePicker localeText={{ start: 'Start Date', end: 'End Date' }} 
        onChange={(newValue) => updateDaten(newValue)}
         />
      {/* </DemoContainer> */}
    </LocalizationProvider>
  );
}