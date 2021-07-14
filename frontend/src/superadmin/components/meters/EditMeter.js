import axios from "axios";
import React, { Component } from "react";
import { Button, Container } from "react-bootstrap";
import GlobalContext from "../../state/GlobalContext";
import {Redirect} from "react-router-dom"
class EditMeter extends Component {
  static contextType = GlobalContext;
  constructor(props) {
    super(props);
    this.state = {
      message: {class:"info",message:"Edit Meter details"},
      meter_name: "",
      meter_url: "",
      working:false,
      id: ""
    };
    this.handleMeterNameChange = this.handleMeterNameChange.bind(this);
    this.hanleConnectionChange = this.hanleConnectionChange.bind(this);
    this.EditMeter = this.EditMeter.bind(this);
    this.DeleteConnection = this.DeleteConnection.bind(this);
    this.handleWorkingChange = this.handleWorkingChange.bind(this);
    this.componentWillMount= this.componentWillMount.bind(this);
  }
  
  componentWillMount() {
    const action =this.context
    const operation=action('get',{key:"operation"})
    var editmeterid
    if(operation.operation!=="editmeter"){
        this.setState({
          message:{
            class:"error__content",message:"Please select a meter"
          }
        })
    }
    else{
      editmeterid =operation.data.id
      axios.get(axios.defaults.baseURL+ "/superadmin/meters/?operation=get&id="+editmeterid)
      .then((response=>{
        console.log(response.data)
            this.setState({
              meter_name:response.data.meter_name,
              meter_url: response.data.meter_url,
              working: response.data.working,
              id:editmeterid

            })
      })).catch(error => {
        
        if(error.response!==undefined&&error.response.status===400){
          this.setState({
            message: {
              class:"error__content",message:error.response.data.message?error.response.data.message:"Something wrong happened while fetching meter data"
            }
          })
        }
        else if(error.response!==undefined&&error.response.status){
          this.setState({
            message:{
              class:"error__content",message:"Error occured while sending request"
            }
          })
        }else if(error.response===undefined){
              this.setState({
                message:{
                  class:"error__content",message:"Error occured while sending request"
                }
              })
        }
      })
    }
    
  }
  handleMeterNameChange(e) {
    e.preventDefault();
    this.setState({
      meter_name: e.target.value
    });
  }
  hanleConnectionChange(e) {
    e.preventDefault();
    this.setState({
      meter_url: e.target.value
    });
  }

  EditMeter(e) {
    e.preventDefault();

    if(this.state.meter_name.length<1){
      this.setState({
        message:{
          class:"error__content",message:"Meter name cannot be empty"
        }
      })
    }
    if(this.state.meter_url.length<1){
      this.setState({
        message:{
          class:"error__content",message:"Meter url cannot be empty"
        }
      })
    }
    
    axios.post(axios.defaults.baseURL+"/superadmin/meters/?operation=update",this.state)
          .then(response =>{
            window.alert("updated meter details")
            this.setState({
              edited:true
            })
          }).catch(error=>{

            if(error.response!==undefined&&error.response.status===400){
              this.setState({
                message: {
                  class:"error__content",message:error.response.data.message?error.response.data.message:" Please try with  different fields"
                }
              })
            }
            else if(error.response!==undefined&&error.response.status){
              this.setState({
                message:{
                  class:"error__content",message:"Error occured while sending request"
                }
              })
            }else if(error.response===undefined){
                  this.setState({
                    message:{
                      class:"error__content",message:"Error occured while sending request"
                    }
                  })
            }
        })
  }

  DeleteConnection(e) {
    e.preventDefault();
  }
  handleWorkingChange(e) {
    this.setState({
      working: e.target.checked
    });
  }

  render() {

    if(this.state.edited){
      return <Redirect to="/meters"/>
    }
    return (
      <Container fluid className="main-content-container  mt-3">

      <div className="card login-card">
        <div className="row no-gutters no-margin no-padding">
          <div className="">
            <div className="card-body">
            <p className={"login-card-description "+this.state.message.class}>{this.state.message.message}</p>
              <form action="#!">
                <div className="form-group mb-4">
                  <label htmlFor="metername" className="label">
                    Meter Name
                  </label>
                  <input
                    id="name"
                    name="metername"
                    type="name"
                    value={this.state.meter_name}
                    placeholder=" enter the name for meter"
                    onChange={this.handleMeterNameChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="connection" className="label">
                    Connection
                  </label>
                  <input
                    type="url"
                    name="connection"
                    id="connection"
                    value={this.state.meter_url}
                    onChange={this.hanleConnectionChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="Working" className="label">
                    Working
                  </label>
                  <input
                    type="checkbox"
                    name="Working"
                    id="Working"
                    checked={this.state.working}
                    onChange={this.handleWorkingChange}
                    className="col-7 mr-4"
                  />
                </div>
                <div className="form-group row">
                  <div className="col-6  ">
                    <Button  theme="primary" onClick={this.EditMeter}>
                      Edit
                    </Button>
                  </div>
                  <div className="col-6 ">
                    <Button theme="primary" className=" align-left" onClick={this.DeleteConnection}>
                      Delete
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      </Container>
    );
  }
}

export default EditMeter;
