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
        await Auth.signUp({
            username,
            password,
        }).then(data => {

            logger.info("Registering " + username);

            Hub.dispatch(AuthService.CHANNEL, {
                event: AuthService.AUTH_EVENTS.REGISTER,
                success: true,
                message: "",
                username: username,
                password: password

            });

        }).catch(err => {
            logger.info("Error: " + JSON.stringify(err));
            Hub.dispatch(AuthService.CHANNEL, {
                event: AuthService.AUTH_EVENTS.REGISTER,
                success: false,
                message: err.message,
                username: username,
                "password": password
            });

        });

    };

    static resendConfirmationCode = async (username) => {
        await Auth.resendSignUp(username).then(() => {
            logger.info('code resent successfully');
            return true;
        }).catch(e => {
            logger.info(e);
            return false;
        });
    };

    static login = async (username, password) => {

        let user = null;

        try {
            user = await Auth.signIn(username, password);

            logger.info("login user " + JSON.stringify(user));

            await Hub.dispatch(AuthService.CHANNEL, {
                event: AuthService.AUTH_EVENTS.LOGIN,
                success: true,
                message: "",
                username: username,
                user: user,
            });

        } catch (err) {
            logger.warn("Couldn't login: ", err);

            await Hub.dispatch(AuthService.CHANNEL, {
                event: AuthService.AUTH_EVENTS.LOGIN,
                success: false,
                message: err.message,
                error: err
            });
        }

        return user;

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
                });
        }).catch(err => {
            logger.error(err);
            Hub.dispatch(AuthService.CHANNEL,
                {
                    event: AuthService.AUTH_EVENTS.REGISTER_CONFIRM,
                    success: false,
                    message: err.message
                });
        });

    };

    static signOut = () => {
        Auth.signOut()
            .then(data => {
                logger.info("Signed out...I think");
                Hub.dispatch(AuthService.CHANNEL, {
                    event: AuthService.AUTH_EVENTS.SIGN_OUT,
                    success: true,
                    message: "",
                    data: data
                });
            })
            .catch(err => {
                logger.error("Couldn't sign out for some reason");
                Hub.dispatch(AuthService.CHANNEL, {
                    event: AuthService.AUTH_EVENTS.SIGN_OUT,
                    success: false,
                    message: "",
                });
            });


    };

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
                });

            })
            .catch(err => {
                logger.info(err);
                Hub.dispatch(AuthService.CHANNEL, {
                    event: AuthService.AUTH_EVENTS.PASSWORD_CHANGE,
                    success: false,
                    message: err.message
                });
                return err;
            });
    };

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
                });
            })
            .catch(err => {
                logger.info(err);
                Hub.dispatch(AuthService.CHANNEL, {
                    event: AuthService.AUTH_EVENTS.PASSWORD_RESET,
                    success: false,
                    message: err.message,
                    username: username
                });
                return err;
            });

    };

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
                });
            })
            .catch(err => {
                logger.error("Couldn't change password: ", err);
                Hub.dispatch(AuthService.CHANNEL, {
                    event: AuthService.AUTH_EVENTS.PASSWORD_RESET_2,
                    success: false,
                    message: err.message,
                    data: err
                });

                return err;
            });

    }

    /**
     * Returns the user if he's logged in, returns null if he's not.
     *
     * @returns {Promise<void>}
     */
    static getIdTokenOfCurrentUser = async () => {
        let session = await Auth.currentSession();

        if (session)
            return session.getIdToken().getJwtToken()
        else
            return null;
    }

    static getGroupArray = async () => {
        let user = await Auth.currentAuthenticatedUser({
            bypassCache: true
        });

        if (user) {
            try {

                let groups = user.signInUserSession.idToken.payload['cognito:groups']
                logger.info("groups: " + JSON.stringify(groups));
                return groups
            } catch (e) {
                logger.warn("Could get the groups")
                return null;
            }
        } else
            return null;
    }

    static isSuperuser = async () => {
        let user = await Auth.currentAuthenticatedUser({
            bypassCache: true
        });

        if (user) {
            try {

                let groups = user.signInUserSession.idToken.payload['cognito:groups']
                if (groups)
                    return groups.includes("superuser");
                return groups
            } catch (e) {
                logger.warn("Could get the groups")
                return false;
            }
        } else
            return false;
    }
}
