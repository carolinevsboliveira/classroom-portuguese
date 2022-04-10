import React, { useState } from 'react';

import { Box, Button, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

import { useRouter } from 'next/router';

import { useAuth } from '../../contexts';
import { REQUIRED_FIELD } from '../../constants';
import { translateFirebaseErrorMessages } from '../../helpers';
import { Toast } from '../toast';
import { BackdropWithLoader } from '../backdrop-with-loader';
import { client } from '../../client';
import { FirebaseErrorResponse } from '../../interface';

const LoginForm = () => {
  const { handleSubmit, control, getValues } = useForm({
    shouldFocusError: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState({ state: false, message: '' });
  const { push } = useRouter();
  const { loginWithPasswordAndEmail, signInWithGooglePopup } = useAuth();

  const redirectToUserPage = (id: string) => {
    push(`/classes-feed`);
  };
  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      const data = await loginWithPasswordAndEmail(
        getValues().email,
        getValues().password
      );
      redirectToUserPage(data?.user.uid);
      setIsSubmitting(false);
    } catch (error) {
      setError({
        state: true,
        message: translateFirebaseErrorMessages(error as FirebaseErrorResponse)
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoginWithPop = async () => {
    setIsSubmitting(true);
    try {
      const data = await signInWithGooglePopup();
      const doc = {
        _id: data?.user.uid,
        _type: 'user',
        userName: data?.user.displayName,
        image: data?.user.photoURL
      };
      client.createIfNotExists(doc).then(() => push('/classes'));
      redirectToUserPage(data?.user.uid);
      setIsSubmitting(false);
    } catch (error) {
      setError({
        state: true,
        message: translateFirebaseErrorMessages(error as FirebaseErrorResponse)
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <React.Fragment>
      <BackdropWithLoader isLoanding={isSubmitting} />
      <Box style={{ paddingTop: '200px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                type="email"
                label="E-mail"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
            rules={{ required: REQUIRED_FIELD }}
          />
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                type="password"
                label="Senha"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
            rules={{ required: REQUIRED_FIELD }}
          />
          <Button type="submit">Enviar</Button>
          <Button variant="contained" onClick={handleLoginWithPop}>
            Entrar com o Google
          </Button>
        </form>
        <Toast message={error.message} setOpen={setError} open={error.state} />
      </Box>
    </React.Fragment>
  );
};
export default LoginForm;
