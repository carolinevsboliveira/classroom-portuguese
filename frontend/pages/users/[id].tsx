import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../src/contexts';
import { Navbar } from '../../src/components';
const UserProfile = () => {
  const { query } = useRouter();
  const { currentUser } = useAuth();
  //console.log(query.id, currentUser.uid);

  return <Navbar />;
};

export default UserProfile;
