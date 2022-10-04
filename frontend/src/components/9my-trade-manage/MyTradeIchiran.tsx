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
//import Link from '@mui/material/Link';
//import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { BaseLayout } from 'layouts';
import { LinkButton } from 'templates';
import { Avatar, Pagination } from '@mui/material';
import { useEffect } from "react";
import {
   useAppDispatch,
   useAppSelector,
 } from 'utils/hooks';
import { showallTradePost } from 'store/thunks/trade_post';

//一覧画面
const MyTradeIchiran = () => {
   const dispatch = useAppDispatch();
   //const params = useParams<{ userId: string }>();
   //const params = useParams();
   const userId = useAppSelector((state) => state.auth.user?.id);
   const userName = useAppSelector((state) => state.auth.user?.name);  //名前の表示に使う予定
   const posts = useAppSelector((state) => state.tradePost.data);  //ここからmapなどで展開、かずぶん。
   useEffect(() => {
      dispatch(showallTradePost(userId));
    }, [dispatch, userId]);
    console.log(posts);
   return (
      // <Ichiran 
      // url={"mytrade-detail"}
      // pageDescription={"自分が開催予定のトレード一覧"}
      // />
      <BaseLayout subtitle='Album'>
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
           自分が開催予定のトレード一覧
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
                      あああああああああああああ
                    </Typography>
                  </CardContent>
                  <CardActions>
                  <LinkButton size="small" to={{pathname: `mytrade-detail/${row.id}`,}}>詳細ページへ</LinkButton>
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

export default MyTradeIchiran
