import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Typography, Avatar, Container, Link } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

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
  const user = props.user;
  const post = props.post;
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
            日付：{post.date.substring(0, 11)}
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
        {props.photos.map((item: any) => (
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
    </Container>
  );
};

export default Detail;
