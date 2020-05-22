import {Button, Form, Input, notification, Row} from 'antd';
import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Hub, Logger} from '@aws-amplify/core';
import {AuthService} from "../../services/auth-service";
import {LockOutlined, UserOutlined} from "@ant-design/icons";

export function RegisterForm() {

    const logger = new Logger("RegisterForm");
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
        if (channel === AuthService.CHANNEL && payload.event === AuthService.AUTH_EVENTS.REGISTER) {
            if (!payload.success) {
                setErrorMessage(payload.message);
                notification.open({
                    type: 'error',
                    message: 'Could not register',
                    description: payload.message,
                    duration: 10
                });
            } else {
                // Successful registration -- now let's confirm the email with a code (route to the next screen)
                history.push("/registerconfirm")
            }
        }
    };

    const onFinish = values => {
        console.log('Success:', values);
        AuthService.register(values.username, values.password);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return <div>
        <Row style={{display: 'flex', justifyContent: 'center', margin: "15px"}}>
            Register
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
                    <Button type="primary" htmlType="submit" style={styles.loginFormButton}>
                        Register
                    </Button>
                    Already registered? <Link to="login">login</Link>
                </Form.Item>
            </Form>
        </Row>
    </div>;

}
