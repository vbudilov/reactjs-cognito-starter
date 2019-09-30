import React from 'react';
import './App.css';
import {Layout} from 'antd';
import {MyHeader} from "./components/layout/header";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {SearchScreenDefault} from "./screens/search/search-screen-default";
import {AddRssFeedScreen} from "./screens/add-rss-feed";
import {AuthScreen} from "./screens/auth/auth-screen";
import Amplify from '@aws-amplify/core'
// AWS Config Files
import awsConfig from './configs/aws-configs'

const {Content, Footer} = Layout;

Amplify.configure(awsConfig);

Amplify.Logger.LOG_LEVEL = 'INFO';

export class App extends React.Component {

    render() {
        return (
            <Router>

                <Layout>

                    <Layout>
                        <MyHeader/>

                        <Content style={{padding: '0 50px', marginTop: 64, width: "100%"}}>

                            <div style={{background: '#fff', padding: 24, width: "100%", marginTop: "20px"}}>
                                <Route exact path='/' component={SearchScreenDefault}/>
                                <Route path={"/search"} component={SearchScreenDefault}/>
                                {/*<Route path={"/browse"} component={BrowseScreen}/>*/}
                                <Route path={"/addrss"} component={AddRssFeedScreen}/>
                                <Route path={"/login"} component={AuthScreen}/>
                                <Route path={"/register"} component={AuthScreen}/>
                                <Route path={"/registerconfirm"} component={AuthScreen}/>
                                <Route path={"/forgotpassword1"} component={AuthScreen}/>
                                <Route path={"/forgotpassword2"} component={AuthScreen}/>

                            </div>
                        </Content>
                        <Footer style={{textAlign: 'center'}}>BrainyNinja.com © 2019 </Footer>
                    </Layout>
                </Layout>
            </Router>

        );
    }
}

export default App;
