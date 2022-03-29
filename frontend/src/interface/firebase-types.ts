interface FirebaseResponseArrayErros{
    message?: string, 
    domain?: string, 
    reason?: string

}
export interface FirebaseErrorResponse {
    code?: number,
    message?: string,
    errors?: Array<FirebaseResponseArrayErros> 
}