import { useRouter } from 'next/router';
import React, { ElementType } from 'react';

const WithAuth = (WrappedComponent: ElementType) => {
  return (props: any) => {
    if (typeof window !== 'undefined') {
      const { replace } = useRouter();

      if (!localStorage.getItem('isLoggedUser')) {
        replace('/');
        return null;
      }

      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default WithAuth;
