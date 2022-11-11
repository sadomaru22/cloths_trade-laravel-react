import { useEffect, useLayoutEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Grid, Typography, Avatar, Button, Container } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { BaseLayout } from 'layouts';
import React from 'react';
import { LinkButton } from 'templates';
//import Detail from 'templates/detail/Detail'
import { showoneTradePost } from 'store/thunks/trade_post';
import { useAppDispatch, useAppSelector } from 'utils/hooks';

const MyTradeDetail = () => {
  const dispatch = useAppDispatch();
  console.log('15行目');
  const userName = localStorage.getItem('userName'); //これもuseLocationでいいのでは？
  //const id: string = useParams();
  const params: { id: string; id2: string } = useParams(); //投稿情報用のパラメータ
  //const params2: { id2: string } = useParams(); //画像用のパラメータ
  const tpi_number = Number(params.id);
  const tpi_number2 = params.id2;
  console.log(tpi_number2);
  //const post = useAppSelector((state) => state.tradePost.dataOne);
  const post = useAppSelector((state) => state.tradePost.data[tpi_number]);
  console.log(post);
  const photos = useAppSelector((state) => state.tradePost.photos);
  useEffect(() => {
    console.log('useEffect動いてるか1');
    dispatch(showoneTradePost(tpi_number2));
    console.log('useEffect動いてるか2');
  }, [dispatch, tpi_number2]);
  // window.onload = function () {
  //   console.log('onLoadMyTradeTrade詳細');
  //   dispatch(showoneTradePost(tpi_number2));
  // };

  const history = useHistory();
  const onClickBack = () => {
    history.goBack();
  };

  return (
    // <div onLoad={onLoad}>
    <BaseLayout subtitle="my-detail">
      <Typography sx={{ marginTop: 10 }} />
      <Grid
        container
        spacing={5}
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <Grid item>
          <LinkButton size="large" to={'/sanka-ichiran'}>
            参加者一覧
          </LinkButton>
        </Grid>
        <Grid item>
          <LinkButton size="large" to={'/mytrade-juri'}>
            参加申請受理
          </LinkButton>
        </Grid>
        <Grid item>
          <LinkButton size="large" to={'/mytrade-edit'}>
            投稿の編集
          </LinkButton>
        </Grid>
      </Grid>
      {/* <Detail/> */}
      <Container maxWidth="md" sx={{ marginTop: 10 }}>
        <Grid container sx={{ marginBottom: 8 }}>
          <Grid item>
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: '6rem', height: '6rem' }}
            />
          </Grid>
          <Grid item>
            <Typography
              variant="h4"
              color="textSecondary"
              sx={{ marginLeft: 8 }}
            >
              {userName} さんの投稿詳細
            </Typography>
          </Grid>
        </Grid>

        <Grid container justifyContent="center" sx={{ marginBottom: 5 }}>
          <Grid item xs={6}>
            <Typography>日付：{post.date}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              現在の参加人数/上限人数: {post.sankasya} / {post.maxCapa}
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="h3" color="textSecondary" sx={{ marginBottom: 8 }}>
          {post.title}
        </Typography>
        <Typography sx={{ marginBottom: 5 }}>
          開催場所：　 {post.place}
        </Typography>
        <Typography sx={{ marginBottom: 8 }}>
          概要：　{post.description}
        </Typography>

        <ImageList
          sx={{ width: 800, height: 450 }}
          variant="woven"
          cols={3}
          gap={8}
        >
          {photos.map((item) => (
            <ImageListItem key={item}>
              <img
                src={`${item}?w=161&fit=crop&auto=format`}
                srcSet={`${item}?w=161&fit=crop&auto=format&dpr=2 2x`}
                alt={item}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
        <Button onClick={onClickBack}>一覧に戻る</Button>
      </Container>
    </BaseLayout>
    // </div>
  );
};

export default MyTradeDetail;
