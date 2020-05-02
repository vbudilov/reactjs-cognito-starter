import {Button, Form, Icon, Input, notification, Row} from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';
import {Hub, Logger} from "@aws-amplify/core";
import {AuthService} from "../../services/auth-service";

class ForgotPasswordEmailForm extends React.Component {

    logger = new Logger("ForgotPasswordEmailForm");
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

    onHubCapsule = (capsule) => {
        const {channel, payload} = capsule;
        if (channel === AuthService.CHANNEL && payload.event === AuthService.AUTH_EVENTS.PASSWORD_RESET) {
            this.logger.info(payload.message);
            if (!payload.success) {
                this.setState({errorMessage: payload.message})
                notification.open({
                    type: 'error',
                    message: "Couldn't reset your password",
                    description: payload.message,
                    duration: 15
                });
            } else {
                this.setState({errorMessage: null});
                notification.open({
                    type: 'info',
                    message: 'Check your mail. Use the code to change your password',
                    duration: 15
                });

                this.props.history.push("/forgotpassword2")

            }
        }
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.logger.info('Received values of form: ', values);
                AuthService.forgotPassword(values.username);
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
                <Row style={{display: 'flex', justifyContent: 'center', width: "200px"}}>Get a 'reset' code</Row>
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
                            <Button type="primary" htmlType="submit" style={this.styles.loginFormButton}>
                                Send me a code
                            </Button>
                            Or try to <Link to="login">login</Link> </Form.Item>
                    </Form>
                </Row>
            </div>


        );
    }


}

export const
    WrappedForgotPasswordEmailForm = Form.create({name: 'normal_login'})(ForgotPasswordEmailForm);
