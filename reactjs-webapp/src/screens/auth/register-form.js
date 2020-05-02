import {Button, Form, Icon, Input, notification, Row} from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';
import {Hub, Logger} from '@aws-amplify/core';
import {AuthService} from "../../services/auth-service";

class RegisterForm extends React.Component {

    logger = new Logger("RegisterForm");
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
        if (channel === AuthService.CHANNEL && payload.event === AuthService.AUTH_EVENTS.REGISTER) {
            if (!payload.success) {
                this.setState({errorMessage: payload.message});
                notification.open({
                    type: 'error',
                    message: 'Could not register',
                    description: payload.message,
                    duration: 10
                });
            } else {
                // Successful registration -- now let's confirm the email with a code (route to the next screen)
                this.props.history.push("/registerconfirm")
            }
        }
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                this.logger.info('Received values of form: ', values);
                await AuthService.register(values.username, values.password);
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
                    Register
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
                            <Button type="primary" htmlType="submit" style={this.styles.loginFormButton}>
                                Register
                            </Button>
                            Already registered? <Link to="login">login</Link>
                        </Form.Item>
                    </Form>
                </Row>
            </div>

        );
    }

}

export const
    WrappedRegisterForm = Form.create({name: 'normal_login'})(RegisterForm);
