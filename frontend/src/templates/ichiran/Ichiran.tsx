import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Avatar, Button, Link, Pagination } from '@mui/material';

const Ichiran = (props: any) => {
  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Grid container sx={{ marginBottom: 8 }}>
        <Grid item>
          <Link onClick={() => props.onClickIcon(props.other_user.id)}>
            <Avatar
              alt="Remy Sharp"
              src={`${props.other_user.icon}`}
              sx={{ width: '6rem', height: '6rem' }}
            />
          </Link>
        </Grid>
        <Grid item>
          <Typography variant="h4" color="textSecondary" sx={{ marginLeft: 8 }}>
            {props.other_user.name} さんの投稿一覧
          </Typography>
          <Typography variant="h5" color="textSecondary" sx={{ marginLeft: 8 }}>
            ({props.title2})
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        {props.posts.map(
          (
            row: {
              title: React.ReactNode;
              place: React.ReactNode;
              date: React.ReactNode;
              thumbnail: any;
              description: string;
              id: any;
              user_id: any;
            },
            index: string | number | null | undefined
          ) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography>{row.title}</Typography>
                <Typography>場所：{row.place}</Typography>
                <Typography>日付：{row.date}</Typography>
                <CardMedia
                  component="img"
                  sx={{ pt: '26.25%' }}
                  image={`${row.thumbnail}`}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography>{row.description.substring(0, 45)}...</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    onClick={() =>
                      props.onGetPhotos(index, row.id, row.user_id)
                    }
                  >
                    詳細ページへ
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )
        )}
      </Grid>
      {props.posts.length > 0 && props.count && props.currentPage && (
        <Pagination
          count={props.count}
          page={props.currentPage}
          siblingCount={2}
          color="primary"
          size="large"
          onChange={props.handleChange}
          sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}
        />
      )}
      <Button
        variant="contained"
        sx={{ mt: 3, ml: 10 }}
        color="primary"
        onClick={props.onClickBack}
      >
        トップページに戻る
      </Button>
    </Container>
  );
};

export default Ichiran;
