import React from 'react';
import {Input} from 'antd';
import {Logger} from '@aws-amplify/core';
import {createBrowserHistory} from 'history';
import {withRouter} from 'react-router-dom'

const history = createBrowserHistory();
const {Search} = Input;

class SearchInputField extends React.Component {

    state = {
        query: "",
    };

    logger = new Logger("SearchInputField");

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.logger.info("this.props: " + JSON.stringify(this.props));
        // const { query } = this.props.match.params
        // this.logger.info("query: " + query)
    }

    kickoffSearch = async (query) => {
        this.logger.info("search query: " + query + " location: " + JSON.stringify(this.props));

        if (query === null || query.trim() === "")
            return;

        let location = {
            pathname: '/search',
            state: {fromDashboard: true}
        };

        this.props.history.push('/search?query=' + query)
        // history.push('/search?query=' + query)
        // window.location = '/search?query=' + query;
    };

    render() {
        let size = "350px";

        if (this.props.size != null)
            size = this.props.size;

        return (<div style={{width: size}}>

            <Search
                placeholder="search..."
                onSearch={value => this.kickoffSearch(value)}
                // onChange={value => this.searchOnTyping(value)}
                style={{
                    padding: "18px 0"
                }}
                enterButton
            />
        </div>)
    }
}

export default withRouter(SearchInputField)
