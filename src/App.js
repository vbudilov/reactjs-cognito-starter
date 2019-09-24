import React from 'react';
import './App.css';
import {Breadcrumb, Layout} from 'antd';
import {MyHeader} from "./components/layout/header";
import {BrowserRouter as Router, Route} from 'react-router-dom';

const {Header, Content, Footer} = Layout;

function App() {
    return (

            <Layout>
                <MyHeader/>
                <Content style={{padding: '0 50px', marginTop: 64}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Router>
                        <div>
                            <Route exact path='/' component={MyHeader} />
                            <Route path={"/search"} component={MyHeader}/>
                        </div>
                    </Router>
                    <div style={{background: '#fff', padding: 24, minHeight: 380}}>Content</div>
                </Content>
                <Footer style={{textAlign: 'center'}}>BrainyNinja.com © 2018 </Footer>
            </Layout>

    );
}

export default App;
