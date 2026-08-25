import RegisterController from './RegisterController'
import AuthenticatedSessionController from './AuthenticatedSessionController'
import PasswordResetLinkController from './PasswordResetLinkController'
import NewPasswordController from './NewPasswordController'
import GoogleAuthenticationController from './GoogleAuthenticationController'
import EmailVerificationNotificationController from './EmailVerificationNotificationController'
const Auth = {
    RegisterController: Object.assign(RegisterController, RegisterController),
AuthenticatedSessionController: Object.assign(AuthenticatedSessionController, AuthenticatedSessionController),
PasswordResetLinkController: Object.assign(PasswordResetLinkController, PasswordResetLinkController),
NewPasswordController: Object.assign(NewPasswordController, NewPasswordController),
GoogleAuthenticationController: Object.assign(GoogleAuthenticationController, GoogleAuthenticationController),
EmailVerificationNotificationController: Object.assign(EmailVerificationNotificationController, EmailVerificationNotificationController),
}

export default Auth