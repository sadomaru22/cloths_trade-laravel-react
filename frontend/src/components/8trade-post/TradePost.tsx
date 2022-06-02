import React, { useState } from "react";
import { BaseLayout } from 'layouts'
import { AppBar, Button, Container, TextField, Toolbar, Typography } from '@mui/material'
import CameraIcon from '@mui/icons-material/PhotoCamera'
import { DatePickers } from 'components/8trade-post/DatePickers'
import { useAppDispatch } from 'utils/hooks'
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import MaxCapa from "./MaxCapa";
import ImageTest from "./ImageTest";
import Place from "./Place";
import { makeStyles } from "@material-ui/core";   //問題の箇所

// const useStyles = makeStyles(() => ({
//   input1: {
//     height: 50
//   },
//   input2: {
//     height: 50,
//     fontSize: "3em"
//   }
// }));

type FormData =  {
   email: string;
   password: string;
   title?: string;
   photos: string;
   maxCapa: number;
   place: string;
   description: string;
}

const formdata: Record<keyof FormData, { id: string; label: string }> = {
   email: {
     id: 'email',
     label: 'Email Address',
   },
   password: {
     id: 'password',
     label: 'Password',
   },
   title: {
     id: 'title',
     label: 'タイトル',
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
   email: yup.string().label(formdata.email.label).email().required(),
   password: yup
     .string()
     .label(formdata.password.label)
     .required()
     .min(8)
     .max(20),
 });

const TradePost = () => {
  const dispatch = useAppDispatch();
  //const classes = useStyles();
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
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
             トレードの投稿
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth='md'>
      <form onSubmit={handleSubmit(onSubmit)}>
      <DatePickers/>
      <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id={formdata.title.id}
            label={formdata.title.label}
            autoComplete={formdata.title.id}
            {...register('email')}
            helperText={errors?.title?.message}
            error={!!errors?.title}
          /> 
      <MaxCapa/>
      <Place/>  
      <ImageTest/>
      <TextField
            variant='outlined'
            required
            id={formdata.description.id}
            label={formdata.description.label}
            autoComplete={formdata.description.id}
            {...register('email')}
            helperText={errors?.description?.message}
            error={!!errors?.description}
            fullWidth
            //InputProps={{ classes: { input: classes.input2 } }}
          /> 
      <br/>   
				<Button
					variant="contained"
					type="submit"
				>
					投稿する
				</Button> 

      </form>
      </Container>

      </BaseLayout>
   )
}

export default TradePost
