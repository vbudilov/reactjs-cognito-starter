import React from 'react';
import {DropDownNavBarMenu} from "./drop-down-navbar-menu";

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import {Link, useHistory} from "react-router-dom";
import {Box} from "@mui/material";
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
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
    cardHeader: {
        backgroundColor:
            theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
    },
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
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
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                        <Link to={"/"}>
                            <img src={window.location.origin + '/logos/logo-md.png'}
                                 style={{width: "190px"}} alt={""}/>
                        </Link>
                    </Typography>

                    {/*<Hidden smDown>*/}
                    {/*    {loggedIn &&*/}
                    {/*        <Link to={"/alttext"}>*/}
                    {/*            <Button startIcon={<ReceiptLongIcon/>}>Alt Text</Button>*/}
                    {/*        </Link>*/}
                    {/*    }*/}
                    {/*</Hidden>*/}


                    <Hidden smDown>
                        <Link to={"/"}><Button startIcon={<Search/>}></Button></Link>
                    </Hidden>


                    {props.loggedIn &&
                        <DropDownNavBarMenu loggedIn={loggedIn} logoutFunction={logout} loggedInUser={user}/>
                    }

                    {/* The user isn't logged in */}
                    {!loggedIn && <Link to={"/login"}>
                        <Button variant={"outlined"} size={"small"} color="secondary">
                            Login
                        </Button>
                    </Link>}

                </Toolbar>
            </AppBar>
        </Box>
    )
        ;
}

export default MyTopAppBar;
