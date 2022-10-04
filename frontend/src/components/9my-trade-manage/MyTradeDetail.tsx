//import { useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { Grid, Typography, Avatar, Button, Container } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { BaseLayout } from 'layouts'
import React from 'react'
import { LinkButton } from 'templates'
//import Detail from 'templates/detail/Detail'
//import { showoneTradePost, ShowOneTradePostRequest } from 'store/thunks/trade_post';
import { useAppSelector } from 'utils/hooks'

const MyTradeDetail = () => {
   //const dispatch = useAppDispatch();
   const userName = useAppSelector((state) => state.auth.user?.name);  //名前の表示に使う
   const history = useHistory();
   const params: {id: string} = useParams();
   const tpi_number = Number(params.id);

   const post = useAppSelector((state) => state.tradePost.data[tpi_number]);

   const onClickBack = () => {
      history.goBack();
    }
   
   // useEffect(() => {
   //    dispatch(showoneTradePost(trade_post_id));
   //  }, []);

   return (
      <BaseLayout subtitle="my-detail">
         <Typography sx={{ marginTop: 10 }}/>
         <Grid container spacing={5} sx={{ display: 'flex', justifyContent: 'center' }}>
         <Grid item><LinkButton size="large" to={"/sanka-ichiran"}>参加者一覧</LinkButton></Grid>
         <Grid item><LinkButton size="large" to={"/mytrade-juri"}>参加申請受理</LinkButton></Grid>
         <Grid item><LinkButton size="large" to={"/mytrade-edit"}>投稿の編集</LinkButton></Grid>
         </Grid>
         {/* <Detail/> */}
         <Container maxWidth="md" sx={{ marginTop: 10 }}>
         <Grid container sx={{marginBottom: 8}}>
            <Grid item>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{width: '6rem', height: '6rem'}} />
            </Grid>
            <Grid item>
                <Typography variant='h4' color='textSecondary' sx={{ marginLeft: 8 }}>
                  {userName} さんの投稿詳細
                </Typography>
            </Grid>
          </Grid>
          
         <Grid container justifyContent="center" sx={{ marginBottom: 5 }}>
            <Grid item xs={6}>
            <Typography>
              日付：{post.date}
            </Typography>
            </Grid>
            <Grid item xs={6}>
            <Typography>
              現在の参加人数/上限人数:   {post.sankasya} / {post.maxCapa}
            </Typography>
            </Grid>
         </Grid>
            <Typography variant='h3' color='textSecondary' sx={{ marginBottom: 8 }}>
              {post.title}
            </Typography>
            <Typography sx={{ marginBottom: 5 }}>
              開催場所：　 {post.place}
            </Typography>
            <Typography sx={{ marginBottom: 8 }}>
              概要：　{ post.description }
            </Typography>

         <ImageList sx={{ width: 800, height: 450 }} variant="woven" cols={3} gap={8}>
            {itemData.map((item) => (
            <ImageListItem key={item.img}>
               <img
                  src={`${item.img}?w=161&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=161&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
               />
            </ImageListItem>
            ))}
         </ImageList>
         <Button onClick={onClickBack}>一覧に戻る</Button>
         </Container>

      </BaseLayout>
   )
}

//DB作るまではひとまずこれで行こう
const itemData = [
   {
     img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
     title: 'Bed',
   },
   {
     img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
     title: 'Kitchen',
   },
   {
     img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
     title: 'Sink',
   },
   {
     img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
     title: 'Books',
   },
   {
     img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
     title: 'Chairs',
   },
   {
     img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
     title: 'Candle',
   },
   {
     img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
     title: 'Laptop',
   },
   {
     img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
     title: 'Doors',
   },
   {
     img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
     title: 'Coffee',
   },
   {
     img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
     title: 'Storage',
   },
   {
     img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
     title: 'Coffee table',
   },
   {
     img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
     title: 'Blinds',
   },
 ];

export default MyTradeDetail
