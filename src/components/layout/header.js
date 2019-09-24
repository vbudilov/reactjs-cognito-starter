import React from 'react';
import {Layout, Menu} from 'antd';
import {SearchInput} from "../search/search-input";
const {Header, Content, Footer} = Layout;

export class MyHeader extends React.Component {
    render() {
        return (<Header style={{position: 'fixed', zIndex: 1, width: '100%', backgroundColor: '#fff'}}>
            <Menu
                theme="light"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{lineHeight: '64px'}}
            >
                <Menu.Item key="1">Home</Menu.Item>
                <Menu.Item key="2">Browse Categories</Menu.Item>
                <Menu.Item key="3">Submit Your RSS Feed</Menu.Item>
                <Menu.Item key="4"><SearchInput/></Menu.Item>
            </Menu>
        </Header>)
    }
}
