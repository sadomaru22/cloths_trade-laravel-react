import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ComponentPropsWithoutRef } from 'react';

// var roop = () => {
//    const items = [];
//  for (let i = 0; i <21; i++) {
//    items.push(<MenuItem value={i}>{ i }</MenuItem>)
//  }
//  return { items };
// };
const maxCapa: number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

type LabelProps = {
  label: string;
}

type ChildProps = ComponentPropsWithoutRef<'input'> & LabelProps;

//refはDOMの参照として使用されているため、抜くわけにはいかない
const MaxCapa = React.forwardRef<HTMLInputElement, ChildProps>(
  ({ label, value, ...props }, ref) => { 

  // const handleChange = (event: SelectChangeEvent) => {
  //   setAge(event.target.value);
  // };

  return (
    <div>
      <FormControl sx={{ mb: 3, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">上限人数</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={value}
          //defaultValue={value}
          //onChange={handleChange}
          label={label}
          ref={ref}
        >
      {maxCapa.map((val) => 
      <MenuItem value={val} key={val}>{val}</MenuItem>
      )}
        </Select>
        <FormHelperText>最大20人まで選択できます。</FormHelperText>
      </FormControl>
    </div>
  );
});

export default MaxCapa;

