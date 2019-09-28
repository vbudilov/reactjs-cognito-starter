import {Button, Checkbox, Col, Form, Icon, Input, Row} from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';
import {Auth, Logger} from 'aws-amplify';
import {AuthService} from "../../services/auth-service";

const logger = new Logger('AuthService');

class LoginForm extends React.Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                logger.info('Received values of form: ', values);
                AuthService.login(values.username, values.password, true)
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
                    Login
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
            Or <Link to="register">register now!</Link>
        </Form.Item>
    </Form>
</Row>
            </div>

        );
    }


}

export const
    WrappedLoginForm = Form.create({name: 'normal_login'})(LoginForm);
