import { useState } from 'react';

import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Divider,
  Grid,
} from '@material-ui/core';
import Box from '@mui/material/Box';

import { APP_NAME } from 'config/app';
import { SignInRequest, signInWithEmail } from 'store/thunks/auth';
import { useAppDispatch } from 'utils/hooks';
import { BaseLayout, FormLayout } from 'layouts';
import { AlertButton, LabeledCheckbox, SubmitButton } from 'templates';

type FormData = SignInRequest;

const formdata: Record<keyof FormData, { id: string; label: string }> = {
  email: {
    id: 'email',
    label: 'Email Address',
  },
  password: {
    id: 'password',
    label: 'Password',
  },
  remember: {
    id: 'remember',
    label: 'Remember me',
  },
};

const schema = yup.object().shape({
  email: yup.string().label(formdata.email.label).email().required(),
  password: yup
    .string()
    .label(formdata.password.label)
    .required()
    .min(8)
    .max(20),
});

const SignIn = () => {
  const dispatch = useAppDispatch();
  const [visiblePassword, setVisiblePassword] = useState(false);  //パスワード見れたり隠したりするtoggle
  const [message, setMessage] = useState<string | undefined>('');
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onBlur', resolver: yupResolver(schema) });

  // エラー発生時はメッセージを表示する
  const onSubmit = async (data: FormData) => {
    const response = await dispatch(signInWithEmail(data));
    if (signInWithEmail.rejected.match(response)) {
      setMessage(response.payload?.error?.message);
    } else history.goBack();
  };

  return (
    <BaseLayout subtitle='Sign In' withoutHeaders>
      <FormLayout title={`Sign in to ${APP_NAME}`} message={message}>
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
          <Box ml={1} mb={2}>
            <LabeledCheckbox
              label='Show Password'
              checked={visiblePassword}
              setChecked={setVisiblePassword}
            />
          </Box>
          <FormControlLabel
            id={formdata.remember.id}
            label={formdata.remember.label}
            control={
              <Checkbox {...register('remember')} value='on' color='primary' />
            }
          />
          <Box my={4}>
            <SubmitButton fullWidth>{'Sign In'}</SubmitButton>
          </Box>
          <AlertButton
            color='info'
            variant='text'
            size='small'
            onClick={() => history.push('/forgot-password')}
          >
            {'Forgot password?'}
          </AlertButton>
          <Box my={2}>
            <Divider />
          </Box>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              {`New to ${APP_NAME}? `}
              <AlertButton
                color='info'
                variant='text'
                size='small'
                onClick={() => history.push('/register')}
              >
                {'Create an account'}
              </AlertButton>
            </Grid>
          </Grid>
        </form>
      </FormLayout>
    </BaseLayout>
  );
};

export default SignIn;