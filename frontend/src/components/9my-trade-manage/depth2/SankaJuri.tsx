import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  AppBar,
  Avatar,
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Slide,
  Toolbar,
  Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { BaseLayout } from 'layouts';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  delsyuSinsei,
  DelsyuSinseiRequest,
  juriSinsei,
  JuriSinseiRequest,
} from 'store/thunks/sinsei';
import { showPendingUsers } from 'store/thunks/trade_post2/showPendingUsers';
import { useOnReloadAlert } from 'templates/detail/Detail';
import { useAppDispatch, useAppSelector } from 'utils/hooks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(8),
      padding: theme.spacing(3),
    },
    button: {
      marginLeft: 3,
    },
  })
);

const style = {
  ml: 7,
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SankaJuri = () => {
  useOnReloadAlert();
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const params: { id: string } = useParams();
  const [uid, setUid] = useState<string>('');
  const [name, setName] = useState<string>(''); //却下用(handleGoがmapの外にあるため、直接idを渡せないはず)
  let message: string | null = null;
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    dispatch(showPendingUsers(params.id));
  }, [dispatch, params.id]);
  const users = useAppSelector((state) => state.tradePost.users);
  if (users.length === 0) {
    message = '申請中のユーザは0件です。';
  }

  const onClickBack = () => {
    history.goBack();
  };

  const handleClickOpen = (uid: string, name: string) => {
    setUid(uid);
    setName(name);
    setOpen(true);
  };

  const handleClose = () => {
    setUid('');
    setName('');
    setOpen(false);
  };

  //参加申請受理
  const handleJuri = (id: string, name: string) => {
    const data: JuriSinseiRequest = {
      trade_post_id: params.id,
      user_id: id,
      name: name, //flashMessage用
    };
    dispatch(juriSinsei(data));
  };

  //参加申請却下
  const handleGo = () => {
    const data: DelsyuSinseiRequest = {
      trade_post_id: params.id,
      user_id: uid,
      name: name, //flashMessage用
    };
    dispatch(delsyuSinsei(data));
    handleClose();
  };

  return (
    <BaseLayout subtitle="sankaichiran">
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            参加申請受理
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 7 }} maxWidth="md">
        <Card className={classes.card} elevation={2}>
          {message && (
            <Typography
              variant="h5"
              color="textSecondary"
              noWrap
              sx={{ ml: 3, mb: 4 }}
            >
              {message}
            </Typography>
          )}
          <List>
            {users.map((row) => (
              <div>
                <ListItem>
                  <Link href="/other-user" sx={{ textDecoration: 'none' }}>
                    <ListItemAvatar>
                      <Avatar
                        alt="Remy Sharp"
                        src={row.icon}
                        sx={{ width: '5rem', height: '5rem' }}
                      />
                    </ListItemAvatar>
                  </Link>
                  <Grid container>
                    <Grid item xs={8}>
                      <ListItemText
                        primaryTypographyProps={{
                          fontSize: 20,
                          variant: 'body2',
                          ml: 4,
                        }}
                      >
                        {row.name}さん
                        <br />
                        から参加申請が来ています。
                      </ListItemText>
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        sx={style}
                        variant="contained"
                        onClick={() => handleJuri(row.id, row.name)}
                      >
                        受理
                      </Button>
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        sx={style}
                        variant="contained"
                        onClick={() => handleClickOpen(row.id, row.name)}
                      >
                        却下
                      </Button>
                    </Grid>
                  </Grid>
                </ListItem>
                <Divider
                  variant="inset"
                  component="li"
                  sx={{ marginBottom: 3 }}
                />
              </div>
            ))}
          </List>
          <Button
            variant="contained"
            color="primary"
            onClick={onClickBack}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            詳細画面に戻る
          </Button>
        </Card>
      </Container>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`参加申請を却下します。よろしいですか?`}</DialogTitle>
        <DialogContent />
        <DialogActions>
          <Button onClick={handleGo}>はい</Button>
          <Button onClick={handleClose}>いいえ</Button>
        </DialogActions>
      </Dialog>
    </BaseLayout>
  );
};

export default SankaJuri;
