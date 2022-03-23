import React, { useState } from 'react';
import { Box, Button, TextField, Snackbar, IconButton } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../../contexts';
import { REQUIRED_FIELD } from '../../constants';
import { translateFirebaseErrorMessages } from '../../helpers';
import { FirebaseErrorResponse } from '../../interface';
import { Toast } from '../toast';

const LoginForm = () => {
  const { handleSubmit, control, getValues } = useForm({
    shouldFocusError: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [firebaseError, setFirebaseError] = useState('');
  const [open, setOpen] = useState(false);

  const onSubmit = () => {
    setIsSubmitting(true);
    registerAnAccount(getValues().email, getValues().password)
      .then((response: any) => console.log(response))
      .catch((error: FirebaseErrorResponse) => {
        setOpen(true);
        setFirebaseError(translateFirebaseErrorMessages(error));
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const { registerAnAccount } = useAuth();

  return (
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
      </form>
      <Toast message={firebaseError} setOpen={setOpen} open={open} />
    </Box>
  );
};
export default LoginForm;
