import React, { useState } from 'react';

import Link from 'next/link';

import { Box, Button, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

import { useAuth } from '../../contexts';
import { REQUIRED_FIELD } from '../../constants';
import { translateFirebaseErrorMessages } from '../../helpers';
import { Toast } from '../toast';

import { client } from '../../client';
import { BackdropWithLoader } from '../backdrop-with-loader';
import { useRouter } from 'next/router';

const RegistrationForm = () => {
  const { push } = useRouter();
  const { handleSubmit, control, getValues } = useForm({
    shouldFocusError: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [firebaseError, setFirebaseError] = useState('');
  const [open, setOpen] = useState(false);

  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await registerAnAccount(
        getValues().email,
        getValues().password
      );

      localStorage.setItem('user', JSON.stringify(response?.user));
      const { uid, photoURL } = response?.user;

      const doc = {
        _id: uid,
        _type: 'user',
        userName: getValues().userName,
        image: photoURL
      };
      client.createIfNotExists(doc).then(() => push('/classes'));
    } catch (error) {
      setIsSubmitting(false);
      setFirebaseError(translateFirebaseErrorMessages(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const { registerAnAccount } = useAuth();

  return (
    <React.Fragment>
      <BackdropWithLoader isLoanding={isSubmitting} />

      <Box style={{ paddingTop: '200px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="userName"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                type="text"
                label="Nome de usuário"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
            rules={{ required: REQUIRED_FIELD, minLength: 2 }}
          />
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
        <Link href="/login">Já tem uma conta? Faça o login aqui o/</Link>
      </Box>
    </React.Fragment>
  );
};
export default RegistrationForm;
