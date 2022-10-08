import React from 'react'
import { BaseLayout } from 'layouts'
//import Detail from 'templates/detail/Detail'
import { Grid, Typography, Avatar, Container, Button, Slide } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { TransitionProps } from '@mui/material/transitions';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useAppSelector } from 'utils/hooks'

const Transition = React.forwardRef(function Transition(
   props: TransitionProps & {
     children: React.ReactElement<any, any>;
   },
   ref: React.Ref<unknown>,
 ) {
   return <Slide direction="up" ref={ref} {...props} />;
 });

const OtherUserDetail = () => {
   const history = useHistory();
   const {state} = useLocation();

   const params: {id: string} = useParams();
   const tpi_number = Number(params.id);

   const post = useAppSelector((state) => state.tradePost.data[tpi_number]);
   
   const [open, setOpen] = React.useState(false);

   const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleGo = () => {
      //ここに参加申請のAPI処理かく
      history.push('/top');
    }

    const onClickBack = () => {
      history.goBack();
    }    
   
   return (
      <BaseLayout subtitle="other-user-detail">
      {/* <Detail/> */}
      <Container maxWidth="md" sx={{ marginTop: 10 }}>
         <Grid container sx={{marginBottom: 8}}>
            <Grid item>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{width: '6rem', height: '6rem'}} />
            </Grid>
            <Grid item>
                <Typography variant='h4' color='textSecondary' sx={{ marginLeft: 8 }}>
                  {state} さんの投稿詳細
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

         <Grid container sx={{mt: 15, mb: 8, justifyContent: 'center'}}>
            <Grid item>
               <Button variant='contained' color='primary' sx={{ mr: 8 }} onClick={handleClickOpen}>参加申請</Button>
            </Grid>
            <Grid item>
               <Button variant='contained' color='primary' onClick={onClickBack}>一覧に戻る</Button>
            </Grid>
          </Grid>

      <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      >
         <DialogTitle>{`参加申請を${state}さんに送ります。よろしいですか?`}</DialogTitle>
         <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
               参加申請を送信すると、主催者に通知が行きます。主催者が申請を受理すると、参加が確定となります。
            </DialogContentText>
         </DialogContent>
         <DialogActions>
            <Button onClick={handleClose}>やっぱりやめる</Button>
            <Button onClick={handleGo}>申請する</Button>
         </DialogActions>
      </Dialog>
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

export default OtherUserDetail
