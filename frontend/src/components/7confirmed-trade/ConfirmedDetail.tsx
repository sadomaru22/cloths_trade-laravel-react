import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { BaseLayout } from 'layouts';
import { Grid, Button, Typography, Container, Card } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'utils/hooks';
import { getOtherUser } from 'store/thunks/trade_post';
import Detail from 'templates/detail/Detail';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(8),
      padding: theme.spacing(3),
    },
  })
);

const ConfirmedDetail = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const params: { id: string } = useParams(); //投稿情報用のパラメータ
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
    <BaseLayout subtitle="other-user-detail">
      <Container component="main" maxWidth="md">
        <Card className={classes.card} elevation={2}>
          <Typography
            variant={'h5'}
            align={'center'}
            color="textSecondary"
            sx={{ mt: 5 }}
          >
            *開催までまでもうしばらくお待ちください
          </Typography>
          <Detail user={other_user} id={params.id} onClickIcon={onClickIcon} />

          <Grid container sx={{ mt: 15, mb: 8, justifyContent: 'center' }}>
            <Grid item>
              <Button
                // eslint-disable-next-line eqeqeq
                disabled
                variant="contained"
                color="primary"
                sx={{ mr: 8 }}
              >
                参加申請取消
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={onClickBack}>
                一覧に戻る
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </BaseLayout>
  );
};

export default ConfirmedDetail;
