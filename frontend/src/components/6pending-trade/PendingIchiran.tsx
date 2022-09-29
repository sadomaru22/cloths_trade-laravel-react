import * as React from 'react';
import { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
//import Link from '@mui/material/Link';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { BaseLayout } from 'layouts';
import { LinkButton } from 'templates';
import { Avatar, Pagination } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { Button, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppDispatch, useAppSelector } from 'utils/hooks';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(7),
      marginBottom: theme.spacing(10),
    },
    button: {
      marginTop: theme.spacing(7),
      marginBottom: theme.spacing(10),
      marginLeft: theme.spacing(10),
      marginRight: theme.spacing(10),
    },
    card: {
      maxWidth: 375
    },
    root: {
      flexGrow: 1,
  }
  })
);

const Transition = React.forwardRef(function Transition(
   props: TransitionProps & {
     children: React.ReactElement<any, any>;
   },
   ref: React.Ref<unknown>,
 ) {
   return <Slide direction="up" ref={ref} {...props} />;
 });

const PendingIchiran = () => {
  const dispatch = useAppDispatch();
　const history = useHistory();    
  const classes = useStyles();
  const state = "渡邊一真";
  const userId = useAppSelector((state) => state.auth.user?.id);
  //const data = useSelector((state) => state);
  const posts = useAppSelector((state) => state.tradePost.data);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
     setOpen(true);
   };
 
   const handleClose = () => {
     setOpen(false);
   };

   const handleGo = () => {
     history.push('/top');    //この関数に参加取り消し処理を追加する
   }

  return (
      <BaseLayout subtitle='Album'>
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            開催が確定していないトレード一覧 &emsp; &emsp; *申請が受理されるまでもう少しお待ちください。
          </Typography>
        </Toolbar>
      </AppBar>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container sx={{marginBottom: 8}}>
            <Grid item>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{width: '6rem', height: '6rem'}} />
            </Grid>
            <Grid item>
                <Typography variant='h4' color='textSecondary' sx={{ marginLeft: 8 }}>
                  {state} さんの投稿一覧
                </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={4}>
            {rows.map((row, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <Typography>
                    {row.title}
                  </Typography>
                  <Typography>
                    場所：{row.place}
                  </Typography>
                  <Typography>
                    日付：{row.date}
                  </Typography>
                  <CardMedia
                    component="img"
                    sx={{pt: '26.25%',}}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography>
                      あああああああああああああ
                    </Typography>
                  </CardContent>
                  <CardActions>
                  <LinkButton size="small" to={{pathname: `/pending-detail/${row.id}`, state: state}}>詳細ページへ</LinkButton>
                  <Button size="small" onClick={handleClickOpen}>申請取り消し</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        <Pagination count={5} sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}  />
      <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      >
         <DialogTitle>{`参加申請取り消し申請を${state}さんに送ります。よろしいですか?`}</DialogTitle>
         <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
               参加申請を取り消すと、主催者に通知が行きます。申請を取り消したトレードに再度参加することはできません。
            </DialogContentText>
         </DialogContent>
         <DialogActions>
            <Button onClick={handleClose}>やっぱりやめる</Button>
            <Button onClick={handleGo}>申請を取り消す</Button>
         </DialogActions>
      </Dialog>
    </BaseLayout>
  );
}

let rows = [   //DB入ってくる想定
  {
    id: 1,
    title: 'タイトル1',
    date: '2022/07/30',
    place: '東京都渋谷区代々木神園町２−１',
    image: ''
  },
  {
    id: 2,
    title: 'タイトル2',
    date: '2022/08/01',
    place: '東京都渋谷区代々木神園町２−１',
    image: ''
  },
  {
    id: 3,
    title: 'タイトル3',
    date: '2022/08/02',
    place: '東京都渋谷区代々木神園町２−１',
    image: ''
  },
  {
    id: 4,
    title: 'タイトル4',
    date: '2022/08/03',
    place: '東京都渋谷区代々木神園町２−１',
    image: ''
  },
  {
    id: 5,
    title: 'タイトル5',
    date: '2022/08/04',
    place: '東京都渋谷区代々木神園町２−１',
    image: ''
  },
  {
    id: 6,
    title: 'タイトル6',
    date: '2022/08/05',
    place: '東京都渋谷区代々木神園町２−１',
    image: ''
  },
  {
    id: 7,
    title: 'タイトル7',
    date: '2022/08/06',
    place: '東京都渋谷区代々木神園町２−１',
    image: ''
  },
  {
    id: 8,
    title: 'タイトル8',
    date: '2022/08/07',
    place: '東京都渋谷区代々木神園町２−１',
    image: ''
  },
  {
    id: 9,
    title: 'タイトル9',
    date: '2022/08/08',
    place: '東京都渋谷区代々木神園町２−１',
    image: ''
  },
]

export default PendingIchiran
