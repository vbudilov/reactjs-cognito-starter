import React from 'react';
import {Icon, Row, Tabs} from "antd";
import {EpisodesSearchResult} from "./episodes-search-result";
import {PodcastsSearchResult} from "./podcasts-search-result";

const TabPane = Tabs.TabPane;

export class SearchScreenDefault extends React.Component {

    render() {
        return (<div><Tabs defaultActiveKey="2">
            <TabPane tab={<span><Icon type="apple"/>Episodes</span>} key="1">
                <EpisodesSearchResult/>
                test
            </TabPane>
            <TabPane tab={<span><Icon type="android"/>Podcasts</span>} key="2">
                <PodcastsSearchResult/>
            </TabPane>
        </Tabs></div>)
    }
}
