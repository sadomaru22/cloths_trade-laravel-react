import { useHistory, useParams } from 'react-router-dom';
import { Grid, Typography, Button } from '@mui/material';
import { BaseLayout } from 'layouts';
import React from 'react';
import { LinkButton } from 'templates';
import { useAppDispatch, useAppSelector } from 'utils/hooks';
import Detail from 'templates/detail/Detail';
import { showConfirmedUsers, showPendingUsers } from 'store/thunks/trade_post2';
import { SankaFlags } from 'models';

const MyTradeDetail = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  //投稿情報用のパラメータ
  const params: { id: string } = useParams();
  //「参加者一覧」「参加申請受理」を押下可能かを判定するフラグ
  var isP = true;
  var isC = true;
  const sankaflag: SankaFlags[] = useAppSelector(
    (state) => state.tradePost.dataOne.sankaflag
  );
  const cflg: number[] = [];
  const pflg: number[] = [];
  // eslint-disable-next-line array-callback-return
  sankaflag.map((key) => {
    cflg.push(key.confirmed_flag);
    pflg.push(key.pending_flag);
  });
  if (pflg.includes(1)) {
    isP = false;
  }
  if (cflg.includes(1)) {
    isC = false;
  }
  const myUser = useAppSelector((state) => state.auth.user);

  const onClickBack = () => {
    history.goBack();
  };

  //アイコン押下時
  const onClickIcon = async (id: string) => {
    history.push('/account');
  };
  //「参加申請受理」ボタン押下時に投稿に紐づくUsersをとってから、遷移する。
  const onGetPUsers = async (id: string) => {
    await dispatch(showPendingUsers(id));
    history.push(`/mytrade-juri/${id}`);
  };
  //「参加者一覧」ボタン押下時に投稿に紐づくUsersをとってから、遷移する。
  const onGetCUsers = async (id: string) => {
    await dispatch(showConfirmedUsers(id));
    history.push(`/sanka-ichiran`);
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
          <Button
            disabled={isC}
            size="large"
            variant="contained"
            onClick={() => onGetCUsers(params.id)}
          >
            参加者一覧
          </Button>
        </Grid>
        <Grid item>
          <Button
            disabled={isP}
            size="large"
            variant="contained"
            onClick={() => onGetPUsers(params.id)}
            //to={`/mytrade-juri/${params.id}`}
          >
            参加申請受理
          </Button>
        </Grid>
        <Grid item>
          <LinkButton size="large" to={`/mytrade-edit/${params.id}`}>
            投稿の編集
          </LinkButton>
        </Grid>
      </Grid>

      <Detail
        user={myUser}
        // post={post}
        // photos={photos}
        id={params.id}
        onClickIcon={onClickIcon}
      />

      <Grid container sx={{ mt: 15, mb: 8, justifyContent: 'center' }}>
        <Grid item>
          <Button
            // eslint-disable-next-line eqeqeq
            disabled //自分のトレードなので常に非活性
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
