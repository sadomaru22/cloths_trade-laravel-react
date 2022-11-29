import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Grid } from '@material-ui/core';
import Box from '@mui/material/Box';
import { updatePhotos, UpdatePhotosRequest } from 'store/thunks/trade_post2';
import { useAppDispatch } from 'utils/hooks';
import { AlertMessage, SubmitButton } from 'templates';
import { Button, FormControl, FormHelperText, IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

type FormData = UpdatePhotosRequest;

const TradeAddPhotos = (props: any) => {
  const id = props.id;
  const photos = props.photos; //画像ボタンの非活性監視用
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState<string | undefined>('');

  const {
    register,
    handleSubmit,
    //formState: { errors },
  } = useForm<FormData>({ mode: 'onBlur' });

  const [images, setImages] = useState<File[]>([]);
  const inputId = Math.random().toString(32).substring(2);
  const handleOnAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const img: File = e.target.files[0];
    setMessage(''); //エラーメッセージの非表示
    setImages([...images, img]);
  };

  const handleOnRemoveImage = (index: number) => {
    // 選択した画像は削除可能
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const onSubmit = async (data: FormData) => {
    data.photos = [...images]; //画像を格納できる状態にする
    data.id = id;
    console.log(data);
    //画像が1枚も追加されていない場合
    if (data.photos.length === 0) {
      setMessage('画像が追加されておりません');
      return;
    }
    const response = await dispatch(updatePhotos(data));
    setImages([]); //選択した画像を初期化
    if (updatePhotos.rejected.match(response)) {
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
      <FormControl sx={{ minWidth: 120 }}>
        {/* 1つのボタンで画像を選択する */}
        <label htmlFor={inputId}>
          <Button
            variant="contained"
            disabled={images.length >= 10 - photos.length}
            component="span"
            sx={{ mt: 2 }}
          >
            画像追加
          </Button>
          <FormHelperText sx={{ mt: 1 }}>
            今登録されている画像と合わせて最大10枚まで追加できます。
          </FormHelperText>
          <input
            id={inputId}
            type="file"
            multiple
            accept="image/*,.png,.jpg,.jpeg,.gif"
            {...register('photos')}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleOnAddImage(e)
            }
            style={{ display: 'none' }}
          />
        </label>
        {/* 画像を選択したら選択中のすべての画像のプレビューを表示 */}
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {images.map((image, i) => (
            <div
              key={i}
              style={{
                position: 'relative',
                width: '30%',
                marginBottom: 10,
              }}
            >
              <IconButton
                aria-label="delete image"
                style={{
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  color: '#aaa',
                }}
                onClick={() => handleOnRemoveImage(i)}
              >
                <CancelIcon />
              </IconButton>
              <img
                src={URL.createObjectURL(image)}
                style={{
                  width: '80%',
                }}
              />
            </div>
          ))}
        </div>
        <br />
        <br />
      </FormControl>
      <Box mt={3}>{<SubmitButton>画像を追加する</SubmitButton>}</Box>
    </form>
  );
};

export default TradeAddPhotos;
