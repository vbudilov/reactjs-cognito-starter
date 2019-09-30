import {Button, Form, Icon, Input, notification, Row} from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';
import {AuthService} from "../../services/auth-service";
import {Hub, Logger} from '@aws-amplify/core';
import {Auth} from "aws-amplify";


class LoginForm extends React.Component {
    logger = new Logger('AuthService');

    styles = {
        loginForm: {
            "maxWidth": "300px"
        },
        loginFormForgot: {
            "float": "right"
        },
        loginFormButton: {
            "width": "100%"
        }
    };

    constructor(props) {
        super(props);

        Hub.listen(AuthService.CHANNEL, this.onHubCapsule, 'MyListener');
    }

    componentDidMount() {
        // Check if the user is already logged-in...if so, redirect
        Auth.currentAuthenticatedUser({
            bypassCache: true  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
        }).then(user => {
            this.props.history.push("/")

        })
            .catch(err => console.log(err));
    }

    componentWillUnmount() {
        this.logger.info("Removing HUB subscription to " + AuthService.CHANNEL);
        Hub.remove(AuthService.CHANNEL, this.onHubCapsule);
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.logger.debug('Received values of form: ', values);
                AuthService.login(values.username, values.password)
            }
        });
    };

    // Default handler for listening events
    onHubCapsule = (capsule) => {
        const {channel, payload} = capsule;
        if (channel === AuthService.CHANNEL && payload.event === AuthService.AUTH_EVENTS.LOGIN) {
            this.logger.info("Hub Payload: " + JSON.stringify(payload));
            if (!payload.success) {
                this.logger.info("Payload error: " + JSON.stringify(payload.error));

                this.setState({errorMessage: payload.message});

                if (payload.error.code === 'UserNotConfirmedException') {
                    notification.open({
                        type: 'error',
                        message: 'Could not log in',
                        description: 'You have not confirmed your email. We have sent you another code. Please use it to confirm your email.',
                        duration: 20
                    });
                    this.setState({userNotConfirmed: true})

                    // Resending another code
                    AuthService.resendConfirmationCode(payload.email);

                    this.props.history.push("/registerconfirm");


                } else {
                    notification.open({
                        type: 'error',
                        message: 'Could not log in',
                        description: payload.message,
                        duration: 10
                    });
                }
            } else {
                notification.open({
                    type: 'success',
                    message:
                        ' You have successfully logged in!',
                    description: 'Welcome!',
                });

                this.props.history.push("/")
            }
        }
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Row style={{display: 'flex', justifyContent: 'center', margin: "15px"}}>
                    Login
                </Row>
                <Row>
                    <Form onSubmit={this.handleSubmit} style={this.styles.loginForm}>
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{required: true, message: 'Please input your email!'}],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder="Email"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: 'Please input your Password!'}],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {/*{getFieldDecorator('remember', {*/}
                            {/*    valuePropName: 'checked',*/}
                            {/*    initialValue: true,*/}
                            {/*})(<Checkbox>Remember me</Checkbox>)}*/}
                            <Link style={this.styles.loginFormForgot} to="forgotpassword1">
                                Forgot password
                            </Link>
                            <Button type="primary" htmlType="submit" style={this.styles.loginFormButton}>
                                Log in
                            </Button>
                            Don't have an account? <Link to="register">Register here</Link>
                        </Form.Item>
                    </Form>
                </Row>
            </div>

        );
    }

}

export const
    WrappedLoginForm = Form.create({name: 'normal_login'})(LoginForm);
