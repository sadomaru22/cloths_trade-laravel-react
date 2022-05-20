
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
//import Link from '@mui/material/Link';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { BaseLayout } from 'layouts';
import { LinkButton } from 'templates';
import { Pagination } from '@mui/material';


 //🌟一覧ページのテンプレート

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
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
    page: {
      marginTop: 0,
      marginBottom: 0,
      marginLeft: "auto",
      marginRight: 0,
    }
  })
);

const Ichiran = (props: { pageTitle: string; pageDescription: string;   //ページごとのタイトル、説明
    date: string; place: string, image: string; description: string; }) => {   
  const { pageTitle, pageDescription, date, place, image, description } = props;

  var title = ['title1', 'title2', 'title3', 'title4', 'title5', 'title6', 'title7', 'title8', 'title9']  //ほんとはDBからとってきたタイトル
  const classes = useStyles();

  return (
      <BaseLayout subtitle='Album'>
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
             ああああ(通知つけるならここか)
          </Typography>
        </Toolbar>
      </AppBar>
        <Box sx={{bgcolor: 'background.paper', pt: 8, pb: 6,}}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              ページタイトル{pageTitle}
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Something short and leading about the collection below—its contents,
              the creator, etc. Make it short and sweet, but not too short so folks
              don&apos;t simply skip over it entirely.   {pageDescription}
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">

          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <Typography>
                    タイトル{title.map((fruit, i) => <li key={i}>{fruit}</li>)}
                  </Typography>
                  <Typography>
                    場所{place}
                  </Typography>
                  <Typography>
                    日付{date}
                  </Typography>
                  <CardMedia
                    component="img"
                    sx={{pt: '26.25%',}}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography>
                      あああああああああああああああああああ{ description }
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <LinkButton size="small" to="/detail">詳細ページへ</LinkButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      <Stack spacing={2} maxWidth="md" className={classes.page}>
        <Pagination count={5} />
      </Stack>
    </BaseLayout>
  );
}

export default Ichiran