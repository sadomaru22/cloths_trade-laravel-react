import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  AppBar,
  Button,
  Container,
  TextField,
  Toolbar,
  Typography,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import Box from '@mui/material/Box';
import { addDays } from 'date-fns';
import { Grid } from '@material-ui/core';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import DateFnsUtils from '@date-io/date-fns';
import { updateTrade, UpdateTradeRequest } from 'store/thunks/trade_post2';
import { useAppDispatch, useAppSelector } from 'utils/hooks';
import { AlertMessage, SubmitButton } from 'templates';
import { PREF_OPTIONS } from 'templates/todouhuken';

type FormData = UpdateTradeRequest;

const maxCapa: number[] = [
  2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

const formdata: Record<keyof FormData, { id: string; label: string }> = {
  title: {
    id: 'title',
    label: 'タイトル',
  },
  date: {
    id: 'date',
    label: 'Email Address',
  },
  maxCapa: {
    id: 'jikoshokai',
    label: '自己紹介文',
  },
  place: {
    id: 'jikoshokai',
    label: '自己紹介文',
  },
  description: {
    id: 'jikoshokai',
    label: '自己紹介文',
  },
  trade_post_id: {
    id: 'trade_post_id',
    label: '固定値。APIに送る用',
  },
};

const schema = yup.object().shape({
  title: yup.string().max(30),
  description: yup.string().min(30).max(300),
});

const TradeEditOthers = (props: any) => {
  const index = props.index;
  const post = {
    title: useAppSelector((state) => state.tradePost.data[index].title),
    date: useAppSelector((state) => state.tradePost.data[index].date),
    maxCapa: useAppSelector((state) => state.tradePost.data[index].maxCapa),
    place: useAppSelector((state) => state.tradePost.data[index].place),
    description: useAppSelector(
      (state) => state.tradePost.data[index].description
    ),
    id: useAppSelector((state) => state.tradePost.data[index].id),
  };
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState<string | undefined>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onBlur', resolver: yupResolver(schema) });

  //ここから日付関連
  const referenceDate = addDays(new Date(), 7);
  const [value, setValue] = React.useState<Date | null>(post?.date); //日付のdefaultValueはここでセット

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  const onSubmit = async (data: FormData) => {
    // フォーカスを当てていない場合`defaultValue`でなく`undefined`となる
    // その場合変更点がないので現在の値をセットする
    if (!data.title) data.title = post.title;
    if (!data.date) data.date = post.date;
    if (!data.maxCapa) data.maxCapa = post.maxCapa;
    if (!data.place) data.place = post.place;
    if (!data.description) data.description = post.description;

    // 全ての項目で変更点がない場合はリクエストを送らない
    if (
      data.title === post?.title &&
      data.date === post?.date &&
      data.maxCapa === post?.maxCapa &&
      data.place === post?.place &&
      data.description === post?.description
    ) {
      setMessage('プロフィールが変更されておりません');
      return;
    }
    data.trade_post_id = post.id;
    const response = await dispatch(updateTrade(data));
    if (updateTrade.rejected.match(response)) {
      setMessage(response.payload?.error?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {message && <AlertMessage severity="error" body={message} />}
        </Grid>
        <TextField
          sx={{ margin: 1 }}
          variant="outlined"
          margin="normal"
          fullWidth
          id="title"
          label="タイトル"
          defaultValue={post?.title}
          autoComplete={formdata.title.id}
          {...register('title')} //yupがここで紐付けてる
          helperText={errors?.title?.message}
          error={!!errors?.title}
        />
        <Grid item md={4} xs={12}>
          <FormControl
            sx={{ mb: 3, minWidth: 120 }}
            error={!!errors?.date?.message}
          >
            <LocalizationProvider dateAdapter={DateFnsUtils}>
              <DatePicker
                label="開催日時を選択"
                value={value}
                onChange={handleChange}
                inputFormat="yyyy/MM/dd"
                mask="____/__/__"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    {...register('date')}
                    defaultValue={post?.date}
                  />
                )}
                minDate={referenceDate}
              />
            </LocalizationProvider>
            <FormHelperText>
              {errors?.date?.message
                ? errors?.date?.message
                : '現在日時から1週間後以降の日付を入力してください。'}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item md={2} xs={12}>
          <FormControl
            sx={{ mb: 3, minWidth: 125 }}
            error={!!errors?.maxCapa?.message}
          >
            <InputLabel id="demo-simple-select-helper-label">
              上限人数
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="上限人数"
              defaultValue={post?.maxCapa}
              {...register('maxCapa')}
            >
              {maxCapa.map((val) => (
                <MenuItem value={val} key={val}>
                  {val}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={6} xs={12}>
          <FormControl
            id={''}
            fullWidth
            sx={{ mb: 3, minWidth: 120 }}
            error={!!errors?.place?.message}
          >
            <InputLabel id="area-label">都道府県</InputLabel>
            <Select
              labelId="area-label"
              label="都道府県" // フォーカスを外した時のラベルの部分これを指定しないとラベルとコントロール線が被る
              defaultValue={post?.place}
              {...register('place')}
            >
              <MenuItem value="" sx={{ color: 'gray' }}>
                未選択
              </MenuItem>
              {PREF_OPTIONS.map((item) => (
                <MenuItem value={item.label} key={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {errors?.place?.message
                ? errors?.place?.message
                : '開催場所の都道府県のみ選択してください。'}
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
      <TextField
        variant="outlined"
        //required
        id="description"
        label="説明文(開催場所の詳細などお書きください)"
        defaultValue={post?.description}
        autoComplete={formdata.description.id}
        {...register('description')}
        helperText={errors?.description?.message}
        error={!!errors?.description}
        fullWidth
        size="small"
        multiline
        rows={7}
      />
      <Box mt={3}>{<SubmitButton>投稿の内容を更新する</SubmitButton>}</Box>
    </form>
  );
};

export default TradeEditOthers;
