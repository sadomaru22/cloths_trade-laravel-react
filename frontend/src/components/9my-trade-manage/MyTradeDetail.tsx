import { useHistory, useParams } from 'react-router-dom';
import { Grid, Typography, Button } from '@mui/material';
import { BaseLayout } from 'layouts';
import React from 'react';
import { LinkButton } from 'templates';
import { useAppSelector } from 'utils/hooks';
import Detail from 'templates/detail/Detail';

const MyTradeDetail = () => {
  const history = useHistory();
  //投稿情報用のパラメータ&「参加申請受理」を押下可能かを判定するフラグ
  const params: { id: string; isPflg: string } = useParams();
  var isP = true;
  if ((params.isPflg = '1')) {
    isP = false;
  }
  console.log(params.isPflg);
  const myUser = useAppSelector((state) => state.auth.user);

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
          <LinkButton
            disabled={isP}
            size="large"
            to={`/mytrade-juri/${params.id}`}
          >
            参加申請受理
          </LinkButton>
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
