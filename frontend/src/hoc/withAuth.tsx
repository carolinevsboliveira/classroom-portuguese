import { useRouter } from 'next/router';
import React, { ElementType } from 'react';

const withAuth = (WrappedComponent: ElementType) => {
  return (props: any) => {
    if (typeof window !== 'undefined') {
      const Router = useRouter();

      if (!localStorage.getItem('isLoggedUser')) {
        Router.replace('/');
        return null;
      }

      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default withAuth;
