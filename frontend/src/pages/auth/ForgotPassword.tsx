import { useState } from 'react';

import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Divider, Grid } from '@material-ui/core';
import Box from '@mui/material/Box';

import { ForgotPasswordRequest, forgotPassword } from 'store/thunks/auth';  //一つ目は型import
import { useAppDispatch } from 'utils/hooks';
import { BaseLayout, FormLayout } from 'layouts';
import { AlertButton, SubmitButton } from 'templates';

type FormData = ForgotPasswordRequest;

const formdata: Record<keyof FormData, { id: string; label: string }> = {
  email: {
    id: 'email',
    label: 'Email Address',
  },
};

//バリデーション(emailのみ)
const schema = yup.object().shape({
  email: yup.string().label(formdata.email.label).email().required(),
});

const ForgotPassword = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState<string | undefined>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onBlur', resolver: yupResolver(schema) });

  // エラー発生時はメッセージを表示する
  const onSubmit = async (data: FormData) => {
    const response = await dispatch(forgotPassword(data));
    if (forgotPassword.rejected.match(response))  //authSliceに記載のactionがrejectの時
      setMessage(response.payload?.error?.message);
    else setMessage('');
  };

  return (
    <BaseLayout subtitle='Forgot Password' withoutHeaders>
      <FormLayout title={'Forgot Password?'} message={message}>
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
          <Box my={4}>
            <SubmitButton fullWidth>{'Send password reset email'}</SubmitButton>
          </Box>
          <Box mb={2}>
            <Divider />
          </Box>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              {'Back to'}
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

export default ForgotPassword;