import React from 'react';
import { useQuery } from 'react-query';
import { client } from '../../src/client';
import { ClassList } from '../../src/components';
import { classesQuery } from '../../src/utils';

export const ClassPage = () => {
  const fetchClasses = async () => {
    return await client.fetch(classesQuery);
  };

  const { isLoading, data, isFetched } = useQuery('classes', fetchClasses);
  return <ClassList isLoading={isLoading} data={data} isFetched={isFetched} />;
};
export default ClassPage;
