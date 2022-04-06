import { useRouter } from 'next/router';
import React from 'react';

export const ClassesDetails = () => {
  const { query } = useRouter();
  console.log(query);
  return <h1>Aqui</h1>;
};
export default ClassesDetails;
