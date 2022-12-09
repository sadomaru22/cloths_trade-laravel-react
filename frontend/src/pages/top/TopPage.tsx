// import { makeStyles, Theme, createStyles, Button, Container, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  Container,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from '@material-ui/core';
import { BaseLayout } from 'layouts';
import React from 'react';
import Select, { ActionMeta, SingleValue } from 'react-select';
import { useHistory } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import { Grid, Link } from '@mui/material';
import { PREF_OPTIONS } from 'templates/todouhuken';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(7),
      marginBottom: theme.spacing(10),
    },
    card: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(8),
      padding: theme.spacing(3),
    },
    miniCard: {
      width: '300px',
      hight: '350px',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  })
);

const TopPage = () => {
  const classes = useStyles();
  const history = useHistory();

  function onChange(
    newValue: SingleValue<{ value: string; label: string }>,
    actionMeta: ActionMeta<{ value: string; label: string }>
  ) {
    //function onSubmit(event: FormEvent<HTMLFormElement>){
    //dispatch(searchBySbTradePost2(newValue?.label));
    history.push(`/searchResult/${newValue?.label}`); //とりあえずパラメータ持たせて画面遷移だけする、API処理はそれから
  }

  return (
    <BaseLayout subtitle="Top Page">
      <Container component="main" maxWidth="md" className={classes.container}>
        <Card className={classes.card} elevation={2}>
          <Typography variant="h1" gutterBottom>
            Topページ
          </Typography>

          <Typography color="textSecondary" paragraph>
            都道府県で検索
          </Typography>
          <Paper sx={{ mt: 1, mb: 6 }}>
            <Select
              options={PREF_OPTIONS}
              onChange={onChange}
              //isMulti //複数にすると
            />
          </Paper>

          <Grid
            container
            spacing={5}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Grid item>
              <Link href="/trade-post">
                <div className={classes.miniCard}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={`${process.env.PUBLIC_URL}/yotei.jpg`}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        トレードの投稿
                      </Typography>
                      <Typography color="secondary">
                        トレードを作成して、参加者を募ります。
                      </Typography>
                    </CardContent>
                    <CardActions></CardActions>
                  </Card>
                </div>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/mytrade-ichiran">
                <div className={classes.miniCard}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={`${process.env.PUBLIC_URL}/yotei.jpg`}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        トレード管理
                      </Typography>
                      <Typography color="secondary">
                        自分が開催する予定のトレードを管理します。
                      </Typography>
                    </CardContent>
                    <CardActions></CardActions>
                  </Card>
                </div>
              </Link>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={5}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Grid item>
              <Link href="/pending-ichiran">
                <div className={classes.miniCard}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={`${process.env.PUBLIC_URL}/yotei.jpg`}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        参加申請中のトレード
                      </Typography>
                      <Typography color="secondary">
                        自分が参加する申請中の予定のトレードの一覧を表示します。
                      </Typography>
                    </CardContent>
                    <CardActions></CardActions>
                  </Card>
                </div>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/confirmed-ichiran">
                <div className={classes.miniCard}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={`${process.env.PUBLIC_URL}/yotei.jpg`}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        参加が確定したトレード
                      </Typography>
                      <Typography color="secondary">
                        自分の参加が確定した予定のトレードの一覧を表示します。
                      </Typography>
                    </CardContent>
                    <CardActions></CardActions>
                  </Card>
                </div>
              </Link>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </BaseLayout>
  );
};

export default TopPage;
