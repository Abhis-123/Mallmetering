import React, { Component } from 'react'
import { Col } from "shards-react";
import SmallStats from "./SmallStats";
import axios from 'axios'
class ActiveCustomers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: "Active Customers",
            value: this.props.value,
            attrs: { md: "6", sm: "6" },
            styles:{
                backgroundColor: "rgba(227, 139, 218, 0.5)",
                Color: "rgba(0,0,0)"
            }
          }
    }

    UNSAFE_componentWillMount() {
        axios.get('/superadmin/dashboard/?operation=statsdata&type=active_customers').then((response) => {
         this.setState({
                 value:response.data.active_customers
             })
         }).catch((error) => {
             console.log(error)
         })
 
     }

    render() {
        return (
            <Col className="col-lg mb-2" {...this.state.attrs}>
                    <SmallStats
                    href="customers/activecustomers"
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

export default ActiveCustomers
