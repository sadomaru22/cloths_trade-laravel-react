import React, { useRef } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Avatar, Button, Link, Pagination } from '@mui/material';
import { BaseLayout } from 'layouts';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector, useQuery } from 'utils/hooks';
import {
  ShowAllTradePostRequest,
  showallWithIsPending,
  showoneTradePost,
} from 'store/thunks/trade_post';
import { useHistory } from 'react-router-dom';
import { SankaFlags } from 'models';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(7),
      marginBottom: theme.spacing(10),
    },
    link: {
      cursor: 'pointer',
    },
  })
);

const MyTradeIchiran = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');
  const icon = useAppSelector((state) => state.auth.user?.icon);
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
    dispatch(showallWithIsPending(request));
  }, [dispatch, query.page, userId]);

  //戻る
  const onClickBack = () => {
    history.push(`users/${userId}/top`);
  };

  //ページネーション
  const handleChange = (_e: React.ChangeEvent<unknown>, page: number) =>
    history.push(`?page=${String(page)}`);

  //「詳細」ボタン押下時に投稿に紐づく画像をとってから、遷移する。
  const onGetPhotos = async (index: number, id: string) => {
    await dispatch(showoneTradePost(id));
    history.push({
      pathname: `mytrade-detail/${id}`,
      state: userName,
    });
  };
  const cardRef = useRef<any>(null!);

  const changeBackGround = (sankaflg: SankaFlags[]) => {
    //console.log(sankaflg);
    // const cflg: number[] = [];
    // const pflg: number[] = [];
    // //sankaflg.map((row, index) => console.log(row));
    // Object.keys(sankaflg).forEach(key => {
    //   //console.log(`key: ${key} value: ${sankaflg[key]}`);
    //   sankaflg[key].
    // })
    // cflg.push(row.confirmed_flag)
    // pflg.push(row.pending_flag)

    // if (cflg === 1) {
    cardRef.current.style.backgroundColor = 'skyblue';
    // }
    // if (pflg === 1) {
    //   cardRef.current.style.backgroundColor = 'yellow';
    // }
  };

  //アイコン押下時
  const onClickIcon = async () => {
    history.push('/account');
  };

  return (
    <BaseLayout subtitle="Album">
      <Container maxWidth="md" className={classes.container}>
        <Grid container sx={{ marginBottom: 8 }}>
          <Grid item>
            <Link className={classes.link} onClick={() => onClickIcon()}>
              <Avatar
                alt="Remy Sharp"
                src={`${icon}`}
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
            <Typography
              variant="h5"
              color="textSecondary"
              sx={{ marginLeft: 8 }}
            >
              {`(自分が開催予定のトレード)`}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          {posts.map((row, index: number) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              {changeBackGround(row.sankaflag)}
              <Card
                ref={cardRef}
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
                    onClick={() => onGetPhotos(index, row.id)}
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

export default MyTradeIchiran;
