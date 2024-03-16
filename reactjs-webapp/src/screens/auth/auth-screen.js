import React, {useEffect, useState} from 'react';
import {Redirect, Route} from "react-router";
import {RegisterForm} from "./register-form";
import {ResetPasswordStep1} from "./reset-password-step-1";
import {ResetPasswordStep2} from "./reset-password-step-2";
import {RegisterConfirmForm} from "./register-confirm-form";
import {LoginForm} from "./login-form";
import {Auth} from "aws-amplify";
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import makeStyles from '@mui/styles/makeStyles';


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: "url('images/auth/login.webp')",
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


// import { Link, BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';


export function AuthScreen() {
    const classes = useStyles();

    return (
        <div>
            <Grid container component="main" className={classes.root}>
                <CssBaseline/>
                <Grid item xs={false} sm={4} md={7} className={classes.image}/>


                <Route path={"/login"} component={LoginForm}/>
                <Route path={"/register"} component={RegisterForm}/>
                <Route path={"/registerconfirm"} component={RegisterConfirmForm}/>
                <Route path={"/forgotpassword1"} component={ResetPasswordStep1}/>
                <Route path={"/forgotpassword2"} component={ResetPasswordStep2}/>
                <Route path={"/forgotpassword2/:email"} component={ResetPasswordStep2}/>
            </Grid>
        </div>
    );
}

export function ProtectedRoute({component: Component, ...rest}) {

    const [isAuthenticated, setLoggedIn] = useState(true);
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        (async () => {
            let user = null;

            try {
                user = await Auth.currentAuthenticatedUser()
                if (user) {
                    setLoggedIn(true);
                } else {
                    setLoggedIn(false);
                }
            } catch (e) {
                setLoggedIn(false);
            }
        })();
    });

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? <Component {...props} /> : <Redirect to="/login"/>
            }
        />
    );

}

