import React, {useEffect, useState} from 'react';
import {Hub, Logger} from '@aws-amplify/core';
import {AuthService} from "./service/auth-service";
import {Link, useHistory} from "react-router-dom";
import makeStyles from '@mui/styles/makeStyles';
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Alert} from '@mui/material';
import Paper from "@mui/material/Paper";

const logger = new Logger("RegisterConfirmForm");

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: "url('images/auth/register.webp')",
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

export function RegisterConfirmForm() {

    const history = useHistory();

    const [errorMessage, setErrorMessage] = useState("");
    const [userNotConfirmed, setUserNotConfirmed] = useState(false);

    useEffect(() => {
        Hub.listen(AuthService.CHANNEL, onHubCapsule, 'MyListener');

        return function cleanup() {
            logger.info("Removing HUB subscription to " + AuthService.CHANNEL);
            Hub.remove(AuthService.CHANNEL, onHubCapsule);
        };
    });

    // Default handler for listening events
    const onHubCapsule = (capsule) => {
        const {channel, payload} = capsule;
        if (channel === AuthService.CHANNEL &&
            (AuthService.AUTH_EVENTS.REGISTER_CONFIRM)) {
            if (!payload.success) {
                setErrorMessage(payload.message);
            } else {
                history.push("/login")
            }
        }
    };

    const onFinish = (event) => {
        AuthService.confirmSignUp(email, code);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const resendCode = async () => {
        if (!email) {
            setErrorMessage("Enter your email address");
            return;
        }

        logger.info("email " + email)
        let result = await AuthService.resendConfirmationCode(email);
    }

    const classes = useStyles();

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handleCodeChange = (event) => {
        setCode(event.target.value)
    }
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={7} className={classes.image}/>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Use the emailed code to confirm your email
                    </Typography>
                    {errorMessage &&
                        <Alert severity="error">
                            {errorMessage}
                        </Alert>}
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                type={"email"}
                                onChange={handleEmailChange}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="code"
                                label="Code"
                                name="code"
                                autoComplete="code"
                                type={"text"}
                                onChange={handleCodeChange}

                            />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={onFinish}
                    >
                        Confirm
                    </Button>

                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        onClick={resendCode}
                    >
                        Resend code
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to={"/login"} variant="body2">
                                Already confirmed? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </Grid>
    );
}
