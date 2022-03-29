import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../src/contexts';
import { Navbar } from '../../src/components';
const UserProfile = () => {
  const { query, push } = useRouter();
  const { currentUser, logoutTheCurrentUser } = useAuth();
  const handleLogoutTheCurrentUser = () => {
    logoutTheCurrentUser().then(() => push('/login'));
  };
  return (
    <Navbar
      user={currentUser}
      logoutTheCurrentUser={handleLogoutTheCurrentUser}
    />
  );
};

export default UserProfile;
