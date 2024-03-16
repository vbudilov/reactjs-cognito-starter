import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {AuthService} from "./service/auth-service";
import {Hub, Logger} from '@aws-amplify/core';
import {Auth} from "aws-amplify";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import {Alert} from '@mui/material';
import Paper from "@mui/material/Paper";

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


export function LoginForm() {
    const logger = new Logger('LoginForm');
    const history = useHistory();

    const styles = {
        loginForm: {
            "maxWidth": "300px"
        },
        loginFormForgot: {
            "float": "right"
        },
        loginFormButton: {
            "width": "100%"
        }
    };
    const [errorMessage, setErrorMessage] = useState("");
    const [userNotConfirmed, setUserNotConfirmed] = useState(false);

    useEffect(() => {
        Hub.listen(AuthService.CHANNEL, (data) => {
            onHubCapsule(data);
            logger.info('A new auth event has happened: ', JSON.stringify(data));
        });
        let updateUser = async authState => {
            try {
                let user = await Auth.currentAuthenticatedUser()
                logger.info("I'm logged in")
                history.push("/")
            } catch {
                logger.info("I'm NOT logged in")
            }
        }
        updateUser();

        return function cleanup() {
            logger.info("Removing HUB subscription to " + AuthService.CHANNEL);
            Hub.remove(AuthService.CHANNEL, onHubCapsule);
        };
    }, []);


    // Default handler for listening events
    const onHubCapsule = async (capsule) => {
        const {channel, payload} = capsule;
        logger.info("Hub Payload: " + JSON.stringify(payload));

        if (channel === AuthService.CHANNEL && payload.event === AuthService.AUTH_EVENTS.LOGIN) {
            logger.info("Hub Payload: " + JSON.stringify(payload));
            if (!payload.success) {
                logger.info("Payload error: " + JSON.stringify(payload.error));


                if (payload.error.code === 'UserNotConfirmedException') {

                    setUserNotConfirmed(true);

                    // Resending another code
                    await AuthService.resendConfirmationCode(payload.email);
                } else {
                    setErrorMessage(payload.message);

                    logger.info("Couldn't sign-in: " + payload.message);
                }
            } else {
                history.push("/")
            }
        }
    };
    const onFinish = async e => {
        e.preventDefault();
        await AuthService.login(email, password);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={7} className={classes.image}>

            </Grid>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>

                    {errorMessage &&
                        <Alert severity="error">
                            {errorMessage}
                        </Alert>}

                    {userNotConfirmed &&
                        <Alert severity="error">
                            Your username isn't confirmed yet.
                            A confirmation code was emailed to you. Please <Link to={"/registerconfirm"}>confirm your
                            email</Link>.
                        </Alert>}

                    <form className={classes.form} onSubmit={onFinish} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onInput={e => setEmail(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onInput={e => setPassword(e.target.value)}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <Button
                            type={"submit"}
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to={"/forgotpassword1"} variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to={"/register"} variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Grid>
        </Grid>
    );


}

