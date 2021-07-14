import React, { Component } from 'react'
import ActiveCustomers  from "./ActiveCustomers"
import TotalCustomers from "./TotalCustomers"
import CurrentUsage from "./CurrentUsage"
import TotalMeters from "./TotalMeters"
import LinkedMeters from "./LinkedMeters"
import axios from 'axios'
class UserStats extends Component {
    constructor(props) {
        super(props)
        this.state = {
           total_customers:0,
           active_customers:0,
           total_meters:0,
           linked_meters:0,
           current_usage:0, 
        }
    }
   

    UNSAFE_componentWillMount() {
       axios.get('/superadmin/dashboard/?operation=statsdata').then((response) => {
        console.log(response.data)    
        this.setState({
                total_customers:response.data.total_customers,
                active_customers:response.data.active_customers,
                total_meters:response.data.total_meters,
                linked_meters:response.data.linked_meters,
                current_usage:response.data.current_usage
            })
        }).catch((error) => {
            console.log(error)
        })

    }

    render() {  
        console.log(this.state.total_customers)      
        return (
              <>
              <TotalCustomers value={this.state.total_customers}/>
              <ActiveCustomers value={this.state.active_customers}/>
              <CurrentUsage value={this.state.current_usage}/>
              <TotalMeters  value={this.state.total_meters}/>
              <LinkedMeters value={this.state.linked_meters}/>
              </>
            )
    }
}

export default UserStats
