import React from 'react';
import './App.css';
import {Breadcrumb, Layout} from 'antd';
import {MyHeader} from "./components/layout/header";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {SearchScreenDefault} from "./screens/search/search-screen-default";
import {AddRssFeedScreen} from "./screens/add-rss-feed";
import {BrowseScreen} from "./screens/browse-screen-default";

const {Header, Content, Footer} = Layout;

function App() {
    return (
        <Router>

            <Layout>
                <MyHeader/>
                <Content style={{padding: '0 50px', marginTop: 64}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>

                    <div style={{background: '#fff', padding: 24, minHeight: 380}}>
                        <div>
                            <Route exact path='/' component={SearchScreenDefault} />
                            <Route path={"/search"} component={SearchScreenDefault}/>
                            <Route path={"/browse"} component={BrowseScreen}/>
                            <Route path={"/addrss"} component={AddRssFeedScreen}/>
                        </div>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>BrainyNinja.com © 2019 </Footer>
            </Layout>
        </Router>

    );
}

export default App;
