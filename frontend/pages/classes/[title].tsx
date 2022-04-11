import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { currentClass } from '../../src/utils';
import { client } from '../../src/client';
const fetchCurrentClass = async (classId: string) => {
  return await client.fetch(currentClass(classId));
};
export const ClassesDetails = () => {
  const { query } = useRouter();
  const { isLoading, data, isFetched, isError } = useQuery('currentClass', () =>
    fetchCurrentClass(query.id?.toString() ?? '')
  );

  return <h1>Aqui</h1>;
};
export default ClassesDetails;
