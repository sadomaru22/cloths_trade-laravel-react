import { useHistory, useParams } from 'react-router-dom';
import { Grid, Typography, Avatar, Button, Container } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { BaseLayout } from 'layouts';
import React from 'react';
import { LinkButton } from 'templates';
import { useAppSelector } from 'utils/hooks';

const MyTradeDetail = () => {
  const userName = localStorage.getItem('userName'); //これもuseLocationでいいのでは？
  const params: { id: string } = useParams(); //投稿情報用のパラメータ
  const tpi_number = Number(params.id);
  const post = useAppSelector((state) => state.tradePost.data[tpi_number]);
  console.log(post);
  const photos = useAppSelector((state) => state.tradePost.photos);

  const history = useHistory();
  const onClickBack = () => {
    history.goBack();
  };

  return (
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
          <Grid item xs={4}>
            <Typography color="textSecondary" borderBottom={0.5}>
              日付：{post.date}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <p />
          </Grid>
          <Grid item xs={6}>
            <Typography color="textSecondary" borderBottom={0.5}>
              現在の参加人数/上限人数: {post.sankasya} / {post.maxCapa}
            </Typography>
          </Grid>
        </Grid>
        <Typography
          variant="h3"
          color="textSecondary"
          sx={{ marginBottom: 8, borderBottom: 0.5 }}
        >
          {post.title}
        </Typography>
        <Typography
          color="textSecondary"
          sx={{ marginBottom: 5, borderBottom: 0.5 }}
        >
          開催場所：　 {post.place}
        </Typography>
        <Typography
          color="textSecondary"
          sx={{ marginBottom: 8, borderBottom: 0.5 }}
        >
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
        <Button sx={{ mt: 5, mb: 3 }} onClick={onClickBack}>
          一覧に戻る
        </Button>
      </Container>
    </BaseLayout>
  );
};

export default MyTradeDetail;
