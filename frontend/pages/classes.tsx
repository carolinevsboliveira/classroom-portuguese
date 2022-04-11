import React, { useState, Fragment } from 'react';
import { BackdropWithLoader, ClassForm, Toast } from '../src/components';
import { useAuth } from '../src/contexts';
import { useRouter } from 'next/router';
import { useValidUser } from '../src/hooks';
const Classes = () => {
  const { push } = useRouter();
  const [error, setError] = useState({ state: false, message: '' });
  const { currentUser } = useAuth();

  useValidUser({ currentUser, setError });
  return (
    <Fragment>
      <ClassForm currentUser={currentUser} />
      <Toast setOpen={setError} open={error.state} message={error.message} />
      <BackdropWithLoader isLoanding={error.state} />
    </Fragment>
  );
};

export default Classes;
