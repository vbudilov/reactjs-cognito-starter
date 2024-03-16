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

const logger = new Logger('FullLayout');
const styles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: "#ece8e8",
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    drawerPaper: {
        width: 240,
    },
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
        <div>
            <Grid>
                <Grid>
                    {loggedIn &&
                        <Link to={"/alttext"}>
                            <Button startIcon={<AccountBalanceIcon/>}>Alt Text</Button>
                        </Link>
                    }
                </Grid>

                <Grid>
                    {/* The user isn't logged in */}
                    {!loggedIn && <Link to={"/login"}>
                        <Button variant={"outlined"} size={"small"} color="secondary">
                            Login
                        </Button>
                    </Link>}
                </Grid>
            </Grid>
        </div>
    );

    return (
        <div className={classes.root}>
            {isMobile && (
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon/>
                </IconButton>
            )}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                    paper: classes.drawerPaper,
                }}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
            >
                {drawer}
            </Drawer>
            <Grid container rowSpacing={1} justifyContent="flex-end"
                  columnSpacing={{xs: 1, sm: 2, md: 3, width: "100%"}}>
                <Grid container rowSpacing={1} justifyContent="flex-end"
                      columnSpacing={{xs: 1, sm: 2, md: 3, width: "100%"}}>


                    <Grid item xs={12} style={{
                        minWidth: "1200",
                        maxWidth: "1200"
                    }}>
                        <MyTopAppBar loggedIn={loggedIn} loggedInUser={loggedInUser}/>
                    </Grid>

                    <Grid item xs={12} style={{
                        minWidth: "1200",
                        maxWidth: "1200"
                    }}>
                        {loggedIn && <div></div>}
                    </Grid>

                    <Grid container item xs={12} style={{
                        minWidth: "1200",
                        maxWidth: "1200",
                    }}>

                        <Routes/>

                    </Grid>

                    <FloatingActionButtonZoom/>

                    <Grid item xs={12} style={{}}>
                        <Footer/>
                    </Grid>

                </Grid>

            </Grid>
        </div>
    );
}
