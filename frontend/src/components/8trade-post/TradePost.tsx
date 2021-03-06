import React, { useState } from "react";
import { BaseLayout } from 'layouts'
import { AppBar, Box, Button, Container, TextField, Toolbar, Typography, FormControl, FormHelperText } from '@mui/material'
//import CameraIcon from '@mui/icons-material/PhotoCamera'

import { useAppDispatch } from 'utils/hooks'
import yup from 'templates/yup.locale';  //日本語化対応済み
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import MaxCapa from "./MaxCapa";
import ImageTest from "./ImageTest";
import Place from "./Place";
//import { makeStyles } from "@material-ui/core";   //問題の箇所
import DatePickers from "./DatePickers";

import { CreateTradePostRequest, createTradePost } from 'store/thunks/trade_post'

type FormData = CreateTradePostRequest;

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

 var dt: Date = new Date();
 var dtmin = dt.setDate(dt.getDate() + 10);

 const schema = yup.object().shape({
  //  email: yup.string().label(formdata.email.label).email().required(),
  //  password: yup
  //    .string()
  //    .label(formdata.password.label)
  //    .required()
  //    .min(8)
  //    .max(20),
    title: yup.string().label(formdata.title.label).required().max(30),
    date: yup.date().label(formdata.date.label).min("2022/06/03"), 
    description: yup.string().label(formdata.description.label).required().min(30).max(300),
    //textTest: yup.string().label(formdata.textTest.label).required().min(20) 
 });

const TradePost = () => {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState<string | undefined>('');
  const {
     register,
     control,
     handleSubmit,
     formState: { errors },
   } = useForm<FormData>({ mode: 'onBlur', resolver: yupResolver(schema) });

   //ここから日付入力
   const [value, setValue] = React.useState<Date | null>(null)

   const handleChange = (newValue: Date | null) => {
     setValue(newValue)
   }  //ここまで

   const onSubmit = async (data: FormData) => {
      //レスポンスエラー時の処理を記載する、ImageTestの処理参考に
      const response = await dispatch(createTradePost(data));
      if (createTradePost.rejected.match(response)) {
        setMessage(response.payload?.error?.message);
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
      <Container maxWidth='md' sx={{ py: 10 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
      <DatePickers
        required
        id={formdata.date.id}
        label={formdata.date.label} 
        {...register('date')}/>

      <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id={formdata.title.id}
            label={formdata.title.label}
            autoComplete={formdata.title.id}
            {...register('title')}
            helperText={errors?.title?.message}
            error={!!errors?.title}
            multiline
            InputProps={{ style: { marginBottom: 3 } }}
          /> 

      <MaxCapa
        required 
        id={formdata.maxCapa.id}
        label={formdata.maxCapa.label} 
        {...register('maxCapa')}/>
      <Place
        required
        id={formdata.place.id}
        label={formdata.place.label} 
        {...register('place')}/>
      <ImageTest
        required
        id={formdata.photos.id}
        label={formdata.photos.label} 
        {...register('photos')}/>
      <TextField
            variant='outlined'
            required
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
      <br/>   
				<Button
					variant="contained"
          type="submit"
          sx={{mt: 3}}
				>
					投稿する
				</Button> 

      </form>
      </Container>

      </BaseLayout>
   )
}

export default TradePost
