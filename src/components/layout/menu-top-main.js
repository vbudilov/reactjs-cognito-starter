import React from 'react';
import {Avatar, Icon, Menu, notification} from "antd";
import {Link} from "react-router-dom";
import {Hub} from "@aws-amplify/core";
import {AuthService} from "../../services/auth-service";
import {Auth} from "aws-amplify";

export class MyMenuTopMain extends React.Component {

    state = {
        loggedIn: false
    };

    constructor(props) {
        super(props);

        Hub.listen(AuthService.CHANNEL, this.onHubCapsule, 'MyListener');
    }

    componentDidMount() {
        // Check if the user is already logged-in...if so, redirect
        Auth.currentAuthenticatedUser({
            bypassCache: true
        }).then(user => {
            this.setState({loggedIn: true});
        })
            .catch(err => {
                this.setState({loggedIn: false});
            });
    }


    onHubCapsule = (capsule) => {
        const {channel, payload} = capsule;
        if (channel === AuthService.CHANNEL &&
            payload.event === AuthService.AUTH_EVENTS.LOGIN) {
            if (payload.success) {
                this.setState({loggedIn: true, username: payload.username});
            }
        } else if (channel === AuthService.CHANNEL &&
            payload.event === AuthService.AUTH_EVENTS.SIGN_OUT) {
            if (payload.success) {
                this.setState({loggedIn: false, username: ""});
                notification.open({
                    type: 'info',
                    message: 'You have logged out',
                    duration: 10
                });
            }
        }
    };

    onAuthEvent(payload) {
        // ... your implementation
    }

    logout() {
        AuthService.signOut()
    }

    render() {
        return (<Menu
            theme="light"
            mode="horizontal"
            // defaultSelectedKeys={[this.props.location.pathname]}
            style={{lineHeight: '64px'}}
        >
            <Menu.Item key="search"><Link to="search"><Icon type="home"/> Home</Link></Menu.Item>
            {/*<Menu.Item key="browse"><Link to="browse"><Icon type="search"/> Browse </Link></Menu.Item>*/}
            <Menu.Item key="addrss"><Link to="addrss"><Icon type="plus"/> Submit RSS Feed</Link></Menu.Item>
            <Menu.SubMenu
                title={
                    <Avatar shape="square" size="large">USER</Avatar>
                }
            >
                <Menu.ItemGroup title="Settings">
                    <Menu.Item key="setting:1"><Link to="settings">Profile</Link></Menu.Item>
                    <Menu.Item key="setting:2"><Link to="settings">Settings</Link></Menu.Item>
                </Menu.ItemGroup>

                {this.state.loggedIn &&
                <Menu.Item key="auth:1" onClick={this.logout}><Icon type="home"/> Log Out</Menu.Item>}
                {!this.state.loggedIn &&
                <Menu.Item key="auth:2"><Link to="login"><Icon type="home"/> Log In</Link></Menu.Item>}
            </Menu.SubMenu>

        </Menu>)
    }
}
