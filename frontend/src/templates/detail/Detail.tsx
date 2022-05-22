import React from 'react'
import { Box, Container } from '@mui/material'
import { BaseLayout } from 'layouts'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { Description } from '@mui/icons-material';


//API通信で使うURLは変数にする。propsでいけるかも。

const Detail = () => {
   //const { title, date, currentCapa, maxCapa, place, image, description } = props;   //propsではない。
   return (
      <BaseLayout subtitle='Detail Page'>
         <Container maxWidth="md" sx={{ marginTop: 10 }}>
         <Grid container sx={{marginBottom: 8}}>
            <Grid item>
                <Box sx={{ borderColor: 'primary.main', border: 1, borderRadius: '50%', width: '6rem', height: '6rem' }}>
                  <p>プロフィール画像{ }</p>
                </Box>
            </Grid>
            <Grid item>
                <Typography variant='h4' color='textSecondary' sx={{ marginLeft: 8 }}>
                  名前{ } さんの投稿詳細
                </Typography>
            </Grid>
          </Grid>
          
         <Grid container justifyContent="center" sx={{ marginBottom: 5 }}>
            <Grid item xs={6}>
            <Typography>
              日付：{row.date}
            </Typography>
            </Grid>
            <Grid item xs={6}>
            <Typography>
              現在の参加人数/上限人数:   {row.currentCapa} / {row.maxCapa}
            </Typography>
            </Grid>
         </Grid>
            <Typography variant='h3' color='textSecondary' sx={{ marginBottom: 8 }}>
            　{row.title}
            </Typography>
            <Typography sx={{ marginBottom: 5 }}>
              開催場所：　 {row.place}
            </Typography>
            <Typography sx={{ marginBottom: 8 }}>
              概要：　{ row.description }
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
         </Container>
      </BaseLayout>
   )
}

const row = 
   {
   title: 'タイトル1',
   date: '2022/07/30',
   currentCapa: 5,
   maxCapa: 20,
   place: '東京都渋谷区代々木神園町２−１',
   image: '',       //本来は合計で9枚
   description: '代々木公園で開催します。ぜひお立ち寄りください。' 
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
 

export default Detail