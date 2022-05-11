// import { makeStyles, Theme, createStyles, Button, Container, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { BaseLayout } from 'layouts';
import React from 'react'
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from 'utils/hooks';
import { LinkButton } from 'templates';

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
    }
  })
);

const TopPage = () => {
   const classes = useStyles();
   const history = useHistory();
   const dispatch = useAppDispatch();
   
   return (
      <BaseLayout subtitle='Top Page'>
      <Container component='main' maxWidth='md' className={classes.container}>
        <Typography variant='h1' gutterBottom>
          Topページです。
        </Typography>
        <Typography variant='h2' gutterBottom color='textSecondary'>
         　Topページです！
        </Typography>
        <Typography color='textSecondary' paragraph>
        Topページです
        </Typography>
        <Grid container spacing={5}>
         <Grid item>
            <div className={classes.button}>
            <LinkButton
               color='primary'
               to='/tradepost'
            >
               トレードの投稿
            </LinkButton>
            </div>
         </Grid>
         <Grid item>
            <div className={classes.button}>
            <LinkButton
               color='primary'
               to='/trademanage'
            >
               自分が開催する予定のトレード管理
            </LinkButton>
            </div>
         </Grid>
        </Grid>

        <Grid container spacing={5}>
         <Grid item>
            <div className={classes.button}>
            <LinkButton
               color='primary'
               to='/tradepending'
            >
               参加予定のトレード(申請中)
            </LinkButton>
            </div>
         </Grid>
         <Grid item>
            <div className={classes.button}>
            <LinkButton
               color='secondary'
               to='/tradecomfirmed'
            >
               参加予定のトレード(確定)
            </LinkButton>
            </div>
         </Grid>
        </Grid>
      </Container>
    </BaseLayout>
   )
}

export default TopPage
