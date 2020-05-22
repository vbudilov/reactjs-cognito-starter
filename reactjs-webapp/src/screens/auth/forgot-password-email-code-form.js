import {Button, Form, Input, notification, Row} from 'antd';
import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Hub, Logger} from "@aws-amplify/core";
import {AuthService} from "../../services/auth-service";
import {LockOutlined, UserOutlined} from "@ant-design/icons";

export function ForgotPasswordEmailCodeForm() {
    const logger = new Logger("ForgotPasswordEmailCodeForm");
    const history = useHistory();

    const styles = {
        loginForm: {
            "max-width": "300px"
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
        return function cleanup() {
            logger.info("Removing HUB subscription to " + AuthService.CHANNEL);
            Hub.remove(AuthService.CHANNEL, onHubCapsule);
        };

    })

    // Default handler for listening events
    const onHubCapsule = (capsule) => {
        const {channel, payload} = capsule;
        if (channel === AuthService.CHANNEL &&
            payload.event === AuthService.AUTH_EVENTS.PASSWORD_RESET_2) {
            logger.info(payload.message);
            if (!payload.success) {
                setErrorMessage(payload.message)
                notification.open({
                    type: 'error',
                    message: "Couldn't change your password",
                    description: payload.message,
                    duration: 15
                });

                // history.push("/login");
                AuthService.login(payload.username, payload.password);

            } else {
                setErrorMessage(null);
                history.push("/login")

            }
        }
    };
    const onFinish = values => {
        logger.info('Received values of form: ', values);
        AuthService.forgotPasswordSetNew(values.username, values.code, values.password)
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return <div>

        <Row style={{display: 'flex', justifyContent: 'center'}}>
            Forgot Password (step 2)
        </Row>

        <Row>
            <Form style={styles.loginForm}

                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
            >
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
                <Form.Item
                    name="code"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!'
                        }
                    ]}>
                    <Input
                        prefix={<LockOutlined/>}
                        type="string"
                        placeholder="Code"
                    />
                </Form.Item>
                <Form.Item>

                    <Button type="primary" htmlType="submit" style={styles.loginFormButton}>
                        Change password
                    </Button>
                    Or try to <Link to="login">login</Link> </Form.Item>
            </Form>
        </Row>
    </div>
}
