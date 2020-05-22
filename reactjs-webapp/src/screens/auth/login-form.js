import {Button, Form, Input, notification, Row} from 'antd';
import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

import {AuthService} from "../../services/auth-service";
import {Hub, Logger} from '@aws-amplify/core';
import {Auth} from "aws-amplify";
import {LockOutlined, UserOutlined} from "@ant-design/icons";


export function LoginForm() {
    const logger = new Logger('LoginForm');
    const history = useHistory();

    const styles = {
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
    const [errorMessage, setErrorMessage] = useState("");
    const [userNotConfirmed, setUserNotConfirmed] = useState(false);

    useEffect(() => {
        Hub.listen(AuthService.CHANNEL, onHubCapsule, 'MyListener');

        Auth.currentAuthenticatedUser({
            bypassCache: true  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
        }).then(user => {
            if (user)
                history.push("/")

        }).catch(err => console.log(err));

        return function cleanup() {
            logger.info("Removing HUB subscription to " + AuthService.CHANNEL);
            Hub.remove(AuthService.CHANNEL, onHubCapsule);
        };
    });


    // Default handler for listening events
    const onHubCapsule = (capsule) => {
        const {channel, payload} = capsule;
        if (channel === AuthService.CHANNEL && payload.event === AuthService.AUTH_EVENTS.LOGIN) {
            logger.info("Hub Payload: " + JSON.stringify(payload));
            if (!payload.success) {
                logger.info("Payload error: " + JSON.stringify(payload.error));

                setErrorMessage(payload.message);

                if (payload.error.code === 'UserNotConfirmedException') {
                    notification.open({
                        type: 'error',
                        message: 'Could not log in',
                        description: 'You have not confirmed your email. We have sent you another code. Please use it to confirm your email.',
                        duration: 20
                    });
                    setUserNotConfirmed(true);

                    // Resending another code
                    AuthService.resendConfirmationCode(payload.email);

                    history.push("/registerconfirm");


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

                history.push("/")
            }
        }
    };
    const onFinish = values => {
        console.log('Success:', values);
        AuthService.login(values.username, values.password);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return <div>
        <Row style={{display: 'flex', justifyContent: 'center', margin: "15px"}}>
            Login
        </Row>
        <Row>
            <Form
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={styles.loginForm}>
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        }
                    ]}>
                    <Input
                        prefix={<UserOutlined/>}
                        placeholder="Email"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!'
                        }
                    ]}>

                    <Input
                        prefix={<LockOutlined/>}
                        type="password"
                        placeholder="Password"
                    />

                </Form.Item>
                <Form.Item>
                    {/*{getFieldDecorator('remember', {*/}
                    {/*    valuePropName: 'checked',*/}
                    {/*    initialValue: true,*/}
                    {/*})(<Checkbox>Remember me</Checkbox>)}*/}
                    <Link style={styles.loginFormForgot} to="forgotpassword1">
                        Forgot password
                    </Link>
                    <Button type="primary" htmlType="submit" style={styles.loginFormButton}>
                        Log in
                    </Button>
                    Don't have an account? <Link to="register">Register here</Link>
                </Form.Item>
            </Form>
        </Row>
    </div>


}

