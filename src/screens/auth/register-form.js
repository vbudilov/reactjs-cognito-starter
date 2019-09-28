import {Button, Checkbox, Form, Icon, Input, Row} from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';
class RegisterForm extends React.Component {

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
                    Register
                </Row>
                <Row>
                    <Form onSubmit={this.handleSubmit} style={this.styles.loginForm}>
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your email!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Email"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox>Remember me</Checkbox>)}
                            <Link style={this.styles.loginFormForgot} to="forgotpassword1">
                                Forgot password
                            </Link>
                            <Button type="primary" htmlType="submit" style={this.styles.loginFormButton}>
                                Log in
                            </Button>
                            Or <Link to="login">login</Link>
                        </Form.Item>
                    </Form>
                </Row>
            </div>

        );
    }


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

}

export const
    WrappedRegisterForm = Form.create({name: 'normal_login'})(RegisterForm);
