import React, { Component } from 'react'
import { Col } from "shards-react";
import SmallStats from "./SmallStats";
import axios from 'axios'
class CurrentUsage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: "Linked Meters",
            value: this.props.value,
            attrs: { md: "4", sm: "4" },
            styles:{
                backgroundColor: "rgba(0, 184, 216, 0.4)",
                Color: "rgba(0,0,0)"
            }
          }
    }
    UNSAFE_componentWillMount() {
        axios.get('/superadmin/dashboard/?operation=statsdata&type=linked_meters').then((response) => {
         this.setState({
                 value:response.data.linked_meters
             })
         }).catch((error) => {
             console.log(error)
         })
 
     }

    render() {
        return (
            <Col className="col-lg mb-2" {...this.state.attrs}>
                    <SmallStats
                    href="meters/linkedmeters"
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
