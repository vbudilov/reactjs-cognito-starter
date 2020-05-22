import React from 'react';
import {Icon, Tabs} from "antd";
import {EpisodesSearchResult} from "./secure-home/episodes-search-result";
import {PodcastsSearchResult} from "./secure-home/podcasts-search-result";

const TabPane = Tabs.TabPane;

export class BrowseScreen extends React.Component {
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
