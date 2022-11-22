import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Grid, TextField } from '@material-ui/core';
import Box from '@mui/material/Box';
import { Avatar, FormControl, FormHelperText } from '@mui/material';
import { UpdateProfileRequest, updateProfile } from 'store/thunks/auth';
import { useAppDispatch, useAppSelector } from 'utils/hooks';
import { isGuest } from 'utils/auth';
import { AlertMessage, SubmitButton } from 'templates';

type FormData = UpdateProfileRequest;

const formdata: Record<keyof FormData, { id: string; label: string }> = {
  name: {
    id: 'name',
    label: 'Username',
  },
  email: {
    id: 'email',
    label: 'Email Address',
  },
  icon: {
    id: 'icon',
    label: 'Icon',
  },
  jikoshokai: {
    id: 'jikoshokai',
    label: '自己紹介文',
  },
};

const schema = yup.object().shape({
  name: yup.string().label(formdata.name.label).min(2).max(60),
  email: yup.string().label(formdata.email.label).email().max(255),
  jikoshokai: yup.string().label(formdata.jikoshokai.label).min(15).max(300),
});

const UserProfile = () => {
  /**
   * `Account`ページは認証ルートのため以下が成立
   * - `signedIn` === `true` && `user`!== `null` -> `user!`
   */
  const user = {
    name: useAppSelector((state) => state.auth.user!.name),
    email: useAppSelector((state) => state.auth.user!.email),
    icon: useAppSelector((state) => state.auth.user!.icon),
    jikoshokai: useAppSelector((state) => state.auth.user!.jikoshokai),
  };
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState<string | undefined>('');

  //アイコン
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');
  console.log(user.icon.substring(25));

  const inputId = Math.random().toString(32).substring(2);
  const handleOnAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const img: File = e.target.files[0];
    setFile(img);
    setFileName(img.name);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onBlur', resolver: yupResolver(schema) });

  // エラー発生時はメッセージを表示する
  const onSubmit = async (data: FormData) => {
    // フォーカスを当てていない場合`defaultValue`でなく`undefined`となる
    // その場合変更点がないので現在の値をセットする
    if (!data.name) data.name = user.name;
    if (!data.email) data.email = user.email;
    if (!data.icon) data.icon = user.icon.substring(25);
    if (!data.jikoshokai) data.jikoshokai = user.jikoshokai;

    //画像が選択されていない場合user.iconをセット(defaultValueの代わり)。選択されていたら、選択した画像の名前だけを代入
    // eslint-disable-next-line eqeqeq
    if (fileName == '') {
      data.icon = user?.icon;
    } else {
      data.icon = 'http://localhost/storage/' + fileName;
    }
    // 全ての項目で変更点がない場合はリクエストを送らない
    if (
      data.name === user?.name &&
      data.email === user?.email &&
      data.icon === user?.icon &&
      data.jikoshokai === user?.jikoshokai
    ) {
      setMessage('プロフィールが変更されておりません');
      return;
    }
    setFile(null); //プレビューを非表示にする。data.iconにはすでに代入してあるから問題ない
    const response = await dispatch(updateProfile(data));
    if (updateProfile.rejected.match(response))
      setMessage(response.payload?.error?.message);
    else setMessage('');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item>
          <FormControl sx={{ minWidth: 120 }}>
            <label htmlFor={inputId}>
              <input
                id={inputId}
                type="file"
                {...register('icon')} //ここにnameも含まれてる
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleOnAddImage(e)
                }
                style={{ display: 'none' }}
              />
              <Avatar
                alt="Remy Sharp"
                src={`${user.icon}`}
                sx={{ width: '6rem', height: '6rem' }}
              />
            </label>
            <FormHelperText>↑クリックして画像を選択</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item>
          {file && (
            <div>
              <Avatar
                alt="Remy Sharp"
                src={URL.createObjectURL(file)}
                sx={{ width: '6rem', height: '6rem' }}
              />
            </div>
          )}
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {message && <AlertMessage severity="error" body={message} />}
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            disabled={isGuest()}
            variant="outlined"
            fullWidth
            id={formdata.name.id}
            label={formdata.name.label}
            autoComplete={formdata.name.id}
            defaultValue={user?.name}
            {...register('name')}
            helperText={errors?.name?.message || '2-60 characters'}
            error={!!errors?.name}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            disabled={isGuest()}
            variant="outlined"
            fullWidth
            id={formdata.email.id}
            label={formdata.email.label}
            autoComplete={formdata.email.id}
            defaultValue={user?.email}
            {...register('email')}
            helperText={errors?.email?.message}
            error={!!errors?.email}
          />
        </Grid>
      </Grid>
      <br />
      <TextField
        disabled={isGuest()}
        variant="outlined"
        fullWidth
        id={formdata.jikoshokai.id}
        label={formdata.jikoshokai.label}
        autoComplete={formdata.jikoshokai.id}
        defaultValue={user?.jikoshokai}
        {...register('jikoshokai')}
        helperText={errors?.jikoshokai?.message}
        error={!!errors?.jikoshokai}
        multiline
        rows={7}
      />
      <Box mt={3} mb={1}>
        {!isGuest() && <SubmitButton>プロフィールを更新する</SubmitButton>}
      </Box>
    </form>
  );
};

export default UserProfile;
