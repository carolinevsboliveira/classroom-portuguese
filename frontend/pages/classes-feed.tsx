import React from 'react';
import { ClassList } from '../src/components';
import { useQuery } from 'react-query';
import { client } from '../src/client';
import { classesQuery } from '../src/utils';
const ClassFeed = () => {
  const fetchClasses = async () => {
    return await client.fetch(classesQuery);
  };

  const { isLoading, data, isFetched } = useQuery('classes', fetchClasses);
  return <ClassList isLoading={isLoading} data={data} isFetched={isFetched} />;
};

export default ClassFeed;
