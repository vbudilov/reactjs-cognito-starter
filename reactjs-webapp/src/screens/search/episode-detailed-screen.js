import React from 'react';
import {Icon, Rate, Row} from "antd";

export class EpisodeDetailedScreen extends React.Component {


    render() {
        return (<div>
            <div style={{width: "100%", margin: "20px", padding: "20px"}}>
                <Row>
                    Joe Rogan: The best non-political political podcast ever
                </Row>
                <Row>
                    This episode is all about you and only you. Yes really. You will never hear anything about anyone
                    else, but you.
                </Row>
                <Row>
                    Rate Me: <Rate character={<Icon type="heart"/>} allowHalf/>
                </Row>
            </div>
        </div>)
    }
}
