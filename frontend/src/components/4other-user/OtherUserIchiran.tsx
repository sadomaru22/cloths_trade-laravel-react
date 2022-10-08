import React from 'react'
//import Ichiran from 'templates/ichiran/Ichiran'
import AppBar from '@mui/material/AppBar';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { BaseLayout } from 'layouts';
import { LinkButton } from 'templates';
import { Avatar, Pagination } from '@mui/material';
import { useEffect } from "react";
import {
   useAppDispatch,
   useAppSelector,
 } from 'utils/hooks';
import { showallTradePost } from 'store/thunks/trade_post';

const OtherUserIchiran = () => {
   const dispatch = useAppDispatch();
   const userId = "8";  //後でuseParamsに変える(OtherUserTopできたら)
   const userName = "useLocation";  //後でuseLocationに変える(OtherUserTopできたら)

   const posts = useAppSelector((state) => state.tradePost.data);
   useEffect(() => {
      dispatch(showallTradePost(userId));
    }, [dispatch, userId]);
   return (
      // <Ichiran 
      // url={"trade-detail"}
      // pageDescription={"開催予定のトレード一覧"}
      // />
      <BaseLayout subtitle='Album'>
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
           他のユーザが開催予定のトレード一覧
          </Typography>
        </Toolbar>
      </AppBar>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container sx={{marginBottom: 8}}>
            <Grid item>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{width: '6rem', height: '6rem'}} />
            </Grid>
            <Grid item>
                <Typography variant='h4' color='textSecondary' sx={{ marginLeft: 8 }}>
                  {userName} さんの投稿一覧
                  {/* 渡邊さんの投稿一覧 */}
                </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={4}>
            {posts.map((row, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <Typography>
                    {row.title}
                  </Typography>
                  <Typography>
                    場所：{row.place}
                  </Typography>
                  <Typography>
                    日付：{row.date}
                  </Typography>
                  <CardMedia
                    component="img"
                    sx={{pt: '26.25%',}}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography>
                    {row.description.substring(0, 45)}...
                    </Typography>
                  </CardContent>
                  <CardActions>
                  <LinkButton size="small" to={{pathname: `trade-detail/${row.id}`, state: userName}}>詳細ページへ</LinkButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        <Pagination count={5} sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}/>
        </Container>
    </BaseLayout>      
   )
}

export default OtherUserIchiran
