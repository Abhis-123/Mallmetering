import React, { Component } from 'react'
import { Col } from "shards-react";
import SmallStats from "./SmallStats";
import GlobalContext from '../../state/GlobalContext';
import axios from'axios'


class CurrentUsage extends Component {
    static contextType = GlobalContext; 
    constructor(props) {
        super(props);
        this.state = {
            label: "Current Bill",
            value: 0,
            attrs: { md: "6", sm: "6" },
            styles:{
                backgroundColor: "rgba(227, 139, 218, 0.5)",
                Color: "rgba(0,0,0)"
            }
          }
    }

    componentDidMount(){
        const action=this.context
        const u=action('get',{key:"userName"})

        console.log("#######################")
        console.log(u)


        axios
        .get(axios.defaults.baseURL + "/customers/usage/"+u)
        .then(res => {
          this.setState({ value: (res.data['reading_value'])*5 });
          console.log("&&&&&&&&&&&&&&&&&&&&&&&&&")
          console.log(res.data['reading_value'])
        })
        .catch(err => {
          console.log(err);
        });
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

export default CurrentUsage
