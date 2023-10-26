import { AuthErrorCodes } from "firebase/auth"

const getAuthErrorMessages = (errorCode) => {
    switch (errorCode) {
        case AuthErrorCodes.EMAIL_EXISTS:
            return "User already Exists"
        case "auth/invalid-login-credentials": // Wasn't able to find this error inside AuthErrorCodes
            return "Incorrect Password"
        case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
            return "Wait for sometime and try again"
        default:
            return "There was an error"
    }
}

export { getAuthErrorMessages }