import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Hub, Logger} from "@aws-amplify/core";
import {AuthService} from "./service/auth-service";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import {Alert, Button} from '@mui/material';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import makeStyles from '@mui/styles/makeStyles';
import Paper from "@mui/material/Paper";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: "url('images/auth/forgot.webp')",
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

export function ResetPasswordStep2() {
    const classes = useStyles();

    const logger = new Logger("ResetPasswordStep2");
    const history = useHistory();

    const [errorMessage, setErrorMessage] = useState("");
    const [userNotConfirmed, setUserNotConfirmed] = useState(false);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        Hub.listen(AuthService.CHANNEL, onHubCapsule, 'MyListener');
        return function cleanup() {
            logger.info("Removing HUB subscription to " + AuthService.CHANNEL);
            Hub.remove(AuthService.CHANNEL, onHubCapsule);
        };

    })

    // Default handler for listening events
    const onHubCapsule = async (capsule) => {
        const {channel, payload} = capsule;
        if (channel === AuthService.CHANNEL &&
            payload.event === AuthService.AUTH_EVENTS.PASSWORD_RESET_2) {
            logger.info(payload.message);
            if (!payload.success) {
                setErrorMessage(payload.message)


            } else {
                setErrorMessage(null);
                await AuthService.login(payload.username, payload.password);
                history.push("/login")
            }
        }
    };
    const onFinish = values => {
        logger.info('Received values of form: ', values);
        AuthService.forgotPasswordSetNew(email, code, password)
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

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
                        Reset password
                    </Typography>
                    {errorMessage &&
                        <Alert severity="error">
                            {errorMessage}
                        </Alert>}
                    <Grid item spacing={12}>
                        <TextField
                            autoFocus
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            type={"email"}
                            onInput={e => setEmail(e.target.value)}

                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Code"
                            name="code"
                            autoComplete="code"
                            errorMessages={['this field is required', 'email is not valid']}
                            onInput={e => setCode(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="New Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onInput={e => setPassword(e.target.value)}
                        />
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={onFinish}
                    >
                        Reset Password
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to={"/login"} variant="body2">
                                Try signing in again
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </Grid>
    );

}
