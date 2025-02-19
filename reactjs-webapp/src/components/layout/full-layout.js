// Modified FullLayout.js
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
import Box from "@mui/material/Box";
import { SideNavbar } from './sidnav';

const logger = new Logger('FullLayout');
const styles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: "#faf6f6",
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
    },
    header: {
        position: 'sticky',
        top: 0,
        zIndex: 1200,
        backgroundColor: theme.palette.background.paper
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
        marginTop: '70px', // Changed from top: '64px' to marginTop
        height: 'calc(100vh - 70px)' // Adjusted height to match new top margin
    },
    content: {
        flexGrow: 1,
        display: 'flex',
        marginTop: '0', // Added to ensure no gap between header and content
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

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <MyTopAppBar loggedIn={loggedIn} loggedInUser={loggedInUser}/>
            </div>

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
                        <SideNavbar loggedIn={loggedIn} />
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
                    <SideNavbar loggedIn={loggedIn} />
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
