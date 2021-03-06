import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
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


 //ðä¸è¦§ãã¼ã¸ã®ãã³ãã¬ã¼ã
//APIéä¿¡ã§ä½¿ãURLã¯å¤æ°ã«ãããpropsã§ãããããã

// function Copyright() {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center">
//       {'Copyright Â© '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

//DBããã¨ã£ã¦ãããã¼ã¿ã®æ°ã¶ãè¡¨ç¤ºãããBackEndå®è£ããã¾ã§ã¯ä¸æ¦ããã§OK
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
  const {url, pageDescription} = props;
  const classes = useStyles();
  const stateA = "æ¸¡éä¸ç";

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
                  {stateA} ããã®æç¨¿ä¸è¦§
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
                    å ´æï¼{row.place}
                  </Typography>
                  <Typography>
                    æ¥ä»ï¼{row.date}
                  </Typography>
                  <CardMedia
                    component="img"
                    sx={{pt: '26.25%',}}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography>
                      ããããããããããããã
                    </Typography>
                  </CardContent>
                  <CardActions>
                  <LinkButton size="small" to={{pathname: `/${props.url}/${row.id}`, state: stateA}}>è©³ç´°ãã¼ã¸ã¸</LinkButton>
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

let rows = [   //DBå¥ã£ã¦ããæ³å®
  {
    id: 1,
    title: 'ã¿ã¤ãã«1',
    date: '2022/07/30',
    place: 'æ±äº¬é½æ¸è°·åºä»£ãæ¨ç¥åçºï¼âï¼',
    image: ''
  },
  {
    id: 2,
    title: 'ã¿ã¤ãã«2',
    date: '2022/08/01',
    place: 'æ±äº¬é½æ¸è°·åºä»£ãæ¨ç¥åçºï¼âï¼',
    image: ''
  },
  {
    id: 3,
    title: 'ã¿ã¤ãã«3',
    date: '2022/08/02',
    place: 'æ±äº¬é½æ¸è°·åºä»£ãæ¨ç¥åçºï¼âï¼',
    image: ''
  },
  {
    id: 4,
    title: 'ã¿ã¤ãã«4',
    date: '2022/08/03',
    place: 'æ±äº¬é½æ¸è°·åºä»£ãæ¨ç¥åçºï¼âï¼',
    image: ''
  },
  {
    id: 5,
    title: 'ã¿ã¤ãã«5',
    date: '2022/08/04',
    place: 'æ±äº¬é½æ¸è°·åºä»£ãæ¨ç¥åçºï¼âï¼',
    image: ''
  },
  {
    id: 6,
    title: 'ã¿ã¤ãã«6',
    date: '2022/08/05',
    place: 'æ±äº¬é½æ¸è°·åºä»£ãæ¨ç¥åçºï¼âï¼',
    image: ''
  },
  {
    id: 7,
    title: 'ã¿ã¤ãã«7',
    date: '2022/08/06',
    place: 'æ±äº¬é½æ¸è°·åºä»£ãæ¨ç¥åçºï¼âï¼',
    image: ''
  },
  {
    id: 8,
    title: 'ã¿ã¤ãã«8',
    date: '2022/08/07',
    place: 'æ±äº¬é½æ¸è°·åºä»£ãæ¨ç¥åçºï¼âï¼',
    image: ''
  },
  {
    id: 9,
    title: 'ã¿ã¤ãã«9',
    date: '2022/08/08',
    place: 'æ±äº¬é½æ¸è°·åºä»£ãæ¨ç¥åçºï¼âï¼',
    image: ''
  },
]

export default Ichiran