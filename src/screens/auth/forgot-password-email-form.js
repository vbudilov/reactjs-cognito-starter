import {Button, Checkbox, Form, Icon, Input, Row} from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';

class ForgotPasswordEmailForm extends React.Component {

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
                <Row style={{display: 'flex', justifyContent: 'center', width: "200px"}}>Get a 'reset' code</Row>
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
                        <Button type="primary" htmlType="submit" style={this.styles.loginFormButton}>
                            Log in
                        </Button>
                        Or <Link to="login">login</Link>                    </Form.Item>
                </Form>
            </Row>
            </div>


        );
    }


}

export const
    WrappedForgotPasswordEmailForm = Form.create({name: 'normal_login'})(ForgotPasswordEmailForm);
