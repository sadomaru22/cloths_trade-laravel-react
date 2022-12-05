import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
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
  Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { BaseLayout } from 'layouts';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { showPendingUsers } from 'store/thunks/trade_post2/showPendingUsers';
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
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const params: { id: string } = useParams();
  const [open, setOpen] = React.useState(false);
  const users = useAppSelector((state) => state.tradePost.users);
  useEffect(() => {
    console.log('aaa from SankaJuri.tsx');
    dispatch(showPendingUsers(params.id));
  }, [dispatch, params.id]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //参加申請受理
  const handleJuri = () => {
    //history.push('/top');
  };

  //参加申請却下
  const handleGo = () => {
    history.push('/top');
  };

  return (
    <BaseLayout subtitle="sankaichiran">
      <Container sx={{ py: 7 }} maxWidth="md">
        <Card className={classes.card} elevation={2}>
          <Typography
            variant="h6"
            color="textSecondary"
            noWrap
            sx={{ ml: 3, mb: 3 }}
          >
            参加申請受理
          </Typography>
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
                        onClick={handleJuri}
                      >
                        受理
                      </Button>
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        sx={style}
                        variant="contained"
                        onClick={handleClickOpen}
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
