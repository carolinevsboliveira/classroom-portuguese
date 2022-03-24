import { FirebaseErrorResponse } from '../interface';
export const translateFirebaseErrorMessages = (
  error: FirebaseErrorResponse
) => {
  if (error.message?.includes('auth/email-already-exists')) {
    return 'E-mail já utilizado.';
  }
  if (error.message?.includes('auth/user-not-found')) {
    return 'E-mail não cadastrado.';
  }
  return 'Algo deu errado, tente novamente';
};
