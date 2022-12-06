import React, { useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Typography, Avatar, Container, Link } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useAppDispatch, useAppSelector } from 'utils/hooks';
import { showoneTradePost } from 'store/thunks/trade_post';
import { Image } from 'models';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(10),
    },
    link: {
      cursor: 'pointer',
    },
  })
);

const Detail = (props: any) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const user = props.user;
  const id: string = props.id;
  const post = useAppSelector((state) => state.tradePost.dataOne);
  const photos: Image[] = useAppSelector((state) => state.tradePost.photos);

  // useEffect(() => {  //これでもリロードには対応できなかった
  //   console.log('aaa'); //これは動く
  //   async function dispatchShow() {
  //     await dispatch(showoneTradePost(id));
  //   }
  //   dispatchShow();
  // }, [dispatch, id]);
  useEffect(() => {
    console.log('aaa'); //これは動く
    dispatch(showoneTradePost(id));
  }, [dispatch, id]);

  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid container sx={{ marginBottom: 8 }}>
        <Grid item>
          <Link
            className={classes.link}
            onClick={() => props.onClickIcon(user.id)}
          >
            <Avatar
              alt="Remy Sharp"
              src={`${user.icon}`}
              sx={{ width: '6rem', height: '6rem' }}
            />
          </Link>
        </Grid>
        <Grid item>
          <Typography variant="h4" color="textSecondary" sx={{ marginLeft: 8 }}>
            {user.name} さんの投稿詳細
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
        sx={{ width: 600, height: 450, ml: 15 }}
        cols={3}
        rowHeight={164}
        //variant="woven"
        //gap={8}
      >
        {photos.map((row: any, index) => (
          <ImageListItem key={index}>
            <img
              src={`${row.file_name}?w=161&fit=crop&auto=format`}
              srcSet={`${row.file_name}?w=161&fit=crop&auto=format&dpr=2 2x`}
              alt={row.file_name}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  );
};

export default Detail;
