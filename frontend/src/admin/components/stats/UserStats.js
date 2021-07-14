import React, { Component } from 'react'
import ActiveCustomers  from "./ActiveCustomers"
import TotalCustomers from "./TotalCustomers"
import TotalMeters from "./TotalMeters"
import LinkedMeters from "./LinkedMeters"
class UserStats extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
   

    render() {        
        return (
              <>
              <TotalCustomers/>
              <ActiveCustomers/>
              <TotalMeters />
              <LinkedMeters/>
              </>
            )
    }
}

export default UserStats
