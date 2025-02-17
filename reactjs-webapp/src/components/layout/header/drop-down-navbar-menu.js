import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {Logger} from "@aws-amplify/core";
import {Avatar, Button, Divider, Fade, ListItemIcon, Menu, MenuItem, Typography} from "@mui/material";
import {makeStyles} from '@mui/styles';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PermIdentityTwoToneIcon from '@mui/icons-material/PermIdentityTwoTone';
import SettingsIcon from '@mui/icons-material/Settings';

const useStyles = makeStyles((theme) => ({
    menuButton: {
        color: theme.palette.getContrastText(theme.palette.background.paper),
        textTransform: 'none',
    },
    menuItem: {
        '&:hover': {
            backgroundColor: theme.palette.action.selected,
        },
    },
    menuItemIcon: {
        minWidth: 'auto',
        marginRight: theme.spacing(2),
    },
    menuLink: {
        textDecoration: 'none',
        color: 'inherit',
    },
}));

export function DropDownNavBarMenu(props) {
    const logger = new Logger('DropDownNavBarMenu');

    const classes = useStyles();

    const {loggedIn, logoutFunction, loggedInUser} = props;

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = async (event) => {
        handleClose(event);
        logoutFunction();
    }

    return (
        <div>
            <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
                <Avatar>
                    <PermIdentityTwoToneIcon/>
                </Avatar>
            </Button>

            <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem className={classes.menuItem}>
                    {loggedInUser && loggedInUser.attributes && (
                        <Typography variant="overline">{loggedInUser.attributes.email}</Typography>
                    )}
                </MenuItem>
                <Divider/>
                {/*<Link to="/uploads" className={classes.menuLink}>*/}
                {/*    <MenuItem onClick={handleClose} className={classes.menuItem}>*/}
                {/*        <ListItemIcon className={classes.menuItemIcon}><ExitToAppIcon/></ListItemIcon>*/}
                {/*        <Typography variant="inherit">File Uploads</Typography>*/}
                {/*    </MenuItem>*/}
                {/*</Link>*/}
                <Link to="/settings" className={classes.menuLink}>
                    <MenuItem onClick={handleClose} className={classes.menuItem}>
                        <ListItemIcon className={classes.menuItemIcon}><SettingsIcon/></ListItemIcon>
                        <Typography variant="inherit">Settings</Typography>
                    </MenuItem>
                </Link>
                <Divider/>

                {loggedIn ? (
                    <MenuItem onClick={logout} className={classes.menuItem}>
                        <ListItemIcon className={classes.menuItemIcon}><ExitToAppIcon/></ListItemIcon>
                        <Typography variant="inherit">Logout</Typography>
                    </MenuItem>
                ) : (
                    <Link to="/login" className={classes.menuLink}>
                        <MenuItem onClick={handleClose} className={classes.menuItem}>
                            <ListItemIcon className={classes.menuItemIcon}><VpnKeyIcon/></ListItemIcon>
                            <Typography variant="inherit">Login</Typography>
                        </MenuItem>
                    </Link>
                )}
            </Menu>
        </div>
    );
}
