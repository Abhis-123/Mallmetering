import React, { Component } from 'react'
import { Col } from "shards-react";
import SmallStats from "./SmallStats";
import axios from 'axios'
class CurrentUsage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: "Total Consumption",
            value: this.props.value+"W",
            attrs: { md: "4", sm: "4" },
            styles:{
                backgroundColor: "rgba(184, 227, 140, 0.5)",
                Color: "rgba(0,0,0)"
            }
          }
    }
    UNSAFE_componentWillMount() {
        axios.get('/superadmin/dashboard/?operation=statsdata&type=total_consumption').then((response) => {
         this.setState({
                 value:response.data.total_consumption
             })
         }).catch((error) => {
             console.log(error)
         })
 
     }

    render() {
        var value = this.state.value
        if(value<=1000) {
            value =value +"W"
        }else if(value<100000&&value>1000){
                value = value/1000 + "KW"
        }
        

        return (
            <Col className="col-lg mb-2" {...this.state.attrs}>
                    <SmallStats
                    id={"small-stats-"+1}
                    variation="1"
                    label={this.state.label}
                    value={value}
                    styles={this.state.styles}
                    />
                </Col>
        )
    }
}

export default CurrentUsage 
