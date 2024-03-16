import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Hub, Logger} from "@aws-amplify/core";
import {AuthService} from "./service/auth-service";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import makeStyles from '@mui/styles/makeStyles';
import {Alert, Button} from '@mui/material';
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

export function ResetPasswordStep1() {
    const classes = useStyles();

    const logger = new Logger("ResetPasswordStep1");
    const history = useHistory();

    const styles = {
        loginForm: {
            "max-width": "300px"
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
        Hub.listen(AuthService.CHANNEL, onHubCapsule, 'MyListener');

        return function cleanup() {
            Hub.remove(AuthService.CHANNEL, onHubCapsule);
        }
    })

    const onHubCapsule = (capsule) => {
        const {channel, payload} = capsule;
        if (channel === AuthService.CHANNEL && payload.event === AuthService.AUTH_EVENTS.PASSWORD_RESET) {
            logger.info(payload.message);
            if (!payload.success) {
                setErrorMessage(payload.message)
            } else {
                setErrorMessage(null)
                history.push("/forgotpassword2")
            }
        }
    };
    const onFinish = (e) => {

        e.preventDefault();

        AuthService.forgotPassword(email);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    const [email, setEmail] = useState('');


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
                        Reset password
                    </Typography>
                    {errorMessage &&
                        <Alert severity="error">
                            {errorMessage}
                        </Alert>}
                    <form className={classes.form} onSubmit={onFinish}>
                        <Grid item spacing={12}>
                            <TextField
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
                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
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
                    </form>
                </div>
            </Grid>
        </Grid>
    );

}
