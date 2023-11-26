import { FirebaseErrorCode, FirebaseErrorMessage } from "./FirebaseErrorCodeEnum";


export const getErrorMessage = (code: string): string => {
    let message = '';
    switch (code) {
        case FirebaseErrorCode.USER_NOT_FOUND:
            message = FirebaseErrorMessage.USER_NOT_FOUND;
            break;
        case FirebaseErrorCode.WEAK_PASSWORD:
            message = FirebaseErrorMessage.WEAK_PASSWORD;
            break;
        default:
            break;
    }
    return message;
}