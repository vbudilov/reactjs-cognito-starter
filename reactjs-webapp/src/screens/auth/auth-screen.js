import React from 'react';
import {Col, Row} from "antd";
import {Route} from "react-router";
import {RegisterForm} from "./register-form";
import {ForgotPasswordEmailForm} from "./forgot-password-email-form";
import {ForgotPasswordEmailCodeForm} from "./forgot-password-email-code-form";
import {RegisterConfirmForm} from "./register-confirm-form";
import {LoginForm} from "./login-form";

export class AuthScreen extends React.Component {

    render() {
        return (
            <div style={{display: 'flex', justifyContent: 'center', minHeight: "500px"}}>
                <Col>

                    <Row>
                        <Route path={"/login"} component={LoginForm}/>
                        <Route path={"/register"} component={RegisterForm}/>
                        <Route path={"/registerconfirm"} component={RegisterConfirmForm}/>
                        <Route path={"/forgotpassword1"} component={ForgotPasswordEmailForm}/>
                        <Route path={"/forgotpassword2"} component={ForgotPasswordEmailCodeForm}/>
                        <Route path={"/forgotpassword2/:email"} component={ForgotPasswordEmailCodeForm}/>
                    </Row>
                </Col>
            </div>
        );
    }

}
