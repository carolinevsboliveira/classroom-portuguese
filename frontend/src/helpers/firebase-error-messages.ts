import { FirebaseErrorResponse } from '../interface';
export const translateFirebaseErrorMessages = (
  error: FirebaseErrorResponse
) => {
     if(error.message.indexOf('auth/email-already-exists') >= -1){
         return 'Email já utilizado.'
     }
  return '';
};
