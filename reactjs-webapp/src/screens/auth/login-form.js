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
import {Alert, Box, Container} from '@mui/material';
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        padding: theme.spacing(1.5),
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        borderRadius: '25px',
        '&:hover': {
            background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
        }
    },
    textField: {
        '& .MuiOutlinedInput-root': {
            borderRadius: '15px',
            '&.Mui-focused fieldset': {
                borderColor: '#FE6B8B',
            },
        },
    },
    loginContainer: {
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
        }
    }
}));

export function LoginForm() {
    const logger = new Logger('LoginForm');
    const history = useHistory();
    const classes = useStyles();
    const [errorMessage, setErrorMessage] = useState("");
    const [userNotConfirmed, setUserNotConfirmed] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onFinish = async (e) => {
        e.preventDefault();
        try {
            await Auth.signIn(email, password);
            history.push('/');
        } catch (error) {
            if (error.code === 'UserNotConfirmedException') {
                setUserNotConfirmed(true);
            } else {
                setErrorMessage(error.message);
            }
            logger.error('error signing in', error);
        }
    };

    return (
        <Box className={classes.root}>
                <Grid container component={Paper} className={classes.loginContainer}>
                    <Grid item xs={false} sm={4} md={7} className={classes.image} />
                    <Grid item xs={12} sm={8} md={5}>
                        <Box className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon fontSize="large"/>
                            </Avatar>
                            <Typography component="h1" variant="h4" sx={{mt: 2, fontWeight: 'bold'}}>
                                Welcome Back
                            </Typography>
                            <Typography variant="body1" color="textSecondary" sx={{mt: 1}}>
                                Please sign in to continue
                            </Typography>

                            {errorMessage &&
                                <Alert severity="error" sx={{mt: 2, borderRadius: '10px', width: '100%'}}>
                                    {errorMessage}
                                </Alert>
                            }

                            {userNotConfirmed &&
                                <Alert severity="error" sx={{mt: 2, borderRadius: '10px', width: '100%'}}>
                                    Your username isn't confirmed yet.
                                    A confirmation code was emailed to you. Please <Link className={classes.link} to={"/registerconfirm"}>confirm your email</Link>.
                                </Alert>
                            }

                            <form className={classes.form} onSubmit={onFinish} noValidate>
                                <TextField
                                    className={classes.textField}
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
                                    className={classes.textField}
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
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    className={classes.submit}
                                >
                                    Sign In
                                </Button>
                                <Grid container spacing={2} sx={{mt: 2}}>
                                    <Grid item xs={12} sm={6}>
                                        <Link to={"/forgotpassword1"} className={classes.link}>
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Link to={"/register"} className={classes.link}>
                                            {"Don't have an account? Sign Up"}
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
