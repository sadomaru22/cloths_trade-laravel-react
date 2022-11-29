import React, { useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Grid } from '@material-ui/core';
import { deletePhotos, DeletePhotosRequest } from 'store/thunks/trade_post2';
import { useAppDispatch } from 'utils/hooks';
import { useForm } from 'react-hook-form';
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { AlertMessage, SubmitButton } from 'templates';
import { Image } from 'models';

type FormData = DeletePhotosRequest;

const TradeDeletePhotos = (props: any) => {
  const trade_post_id = props.id;
  const photos: Image[] = props.photos;
  //const photos = useAppSelector((state) => state.tradePost.photos);
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState<string | undefined>('');
  const [photosId, setPhotosId] = useState<string[]>([]);
  console.log(photosId);

  const {
    register,
    handleSubmit,
    //formState: { errors },
  } = useForm<FormData>({ mode: 'onBlur' });

  const handleChange = (item: string) => {
    photosId.includes(item)
      ? setPhotosId((prevState) => prevState.filter((id, index) => id !== item))
      : setPhotosId([...photosId, item]);
    setMessage(''); //エラーメッセージの非表示
  };

  const onSubmit = async (data: FormData) => {
    data.trade_post_id = trade_post_id;
    data.id = photosId;
    console.log(data.id);
    //画像が1枚も追加されていない場合
    if (data.id.length === 0) {
      setMessage('画像が選択されておりません');
      return;
    }
    setPhotosId([]); //選択した画像を初期化

    const response = await dispatch(deletePhotos(data));
    if (deletePhotos.rejected.match(response)) {
      setMessage(response.payload?.error?.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {message && <AlertMessage severity="error" body={message} />}
        </Grid>
      </Grid>
      <ImageList
        sx={{ width: 600, height: 450, ml: 15 }}
        cols={3}
        rowHeight={164}
      >
        {photos.map((row: any, index) => (
          <ImageListItem key={index}>
            <div style={{ position: 'relative' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    style={{
                      position: 'absolute',
                      top: 5,
                      left: 5,
                    }}
                    color="success"
                    //checked={checked}
                    onChange={() => handleChange(row.id)}
                    defaultChecked={photosId.includes(row.id)}
                  />
                }
                label=""
              />
              <img
                src={`${row.file_name}?w=161&fit=crop&auto=format`}
                srcSet={`${row.file_name}?w=161&fit=crop&auto=format&dpr=2 2x`}
                alt={row.file_name}
                loading="lazy"
              />
            </div>
          </ImageListItem>
        ))}
      </ImageList>
      <Box mt={3}>{<SubmitButton>選択した画像を削除する</SubmitButton>}</Box>
    </form>
  );
};

export default TradeDeletePhotos;
