import React from 'react';
import {Button, Col, Icon, Popover} from "antd";
import {Link} from "react-router-dom";
import {Hub} from "@aws-amplify/core";

export class MyAvatar extends React.Component {
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
            {this.state.loggedIn &&  <div><p><Link to="settings"><Icon type="setting"/> Settings</Link></p>
                <p><Link to="logout"><Icon type="home"/> Log Out</Link></p></div>}
            {!this.state.loggedIn &&  <div>
                <p><Link to="login"><Icon type="home"/> Log In</Link></p></div>}
        </div>
    );

    render() {
        return (
            <div>
                <Popover placement="bottom" content={this.content} trigger="click">
                    {/*<Button><Avatar style={{backgroundColor: '#87d068'}} icon="user"/></Button>*/}
                    <Button type="primary" shape="circle" icon="user" size={"15"}/>
                </Popover>
            </div>
        );
    }
}
