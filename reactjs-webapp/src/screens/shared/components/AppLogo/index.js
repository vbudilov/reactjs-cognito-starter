import React, {useContext} from 'react';
import {Box} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import AppContext from '../../../../@crema/utility/AppContext';
import {ThemeMode} from '../../constants/AppEnums';

const AppLogo = () => {
    const {themeMode} = useContext(AppContext);
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
                src={
                    themeMode === ThemeMode.DARK
                        ? require('assets/images/logo-white-with-name.png')
                        : require('assets/images/logo-with-name.png')
                }
                alt='crema-logo'
            />
        </Box>
    );
};

export default AppLogo;
