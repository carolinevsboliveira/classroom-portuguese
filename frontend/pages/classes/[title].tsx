import React, { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { currentClass } from '../../src/utils';
import { client } from '../../src/client';
import { useAuth } from '../../src/contexts';

import {
  BackdropWithLoader,
  ClassDetails,
  ClassNotFound,
  Toast
} from '../../src/components';
import { Choose } from 'react-extras';
const fetchCurrentClass = async (classId: string) => {
  //TODO: validate to send the request when classId size is valid
  return await client.fetch(currentClass(classId));
};
export const ClassesDetails = () => {
  const { query } = useRouter();
  const { currentUser } = useAuth();
  const [error, setError] = useState({ state: false, message: '' });
  const { isLoading, data, isFetched } = useQuery('currentClass', () =>
    fetchCurrentClass(query.id?.toString() ?? '')
  );

  return (
    <Fragment>
      <Choose>
        <Choose.When condition={isLoading}>
          <BackdropWithLoader isLoanding={isLoading} />
        </Choose.When>
        <Choose.When condition={!query?.id && !data}>
          <ClassNotFound />
        </Choose.When>
        <Choose.When condition={isFetched && data}>
          <ClassDetails data={data as unknown} />
        </Choose.When>
      </Choose>
      <Toast setOpen={setError} open={error.state} message={error.message} />
    </Fragment>
  );
};
export default ClassesDetails;
