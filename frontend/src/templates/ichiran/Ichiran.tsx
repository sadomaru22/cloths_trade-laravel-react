import * as React from 'react';
import AppBar from '@mui/material/AppBar';
//import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
//import Link from '@mui/material/Link';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { BaseLayout } from 'layouts';
import { LinkButton } from 'templates';
import { Avatar, Pagination } from '@mui/material';


 //🌟一覧ページのテンプレート
//API通信で使うURLは変数にする。propsでいけるかも。

// function Copyright() {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

//DBからとってきたデータの数ぶん表示する、BackEnd実装するまでは一旦これでOK
//const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
  },
  })
);

const Ichiran = (props: {url: string, pageDescription: string}) => {   
  //const {url, pageDescription} = props;
  const classes = useStyles();
  const stateA = "渡邊一真";

  return (
      <BaseLayout subtitle='Album'>
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
             {props.pageDescription}
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
                  {stateA} さんの投稿一覧
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
                  <LinkButton size="small" to={{pathname: `/${props.url}/${row.id}`, state: stateA}}>詳細ページへ</LinkButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        <Pagination count={5} sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}/>
        </Container>
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

export default Ichiran