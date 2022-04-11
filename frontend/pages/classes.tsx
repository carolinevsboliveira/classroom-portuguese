import React, { useEffect, useState, Fragment } from 'react';
import { BackdropWithLoader, ClassForm, Toast } from '../src/components';
import { useAuth } from '../src/contexts';
import { useRouter } from 'next/router';
const Classes = () => {
  const { push } = useRouter();
  const [error, setError] = useState({ state: false, message: '' });
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      setError({
        state: true,
        message: 'Falha ao autenticar sua sessão. Faça o login novamente.'
      });
      setTimeout(() => {
        push('./login');
      }, 3000);
    }
  }, [currentUser]);

  return (
    <Fragment>
      <ClassForm currentUser={currentUser} />
      <Toast setOpen={setError} open={error.state} message={error.message} />
      <BackdropWithLoader isLoanding={error.state} />
    </Fragment>
  );
};

export default Classes;
