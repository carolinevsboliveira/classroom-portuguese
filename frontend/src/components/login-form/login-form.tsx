import React, { useState } from 'react';

import { Box, Button, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

import { useRouter } from 'next/router';

import { useAuth } from '../../contexts';
import { REQUIRED_FIELD } from '../../constants';
import { translateFirebaseErrorMessages } from '../../helpers';
import { Toast } from '../toast';
import { BackdropWithLoader } from '../backdrop-with-loader';

const LoginForm = () => {
  const { handleSubmit, control, getValues } = useForm({
    shouldFocusError: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [firebaseError, setFirebaseError] = useState('');
  const [openToast, setOpenToast] = useState(false);
  const { push } = useRouter();
  const { loginWithPasswordAndEmail, signInWithGooglePopup } = useAuth();

  const redirectToUserPage = (id: string) => {
    push(`/classes`);
  };
  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      const data = await loginWithPasswordAndEmail(
        getValues().email,
        getValues().password
      );
      redirectToUserPage(data?.user.uid);
      console.log(data);
      setIsSubmitting(false);
    } catch (error) {
      setOpenToast(true);
      setFirebaseError(translateFirebaseErrorMessages(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoginWithPop = async () => {
    setIsSubmitting(true);
    try {
      const data = await signInWithGooglePopup();
      redirectToUserPage(data?.user.uid);
      setIsSubmitting(false);
    } catch (error) {
      setOpenToast(true);
      setFirebaseError(translateFirebaseErrorMessages(error));
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
        <Toast
          message={firebaseError}
          setOpen={setOpenToast}
          open={openToast}
        />
      </Box>
    </React.Fragment>
  );
};
export default LoginForm;
