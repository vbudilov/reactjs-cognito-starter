import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Amplify from '@aws-amplify/core'
// AWS Config Files
import awsConfig from './configs/aws-configs'
import {FullLayout} from "./components/layout/full-layout";
import {enquireScreen} from 'enquire-js';

import './App.css';
import {createTheme, StyledEngineProvider, ThemeProvider} from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import {AuthScreen} from "./screens/auth/auth-screen";
import {config} from "./services/constants";


Amplify.configure(awsConfig);

Amplify.Logger.LOG_LEVEL = config.logLevel;

let isMobile = false;

enquireScreen((b) => {
    isMobile = b;
});

// const theme = {
//     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//     spacing: 8,
// };
const theme = createTheme();
const useStyles = makeStyles((theme) => {
    {
        // some css that access to theme
    }
});

export function App() {

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <Router>
                    <Switch>
                        {/* Authentication */}
                        <Route path={"/login"} component={AuthScreen}/>
                        <Route path={"/register"} component={AuthScreen}/>
                        <Route path={"/registerconfirm"} component={AuthScreen}/>
                        <Route path={"/forgotpassword1"} component={AuthScreen}/>
                        <Route path={"/forgotpassword2"} component={AuthScreen}/>
                        <Route path={"/"} component={FullLayout}/>
                    </Switch>
                </Router>
            </ThemeProvider>
        </StyledEngineProvider>
    );

}
