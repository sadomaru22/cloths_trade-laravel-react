import { useState } from 'react';

import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Divider, Grid } from '@material-ui/core';
import Box from '@mui/material/Box';

import { SignUpRequest, createUser } from 'store/thunks/auth';
import { useAppDispatch } from 'utils/hooks';
import { BaseLayout, FormLayout } from 'layouts';
import { AlertButton, LabeledCheckbox, SubmitButton } from 'templates';

// Input items
type FormData = SignUpRequest;

const formdata: Record<keyof FormData, { id: string; label: string }> = {
  email: {
    id: 'email',
    label: 'Email Address',
  },
  password: {
    id: 'password',
    label: 'Password',
  },
  password_confirmation: {
    id: 'password-confirmation',
    label: 'Password Confirmation',
  },
};

// The schema-based form validation with Yup
const schema = yup.object().shape({
  email: yup.string().label(formdata.email.label).email().required(),
  password: yup
    .string()
    .label(formdata.password.label)
    .required()
    .min(8)
    .max(20),
  password_confirmation: yup
    .string()
    .label(formdata.password_confirmation.label)
    .oneOf([yup.ref('password'), null], 'Passwords do not match'),
});

const SignUp = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [message, setMessage] = useState<string | undefined>('');
  const {
    register, // 入力項目の登録
    handleSubmit, // 用意された`handleSubmit`
    formState: { errors }, // エラー情報 (メッセージなど)
  } = useForm<FormData>({
    mode: 'onBlur', // バリデーション判定タイミング
    resolver: yupResolver(schema),
  });

  // エラー発生時はメッセージを表示する
  const onSubmit = async (data: FormData) => {
    const response = await dispatch(createUser(data));
    if (createUser.rejected.match(response)) {
      setMessage(response.payload?.error?.message);
    }
  };

  
  return (
    <BaseLayout subtitle='Registration' withoutHeaders>
      <FormLayout title={'ユーザ新規登録'} message={message}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id={formdata.email.id}
            label={formdata.email.label}
            autoComplete={formdata.email.id}
            {...register('email')}
            helperText={errors?.email?.message}
            error={!!errors?.email}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id={formdata.password.id}
            label={formdata.password.label}
            type={visiblePassword ? 'text' : 'password'}
            autoComplete={formdata.password.id}
            {...register('password')}
            helperText={errors?.password?.message || '8-20 characters'}
            error={!!errors?.password}
          />
          <TextField
            variant='outlined'
            // margin='normal'
            required
            fullWidth
            id={formdata.password_confirmation.id}
            label={formdata.password_confirmation.label}
            type={visiblePassword ? 'text' : 'password'}
            autoComplete={formdata.password_confirmation.id}
            {...register('password_confirmation')}
            helperText={
              errors?.password_confirmation?.message || 'Retype password'
            }
            error={!!errors?.password_confirmation}
          />
          <Box ml={1} mb={2}>
            <LabeledCheckbox
              label='Show Password'
              checked={visiblePassword}
              setChecked={setVisiblePassword}
            />
          </Box>
          <Box my={4}>
            <SubmitButton fullWidth>{'Create an account'}</SubmitButton>
          </Box>
          <Box mb={2}>
            <Divider />
          </Box>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              {'すでにアカウントをお持ちの場合 '}
              <AlertButton
                color='info'
                variant='text'
                size='small'
                onClick={() => history.push('/login')}
              >
                {'Sign in'}
              </AlertButton>
            </Grid>
          </Grid>
        </form>
      </FormLayout>
    </BaseLayout>
  );
};

export default SignUp;