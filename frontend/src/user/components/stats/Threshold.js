import React, { Component } from 'react'
import { Col } from "shards-react";
import SmallStats from "./SmallStats";
class Threshold extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: "Threshold",
            value: "2.5KW",
            attrs: { md: "6", sm: "6" },
            styles:{
                backgroundColor: "rgba(184, 227, 140, 0.5)",
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

export default Threshold
