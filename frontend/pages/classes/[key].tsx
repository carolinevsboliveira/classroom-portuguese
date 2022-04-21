import React, { Fragment, useEffect, useState } from 'react';
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
  const { query, isReady } = useRouter();
  const [error, setError] = useState({ state: false, message: '' });
  const [isReadyToFetch, setIsReadyToFetch] = useState(false);

  useEffect(() => {
    if (!isReady) return;
    setIsReadyToFetch(isReady);
  }, [isReady]);

  const { isLoading, data, isFetched } = useQuery({
    queryKey: 'currentClass',
    queryFn: () => fetchCurrentClass(query.key?.toString() ?? ''),
    enabled: isReadyToFetch
  });

  return (
    <Fragment>
      <Choose>
        <Choose.When condition={isLoading}>
          <BackdropWithLoader isLoanding={isLoading} />
        </Choose.When>
        <Choose.When condition={!query?.id && !data}>
          <ClassNotFound />
        </Choose.When>
        <Choose.When condition={isFetched && Boolean(data)}>
          <ClassDetails data={data} />
        </Choose.When>
      </Choose>
      <Toast setOpen={setError} open={error.state} message={error.message} />
    </Fragment>
  );
};
export default ClassesDetails;
