import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Container,
} from '@material-ui/core';
import Box from '@mui/material/Box';
import { BaseLayout } from 'layouts';
import { TradeEditOthers } from '..';
import TradeEditPhotos from './TradeEditPhotos';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(8),
      padding: theme.spacing(3),
    },
  })
);

const TradeEdit = () => {
  const classes = useStyles();
  const params: { index: string } = useParams(); //投稿情報用のパラメータ
  const tpi_number = Number(params.index);

  return (
    <BaseLayout subtitle="TradeEdit">
      <Container component="main" maxWidth="md">
        <Card className={classes.card} elevation={2}>
          <Box component="section" mb={3}>
            <CardHeader title="投稿内容の編集" />
            <Divider />
            <CardContent>
              <TradeEditOthers index={tpi_number} />
            </CardContent>
          </Box>
          <Box component="section" mb={3}>
            <CardHeader title="画像の編集" />
            <Divider />
            <CardContent>
              <TradeEditPhotos />
            </CardContent>
          </Box>
        </Card>
      </Container>
    </BaseLayout>
  );
};

export default TradeEdit;
