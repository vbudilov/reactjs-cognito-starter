import React from 'react';
import {Icon, Menu} from "antd";
import {Link} from "react-router-dom";
import {Hub} from "@aws-amplify/core";

export class MyMenuTopMain extends React.Component {

    constructor(props) {
        super(props);
        Hub.listen('navigation', (data) => {
            const { payload } = data;
            this.onAuthEvent(payload);
            console.log('A new auth event has happened: ', data.payload.data.username + ' has ' + data.payload.event);
        })
    }

    onAuthEvent(payload) {
        // ... your implementation
    }
    render() {
        return (<Menu
            theme="light"
            mode="horizontal"
            // defaultSelectedKeys={[this.props.location.pathname]}
            style={{lineHeight: '64px'}}
        >
            <Menu.Item key="search"><Link to="search"><Icon type="home"/> Home</Link></Menu.Item>
            <Menu.Item key="browse"><Link to="browse"><Icon type="search"/> Browse </Link></Menu.Item>
            <Menu.Item key="addrss"><Link to="addrss"><Icon type="addrss"/> Submit RSS Feed</Link></Menu.Item>
        </Menu>)
    }
}
