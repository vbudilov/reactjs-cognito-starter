import React from 'react';
import {Button, Col, Icon, Layout, Popover, Row} from 'antd';
import {SearchInputField} from "../search/search-input-field";
import {MyMenuTopMain} from "./menu-top-main";
import {Hub} from "@aws-amplify/core";
import {Link} from "react-router-dom";

const {Header} = Layout;

export class MyHeader extends React.Component {

    state = {
        loggedIn: false
    }

    constructor(props) {
        super(props);
        
        Hub.listen('auth', (data) => {
            const {payload} = data;
            this.onAuthEvent(payload);
            console.log('A new auth event has happened: ', data.payload.data.username + ' has ' + data.payload.event);
        })
    }

    onAuthEvent(payload) {
        // ... your implementation
    }

    // text = this.state.loggedIn && <span>youremail@email.com</span>;
    content = (
        <div>
            <p><Link to="settings"><Icon type="setting"/> Settings</Link></p>
            {this.state.loggedIn && <p><Link to="search"><Icon type="home"/> Log Out</Link></p>}
        </div>
    );

    render() {
        return (<Header style={{position: 'fixed', zIndex: 1, width: '100%', backgroundColor: '#fff'}}>
            <Row gutter={16}>
                <Col span={10}>
                    <MyMenuTopMain/>
                </Col>
                <Col span={12}>
                    <SearchInputField/>
                </Col>
                <Col span={2} xs={0} xl={2} justify="end">
                    <Popover placement="bottom" content={this.content} trigger="click">
                        {/*<Button><Avatar style={{backgroundColor: '#87d068'}} icon="user"/></Button>*/}
                        <Button type="primary" shape="circle" icon="user" size={"15"}/>
                    </Popover>
                </Col>
            </Row>
        </Header>)
    }
}
