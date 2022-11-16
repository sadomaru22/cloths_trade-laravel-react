import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { Card, CardMedia, CardContent, CardActions } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import { Avatar, Box, Container, Grid, Link } from '@mui/material';
import { BaseLayout } from 'layouts';
import React from 'react';
import { LinkButton2 } from 'templates';
import { useAppDispatch, useAppSelector } from 'utils/hooks';
import { useHistory } from 'react-router-dom';
import { getOtherUser } from 'store/thunks/trade_post';

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
      maxWidth: 350,
      maxHeight: 350,
    },
  })
);

const commonStyles = {
  borderColor: 'primary.main',
  m: 1,
  border: 1,
};

const OtheUserTop = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const other_user = useAppSelector((state) => state.tradePost.user);
  console.log(other_user);

  //アイコン押下時
  const onClickIcon = async (id: string) => {
    await dispatch(getOtherUser(id));
    history.push(`/trade-ichiran/${id}`);
  };

  return (
    <BaseLayout subtitle="OtheUser Top">
      <Container maxWidth="md" className={classes.container}>
        <Grid container>
          <Grid item sx={{ marginBottom: 6 }}>
            <Avatar
              alt="Remy Sharp"
              src={`${other_user.icon}`}
              sx={{ width: '6rem', height: '6rem' }}
            />
          </Grid>
          <Grid item>
            <Typography
              variant="h4"
              color="textSecondary"
              sx={{ marginLeft: 8 }}
            >
              名前: {other_user.name}
            </Typography>
          </Grid>
        </Grid>
        <Box
          sx={{
            ...commonStyles,
            borderRadius: '16px',
            mb: 8,
            width: '52rem',
            height: '10rem',
          }}
        >
          <Typography>プロフィール: </Typography>
          <Typography>{other_user.jikoshokai}</Typography>
        </Box>
        <Grid
          container
          spacing={5}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <Grid item>
            <Link onClick={() => onClickIcon(other_user.id)}>
              {/* <div className={classes.card}> */}
              <Card className={classes.card}>
                <CardMedia
                  component="img"
                  height="140"
                  image={`${process.env.PUBLIC_URL}/yotei.jpg`}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    開催予定のトレード
                  </Typography>
                  <Typography>
                    {other_user.name}
                    さんが開催予定のトレード一覧を表示します。
                  </Typography>
                </CardContent>
                <CardActions></CardActions>
              </Card>
              {/* </div> */}
            </Link>
          </Grid>
          <Grid item>
            <Link>
              {/* <div className={classes.card}> */}
              <Card className={classes.card}>
                <CardMedia
                  component="img"
                  height="140"
                  image={`${process.env.PUBLIC_URL}/kako.jpg`}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    過去のトレード
                  </Typography>
                  <Typography>
                    過去に{other_user.name}
                    さんが開催したトレードの一覧を表示します。
                  </Typography>
                </CardContent>
                <CardActions></CardActions>
              </Card>
              {/* </div> */}
            </Link>
          </Grid>
        </Grid>
      </Container>
    </BaseLayout>
  );
};

export default OtheUserTop;
