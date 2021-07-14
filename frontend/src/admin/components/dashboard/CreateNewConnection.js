import axios from 'axios';
import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
class CreateNewConnection extends Component {
        constructor(props) {
            super(props);
            this.state = {
                message:"Link a customer to meter",
                meter_name:"",
                meter_connections:"",
            }
            this.handleMeterNameChange= this.handleMeterNameChange.bind(this);
            this.hanleConnectionChange= this.hanleConnectionChange.bind(this);
            this.CreateNewConnection= this.CreateNewConnection.bind(this);
        }


        handleMeterNameChange(e){
            e.preventDefault();
            this.setState({
                meter_name:e.target.value
            })
        }
        hanleConnectionChange(e){
            e.preventDefault();
            this.setState({
                meter_connections:e.target.value
            })
        }

        CreateNewConnection(e){
            e.preventDefault();
            axios.post(axios.defaults.baseURL+"/meters/registernewmeter/",this.state).then(response => (
                            window.alert("add new connection  name" + this.state.meter_name + " connection "+ this.state.meter_connections
                            
                            + " please refresh the table to see to the connection")
            )

            ).catch(err =>(
              console.log(err.response)
            ))


            this.setState({
              meter_name:"",
              meter_connections:""
            })
          }
    
        render() {
        return (
          <div className="w-100 p-4">
              <div className="card login-card mt-4">
                <div className="row no-gutters">
                  <div className="">
                    <div className="card-body">
                      <p className="login-card-description">{this.state.message}</p>
                      <form action="#!">
                        <div className="form-group mb-4">
                          <label htmlFor="metername" className="label">Meter Name</label>
                          <input  id="name" name="metername" type="name" value={this.state.meter_name} placeholder=" enter the name for meter" onChange={this.handleMeterNameChange} className="form-control" />
                        </div>
                        <div className="form-group mb-4">
                          <label htmlFor="connection" className="label">Connection</label>
                          <input type="url" name="connection" id="connection" value={this.state.meter_connections} onChange={this.hanleConnectionChange} className="form-control" />
                        </div>
                        
                        <Button theme="primary" onClick={this.CreateNewConnection}>Add</Button>
                      </form>
                     
                      <nav className="login-card-footer-nav">
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
              </div>
        )
    }
}

export default CreateNewConnection
