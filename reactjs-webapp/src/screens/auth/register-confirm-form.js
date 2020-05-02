import {Button, Form, Icon, Input, notification, Row} from 'antd';
import React from 'react';
import {Hub, Logger} from '@aws-amplify/core';
import {AuthService} from "../../services/auth-service";
import {Link} from "react-router-dom";

class RegisterConfirmForm extends React.Component {

    logger = new Logger("RegisterConfirmForm");

    styles = {
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

    constructor(props) {
        super(props);
        Hub.listen(AuthService.CHANNEL, this.onHubCapsule, 'MyListener');
    }

    // Default handler for listening events
    onHubCapsule = (capsule) => {
        const {channel, payload} = capsule;
        if (channel === AuthService.CHANNEL &&
            (AuthService.AUTH_EVENTS.REGISTER_CONFIRM )) {
            if (!payload.success) {
                this.setState({errorMessage: payload.message})
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
                this.props.history.push("/login")
            }
        }
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.logger.info('Received values of form: ', values);
                AuthService.confirmSignUp(values.username, values.code);
            }
        });
    };
    componentWillUnmount() {
        this.logger.info("Removing HUB subscription to " + AuthService.CHANNEL);
        Hub.remove(AuthService.CHANNEL, this.onHubCapsule);
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <div>
                <Row style={{display: 'flex', justifyContent: 'center', margin: "15px"}}>
                    Use the emailed code to confirm your email
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
                            {getFieldDecorator('code', {
                                rules: [{required: true, message: 'Please input your code!'}],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    type="string"
                                    placeholder="Code"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>

                            <Button type="primary" htmlType="submit" style={this.styles.loginFormButton}>
                                Confirm Email
                            </Button>
                            Already confirmed? <Link to="login">Login</Link>
                        </Form.Item>
                    </Form>
                </Row>
            </div>

        );
    }

}

export const
    WrappedRegisterConfirmForm = Form.create({name: 'normal_login'})(RegisterConfirmForm);
