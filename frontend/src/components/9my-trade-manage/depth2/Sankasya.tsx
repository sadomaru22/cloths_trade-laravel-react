import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  AppBar,
  Avatar,
  Button,
  Card,
  Container,
  Divider,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';
import { BaseLayout } from 'layouts';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from 'utils/hooks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(8),
      padding: theme.spacing(3),
    },
  })
);
const SankaIchiran = () => {
  const classes = useStyles();
  const history = useHistory();
  const users = useAppSelector((state) => state.tradePost.users);

  const onClickBack = () => {
    history.goBack();
  };
  return (
    <BaseLayout subtitle="sankaichiran">
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            参加者一覧
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 7 }} maxWidth="md">
        <Card className={classes.card} elevation={2}>
          <List>
            {users.map((row) => (
              <Link
                color="inherit"
                href="/other-user"
                sx={{ textDecoration: 'none' }}
              >
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src={row.icon}
                      sx={{ width: '6rem', height: '6rem' }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${row.name}さん`}
                    primaryTypographyProps={{
                      fontSize: 30,
                      variant: 'body2',
                      ml: 8,
                    }}
                  />
                </ListItem>
                <Divider
                  variant="inset"
                  component="li"
                  sx={{ marginBottom: 3 }}
                />
              </Link>
            ))}
          </List>
          <Button
            variant="contained"
            color="primary"
            onClick={onClickBack}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            詳細画面に戻る
          </Button>
        </Card>
      </Container>
    </BaseLayout>
  );
};

export default SankaIchiran;
