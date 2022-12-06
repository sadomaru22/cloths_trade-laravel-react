import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { BaseLayout } from 'layouts';
import { Grid, Button, Slide, Typography } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { store } from 'store';
import { useAppDispatch, useAppSelector } from 'utils/hooks';
import { getOtherUser } from 'store/thunks/trade_post';
import Detail from 'templates/detail/Detail';
import { delsanSinsei, DelsanSinseiRequest } from 'store/thunks/sinsei';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PendingDetail = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const userId = localStorage.getItem('userId');
  const params: { id: string } = useParams(); //投稿情報用のパラメータ
  const other_user = useAppSelector((state) => state.tradePost.user);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleGo = async () => {
    const data: DelsanSinseiRequest = {
      trade_post_id: params.id,
      user_id: userId,
    };
    await dispatch(delsanSinsei(data));
    const success = store.getState().tradePost.success;
    if (success) {
      setTimeout(function () {
        window.location.href = '/pending-ichiran';
      }, 2000);
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
      <Typography
        variant={'h5'}
        align={'center'}
        color="textSecondary"
        sx={{ mt: 5 }}
      >
        *申請が受理されるまでもうしばらくお待ちください
      </Typography>
      <Detail user={other_user} id={params.id} onClickIcon={onClickIcon} />

      <Grid container sx={{ mt: 15, mb: 8, justifyContent: 'center' }}>
        <Grid item>
          <Button
            // eslint-disable-next-line eqeqeq
            //disabled
            variant="contained"
            color="primary"
            sx={{ mr: 8 }}
            onClick={handleClickOpen}
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

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>参加申請を取り消します。よろしいですか?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            参加申請を取り消すと、主催者に通知が行きます。一度取り消しても、また参加したい場合は再度申請が可能です。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>やっぱりやめる</Button>
          <Button onClick={handleGo}>申請を取り消す</Button>
        </DialogActions>
      </Dialog>
    </BaseLayout>
  );
};

export default PendingDetail;
