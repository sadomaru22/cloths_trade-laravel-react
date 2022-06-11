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

type LabelProps = {
  label: string;
}

type ChildProps = ComponentPropsWithoutRef<'input'> & LabelProps;

const MaxCapa = React.forwardRef<HTMLInputElement, ChildProps>(
  ({ label, ...props }, ref) => { 
  // const [age, setAge] = React.useState('');

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
          //value={age}
          //onChange={handleChange}
          label={label}
          ref={ref}
        >
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={11}>11</MenuItem>
          <MenuItem value={12}>12</MenuItem>
          <MenuItem value={13}>13</MenuItem>
          <MenuItem value={14}>14</MenuItem>
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={16}>16</MenuItem>
          <MenuItem value={17}>17</MenuItem>
          <MenuItem value={18}>18</MenuItem>
          <MenuItem value={19}>19</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
        <FormHelperText>最大20人まで選択できます。</FormHelperText>
      </FormControl>
    </div>
  );
});

export default MaxCapa;

