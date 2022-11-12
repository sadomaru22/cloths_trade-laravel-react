import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { BaseLayout } from 'layouts';
import { LinkButton } from 'templates';
import { Button, Pagination } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'utils/hooks';
import { useHistory, useParams } from 'react-router-dom';
import { searchBySbTradePost2 } from 'store/thunks/trade_post2';

const SearchResultIchiran = () => {
  const dispatch = useAppDispatch();
  const params: { place: string } = useParams();
  const place = params.place;
  let posts = useAppSelector((state) => state.tradePost.data);
  console.log(posts);
  useEffect(() => {
    dispatch(searchBySbTradePost2(place));
  }, [dispatch, place]);
  // const [isPosts, setIsPosts] = useState(false);
  // if ((posts = [])) {
  //   setIsPosts(true);
  // }
  const history = useHistory();
  const onClickBack = () => {
    history.goBack();
  };
  return (
    <BaseLayout subtitle="Album">
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container sx={{ marginBottom: 8 }}>
          <Grid item>
            <Typography
              variant="h4"
              color="textSecondary"
              sx={{ marginLeft: 8 }}
            >
              "{place}"の検索結果は、{posts.length}件でした。
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          {posts.map((row, index) => (
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
                  <LinkButton
                    size="small"
                    to={{ pathname: `trade-detail/${row.id}` }}
                  >
                    詳細ページへ
                  </LinkButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Pagination
          count={5}
          sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}
        />
        <Button onClick={onClickBack}>一覧に戻る</Button>
      </Container>
    </BaseLayout>
  );
};

export default SearchResultIchiran;
