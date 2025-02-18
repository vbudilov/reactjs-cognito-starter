import React, {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import {Link, useHistory} from 'react-router-dom';
import {Hub, Logger} from '@aws-amplify/core';
import {AuthService} from "./service/auth-service";
import {config} from "./service/constants";
import {Alert, Box, Container} from '@mui/material';

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
        backgroundImage: "url('images/auth/login.webp')",
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
        marginTop: theme.spacing(3),
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
    },        loginContainer: {
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
    }
}));

export function RegisterForm() {
    const classes = useStyles();
    const logger = new Logger("RegisterForm");
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState("");
    const [userNotConfirmed, setUserNotConfirmed] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        Hub.listen(AuthService.CHANNEL, onHubCapsule, 'MyListener');
        return function cleanup() {
            logger.info("Removing HUB subscription to " + AuthService.CHANNEL);
            Hub.remove(AuthService.CHANNEL, onHubCapsule);
        };
    });

    const onHubCapsule = async (capsule) => {
        const {channel, payload} = capsule;
        if (channel === AuthService.CHANNEL && payload.event === AuthService.AUTH_EVENTS.REGISTER) {
            if (!payload.success) {
                setErrorMessage(payload.message);
                logger.info("Couldn't register: " + payload.message);
            } else {
                history.push(config.endpointAfterRegistration)
            }
        }
    };

    const onFinish = e => {
        e.preventDefault();
        AuthService.register(email, password);
    };

    return (
        <Box className={classes.root}>
                <Grid container component={Paper}  className={classes.loginContainer}>
                    <Grid item xs={false} sm={4} md={7} className={classes.image}/>
                    <Grid item xs={12} sm={8} md={5}>
                        <Box className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon sx={{fontSize: 30}}/>
                            </Avatar>
                            <Typography component="h1" variant="h4" sx={{fontWeight: 600, mb: 3}}>
                                Create Account
                            </Typography>
                            {errorMessage &&
                                <Alert severity="error" sx={{width: '100%', mb: 2, borderRadius: 2}}>
                                    {errorMessage}
                                </Alert>
                            }
                            <form className={classes.form} noValidate onSubmit={onFinish}>
                                <TextField
                                    className={classes.textField}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    placeholder="name@domain.com"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    onInput={e => setEmail(e.target.value)}
                                />
                                <TextField
                                    className={classes.textField}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    placeholder="anything but 'password'"
                                    autoComplete="current-password"
                                    onInput={e => setPassword(e.target.value)}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    className={classes.submit}
                                >
                                    Create Account
                                </Button>
                                <Grid container spacing={2} sx={{mt: 2}}>
                                    <Grid item xs={12} sm={6}>
                                        <Link to="/forgotpassword1" className={classes.link}>
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item xs={12} sm={6} sx={{textAlign: 'right'}}>
                                        <Link to="/login" className={classes.link}>
                                            Already registered? Login
                                        </Link>
                                    </Grid>
                                </Grid>
                            </form>
                        </Box>
                    </Grid>
                </Grid>
        </Box>
    );
}
