// import { makeStyles, Theme, createStyles, Button, Container, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  Container,
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from '@material-ui/core';
import { BaseLayout } from 'layouts';
import React from 'react';
import Select, { ActionMeta, SingleValue } from 'react-select';
import { useHistory } from 'react-router-dom';
//import { useAppDispatch, useAppSelector } from 'utils/hooks';
import { LinkButton2 } from 'templates';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
//import DirectionsIcon from '@mui/icons-material/Directions';
import { Grid } from '@mui/material';
import { PREF_OPTIONS } from 'templates/todouhuken';
//import {searchBySbTradePost2} from 'store/thunks/trade_post2'

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
      maxWidth: 375,
    },
    root: {
      flexGrow: 1,
    },
    flex: {
      flexGrow: 1,
    },
    select: {
      ml: 1,
      flex: 1,
    },
  })
);

const TopPage = () => {
  const classes = useStyles();
  const history = useHistory();
  //const dispatch = useAppDispatch();
  //let posts = useAppSelector((state) => state.tradePost.data);
  // if (posts) {
  //    console.log("あ");
  //    history.replace('searchResult');
  // } else {return}
  // useEffect(() => {
  //    history.replace('searchResult');
  //  }, [posts]);
  const onLoad = () => {
    console.log('onLoad準備完了');
  };
  //function onSubmit(newValue: SingleValue<{ value: string; label: string; }>, actionMeta: ActionMeta<{ value: string; label: string; }>){
  // function onSubmit(event: FormEvent<HTMLFormElement>){
  //    dispatch(searchBySbTradePost2(event));
  // }
  function onChange(
    newValue: SingleValue<{ value: string; label: string }>,
    actionMeta: ActionMeta<{ value: string; label: string }>
  ) {
    //function onSubmit(event: FormEvent<HTMLFormElement>){
    //dispatch(searchBySbTradePost2(newValue?.label));
    history.push(`/searchResult/${newValue?.label}`); //とりあえずパラメータ持たせて画面遷移だけする、API処理はそれから
  }

  return (
    <div onLoad={onLoad}>
      <BaseLayout subtitle="Top Page">
        <Container component="main" maxWidth="md" className={classes.container}>
          <Typography variant="h1" gutterBottom>
            Topページです。
          </Typography>
          <Typography variant="h2" gutterBottom color="textSecondary">
            　Topページです！
          </Typography>

          <Typography color="textSecondary" paragraph>
            都道府県で検索
          </Typography>
          <Paper sx={{ mt: 3, mb: 6 }}>
            <Select
              options={PREF_OPTIONS}
              onChange={onChange}
              //isMulti //複数にすると
            />
          </Paper>
          {/* <Paper
      //component="form"
      //sx={{ display: 'flex', justifyContent: 'center' }}
      >
         <form onSubmit={onSubmit}>
         <Select 
            className={classes.container}
            options={PREF_OPTIONS}
            //onChange={onChange} 
            //isMulti //複数にすると複雑になるので一旦単数
         />
         <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
         <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
         </IconButton>
         </form>
      </Paper> */}

          {/* <Paper
            component="form"
            sx={{
              p: '2px 4px',
              display: 'flex',
              mt: 3,
              mb: 6,
              justifyContent: 'center',
            }}
          >
            <IconButton sx={{ p: '10px' }} aria-label="menu">
              <MenuIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="または、フリーワードで検索"
              inputProps={{ 'aria-label': 'search google maps' }}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper> */}

          <Grid
            container
            spacing={5}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Grid item>
              <LinkButton2 color="primary" to="/trade-post">
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
                        トレードの投稿
                      </Typography>
                      <Typography color="secondary">
                        トレードを投稿します。
                      </Typography>
                    </CardContent>
                    <CardActions></CardActions>
                  </Card>
                </div>
              </LinkButton2>
            </Grid>
            <Grid item>
              <LinkButton2 color="primary" to="/mytrade-ichiran">
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
                        トレード管理
                      </Typography>
                      <Typography color="secondary">
                        自分が開催する予定のトレードを管理します。
                      </Typography>
                    </CardContent>
                    <CardActions></CardActions>
                  </Card>
                </div>
              </LinkButton2>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={5}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Grid item>
              <LinkButton2 color="primary" to="/pending-ichiran">
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
                        参加予定のトレード(申請中)
                      </Typography>
                      <Typography color="secondary">
                        自分が参加する申請中の予定のトレードの一覧を表示します。
                      </Typography>
                    </CardContent>
                    <CardActions></CardActions>
                  </Card>
                </div>
              </LinkButton2>
            </Grid>
            <Grid item>
              <LinkButton2 color="primary" to="/confirmed-ichiran">
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
                        参加予定のトレード(確定)
                      </Typography>
                      <Typography color="secondary">
                        自分の参加が確定した予定のトレードの一覧を表示します。
                        aaaaaa
                      </Typography>
                    </CardContent>
                    <CardActions></CardActions>
                  </Card>
                </div>
              </LinkButton2>
            </Grid>
          </Grid>

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
                  Lizard
                </Typography>
                <Typography variant="body2" color="secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                  salvcjasvnlrvslzvssaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </div>
        </Container>
      </BaseLayout>
    </div>
  );
};

export default TopPage;
