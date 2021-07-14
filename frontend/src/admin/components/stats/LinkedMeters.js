import React, { Component } from 'react'
import { Col } from "shards-react";
import SmallStats from "./SmallStats";
import axios from 'axios'
class CurrentUsage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //href:"/supervisor/linkedmeters",
            label: "Linked Meters",
            value: 0,
            attrs: { md: "6", sm: "6" },
            styles:{
                backgroundColor: "rgba(0, 184, 216, 0.4)",
                Color: "rgba(0,0,0)"
            }
          }
          this.linkedmeters = this.linkedmeters.bind(this);
    }

linkedmeters(){
        axios
      .get(axios.defaults.baseURL + "/superadmin/meters/?operation=counts")
      .then(res => {
        this.setState({ value: res.data['linked'] });
        console.log("&&&&&&&&&&&&&&&&&&&&&&&&&")
        console.log(res.data['linked'])
      })
      .catch(err => {
        console.log(err);
      });
    }

    componentDidMount(){
        this.linkedmeters()
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
                    //href={this.state.href}

                    />
                </Col>
        )
    }
}

export default CurrentUsage
