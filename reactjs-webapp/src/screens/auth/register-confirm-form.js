import {Button, Form, Input, notification, Row} from 'antd';
import React, {useEffect, useState} from 'react';
import {Hub, Logger} from '@aws-amplify/core';
import {AuthService} from "../../services/auth-service";
import {Link, useHistory} from "react-router-dom";
import {LockOutlined, UserOutlined} from "@ant-design/icons";

export function RegisterConfirmForm() {

    const logger = new Logger("RegisterConfirmForm");
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
    });

    // Default handler for listening events
    const onHubCapsule = (capsule) => {
        const {channel, payload} = capsule;
        if (channel === AuthService.CHANNEL &&
            (AuthService.AUTH_EVENTS.REGISTER_CONFIRM)) {
            if (!payload.success) {
                setErrorMessage(payload.message);
                notification.open({
                    type: 'error',
                    message: 'Could not log in',
                    description: payload.message,
                    duration: 10
                });
            } else {
                notification.open({
                    type: 'success',
                    message:
                        'Perfect!',
                    description: 'You have confirmed your email. Now you can login',
                    duration: 15
                });

                history.push("/login")
            }
        }
    };

    const onFinish = values => {
        console.log('Success:', values);
        AuthService.confirmSignUp(values.username, values.code);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return <div>
        <Row style={{display: 'flex', justifyContent: 'center', margin: "15px"}}>
            Use the emailed code to confirm your email
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
                            message: 'Please input your email',
                        }
                    ]}>
                    <Input
                        prefix={<UserOutlined/>}
                        placeholder="Email"
                    />
                </Form.Item>
                <Form.Item
                    name="code"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your confirmation code!'
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
                        Confirm Email
                    </Button>
                    Already confirmed? <Link to="login">Login</Link>
                </Form.Item>
            </Form>
        </Row>
    </div>;

}
