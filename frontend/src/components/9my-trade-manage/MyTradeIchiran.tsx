import React from 'react';
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
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    squea: {
      width: '50px',
      height: '50px',
      lineHeight: '50px',
      borderRadius: '50%',
      border: 1,
      borderWidth: '3px',
      borderColor: 'black',
      //backgroundColor: 'lemonchiffon',
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
    async function showAll() {
      const request: ShowAllTradePostRequest = {
        userId: userId,
        page: query.page,
      };
      await dispatch(showallWithIsPending(request));
    }
    showAll();
  }, [dispatch, query.page, userId]);

  //戻る
  const onClickBack = () => {
    history.push(`users/${userId}/top`);
  };

  //ページネーション
  const handleChange = (_e: React.ChangeEvent<unknown>, page: number) =>
    history.push(`?page=${String(page)}`);

  //confirmedやpendingに応じて背景色を変更、する処理
  var cardBG: string = '';
  const changeBackGround = (sankaflg: SankaFlags[]) => {
    //要素の個数分この関数を通るので、まずは初期化
    cardBG = '';
    //console.log(isPflg);
    const cflg: number[] = [];
    const pflg: number[] = [];
    // eslint-disable-next-line array-callback-return
    sankaflg.map((key) => {
      cflg.push(key.confirmed_flag);
      pflg.push(key.pending_flag);
    });
    //①
    if (pflg.includes(1) && !cflg.includes(1)) {
      //cardRef.current.style.backgroundColor = 'yellow';
      cardBG = 'lemonchiffon';
    }
    //②
    if (pflg.includes(1) && cflg.includes(1)) {
      cardBG = 'lightsalmon';
    }
    //③
    if (cflg.includes(1) && !pflg.includes(1)) {
      cardBG = 'lightpink';
    }
  };
  //「詳細」ボタン押下時に投稿に紐づく画像をとってから、遷移する。
  const onGetPhotos = async (id: string, sankaflg: SankaFlags[]) => {
    await dispatch(showoneTradePost(id));
    history.push({
      pathname: `mytrade-detail/${id}`,
      state: userName,
    });
  };

  //アイコン押下時
  const onClickIcon = async () => {
    history.push('/account');
  };

  return (
    <BaseLayout subtitle="Album">
      <Container maxWidth="md" className={classes.container}>
        <Grid container sx={{ marginBottom: 3 }}>
          <Grid item>
            <Link className={classes.link} onClick={() => onClickIcon()}>
              <Avatar
                alt="Remy Sharp"
                src={`${icon}`}
                sx={{ width: '6rem', height: '6rem' }}
              />
            </Link>
          </Grid>
          <Grid item sx={{ marginLeft: 8 }}>
            <Typography variant="h4" color="textSecondary">
              {userName} さんの投稿一覧
            </Typography>
            <Typography variant="h5" color="textSecondary">
              {`(自分が開催予定のトレード)`}
            </Typography>
          </Grid>
        </Grid>
        <Typography gutterBottom variant="h6" color="textSecondary">
          ①、②のトレードで、参加申請を確認してください。
        </Typography>
        <Grid container sx={{ marginBottom: 4 }}>
          <Grid item xs={4}>
            <Typography variant="h6" color="textSecondary">
              ①参加申請あり
            </Typography>
            <div
              className={classes.squea}
              style={{ backgroundColor: 'lemonchiffon' }}
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" color="textSecondary">
              ②参加者&参加申請あり
            </Typography>
            <div
              className={classes.squea}
              style={{ backgroundColor: 'lightsalmon' }}
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" color="textSecondary">
              ③参加者あり
            </Typography>
            <div
              className={classes.squea}
              style={{ backgroundColor: 'lightpink' }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          {posts.map((row, index: number) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              {changeBackGround(row.sankaflag)}
              <Card
                //ref={cardRef}
                className={classes.card}
                sx={{ backgroundColor: cardBG }}
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
                    onClick={() => onGetPhotos(row.id, row.sankaflag)}
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
