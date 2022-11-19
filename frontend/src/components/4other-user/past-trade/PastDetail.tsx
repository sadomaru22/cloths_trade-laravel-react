import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Detail from 'templates/detail/Detail';
import { Button, Grid } from '@mui/material';
import { BaseLayout } from 'layouts';
import { useAppDispatch, useAppSelector } from 'utils/hooks';
import { getOtherUser } from 'store/thunks/trade_post';

const PastDetail = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const params: { index: string } = useParams();
  const tpi_number = Number(params.index);
  const post = useAppSelector((state) => state.tradePost.data[tpi_number]);
  const photos = useAppSelector((state) => state.tradePost.photos);
  const other_user = useAppSelector((state) => state.tradePost.user);

  const onClickBack = () => {
    history.goBack();
  };
  //アイコン押下時
  const onClickIcon = async (id: string) => {
    await dispatch(getOtherUser(id));
    history.push(`/other-user/${id}`);
  };
  return (
    <BaseLayout subtitle="pastDetail">
      <Detail
        user={other_user}
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

export default PastDetail;
