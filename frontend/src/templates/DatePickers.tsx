import * as React from 'react'
import { Box, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AdapterDateFns from '@mui/x-date-pickers/AdapterDateFns'
import DateFnsUtils from '@date-io/date-fns'

export function DatePickers() {
  const [value, setValue] = React.useState<Date | null>(null)

  const handleChange = (newValue: Date | null) => {
    setValue(newValue)
  }

  return (
    <LocalizationProvider dateAdapter={DateFnsUtils}>
      <Box sx={{ m: 2, width: '25ch' }}>

        <DatePicker
          label="開催日時を選択"
          value={value}
          onChange={handleChange}
          inputFormat='yyyy/MM/dd'
	  mask='____/__/__'
          renderInput={(params) => <TextField {...params} />}
        />

      </Box>
    </LocalizationProvider>
  )
}
