import * as React from 'react'
import { Box, FormControl, FormHelperText, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import DateFnsUtils from '@date-io/date-fns'
import AdapterDateFns from '@mui/x-date-pickers/AdapterDateFns'

export function DatePickers(props: {id: any, label: string}) {
  const [value, setValue] = React.useState<Date | null>(null)

  const handleChange = (newValue: Date | null) => {
    setValue(newValue)
  }

  return (
    <FormControl sx={{ mb: 3, minWidth: 120 }}>
    <LocalizationProvider dateAdapter={DateFnsUtils}>
      <Box sx={{ width: '25ch' }}>
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
    <FormHelperText>現在日時から1週間後以降の日付を入力してください。</FormHelperText>
    </FormControl>
  )
}
