import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Detail from 'templates/detail/Detail';
import { Button, Card, Container, Grid } from '@mui/material';
import { BaseLayout } from 'layouts';
import { useAppDispatch, useAppSelector } from 'utils/hooks';
import { getOtherUser } from 'store/thunks/trade_post';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(8),
      padding: theme.spacing(3),
    },
  })
);

const PastDetail = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const params: { id: string } = useParams();
  const other_user = useAppSelector((state) => state.tradePost.user);
  console.log(other_user);

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
      <Container component="main" maxWidth="md">
        <Card className={classes.card} elevation={2}>
          <Detail user={other_user} id={params.id} onClickIcon={onClickIcon} />

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
        </Card>
      </Container>
    </BaseLayout>
  );
};

export default PastDetail;
