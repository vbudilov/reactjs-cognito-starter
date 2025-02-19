import React from 'react';
import {DropDownNavBarMenu} from "./drop-down-navbar-menu";

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import {Link, useHistory} from "react-router-dom";
import {Box, Container} from "@mui/material";
import Hidden from "@mui/material/Hidden";
import {AuthService} from "../../../screens/auth/service/auth-service";
import {Search} from "@mui/icons-material";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const showDrawer = () => {
    this.setState({
        visible: true
    });
};

const onClose = () => {
    this.setState({
        visible: false
    });
};

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    appBar: {
        borderBottom: 'none',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    },
    toolbar: {
        flexWrap: 'wrap',
        minHeight: '70px',
        padding: '0 24px',
    },
    toolbarTitle: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
    },
    link: {
        margin: theme.spacing(1, 1.5),
        textDecoration: 'none',
    },
    button: {
        borderRadius: '8px',
        padding: '8px 20px',
        transition: 'all 0.2s ease',
        '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        },
    },
    searchButton: {
        marginRight: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    logo: {
        width: '160px',
        transition: 'transform 0.2s ease',
        '&:hover': {
            transform: 'scale(1.05)',
        },
    },
}));

export function MyTopAppBar(props) {
    const classes = useStyles();

    const loggedIn = props.loggedIn;
    const user = props.loggedInUser;
    const history = useHistory();

    const logout = async (event) => {
        await AuthService.signOut();
        history.push("/login");
    }

    const addArtifact = async (event) => {
        history.push("/uploads")
    }

    return (
        <Box flexDirection="row" width={1}>
            <CssBaseline/>
            <AppBar position="sticky" className={classes.appBar}>
                <Container maxWidth="lg">
                    <Toolbar className={classes.toolbar}>
                        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                            <Link to={"/"}>
                                <img src={window.location.origin + '/logos/logo-md.png'}
                                     className={classes.logo} alt="Logo"/>
                            </Link>
                        </Typography>

                        {/*<Hidden smDown>*/}
                        {/*    <Link to={"/"} className={classes.link}>*/}
                        {/*        <Button*/}
                        {/*            startIcon={<Search/>}*/}
                        {/*            className={classes.searchButton}*/}
                        {/*        />*/}
                        {/*    </Link>*/}
                        {/*</Hidden>*/}

                        {props.loggedIn &&
                            <DropDownNavBarMenu loggedIn={loggedIn} logoutFunction={logout} loggedInUser={user}/>
                        }

                        {!loggedIn &&
                            <Link to={"/login"} className={classes.link}>
                                <Button
                                    variant="contained"
                                    size="medium"
                                    color="primary"
                                    className={classes.button}
                                >
                                    Login
                                </Button>
                            </Link>
                        }
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}

export default MyTopAppBar;
