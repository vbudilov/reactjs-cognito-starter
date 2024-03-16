import React from 'react';
import {Box} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const AppLogoWhite = () => {
    const useStyles = makeStyles(() => ({
        logoRoot: {
            display: 'flex',
            flexDirection: 'row',
            cursor: 'pointer',
            alignItems: 'center',
        },
        logo: {
            height: 36,
            marginRight: 10,
        },
    }));
    const classes = useStyles();
    return (
        <Box className={classes.logoRoot}>
            <img
                className={classes.logo}
                src={require('assets/images/logo-white-with-name.png')}
                alt='crema-logo'
            />
        </Box>
    );
};

export default AppLogoWhite;
