import React from 'react';
import {AutoComplete, Input} from 'antd';
import {Logger} from '@aws-amplify/core';
import {SearchOutlined} from "@ant-design/icons";

const {Option, OptGroup} = AutoComplete;

export class SearchInputField extends React.Component {

    logger = new Logger("SearchInputField");
    dataSource = [
        {
            id: 'podcasts',
            title: 'Podcasts',
        },
        {
            id: 'episodes',
            title: 'Episodes',
        }
    ];

    state = {
        podcasts: {
            children: [
                {
                    title: 'Jordan Peterson',
                    description: "Great podcast about great topics",
                },
                {
                    title: 'Joe Rogan',
                    description: "Great podcast about great topics",
                },
            ],
        }, episodes: {
            children: [
                {
                    title: 'Episode #1',
                    description: "Great episode about great topics",
                },
                {
                    title: 'Episode #2',
                    description: "Great episode about great topics",
                },
            ],
        }
    };

    options = this.dataSource
        .map(group => (
            <OptGroup key={group.title} label={this.renderTitle(group.title)}>
                {this.state[group.id].children.map(opt => (
                    <Option key={opt.title} value={opt.title}>
                        {opt.title}
                        <div>
                            <span className="certain-search-item-count" style={{fontSize: 10}}> {opt.description}</span>
                        </div>
                    </Option>
                ))}
            </OptGroup>
        ))
        .concat([
            <Option disabled key="all" className="show-all">
                <a href="https://www.google.com/search?q=antd" target="_blank" rel="noopener noreferrer">
                    View all results
                </a>
            </Option>,
        ]);

    renderTitle(title) {
        return (
            <span>
      {title}
                <a
                    style={{float: 'right'}}
                    href="https://www.google.com/search?q=antd"
                    target="_blank"
                    rel="noopener noreferrer"
                >
        more
      </a>
    </span>
        );
    }

    kickoffSearch(query) {
        this.logger.debug("search query: " + query);

    }

    render() {
        return (<div>
            <div className="certain-category-search-wrapper" style={{width: "90%"}}>
                <AutoComplete
                    className="certain-category-search"
                    dropdownClassName="certain-category-search-dropdown"
                    dropdownMatchSelectWidth={true}
                    dropdownStyle={{width: 400}}
                    size="large"
                    style={{width: '100%'}}
                    dataSource={this.options}
                    placeholder="type here"
                    optionLabelProp="value"
                >
                    <Input suffix={<SearchOutlined className="certain-category-icon"/>}/>
                </AutoComplete>
            </div>
        </div>)
    }
}
