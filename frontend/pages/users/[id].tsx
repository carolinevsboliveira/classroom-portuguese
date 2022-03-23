import React from 'react';
import { useRouter } from 'next/router';

const UserProfile = () => {
  const { query } = useRouter();
  return <div>`User ${query.id}`</div>;
};

export default UserProfile;
