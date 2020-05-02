import {Auth, Hub, Logger} from 'aws-amplify';

const logger = new Logger('AuthService');

export class AuthService {
    static CHANNEL = 'auth_channel';

    static AUTH_EVENTS = {
        REGISTER: 'register',
        REGISTER_CONFIRM: 'register_confirm',
        LOGIN: 'login',
        PASSWORD_RESET: 'forgot_password_1',
        PASSWORD_RESET_2: 'forgot_password_2',
        PASSWORD_CHANGE: 'password_change',
        SIGN_OUT: 'sign_out'
    };

    static register = async (username, password) => {
        Auth.signUp({
            username,
            password,
        }).then(data => {

            logger.info("Registering " + username);

            Hub.dispatch(AuthService.CHANNEL, {
                event: AuthService.AUTH_EVENTS.REGISTER,
                success: true,
                message: "",
                username: username,
                "password": password,

            }, AuthService.CHANNEL);

        }).catch(err => {
            logger.info("Error: " + JSON.stringify(err));
            Hub.dispatch(AuthService.CHANNEL, {
                event: AuthService.AUTH_EVENTS.REGISTER,
                success: false,
                message: err.message,
                username: username,
                "password": password
            }, AuthService.CHANNEL);

        });

    };

    static resendConfirmationCode = (username) => {
        Auth.resendSignUp(username).then(() => {
            logger.info('code resent successfully');
        }).catch(e => {
            logger.info(e);
        });
    };

    static login = (username, password) => {
        Auth.signIn(username, password)
            .then(user => {
                logger.info("login user " + JSON.stringify(user));

                Hub.dispatch(AuthService.CHANNEL, {
                    event: AuthService.AUTH_EVENTS.LOGIN,
                    success: true,
                    message: "",
                    username: username,
                    user: user,
                }, AuthService.CHANNEL);

            })
            .catch(err => {
                logger.warn("Couldn't login: ", err);

                Hub.dispatch(AuthService.CHANNEL, {
                    event: AuthService.AUTH_EVENTS.LOGIN,
                    success: false,
                    message: err.message,
                    error: err
                }, AuthService.CHANNEL);
            });
    };

    static confirmSignUp = (username, code) => {
        Auth.confirmSignUp(username, code, {
            forceAliasCreation: true
        }).then(data => {
            logger.info("Registration confirmed: " + JSON.stringify(data));
            Hub.dispatch(AuthService.CHANNEL,
                {
                    event: AuthService.AUTH_EVENTS.REGISTER_CONFIRM,
                    success: true,
                    message: "",
                    username: username,
                    user: data
                }, AuthService.CHANNEL);
        }).catch(err => {
            logger.error(err);
            Hub.dispatch(AuthService.CHANNEL,
                {
                    event: AuthService.AUTH_EVENTS.REGISTER_CONFIRM,
                    success: false,
                    message: err.message
                }, AuthService.CHANNEL);
        });

    }

    static signOut = () => {
        Auth.signOut()
            .then(data => {
                logger.info(data);
                Hub.dispatch(AuthService.CHANNEL, {
                    event: AuthService.AUTH_EVENTS.SIGN_OUT,
                    success: true,
                    message: "",
                    data: data
                }, AuthService.CHANNEL);
            })
            .catch(err => {
                Hub.dispatch(AuthService.CHANNEL, {
                    event: AuthService.AUTH_EVENTS.SIGN_OUT,
                    success: false,
                    message: "",
                }, AuthService.CHANNEL);
            });


    }

    static changePassword = (oldPassword, newPassword) => {
        Auth.currentAuthenticatedUser()
            .then(user => {
                return Auth.changePassword(user, oldPassword, newPassword);
            })
            .then(data => {
                logger.info(data);
                Hub.dispatch(AuthService.CHANNEL, {
                    event: AuthService.AUTH_EVENTS.PASSWORD_CHANGE,
                    success: true,
                    message: "",
                    data: data
                }, AuthService.CHANNEL);

            })
            .catch(err => {
                logger.info(err);
                Hub.dispatch(AuthService.CHANNEL, {
                    event: AuthService.AUTH_EVENTS.PASSWORD_CHANGE,
                    success: false,
                    message: err.message
                }, AuthService.CHANNEL);
                return err;
            });
    }

    /**
     * this method resets the current password based on the username (email)
     * and sends a confirmation code to the email on file.
     *
     * @param username
     */
    static forgotPassword = (username) => {
        Auth.forgotPassword(username)
            .then(data => {
                logger.info("Password reset: " + data);
                Hub.dispatch(AuthService.CHANNEL, {
                    event: AuthService.AUTH_EVENTS.PASSWORD_RESET,
                    success: true,
                    message: "",
                    data: data,
                    username: username
                }, AuthService.CHANNEL);
            })
            .catch(err => {
                logger.info(err);
                Hub.dispatch(AuthService.CHANNEL, {
                    event: AuthService.AUTH_EVENTS.PASSWORD_RESET,
                    success: false,
                    message: err.message,
                    username: username
                }, AuthService.CHANNEL);
                return err;
            });

    }

    /**
     * This method allows you to set a new password based on a code that you received via
     * email
     *
     * @param username
     * @param code
     * @param newPassword
     */
    static forgotPasswordSetNew = (username, code, newPassword) => {
        Auth.forgotPasswordSubmit(username, code, newPassword)
            .then(data => {
                logger.info("Changed password: " + data);
                Hub.dispatch(AuthService.CHANNEL, {
                    event: AuthService.AUTH_EVENTS.PASSWORD_RESET_2,
                    success: true,
                    username: username,
                    password: newPassword,
                    message: "",
                    data: data
                }, AuthService.CHANNEL);
            })
            .catch(err => {
                logger.error("Couldn't change password: ", err);
                Hub.dispatch(AuthService.CHANNEL, {
                    event: AuthService.AUTH_EVENTS.PASSWORD_RESET_2,
                    success: false,
                    message: err.message,
                    data: err
                }, AuthService.CHANNEL);

                return err;
            });

    }
}
