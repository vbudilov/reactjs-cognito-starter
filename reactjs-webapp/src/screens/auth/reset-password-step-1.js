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
import {Alert, Box, Button, Container} from '@mui/material';
import Paper from "@mui/material/Paper";

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
        backgroundImage: "url('/images/auth/login.webp')",
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
    },     loginContainer: {
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
        <Box className={classes.root}>
            <CssBaseline/>

                <Grid container component={Paper} className={classes.loginContainer}>

                    <Grid item xs={false} sm={4} md={7} className={classes.image}/>
                    <Grid item xs={12} sm={8} md={5}>
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon/>
                            </Avatar>
                            <Typography component="h1" variant="h4" sx={{fontWeight: 600, mb: 3}}>
                                Reset Password
                            </Typography>
                            <Typography variant="body1" sx={{mb: 3, color: 'text.secondary'}}>
                                Enter your email to receive a reset code
                            </Typography>
                            {errorMessage &&
                                <Alert severity="error" sx={{width: '100%', mb: 2, borderRadius: 2}}>
                                    {errorMessage}
                                </Alert>}
                            <form className={classes.form} onSubmit={onFinish}>
                                <Grid item spacing={12}>
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
                                        onInput={e => setEmail(e.target.value)}
                                    />
                                </Grid>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    className={classes.submit}
                                >
                                    Reset Password
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link to={"/login"} className={classes.link}>
                                            Try signing in again
                                        </Link>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                    </Grid>
                </Grid>
        </Box>

    );

}
