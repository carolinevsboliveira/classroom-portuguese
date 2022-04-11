import { useEffect } from 'react';
import { useRouter } from 'next/router';

interface useValidUserProps {
  currentUser: null;
  setError: React.Dispatch<
    React.SetStateAction<{
      state: boolean;
      message: string;
    }>
  >;
}
const useValidUser = ({ currentUser, setError }: useValidUserProps) => {
  const { push } = useRouter();
  useEffect(() => {
    if (!currentUser) {
      setError({
        state: true,
        message: 'Falha ao autenticar sua sessão. Faça o login novamente.'
      });
      setTimeout(() => {
        push('/login');
      }, 3000);
    }
  }, [currentUser]);
};

export default useValidUser;
