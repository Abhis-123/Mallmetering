import React, { Component } from 'react'
import { Col } from "shards-react";
import SmallStats from "./SmallStats";
import axios from 'axios'
class ActiveCustomers extends Component {
    constructor(props) {
        super(props);
        this.state = {
           // href:"/supervisor/activecustomers",
            label: "Active Customers",
            value: "",
            attrs: { md: "6", sm: "6" },
            styles:{
                backgroundColor: "rgba(227, 139, 218, 0.5)",
                Color: "rgba(0,0,0)"
            }
          }
          this.activecust = this.activecust.bind(this);
    }

    activecust(){
        axios
      .get(axios.defaults.baseURL + "/superadmin/customers/?operation=count")
      .then(res => {
        this.setState({ value: res.data['activecustomers'] });
        console.log("&&&&&&&&&&&&&&&&&&&&&&&&&")
        console.log(res.data['activecustomers'])
      })
      .catch(err => {
        console.log(err);
      });
    }

    componentDidMount(){
        this.activecust()
    }


    render() {
        return (
            <Col className="col-lg mb-2"  {...this.state.attrs}>
                    <SmallStats
                    id={"small-stats-"+1}
                    variation="1"
                    label={this.state.label}
                    value={this.state.value}
                    styles={this.state.styles}
                    //href={this.state.href}

                    />
                </Col>
        )
    }
}

export default ActiveCustomers
