import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { BaseLayout } from 'layouts';
import { Button, Pagination } from '@mui/material';
import { useAppDispatch, useAppSelector, useQuery } from 'utils/hooks';
import { useHistory, useParams } from 'react-router-dom';
import {
  searchBySbTradePost2,
  SearchBySbTradePost2Request,
} from 'store/thunks/trade_post2';
import { showoneTradePost, getOtherUser } from 'store/thunks/trade_post';

const SearchResultIchiran = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const userId = localStorage.getItem('userId');
  const params: { place: string } = useParams();
  const place = params.place;
  const query = { page: useQuery().get('page') || '' };
  const posts = useAppSelector((state) => state.tradePost.data); //ここからmapなどで展開、かずぶん。
  const count = useAppSelector((state) => state.tradePost.meta.last_page);
  const currentPage = useAppSelector(
    (state) => state.tradePost.meta.current_page
  );
  console.log(posts);
  useEffect(() => {
    const request: SearchBySbTradePost2Request = {
      place: place,
      page: query.page,
    };
    dispatch(searchBySbTradePost2(request));
  }, [dispatch, place, query.page]);

  //戻る
  const onClickBack = () => {
    history.push(`/users/${userId}/top`); //この画面だけは、history.pushで遷移してきているため別の方法で遷移
    // window.location.href = `/users/${userId}/top`;
  };

  //ページネーション
  const handleChange = (_e: React.ChangeEvent<unknown>, page: number) =>
    history.push(`?page=${String(page)}`);

  //「詳細」ボタン押下時に投稿に紐づく画像をとってから、遷移する。
  const onGetPhotos = async (index: number, id: string, userId: string) => {
    await dispatch(showoneTradePost(id)); //画像
    await dispatch(getOtherUser(userId));
    history.push(`/trade-detail/${id}`);
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
              {/*これでは、paginationで分割されたときに対応できない*/}
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
                  sx={{ pt: '16.25%' }}
                  image={`${row.thumbnail}`}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography>{row.description.substring(0, 45)}...</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    onClick={() => onGetPhotos(index, row.id, row.user_id)}
                  >
                    詳細ページへ
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        {posts.length > 0 && count && currentPage && (
          <Pagination
            count={count}
            page={currentPage}
            siblingCount={2}
            color="primary"
            size="large"
            onChange={handleChange}
            sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}
          />
        )}
        <Button
          variant="contained"
          sx={{ mt: 3, ml: 10 }}
          color="primary"
          onClick={onClickBack}
        >
          トップページに戻る
        </Button>
      </Container>
    </BaseLayout>
  );
};

export default SearchResultIchiran;
