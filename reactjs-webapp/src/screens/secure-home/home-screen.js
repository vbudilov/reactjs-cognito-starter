import React, {useEffect} from 'react';
import {Tabs} from "antd";
import {useHistory} from 'react-router-dom';

import {OrderedListOutlined} from "@ant-design/icons";
import {Auth} from "aws-amplify";
import {Logger} from "@aws-amplify/core";

const TabPane = Tabs.TabPane;

export function HomeScreen() {
    const logger = new Logger("HomeScreen");

    const history = useHistory();

    useEffect(() => {
        Auth.currentAuthenticatedUser({
            bypassCache: true  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
        }).then(user => {
            if (!user)
                history.push("/login")
            else
                logger.log("User is logged-in");
        }).catch(err => {
                logger.log("Couldn't get the logged-in user for some reason: " + err);
            }
        );
    })

    return <div><Tabs defaultActiveKey="1">
        <TabPane tab={<span><OrderedListOutlined/>Games</span>} key="2">
            <div>Games</div>
        </TabPane>
        <TabPane tab={<span><OrderedListOutlined/>Stats</span>} key="3">
            <div>Stats</div>
        </TabPane>
    </Tabs>
    </div>
}
