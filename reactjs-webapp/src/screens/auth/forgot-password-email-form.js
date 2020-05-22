import {Button, Form, Input, notification, Row} from 'antd';
import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Hub, Logger} from "@aws-amplify/core";
import {AuthService} from "../../services/auth-service";
import {UserOutlined} from "@ant-design/icons";

export function ForgotPasswordEmailForm() {

    const logger = new Logger("ForgotPasswordEmailForm");
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
            Hub.remove(AuthService.CHANNEL, onHubCapsule);
        }
    })

    const onHubCapsule = (capsule) => {
        const {channel, payload} = capsule;
        if (channel === AuthService.CHANNEL && payload.event === AuthService.AUTH_EVENTS.PASSWORD_RESET) {
            logger.info(payload.message);
            if (!payload.success) {
                setErrorMessage(payload.message)
                notification.open({
                    type: 'error',
                    message: "Couldn't reset your password",
                    description: payload.message,
                    duration: 15
                });
            } else {
                setErrorMessage(null)
                notification.open({
                    type: 'info',
                    message: 'Check your mail. Use the code to change your password',
                    duration: 15
                });

                history.push("/forgotpassword2")

            }
        }
    };
    const onFinish = values => {
        logger.info('Received values of form: ', values);
        AuthService.forgotPassword(values.username);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return <div>
        <Row style={{display: 'flex', justifyContent: 'center', width: "200px"}}>Get a 'reset' code</Row>
        <Row>
            <Form name="basic"
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
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={styles.loginFormButton}>
                        Send me a code
                    </Button>
                    Or try to <Link to="login">login</Link> </Form.Item>
            </Form>
        </Row>
    </div>;

}
