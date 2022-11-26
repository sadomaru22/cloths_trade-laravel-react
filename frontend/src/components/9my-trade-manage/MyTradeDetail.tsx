import { useHistory, useParams } from 'react-router-dom';
import { Grid, Typography, Button } from '@mui/material';
import { BaseLayout } from 'layouts';
import React, { useEffect } from 'react';
import { LinkButton } from 'templates';
import { useAppDispatch, useAppSelector } from 'utils/hooks';
import Detail from 'templates/detail/Detail';
import { showoneTradePost } from 'store/thunks/trade_post';

const MyTradeDetail = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  //const { state } = useLocation();
  const params: { index: string; id: string } = useParams(); //投稿情報用のパラメータ
  const tpi_number = Number(params.index);
  //const post = useAppSelector((state) => state.tradePost.data[tpi_number]);
  const photos = useAppSelector((state) => state.tradePost.photos);
  const myUser = useAppSelector((state) => state.auth.user);
  const post = useAppSelector((state) => state.tradePost.dataOne);

  useEffect(() => {
    // const request: ShowAllTradePostRequest = {
    //   userId: userId,
    //   page: query.page,
    // };
    console.log('aaa'); //これは動くんよ。////
    dispatch(showoneTradePost(params.id));
  }, [dispatch, params.id]);

  const onClickBack = () => {
    history.goBack();
  };

  //アイコン押下時
  const onClickIcon = async (id: string) => {
    history.push('/account');
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
          <LinkButton size="large" to={`/mytrade-edit/${params.index}`}>
            投稿の編集
          </LinkButton>
        </Grid>
      </Grid>

      <Detail
        user={myUser}
        post={post}
        photos={photos}
        onClickIcon={onClickIcon}
      />

      <Grid container sx={{ mt: 15, mb: 8, justifyContent: 'center' }}>
        <Grid item>
          <Button
            // eslint-disable-next-line eqeqeq
            disabled //過去のトレードなので常に非活性
            variant="contained"
            color="primary"
            sx={{ mr: 8 }}
          >
            参加申請
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={onClickBack}>
            一覧に戻る
          </Button>
        </Grid>
      </Grid>
    </BaseLayout>
  );
};

export default MyTradeDetail;
