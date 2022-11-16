import React from 'react';
import { BaseLayout } from 'layouts';
import {
  Grid,
  Typography,
  Avatar,
  Container,
  Button,
  Slide,
  Link,
} from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { TransitionProps } from '@mui/material/transitions';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useHistory, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'utils/hooks';
import { getOtherUser } from 'store/thunks/trade_post';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const OtherUserDetail = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const userId = localStorage.getItem('userId'); //参加申請ボタン活性非活性の比較用

  const params: { id: string } = useParams(); //投稿情報用のパラメータ
  const tpi_number = Number(params.id);
  const post = useAppSelector((state) => state.tradePost.data[tpi_number]);
  const photos = useAppSelector((state) => state.tradePost.photos);
  const other_user = useAppSelector((state) => state.tradePost.user);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleGo = () => {
    //ここに参加申請のAPI処理かく
    history.push('/top');
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
      <Container maxWidth="md" sx={{ marginTop: 10 }}>
        <Grid container sx={{ marginBottom: 8 }}>
          <Grid item>
            <Link onClick={() => onClickIcon(other_user.id)}>
              <Avatar
                alt="Remy Sharp"
                src={`${other_user.icon}`}
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
              {other_user.name} さんの投稿詳細
            </Typography>
          </Grid>
        </Grid>

        <Grid container justifyContent="center" sx={{ marginBottom: 5 }}>
          <Grid item xs={4}>
            <Typography color="textSecondary" borderBottom={0.5}>
              日付：{post.date}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <p />
          </Grid>
          <Grid item xs={6}>
            <Typography color="textSecondary" borderBottom={0.5}>
              現在の参加人数/上限人数: {post.sankasya} / {post.maxCapa}
            </Typography>
          </Grid>
        </Grid>
        <Typography
          variant="h3"
          color="textSecondary"
          sx={{ marginBottom: 8, borderBottom: 0.5 }}
        >
          {post.title}
        </Typography>
        <Typography
          color="textSecondary"
          sx={{ marginBottom: 5, borderBottom: 0.5 }}
        >
          開催場所：　 {post.place}
        </Typography>
        <Typography
          color="textSecondary"
          sx={{ marginBottom: 8, borderBottom: 0.5 }}
        >
          概要：　{post.description}
        </Typography>

        <ImageList
          sx={{ width: 800, height: 450 }}
          variant="woven"
          cols={3}
          gap={8}
        >
          {photos.map((item) => (
            <ImageListItem key={item}>
              <img
                src={`${item}?w=161&fit=crop&auto=format`}
                srcSet={`${item}?w=161&fit=crop&auto=format&dpr=2 2x`}
                alt={item}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>

        <Grid container sx={{ mt: 15, mb: 8, justifyContent: 'center' }}>
          <Grid item>
            <Button
              // eslint-disable-next-line eqeqeq
              disabled={userId == other_user.id}
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
      </Container>
    </BaseLayout>
  );
};

export default OtherUserDetail;
