import React, {useEffect, useState} from "react";
import MyTopAppBar from "./header/navbar";
import {Routes} from "../../routes";
import {Footer} from "./my-footer";
import Grid from "@mui/material/Grid";
import {Auth, Logger} from "aws-amplify";
import {AuthService} from "../../screens/auth/service/auth-service";
import {Hub} from "@aws-amplify/core";
import FloatingActionButtonZoom from "../../screens/uploads/upload-floating-button";
import makeStyles from "@mui/styles/makeStyles";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import Box from "@mui/material/Box";

const logger = new Logger('FullLayout');
const styles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: "#ece8e8",
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        position: 'fixed',
        left: theme.spacing(2),
        top: theme.spacing(9),
        zIndex: 1100,
        backgroundColor: theme.palette.background.paper,
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
    },
    drawerPaper: {
        width: 240,
        backgroundColor: theme.palette.background.default,
        borderRight: 'none',
        boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.1)',
    },
    content: {
        flexGrow: 1,
        display: 'flex',
    },
    mainContent: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    sidebar: {
        width: 240,
        flexShrink: 0,
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    }
}));

export function FullLayout(props) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState({});
    const [mobileOpen, setMobileOpen] = useState(false);
    const classes = styles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    useEffect(() => {
        const onHubCapsule = (capsule) => {
            const {channel, payload} = capsule;
            if (channel === AuthService.CHANNEL &&
                payload.event === AuthService.AUTH_EVENTS.LOGIN) {
                if (payload.success) {
                    setLoggedIn(true);
                }
            } else if (channel === AuthService.CHANNEL &&
                payload.event === AuthService.AUTH_EVENTS.SIGN_OUT) {
                if (payload.success) {
                    setLoggedIn(false);
                }
            }
        };

        Hub.listen(AuthService.CHANNEL, onHubCapsule);

        Auth.currentAuthenticatedUser({
            bypassCache: true
        }).then(user => {
            if (user) {
                setLoggedIn(true);
                setLoggedInUser(user);
            } else {
                setLoggedIn(false);
                setLoggedInUser({});
            }
        }).catch(err => {
            setLoggedIn(false);
            setLoggedInUser({});
        });
        return function cleanup() {
            logger.info("Removing HUB subscription to " + AuthService.CHANNEL);
            Hub.remove(AuthService.CHANNEL, onHubCapsule);
        };

    }, [])

    const drawer = (
        <Box sx={{ p: 2 }}>
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    {loggedIn &&
                        <Link to={"/alttext"} style={{ textDecoration: 'none' }}>
                            <Button
                                fullWidth
                                variant="contained"
                                startIcon={<AccountBalanceIcon/>}
                                sx={{ justifyContent: 'flex-start' }}
                            >
                                Alt Text
                            </Button>
                        </Link>
                    }
                </Grid>

                <Grid item>
                    {!loggedIn &&
                        <Link to={"/login"} style={{ textDecoration: 'none' }}>
                            <Button
                                fullWidth
                                variant="outlined"
                                color="secondary"
                                sx={{ justifyContent: 'flex-start' }}
                            >
                                Login
                            </Button>
                        </Link>
                    }
                </Grid>
            </Grid>
        </Box>
    );

    return (
        <div className={classes.root}>
            <MyTopAppBar loggedIn={loggedIn} loggedInUser={loggedInUser}/>

            <div className={classes.content}>
                {/* Permanent sidebar for desktop */}
                <Box component="nav" className={classes.sidebar}>
                    <Drawer
                        variant="permanent"
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        anchor="left"
                    >
                        {drawer}
                    </Drawer>
                </Box>

                {/* Mobile menu button */}
                {isMobile && (
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                        size="large"
                    >
                        <MenuIcon/>
                    </IconButton>
                )}

                {/* Temporary drawer for mobile */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    {drawer}
                </Drawer>

                <main className={classes.mainContent}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            {loggedIn && <div></div>}
                        </Grid>

                        <Grid item xs={12}>
                            <Routes/>
                        </Grid>

                        <FloatingActionButtonZoom/>
                    </Grid>
                </main>
            </div>

            <Footer/>
        </div>
    );
}
