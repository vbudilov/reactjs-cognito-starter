import {Auth, Hub, Logger} from 'aws-amplify';

import {notification} from "antd";

const logger = new Logger('AuthService');

export class AuthService {

    static register = async (username, password) => {
        Auth.signUp({
            username,
            password,
        }).then(data => {

            logger.info("Registering " + username);

            Hub.dispatch('auth', {
                "event": "register", "success": true, "message": "",
                "username": username,
                "password": password,

            }, 'Auth');

        }).catch(err => {
            logger.info("Error: " + JSON.stringify(err));
            Hub.dispatch('auth', {
                "event": "register",
                "success": false,
                "message": err.message,
                "username": username,
                "password": password
            }, 'Auth');
        });

    };

    static login = (username, password) => {
        Auth.signIn(username, password)
            .then(user => {
                logger.info("login user " + JSON.stringify(user));

                Hub.dispatch('auth', {
                    "event": "login",
                    "success": true,
                    "message": "",
                    "username": username,
                    "user": user,
                }, 'Auth');

                notification.open({
                    type: 'success',
                    message:
                        'Welcome ' +
                        user.signInUserSession.idToken.payload.email +
                        ' You have successfully logged in!',
                    description: 'Welcome!',
                });

                Hub.dispatch('auth', {"event": "login", "success": true, "message": "", "user": user}, 'Auth');

            })
            .catch(err => {
                logger.warn("Couldn't login: ", err);
                notification.open({
                    type: 'error',
                    message: 'Could not log in',
                    description: err.message,
                });

                // Hub.dispatch('auth', {"event": "login", "success": false, "message": err.message, "error": err}, 'Auth');
            });
    };

    static confirmSignUp(username, code) {
        Auth.confirmSignUp(username, code, {
            forceAliasCreation: true
        }).then(data => {
            logger.info("Registration confirmed: " + JSON.stringify(data));
            Hub.dispatch('auth',
                {"event": "confirmSignUp",
                "success": true,
                "message": "",
                "user": data}, 'Auth');
        }).catch(err => {
            logger.error(err);
            Hub.dispatch('auth',
                {"event": "confirmSignUp",
                "success": false,
                "message": err.message}, 'Auth');
        });

    }

    static signOut() {
        Auth.signOut()
            .then(data => {
                logger.info(data);
                Hub.dispatch('auth', {
                    "event": "signOut", "success": true,
                    "message": "",
                    "data": data
                }, 'Auth');
            })
            .catch(err => logger.info(err));


    }

    static changePassword(oldPassword, newPassword) {
        Auth.currentAuthenticatedUser()
            .then(user => {
                return Auth.changePassword(user, oldPassword, newPassword);
            })
            .then(data => {
                logger.info(data);
                Hub.dispatch('auth', {
                    "event": "changePassword",
                    "success": true,
                    "message": "", "data": data
                }, 'Auth');

            })
            .catch(err => {
                logger.info(err);
                Hub.dispatch('auth', {
                    "event": "changePassword",
                    "success": false,
                    "message": err.message
                }, 'Auth');
                return err;
            });
    }

    /**
     * this method resets the current password based on the username (email)
     * and sends a confirmation code to the email on file.
     *
     * @param username
     */
    static forgotPassword(username) {
        Auth.forgotPassword(username)
            .then(data => {
                logger.info("Password reset: " + data);
                Hub.dispatch('auth', {
                    "event": "forgotPassword",
                    "success": true,
                    "message": "",
                    "data": data,
                    "username": username
                }, 'Auth');
            })
            .catch(err => {
                logger.info(err);
                Hub.dispatch('auth', {
                    "event": "forgotPassword",
                    "success": false,
                    "message":  err.message,
                    "username": username
                }, 'Auth');
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
    static forgotPasswordSetNew(username, code, newPassword) {
        Auth.forgotPasswordSubmit(username, code, newPassword)
            .then(data => {
                logger.info("Changed password: " + data);
                Hub.dispatch('auth', {
                    "event": "forgotPasswordSubmit",
                    "success": true,
                    "message": "", "data": data
                }, 'Auth');
            })
            .catch(err => {
                logger.error("Couldn't change password: ", err);
                Hub.dispatch('auth', {
                    "event": "forgotPasswordSubmit",
                    "success": false,
                    "message": err.message,
                    "data": err
                }, 'Auth');

                return err;
            });

    }


}
