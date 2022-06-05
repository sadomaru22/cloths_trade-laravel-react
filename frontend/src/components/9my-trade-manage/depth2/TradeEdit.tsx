import React, { useState } from "react";
import { BaseLayout } from 'layouts'
import { AppBar, Button, Container, TextField, Toolbar, Typography } from '@mui/material'
import CameraIcon from '@mui/icons-material/PhotoCamera'
import { DatePickers } from 'components/8trade-post/DatePickers'
import { useAppDispatch } from 'utils/hooks'
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import MaxCapa from "components/8trade-post/MaxCapa";
import ImageTest from "components/8trade-post/ImageTest";
import Place from "components/8trade-post/Place";

type FormData =  {
   title?: string;
   date: string;
   photos: string;
   maxCapa: number;
   place: string;
   description: string;
}

const formdata: Record<keyof FormData, { id: string; label: string }> = {
   title: {
     id: 'title',
     label: 'タイトル',
   },
   date: {
     id: 'date',
     label: '日付',
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

 const schema = yup.object().shape({
    title: yup.string().label(formdata.title.label).required().max(30), 
    description: yup.string().label(formdata.description.label).required().min(30).max(300), 
 });

const TradeEdit = () => {
  const dispatch = useAppDispatch();

  const {
     register,
     handleSubmit,
     formState: { errors },
   } = useForm<FormData>({ mode: 'onBlur', resolver: yupResolver(schema) });

   const onSubmit = async (data: FormData) => {
      //レスポンスエラー時の処理を記載する、ImageTestの処理参考に
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
        id={formdata.maxCapa.id}
        label={formdata.maxCapa.label} 
        {...register('maxCapa')}/>
      <Place
        id={formdata.place.id}
        label={formdata.place.label} 
        {...register('place')}/>
      <ImageTest
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

export default TradeEdit
