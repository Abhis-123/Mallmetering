import axios from 'axios';
import React, { Component } from 'react'
import { Col } from "shards-react";
import SmallStats from "./SmallStats";
class TotalMeters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: "Total Meters",
            value: this.props.value,
            attrs: { md: "4", sm: "4" },
            styles:{
                backgroundColor: "rgba(253, 211, 155, 0.5)",
                Color: "rgba(0,0,0)"
            }
          }
    }
    UNSAFE_componentWillMount() {
        axios.get('/superadmin/dashboard/?operation=statsdata&type=total_meters').then((response) => {
         this.setState({
                 value:response.data.total_meters
             })
         }).catch((error) => {
             console.log(error)
         })
 
     }

    render() {
        return (
            <Col className="col-lg mb-2" {...this.state.attrs}>
                    <SmallStats
                    href="meters"
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

export default TotalMeters
