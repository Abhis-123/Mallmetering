import React, { Component } from 'react'
import { Col } from "shards-react";
import SmallStats from "./SmallStats";
class CurrentUsage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: "Tarrif Plan",
            value: "S3 ",
            attrs: { md: "6", sm: "6" },
            styles:{
                backgroundColor: "rgba(253, 211, 155, 0.5)",
                Color: "rgba(0,0,0)"
            }
          }
    }


    render() {
        return (
            <Col className="col-lg mb-4" {...this.state.attrs}>
                    <SmallStats
                    id={"small-stats-"+1}
                    variation="1"
                    label={this.state.label}
                    value={this.state.value}
                    styles={this.state.styles}
                    />
                </Col>
        )
    }
}

export default CurrentUsage
