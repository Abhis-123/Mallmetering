import React, { Component } from 'react'
import { Col } from "shards-react";
import SmallStats from "./SmallStats";
import axios from 'axios'
class TotalCustomers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //href:"/supervisor/listcustomers",
            label: "Total Customers",
            value: 0,
            attrs: { md: "6", sm: "6" },
            styles:{
                backgroundColor: "rgba(255, 164, 164, 0.3)",
                Color: "rgba(0,0,0)"
            }
          }

          this.totalcust = this.totalcust.bind(this);
    }

    totalcust(){
        axios
      .get(axios.defaults.baseURL + "/superadmin/customers/?operation=count")
      .then(res => {
        this.setState({ value: res.data['totalcustomers'] });
        console.log("&&&&&&&&&&&&&&&&&&&&&&&&&")
        console.log(res.data['totalcustomers'])
      })
      .catch(err => {
        console.log(err);
      });
    }

    componentDidMount(){
        this.totalcust()
    }

    

    render() {
        return (
            <Col className="col-lg mb-2"  {...this.state.attrs} >
                    <SmallStats
                    id={"small-stats-"+1}
                    variation="1"
                    label={this.state.label}
                    value={this.state.value}
                    styles={this.state.styles}
                   // href={this.state.href}
                    />
                </Col>
        )
    }
}

export default TotalCustomers
