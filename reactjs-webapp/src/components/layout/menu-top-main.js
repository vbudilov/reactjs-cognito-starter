import React, {useEffect, useState} from 'react';
import {Avatar, Menu, notification} from "antd";
import {Link, useHistory} from "react-router-dom";
import {Hub, Logger} from "@aws-amplify/core";
import {AuthService} from "../../services/auth-service";
import {Auth} from "aws-amplify";
import {HomeFilled, LoginOutlined, LogoutOutlined, PlusOutlined} from "@ant-design/icons";

export function MyMenuTopMain() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("");

    const logger = new Logger('AuthService');
    const history = useHistory();

    useEffect(() => {
        Hub.listen(AuthService.CHANNEL, onHubCapsule, 'MyListener');
        Auth.currentAuthenticatedUser({
            bypassCache: true
        }).then(user => {
            if (user)
                setLoggedIn(true);
            else
                setLoggedIn(false);
        }).catch(err => {
            setLoggedIn(false);
        });

        return function cleanup() {
            logger.info("Removing HUB subscription to " + AuthService.CHANNEL);
            Hub.remove(AuthService.CHANNEL, onHubCapsule);
        };
    })

    const onHubCapsule = (capsule) => {
        const {channel, payload} = capsule;
        if (channel === AuthService.CHANNEL &&
            payload.event === AuthService.AUTH_EVENTS.LOGIN) {
            if (payload.success) {
                setLoggedIn(true);
                setUsername(payload.username);

            }
        } else if (channel === AuthService.CHANNEL &&
            payload.event === AuthService.AUTH_EVENTS.SIGN_OUT) {
            if (payload.success) {
                setLoggedIn(false);
                setUsername("");

                notification.open({
                    type: 'info',
                    message: 'You have logged out',
                    duration: 10
                });
            }
        }
    };


    const logout = async () => {
        await AuthService.signOut();

        history.push("/login");
    }

    return <Menu
        theme="light"
        mode="horizontal"
        // defaultSelectedKeys={[props.location.pathname]}
        style={{lineHeight: '64px'}}
    >
        <Menu.Item key="search"><Link to="search"><HomeFilled/> Home</Link></Menu.Item>
        {/*<Menu.Item key="browse"><Link to="browse"><Icon type="search"/> Browse </Link></Menu.Item>*/}
        <Menu.Item key="addrss"><Link to="addrss"><PlusOutlined/> Submit RSS Feed</Link></Menu.Item>
        <Menu.SubMenu
            title={
                <Avatar shape="square" size="large">USER</Avatar>
            }
        >
            <Menu.ItemGroup title="Settings">
                <Menu.Item key="setting:1"><Link to="settings">Profile</Link></Menu.Item>
                <Menu.Item key="setting:2"><Link to="settings">Settings</Link></Menu.Item>
            </Menu.ItemGroup>

            {loggedIn &&
            <Menu.Item key="auth:1" onClick={logout}><LogoutOutlined/> Log Out</Menu.Item>}
            {!loggedIn &&
            <Menu.Item key="auth:2"><Link to="login"><LoginOutlined/> Log In</Link></Menu.Item>}
        </Menu.SubMenu>

    </Menu>
}
