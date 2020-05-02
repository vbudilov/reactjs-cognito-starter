import React from 'react';
import {Col, Layout, Row} from "antd";
import {WrappedLoginForm} from "./login-form";
import {Route} from "react-router";
import {WrappedRegisterForm} from "./register-form";
import {WrappedForgotPasswordEmailForm} from "./forgot-password-email-form";
import {WrappedForgotPasswordEmailCodeForm} from "./forgot-password-email-code-form";
import {WrappedRegisterConfirmForm} from "./register-confirm-form";

const {Content} = Layout;

export class AuthScreen extends React.Component {

    render() {
        return (
            <div style={{display: 'flex', justifyContent: 'center', minHeight: "500px"}}>
                <Col>

                    <Row>
                        <Route path={"/login"} component={WrappedLoginForm}/>
                        <Route path={"/register"} component={WrappedRegisterForm}/>
                        <Route path={"/registerconfirm"} component={WrappedRegisterConfirmForm}/>
                        <Route path={"/forgotpassword1"} component={WrappedForgotPasswordEmailForm}/>
                        <Route path={"/forgotpassword2"} component={WrappedForgotPasswordEmailCodeForm}/>
                        <Route path={"/forgotpassword2/:email"} component={WrappedForgotPasswordEmailCodeForm}/>
                    </Row>
                </Col>
            </div>
        );
    }

}
