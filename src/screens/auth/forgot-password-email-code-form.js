import {Button, Form, Icon, Input, Row} from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';
import {Hub, Logger} from "@aws-amplify/core";
import {AuthService} from "../../services/auth-service";

class ForgotPasswordEmailCodeForm extends React.Component {
    logger = new Logger("ForgotPasswordEmailCodeForm");
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
        Hub.listen('auth', this.onHubCapsule, 'MyListener');
    }

    // Default handler for listening events
    onHubCapsule = (capsule) => {
        const {channel, payload} = capsule;
        if (channel === AuthService.CHANNEL && payload.event === AuthService.AUTH_EVENTS.PASSWORD_RESET_2) {
            if (channel === 'auth' && payload.event === 'forgotPassword') {
                console.log(payload.message);
                if (!payload.success) {
                    this.setState({errorMessage: payload.message})
                } else {
                    this.setState({errorMessage: null});
                    console.log("Redirecting");
                    this.props.history.push("/auth/login")
                }
            }
        }
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>

                <Row style={{display: 'flex', justifyContent: 'center'}}>
                    Forgot Password (step 2)
                </Row>

                <Row>
                    <Form onSubmit={this.handleSubmit} style={this.styles.loginForm}>
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{required: true, message: 'Please input your username!'}],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder="Email"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: 'Please input your new Password!'}],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    type="password"
                                    placeholder="New Password"
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
                                Change password
                            </Button>
                            Or try to <Link to="login">login</Link> </Form.Item>
                    </Form>
                </Row>
            </div>
        );
    }


}

export const
    WrappedForgotPasswordEmailCodeForm = Form.create({name: 'normal_login'})(ForgotPasswordEmailCodeForm);
