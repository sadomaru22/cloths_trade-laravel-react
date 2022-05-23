import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { Card, CardMedia, CardContent, CardActions } from '@material-ui/core'
import Typography from '@mui/material/Typography';
import { Box, Container, Grid } from '@mui/material';
import { BaseLayout } from 'layouts'
import React from 'react'
import { LinkButton, LinkButton2 } from 'templates'
import { SpaceBar } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(7),
      marginBottom: theme.spacing(30),
    },
    button: {
      marginTop: theme.spacing(7),
      marginBottom: theme.spacing(10),
      marginLeft: theme.spacing(10),
      marginRight: theme.spacing(10),
    },
    card: {
      maxWidth: 375
    }
  })
);

const commonStyles = {
   borderColor: 'primary.main',
   m: 1,
   border: 1,
 };

const MyPage = () => {
   const classes = useStyles();

   return (
      <BaseLayout subtitle='OtheUser Top'>
         <Container maxWidth='md' className={classes.container}>
            <Grid container sx={{marginBottom: 6}}>
               <Grid item>
                  <Box sx={{ borderColor: 'primary.main', border: 1, borderRadius: '50%', width: '8rem', height: '8rem' }}>
                     <p>プロフィール画像{ }</p>
                  </Box>
               </Grid>
               <Grid item>
                  <Typography variant='h4' color='textSecondary' sx={{ marginLeft: 8 }}>
                     名前{ }
                  </Typography>
               </Grid>
            </Grid>
         <Box sx={{ ...commonStyles, borderRadius: '16px', mb: 8,    width: '52rem', height: '10rem', }}>
            <Typography>
               プロフィール: 
            </Typography>
         </Box>

         <LinkButton to="/update-profile" sx={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>プロフィールの編集</LinkButton>
         

            <LinkButton2 color='primary' to='/mytrade-all' >
               <div className={classes.card}>
               <Card>
                  <CardMedia
                  component="img"
                  height="140"
                  image="/static/images/cards/contemplative-reptile.jpg"
                  alt="green iguana"
                  />
                  <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                     自分が開催予定のトレード
                  </Typography>
                  <Typography color="secondary">
                     自分が開催予定のトレード一覧を表示します。
                  </Typography>
                  </CardContent>
                  <CardActions>
                  </CardActions>
               </Card>
               </div>
            </LinkButton2>
        </Container>
      </BaseLayout>
   )
}

export default MyPage
