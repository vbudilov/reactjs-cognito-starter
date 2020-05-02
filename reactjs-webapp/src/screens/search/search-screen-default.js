import React from 'react';
import {Icon, Tabs} from "antd";
import {EpisodesSearchResult} from "./episodes-search-result";
import {PodcastsSearchResult} from "./podcasts-search-result";

const TabPane = Tabs.TabPane;

export class SearchScreenDefault extends React.Component {

    render() {
        return (<div><Tabs defaultActiveKey="1">
            <TabPane tab={<span><Icon type="switcher"/>Episodes</span>} key="1">
                <EpisodesSearchResult/>
            </TabPane>
            <TabPane tab={<span><Icon type="bulb"/>Podcasts</span>} key="2">
                <PodcastsSearchResult/>
            </TabPane>
        </Tabs></div>)
    }
}
