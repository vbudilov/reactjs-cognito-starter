import React, {useContext} from 'react';
import Avatar from '@mui/material/Avatar';
import {useDispatch} from 'react-redux';
import {
    onCognitoUserSignOut,
    onJWTAuthSignout,
    onSignOutAuth0User,
    onSignOutFirebaseUser,
} from '../../../../redux/actions';
import {useAuthUser} from '../../../../@crema/utility/AppHooks';
import AppContext from '../../../../@crema/utility/AppContext';
import clsx from 'clsx';
import makeStyles from '@mui/styles/makeStyles';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import {grey, orange} from '@mui/material/colors';
import {AuthType, Fonts} from '../../constants/AppEnums';

const UserInfo = (props) => {
    const {themeMode} = useContext(AppContext);
    const dispatch = useDispatch();
    const [user, authType] = useAuthUser();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const getUserAvatar = () => {
        if (user.displayName) {
            return user.displayName.charAt(0).toUpperCase();
        }
        if (user.email) {
            return user.email.charAt(0).toUpperCase();
        }
    };

    const useStyles = makeStyles((theme) => {
        return {
            crUserInfo: {
                backgroundColor: 'rgba(0,0,0,.08)',
                paddingTop: 9,
                paddingBottom: 9,
                minHeight: 56,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                [theme.breakpoints.up('sm')]: {
                    paddingTop: 10,
                    paddingBottom: 10,
                    minHeight: 70,
                },
            },
            profilePic: {
                height: 40,
                width: 40,
                fontSize: 24,
                backgroundColor: orange[500],
                [theme.breakpoints.up('xl')]: {
                    height: 45,
                    width: 45,
                },
            },
            userInfo: {
                width: 'calc(100% - 75px)',
            },
            userName: {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                fontSize: 18,
                fontFamily: Fonts.MEDIUM,
                [theme.breakpoints.up('xl')]: {
                    fontSize: 20,
                },
                color: themeMode === 'light' ? '#313541' : 'white',
            },
            designation: {
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
            },
            pointer: {
                cursor: 'pointer',
            },
            adminRoot: {
                color: grey[500],
                fontSize: 16,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
            },
        };
    });

    const classes = useStyles(props);

    return (
        <Box
            px={{xs: 4, xl: 7}}
            className={clsx(classes.crUserInfo, 'cr-user-info')}>
            <Box display='flex' alignItems='center'>
                {user.photoURL ? (
                    <Avatar className={classes.profilePic} src={user.photoURL}/>
                ) : (
                    <Avatar className={classes.profilePic}>{getUserAvatar()}</Avatar>
                )}
                <Box ml={4} className={clsx(classes.userInfo, 'user-info')}>
                    <Box
                        display='flex'
                        alignItems='center'
                        justifyContent='space-between'>
                        <Box mb={0} className={clsx(classes.userName)}>
                            {user.displayName ? user.displayName : 'Admin User '}
                        </Box>
                        <Box
                            ml={3}
                            className={classes.pointer}
                            color={themeMode === 'light' ? '#313541' : 'white'}>
                            <ExpandMoreIcon onClick={handleClick}/>
                            <Menu
                                id='simple-menu'
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}>
                                <MenuItem>My account</MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        if (user && authType === AuthType.AWS_COGNITO) {
                                            dispatch(onCognitoUserSignOut());
                                        } else if (user && authType === AuthType.FIREBASE) {
                                            dispatch(onSignOutFirebaseUser());
                                        } else if (user && authType === AuthType.AUTH0) {
                                            dispatch(onSignOutAuth0User());
                                        } else if (user && authType === AuthType.JWT_AUTH) {
                                            dispatch(onJWTAuthSignout());
                                        }
                                    }}>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Box>
                    <Box color={grey.A200} className={classes.designation}>
                        System Manager
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default UserInfo;
