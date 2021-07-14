import React, { Component } from 'react'
import CurrentUsage from './CurrentUsage';
import Tarrif from "./Tarrif";
import CurrentBill from "./CurrentBill"
import Threshold from "./Threshold"
class UserStats extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'Seirra Brooks',
            statsdata:[
                {
                  label: "Your usage today",
                  value: "2.5KW",
                  attrs: { md: "6", sm: "6" },
                  styles:{
                    backgroundColor: "rgba(0, 184, 216, 0.4)",
                    Color: "rgba(0,0,0)"
                  }
                },
                {
                  label: "Bill today",
                  value: "182.00",
                
                  attrs: { md: "6", sm: "6" },
                  styles:{
                    backgroundColor: "rgba(227, 139, 218, 0.5)",
                  }
                },
                {
                  label: "Your Tarrif",
                  value: "8,147",
                  attrs: { md: "4", sm: "6" },
                  styles:{
                    backgroundColor: "rgba(253, 211, 155, 0.5)",
                  },
                 
                },
                {
                  label: "Threshold",
                  value: "29",
               
                  attrs: { md: "4", sm: "6" },
                  styles:{
                    backgroundColor: "rgba(184, 227, 140, 0.5)",
                  },
                }
              ]
        }
    }
   

    render() {        
        return (
              <>
                <CurrentUsage/>  
                <CurrentBill/>
                <Tarrif/>
                <Threshold />
              </>
            )
    }
}

export default UserStats
