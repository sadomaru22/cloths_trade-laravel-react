import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { BaseLayout } from 'layouts';
import {
  Grid,
  Button,
  Slide,
  Container,
  Card,
  Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useHistory, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'utils/hooks';
import { store } from 'store';
import { getOtherUser } from 'store/thunks/trade_post';
import Detail from 'templates/detail/Detail';
import { sankaSinsei, SankaSinseiRequest } from 'store/thunks/sinsei';
import { SankaFlags } from 'models';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(8),
      padding: theme.spacing(3),
    },
  })
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const OtherUserDetail = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [message, setMessage] = useState<string | undefined>('');
  const userId = localStorage.getItem('userId'); //参加申請ボタン活性非活性の比較用

  const params: { id: string } = useParams(); //投稿情報用のパラメータ
  const other_user = useAppSelector((state) => state.tradePost.user);

  //参加申請済or確定済によって表示を変える。
  var isCorP = true;
  var messageCorP: string | null = null;
  const sankaflag: SankaFlags[] = useAppSelector(
    (state) => state.tradePost.dataOne.sankaflag
  );
  const cflg: number[] = [];
  const pflg: number[] = [];
  const uidflg: number[] = [];
  //userIdがstring | null型なので先のようにする。それに伴って比較用のuidflgもnumber型で統一。
  const uIdNum: number = Number(userId);
  // eslint-disable-next-line array-callback-return
  sankaflag.map((key) => {
    cflg.push(key.confirmed_flag);
    pflg.push(key.pending_flag);
    const uNum = Number(key.user_id);
    uidflg.push(uNum);
  });
  if (pflg.includes(1) && uidflg.includes(uIdNum)) {
    isCorP = false;
    messageCorP = '*すでに参加申請済のトレードです。';
  }
  if (cflg.includes(1) && uidflg.includes(uIdNum)) {
    isCorP = false;
    messageCorP = '*すでに参加が確定しているトレードです。';
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //参加申請
  const handleGo = async () => {
    const data: SankaSinseiRequest = {
      trade_post_id: params.id,
      id: userId,
    };
    const response = await dispatch(sankaSinsei(data));
    const success = store.getState().tradePost.success;
    const url = store.getState().tradePost.url;
    if (success) {
      setTimeout(function () {
        window.location.href = url;
      }, 2000);
    }
    if (sankaSinsei.rejected.match(response)) {
      setMessage(response.payload?.error?.message);
      alert(message);
    }
  };

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
          {messageCorP && (
            <Typography variant="h6" color="crimson" noWrap sx={{ ml: 3 }}>
              {messageCorP}
            </Typography>
          )}
          <Detail user={other_user} id={params.id} onClickIcon={onClickIcon} />

          <Grid container sx={{ mt: 15, mb: 8, justifyContent: 'center' }}>
            <Grid item>
              <Button
                // eslint-disable-next-line eqeqeq
                disabled={userId == other_user.id || !isCorP}
                variant="contained"
                color="primary"
                sx={{ mr: 8 }}
                onClick={handleClickOpen}
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

          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{`参加申請を${other_user.name}さんに送ります。よろしいですか?`}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                参加申請を送信すると、主催者に通知が行きます。主催者が申請を受理すると、参加が確定となります。
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>やっぱりやめる</Button>
              <Button onClick={handleGo}>申請する</Button>
            </DialogActions>
          </Dialog>
        </Card>
      </Container>
    </BaseLayout>
  );
};

export default OtherUserDetail;
