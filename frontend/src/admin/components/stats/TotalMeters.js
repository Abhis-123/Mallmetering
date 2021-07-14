import React, { Component } from 'react'
import { Col } from "shards-react";
import SmallStats from "./SmallStats";
import axios from 'axios'
class TotalMeters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //href:"/supervisor/listmeters",
            label: "Total Meters",
            value: 0,
            attrs: { md: "6", sm: "6" },
            styles:{
                backgroundColor: "rgba(253, 211, 155, 0.5)",
                Color: "rgba(0,0,0)"
            }
          }
          this.totalmeters = this.totalmeters.bind(this);
    }

    totalmeters(){
        axios
      .get(axios.defaults.baseURL + "/superadmin/meters/?operation=counts")
      .then(res => {
        this.setState({ value: res.data['all'] });
        console.log("&&&&&&&&&&&&&&&&&&&&&&&&&")
        console.log(res.data['totalmeters'])
      })
      .catch(err => {
        console.log(err);
      });
    }

    componentDidMount(){
        this.totalmeters()
    }


    render() {
        return (
            <Col className="col-lg mb-2" {...this.state.attrs}>
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

export default TotalMeters
