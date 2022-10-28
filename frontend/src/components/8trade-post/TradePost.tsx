import React, { useState } from 'react';
import { BaseLayout } from 'layouts';
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
  Box,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { addDays } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';

import { useAppDispatch, useAppSelector } from 'utils/hooks';
import yup from 'templates/yup.locale'; //日本語化対応済み
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
//import ImageTest from './ImageTest';
//import Place from './Place';
//import { makeStyles } from "@material-ui/core";   //問題の箇所
//import DatePickers from './DatePickers';

import {
  CreateTradePostRequest,
  createTradePost,
} from 'store/thunks/trade_post';
import { PREF_OPTIONS } from 'templates/todouhuken';

type FormData = CreateTradePostRequest; //これでいいの？

const formdata: Record<keyof FormData, { id: string; label: string }> = {
  title: {
    id: 'title',
    label: 'タイトル',
  },
  date: {
    id: 'date',
    label: '開催日時を選択',
  },
  photos: {
    id: 'photos',
    label: '写真',
  },
  maxCapa: {
    id: 'maxCapa',
    label: '上限人数',
  },
  place: {
    id: 'place',
    label: '開催場所',
  },
  description: {
    id: 'description',
    label: '説明文',
  },
};

const maxCapa: number[] = [
  2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

//var dt: Date = new Date();
//var dtmin = dt.setDate(dt.getDate() + 10);

const schema = yup.object().shape({
  //  email: yup.string().label(formdata.email.label).email().required(),
  //  password: yup
  //    .string()
  //    .label(formdata.password.label)
  //    .required()
  //    .min(8)
  //    .max(20),

  //title: yup.string().label(formdata.title.label).required().max(30),
  title: yup.string().required('タイトルは必須項目です！！').max(30),
  date: yup.string().required('日付の入力は必須です'),
  place: yup.string().required('選択してください'), //dateじゃないことが判明
  maxCapa: yup.number().required('選択してください'),
  description: yup
    .string()
    .label(formdata.description.label)
    .required()
    .min(30)
    .max(300),
});

const TradePost = () => {
  const dispatch = useAppDispatch();
  const success = useAppSelector((state) => state.tradePost.success);
  const messageFromState = useAppSelector((state) => state.tradePost.message);
  const url = useAppSelector((state) => state.tradePost.url);
  const [message, setMessage] = useState<string | undefined>('');
  const {
    register,
    //control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onBlur', resolver: yupResolver(schema) });

  //ここから日付関連
  const referenceDate = addDays(new Date(), 7);
  const [value, setValue] = React.useState<Date | null>(null);

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  //ここから画像関連
  const [images, setImages] = useState<File[]>([]);
  const maxImagesUpload = 10; // 画像を最大10枚まで選択・アップロード
  const inputId = Math.random().toString(32).substring(2);
  const handleOnAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const img: File = e.target.files[0];
    setImages([...images, img]);
  };

  const handleOnRemoveImage = (index: number) => {
    // 選択した画像は削除可能
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const onSubmit = async (data: FormData) => {
    console.log(data);
    console.log(value);
    //画像を格納できる状態にする
    data.photos = [...images];
    // var imageData: [] = [];
    // images.map((image) => {
    //   imageData.append('images[]', image);
    //   });
    //data.photos = imageData;

    const response = await dispatch(createTradePost(data));
    if (success) {
      window.location.href = url; //もしかしたらこれで自在にリダイレクトできる
      alert(messageFromState);
    }
    // await axios.post('/api/v1/imageSave', imageData);

    if (createTradePost.rejected.match(response)) {
      setMessage(response.payload?.error?.message);
      alert(message);
    }
  };

  return (
    <BaseLayout subtitle="Post">
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            トレードの投稿
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ py: 10 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 日付 */}
          <FormControl
            sx={{ mb: 2, minWidth: 120 }}
            error={!!errors?.date?.message}
          >
            <LocalizationProvider dateAdapter={DateFnsUtils}>
              {/* <Box sx={{ width: '25ch' }}> */}
              <DatePicker
                label={formdata.date.label}
                value={value}
                onChange={handleChange}
                inputFormat="yyyy/MM/dd"
                mask="____/__/__"
                renderInput={(params) => (
                  <TextField {...params} {...register('date')} />
                )}
                minDate={referenceDate}
              />
              {/* </Box> */}
            </LocalizationProvider>
            <FormHelperText>
              {errors?.date?.message
                ? errors?.date?.message
                : '現在日時から1週間後以降の日付を入力してください。'}
            </FormHelperText>
          </FormControl>

          {/* タイトル */}
          <TextField
            sx={{ mb: 3 }}
            variant="outlined"
            margin="normal"
            fullWidth
            id={formdata.title.id}
            label={formdata.title.label}
            autoComplete={formdata.title.id}
            {...register('title')} //yupがここで紐付けてる
            helperText={errors?.title?.message}
            error={!!errors?.title}
            multiline
            //InputProps={{ style: { marginBottom: 3 } }}
          />

          {/* 上限人数 */}
          <FormControl
            sx={{ mb: 3, minWidth: 120 }}
            error={!!errors?.maxCapa?.message}
          >
            <InputLabel id="demo-simple-select-helper-label">
              上限人数
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="上限人数"
              {...register('maxCapa')}
            >
              {maxCapa.map((val) => (
                <MenuItem value={val} key={val}>
                  {val}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {errors?.maxCapa?.message
                ? errors?.maxCapa?.message
                : '最大20人まで選択できます。'}
            </FormHelperText>
          </FormControl>

          {/* 場所 */}
          <FormControl
            id={''} //これはいいけどlabelを追加するとエラーになる。。
            fullWidth
            sx={{ mb: 3 }}
            error={!!errors?.place?.message}
          >
            <InputLabel id="area-label">都道府県</InputLabel>
            <Select
              labelId="area-label"
              label="都道府県" // フォーカスを外した時のラベルの部分これを指定しないとラベルとコントロール線が被る
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

          {/* 画像 */}
          <FormControl sx={{ minWidth: 120 }}>
            {/* 1つのボタンで画像を選択する */}
            <label htmlFor={inputId}>
              <Button
                variant="contained"
                disabled={images.length >= maxImagesUpload}
                component="span"
              >
                画像追加
              </Button>
              <input
                id={inputId}
                type="file"
                multiple
                //name="photos[]"
                accept="image/*,.png,.jpg,.jpeg,.gif"
                {...register('photos')} //ここにnameも含まれてる
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleOnAddImage(e)
                }
                //ref={ref}
                style={{ display: 'none' }}
              />
            </label>
            {/* 画像を選択したら選択中のすべての画像のプレビューを表示 */}
            {images.map((image, i) => (
              <div
                key={i}
                style={{
                  position: 'relative',
                  width: '30%',
                }}
              >
                <IconButton
                  aria-label="delete image"
                  style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    color: '#aaa',
                  }}
                  onClick={() => handleOnRemoveImage(i)}
                >
                  <CancelIcon />
                </IconButton>
                <img
                  src={URL.createObjectURL(image)}
                  style={{
                    width: '80%',
                  }}
                />
              </div>
            ))}
            <br />
            <br />
          </FormControl>

          {/* 説明文 */}
          <TextField
            variant="outlined"
            //required
            id={formdata.description.id}
            label={formdata.description.label}
            autoComplete={formdata.description.id}
            {...register('description')}
            helperText={errors?.description?.message}
            error={!!errors?.description}
            fullWidth
            size="small"
            multiline
            rows={7}
            //InputProps={{ style: { height: 60 } }}
          />
          <Button variant="contained" type="submit" sx={{ mt: 3 }}>
            投稿する
          </Button>
        </form>
      </Container>
    </BaseLayout>
  );
};

export default TradePost;
