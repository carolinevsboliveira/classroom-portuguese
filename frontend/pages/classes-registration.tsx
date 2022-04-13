import React, { useState, Fragment, useEffect } from 'react';
import { BackdropWithLoader, ClassForm, Toast } from '../src/components';
import { useAuth } from '../src/contexts';
import { useRouter } from 'next/router';
const Classes = () => {
  const [error, setError] = useState({ state: false, message: '' });
  const { currentUser, logoutTheCurrentUser } = useAuth();
  const { push } = useRouter();

  useEffect(() => {
    if (!currentUser) {
      setError({ message: '...Carregando informações. Aguarde!', state: true });
    } else {
      setError({ message: '', state: false });
    }
  }, [currentUser]);

  const handleOnClick = () => {
    push('/login');
    logoutTheCurrentUser();
  };
  return (
    <Fragment>
      <ClassForm currentUser={currentUser} />
      <button onClick={handleOnClick}></button>
      <Toast setOpen={setError} open={error.state} message={error.message} />
      <BackdropWithLoader isLoanding={error.state} />
    </Fragment>
  );
};

export default Classes;
