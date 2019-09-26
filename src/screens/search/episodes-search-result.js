import React from 'react';
import {SearchService} from "../../services/search-service";
import {Card} from "antd";

export class EpisodesSearchResult extends React.Component {

    searchService = new SearchService();

    state = {}


    componentWillMount() {
        this.setState({result: this.searchService.getEpisodes("something")})
    }

    render() {
        return (
            <div>
                {this.state.result.map
                (item => <Card loading title={item.title} style={{width: '34%'}}>
                    {item.description}
                    }
                </Card>)}
            </div>)
    }
}
