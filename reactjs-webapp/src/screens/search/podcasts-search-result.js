import React from 'react';
import {Card} from "antd";
import {SearchService} from "../../services/search-service";

export class PodcastsSearchResult extends React.Component {
    searchService = new SearchService();

    render() {
        return (<div>
            <Card loading title="Card title" style={{width: '34%'}}>
                Whatever content
            </Card>
        </div>)
    }
}
