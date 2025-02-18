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
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        margin: 0,
        padding: 0,
        overflowY: 'auto'
    },
    image: {
        backgroundImage: "url('images/auth/register.webp')",
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'transparent',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '20px 0 0 20px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        minHeight: '600px',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    paper: {
        margin: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            margin: theme.spacing(4),
            padding: theme.spacing(4),
        },
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#FF8E53',
        width: theme.spacing(7),
        height: theme.spacing(7),
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        padding: theme.spacing(1.5),
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 25,
        color: 'white',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        '&:hover': {
            background: 'linear-gradient(45deg, #FE6B8B 60%, #FF8E53 90%)',
            transform: 'scale(1.02)',
            transition: 'all 0.2s ease-in-out'
        }
    },
    textField: {
        '& .MuiOutlinedInput-root': {
            borderRadius: '15px',
            '&.Mui-focused fieldset': {
                borderColor: '#FE6B8B',
            },
        },
    },    loginContainer: {
        borderRadius: '20px',
        boxShadow: '0 3px 15px 2px rgba(255, 105, 135, .3)',
        overflow: 'hidden',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        height: 'auto',
        minHeight: '600px',
        maxHeight: '90vh',
        margin: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            margin: theme.spacing(2),
        },
    },
    link: {
        color: '#FE6B8B',
        textDecoration: 'none',
        '&:hover': {
            color: '#FF8E53',
            textDecoration: 'underline'
        }
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
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={10} sx={{borderRadius: 4, overflow: 'hidden'}}>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h4" sx={{fontWeight: 600, mb: 3}}>
                        Confirm Your Email
                    </Typography>
                    <Typography variant="body1" sx={{mb: 3, color: 'text.secondary'}}>
                        Enter the code we sent to your email address
                    </Typography>
                    {errorMessage &&
                        <Alert severity="error" sx={{width: '100%', mb: 2, borderRadius: 2}}>
                            {errorMessage}
                        </Alert>}
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.textField}
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
                                className={classes.textField}
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
                        className={classes.submit}
                        onClick={onFinish}
                    >
                        Confirm Email
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
                            <Link to={"/login"} className={classes.link}>
                                Already confirmed? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </Grid>
    );
}
