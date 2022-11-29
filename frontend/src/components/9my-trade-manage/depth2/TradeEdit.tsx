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
import TradeAddPhotos from './TradeAddPhotos';
import { useParams } from 'react-router-dom';
import { showoneTradePost } from 'store/thunks/trade_post';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'utils/hooks';
import TradeDeletePhotos from './TradeDeletePhotos';

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
  const dispatch = useAppDispatch();
  const params: { id: string } = useParams(); //投稿情報用のパラメータ
  const photos = useAppSelector((state) => state.tradePost.photos);
  useEffect(() => {
    console.log('aaa from TradeEdit.tsx'); //これは動く
    dispatch(showoneTradePost(params.id));
  }, [dispatch, params.id]);

  return (
    <BaseLayout subtitle="TradeEdit">
      <Container component="main" maxWidth="md">
        <Card className={classes.card} elevation={2}>
          <Box component="section" mb={3}>
            <CardHeader title="投稿内容の編集" />
            <Divider />
            <CardContent>
              <TradeEditOthers />
            </CardContent>
          </Box>
          <Box component="section" mb={3}>
            <CardHeader title="画像の新規追加" />
            <Divider />
            <CardContent>
              <TradeAddPhotos id={params.id} photos={photos} />
            </CardContent>
          </Box>
          <Box component="section" mb={3}>
            <CardHeader title="画像の削除" />
            <Divider />
            <CardContent>
              <TradeDeletePhotos id={params.id} photos={photos} />
            </CardContent>
          </Box>
        </Card>
      </Container>
    </BaseLayout>
  );
};

export default TradeEdit;
