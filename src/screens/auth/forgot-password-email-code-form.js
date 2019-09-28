import {Button, Checkbox, Form, Icon, Input, Row} from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';

class ForgotPasswordEmailCodeForm extends React.Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

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
    }

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
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Email"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your new Password!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="New Password"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox>Remember me</Checkbox>)}
                            <a style={this.styles.loginFormForgot} href="">
                                Forgot password
                            </a>
                            <Button type="primary" htmlType="submit" style={this.styles.loginFormButton}>
                                Log in
                            </Button>
                            Or <Link to="login">login</Link>                </Form.Item>
                    </Form>
                </Row>
            </div>
        );
    }


}

export const
    WrappedForgotPasswordEmailCodeForm = Form.create({name: 'normal_login'})(ForgotPasswordEmailCodeForm);
