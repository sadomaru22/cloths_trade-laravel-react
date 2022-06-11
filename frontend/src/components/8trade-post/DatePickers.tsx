import * as React from 'react'
import { Box, FormControl, FormHelperText, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import DateFnsUtils from '@date-io/date-fns'
import { addDays } from "date-fns";
import AdapterDateFns from '@mui/x-date-pickers/AdapterDateFns'
import { ComponentPropsWithoutRef } from 'react';

type LabelProps = {
  label: string;
}

const referenceDate = addDays(new Date(), 7);

type ChildProps = ComponentPropsWithoutRef<'input'> & LabelProps;

const DatePickers = React.forwardRef<HTMLInputElement, ChildProps>(
  ({ label, ...props }, ref) => { 
  const [value, setValue] = React.useState<Date | null>(null)

  const handleChange = (newValue: Date | null) => {
    setValue(newValue)
  }

  return (
    <FormControl sx={{ mb: 3, minWidth: 120 }}>
    <LocalizationProvider dateAdapter={DateFnsUtils}>
      <Box sx={{ width: '25ch' }}>
        <DatePicker
          label={label}
          ref={ref}
          value={value}
          onChange={handleChange}
          inputFormat='yyyy/MM/dd'
	        mask='____/__/__'
          renderInput={(params) => <TextField {...params} />}
          minDate={referenceDate}
        />
      </Box>
    </LocalizationProvider>
    <FormHelperText>現在日時から1週間後以降の日付を入力してください。</FormHelperText>
    </FormControl>
  );
});

export default DatePickers;