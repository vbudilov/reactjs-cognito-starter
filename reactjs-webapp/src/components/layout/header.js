import React, {useEffect, useState} from 'react';
import {Col, Layout, Row} from 'antd';
import {SearchInputField} from "../search/search-input-field";
import {MyMenuTopMain} from "./menu-top-main";
import {Hub, Logger} from "@aws-amplify/core";
import {AuthService} from "../../services/auth-service";

const {Header} = Layout;

function MyHeader() {
    const logger = new Logger('AuthService');
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        Hub.listen('auth', (data) => {
            const {payload} = data;
            onAuthEvent(payload);
        })

        return function cleanup() {
            logger.info("Removing HUB subscription to " + AuthService.CHANNEL);
            // Hub.remove(AuthService.CHANNEL, null);
        };

    });

    const onHubCapsule = (capsule) => {

    }

    function onAuthEvent(payload) {
        // ... your implementation
    }

    return <Header style={{position: 'fixed', zIndex: 1, width: '100%', backgroundColor: '#fff'}}>
        <Row gutter={16}>
            <Col span={6}>
                LOGO
            </Col>
            <Col span={8}>
                <SearchInputField/>
            </Col>
            <Col span={8}>
                <MyMenuTopMain/>
            </Col>
        </Row>
    </Header>
}

export default MyHeader;
