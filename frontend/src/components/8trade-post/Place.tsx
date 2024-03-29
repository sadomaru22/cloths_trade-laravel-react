import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ComponentPropsWithoutRef } from 'react';

const pref = [
  '北海道',
  '青森県',
  '岩手県',
  '宮城県',
  '秋田県',
  '山形県',
  '福島県',
  '茨城県',
  '栃木県',
  '群馬県',
  '埼玉県',
  '千葉県',
  '東京都',
  '神奈川県',
  '新潟県',
  '富山県',
  '石川県',
  '福井県',
  '山梨県',
  '長野県',
  '岐阜県',
  '静岡県',
  '愛知県',
  '三重県',
  '滋賀県',
  '京都府',
  '大阪府',
  '兵庫県',
  '奈良県',
  '和歌山県',
  '鳥取県',
  '島根県',
  '岡山県',
  '広島県',
  '山口県',
  '徳島県',
  '香川県',
  '愛媛県',
  '高知県',
  '福岡県',
  '佐賀県',
  '長崎県',
  '熊本県',
  '大分県',
  '宮崎県',
  '鹿児島県',
  '沖縄県',
];

type LabelProps = {
  label: string;
};

type ChildProps = ComponentPropsWithoutRef<'input'> & LabelProps;

const Place = React.forwardRef<HTMLInputElement, ChildProps>(
  ({ label, value, ...props }, ref) => {
    //   const [age, setAge] = React.useState('');

    //  //これいらんよな？
    //   const handleChange = (event: SelectChangeEvent) => {
    //     setAge(event.target.value);
    //   };

    return (
      <div>
        <FormControl sx={{ mb: 3, marginTop: 3, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">都道府県</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={value}
            // onChange={handleChange}
            label={label}
            ref={ref}
          >
            {pref.map((val) => (
              <MenuItem value={val} key={val}>
                {val}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            開催場所の都道府県のみ選択してください。
          </FormHelperText>
        </FormControl>
      </div>
    );
  }
);

export default Place;
