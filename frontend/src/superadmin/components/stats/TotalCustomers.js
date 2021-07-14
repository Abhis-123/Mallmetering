import axios from 'axios';
import React, { Component } from 'react'
import { Col } from "shards-react";
import SmallStats from "./SmallStats";
class TotalCustomers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: "Total Customers",
            value: this.props.value,
            attrs: { md: "6", sm: "6" },
            styles:{
                backgroundColor: "rgba(255, 164, 164, 0.3)",
                Color: "rgba(0,0,0)"
            }
          }
    }

    UNSAFE_componentWillMount() {
        axios.get('/superadmin/dashboard/?operation=statsdata&type=total_customers').then((response) => {
         this.setState({
                 value:response.data.total_customers
             })
         }).catch((error) => {
             console.log(error)
         })
 
     }
    render() {
        return (
            <Col className="col-lg mb-2" {...this.state.attrs} >
                    <SmallStats
                    href="customers"
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

export default TotalCustomers
