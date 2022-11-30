import React, { useState } from 'react';
import { BaseLayout } from 'layouts';
import {
  Button,
  Container,
  TextField,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Box,
} from '@mui/material';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { addDays } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';

import { useAppDispatch } from 'utils/hooks';
import yup from 'templates/yup.locale'; //日本語化対応済み
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitButton } from 'templates';

import {
  CreateTradePostRequest,
  createTradePost,
} from 'store/thunks/trade_post';
import { PREF_OPTIONS } from 'templates/todouhuken';
import { store } from 'store';
import { Card } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(7),
      marginBottom: theme.spacing(10),
    },
    card: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(8),
      padding: theme.spacing(3),
    },
  })
);

type FormData = CreateTradePostRequest;

const maxCapa: number[] = [
  2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

const schema = yup.object().shape({
  title: yup.string().required('タイトルは必須項目です。').max(30),
  date: yup.string().required('日付の入力は必須です'), //dateじゃないことが判明
  place: yup.string().required('選択してください'),
  maxCapa: yup.number().required('選択してください'),
  description: yup.string().required().min(30).max(300),
});

const TradePost = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
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
    //   data.photos?.append('photos[]', image);
    // });
    //data.photos = imageData;

    const response = await dispatch(createTradePost(data));
    const success = store.getState().tradePost.success;
    const url = store.getState().tradePost.url;
    if (success) {
      setTimeout(function () {
        window.location.href = url;
      }, 2000); //これで自在にリダイレクトできる
    }

    if (createTradePost.rejected.match(response)) {
      setMessage(response.payload?.error?.message);
      alert(message);
    }
  };

  return (
    <BaseLayout subtitle="Post">
      <Container maxWidth="md" className={classes.container}>
        <Card className={classes.card} elevation={2}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* 日付 */}
            <FormControl
              sx={{ mb: 2, minWidth: 120 }}
              error={!!errors?.date?.message}
            >
              <LocalizationProvider dateAdapter={DateFnsUtils}>
                {/* <Box sx={{ width: '25ch' }}> */}
                <DatePicker
                  label="開催日時を選択"
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
              id="title"
              label="タイトル"
              //autoComplete={formdata.title.id}
              {...register('title')} //yupがここで紐付けてる
              helperText={errors?.title?.message}
              error={!!errors?.title}
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
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {images.map((image, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'relative',
                      width: '30%',
                      marginBottom: 10,
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
              </div>
              <br />
              <br />
            </FormControl>

            {/* 説明文 */}
            <TextField
              variant="outlined"
              //required
              id="description"
              label="説明文(開催場所の詳細などお書きください)"
              //autoComplete={formdata.description.id}
              {...register('description')}
              helperText={errors?.description?.message}
              error={!!errors?.description}
              fullWidth
              size="small"
              multiline
              rows={7}
              //InputProps={{ style: { height: 60 } }}
            />
            <Box mt={3} mb={1}>
              {<SubmitButton>投稿する</SubmitButton>}
            </Box>
          </form>
        </Card>
      </Container>
    </BaseLayout>
  );
};

export default TradePost;
