import React from 'react';
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
import { Avatar, Button, Link, Pagination } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector, useQuery } from 'utils/hooks';
import {
  showallTradePost,
  ShowAllTradePostRequest,
  showoneTradePost,
  getOtherUser,
} from 'store/thunks/trade_post';
import { useHistory } from 'react-router-dom';

const OtherUserIchiran = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const userId = '1'; //後でuseParamsに変える(OtherUserTopできたら)
  const userName = 'useLocation'; //後でuseLocationに変える(OtherUserTopできたら)
  const query = { page: useQuery().get('page') || '' };
  const posts = useAppSelector((state) => state.tradePost.data);
  const count = useAppSelector((state) => state.tradePost.meta.last_page);
  const currentPage = useAppSelector(
    (state) => state.tradePost.meta.current_page
  );
  useEffect(() => {
    const request: ShowAllTradePostRequest = {
      userId: userId,
      page: query.page,
    };
    dispatch(showallTradePost(request));
  }, [dispatch, query.page, userId]);

  //ページネーション
  const handleChange = (_e: React.ChangeEvent<unknown>, page: number) =>
    history.push(`?page=${String(page)}`);

  //「詳細」ボタン押下時に投稿に紐づく画像をとってから、遷移する。
  const onGetPhotos = async (index: number, id: string, userId: string) => {
    await dispatch(showoneTradePost(id)); //画像
    await dispatch(getOtherUser(userId)); //多分不要。
    history.push(`/trade-detail/${index}`);
  };

  return (
    // <Ichiran
    // url={"trade-detail"}
    // pageDescription={"開催予定のトレード一覧"}
    // />
    <BaseLayout subtitle="Album">
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            他のユーザが開催予定のトレード一覧
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container sx={{ marginBottom: 8 }}>
          <Grid item>
            <Link
              href={`/other-user/${userId}`}
              sx={{ textDecoration: 'none' }}
            >
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: '6rem', height: '6rem' }}
              />
            </Link>
          </Grid>
          <Grid item>
            <Typography
              variant="h4"
              color="textSecondary"
              sx={{ marginLeft: 8 }}
            >
              {userName} さんの投稿一覧
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
      </Container>
    </BaseLayout>
  );
};

export default OtherUserIchiran;
