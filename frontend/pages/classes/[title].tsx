import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { currentClass } from '../../src/utils';
import { client } from '../../src/client';
import { useAuth } from '../../src/contexts';
import { useValidUser } from '../../src/hooks';
import { Toast } from '../../src/components';
const fetchCurrentClass = async (classId: string) => {
  //TODO: validate to send the request when classId size is valid
  return await client.fetch(currentClass(classId));
};
export const ClassesDetails = () => {
  const { query } = useRouter();
  const { currentUser, logoutTheCurrentUser } = useAuth();
  const [error, setError] = useState({ state: false, message: '' });
  useValidUser({ currentUser, setError });

  const { isLoading, data, isFetched, isError } = useQuery('currentClass', () =>
    fetchCurrentClass(query.id?.toString() ?? '')
  );

  return (
    <Fragment>
      <button onClick={() => logoutTheCurrentUser()}></button>
      <Toast setOpen={setError} open={error.state} message={error.message} />
    </Fragment>
  );
};
export default ClassesDetails;
