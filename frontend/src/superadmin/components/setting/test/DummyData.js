//import { Container } from "@material-ui/core";
import React, { Component } from "react";
import {
  InputGroup,
  DatePicker,
  InputGroupAddon,
  InputGroupText,
} from "shards-react";
import { Container } from 'react-bootstrap';
import axios from "axios";
import Select from 'react-select';
class ArchiveData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message:{class:"info",message:" Generate Dummy data for meter"},
      start_date: undefined,
      end_date: undefined,
      meter_id:undefined,
      customername:"",
      data:[],
      meters:[]
    };

    this.handlestart_dateChange = this.handlestart_dateChange.bind(this);
    this.handleend_dateChange = this.handleend_dateChange.bind(this);
    this.handleMeterChange= this.handleMeterChange.bind(this);
    this.createdummydata= this.createdummydata.bind(this);
}

  handlestart_dateChange(value) {
    this.setState({
      ...this.state,
      ...{ start_date: new Date(value) }
    });
  }
  //Date format
   handleDate = (dataD) => {
    let data= new Date(dataD)
    let month = data.getMonth() + 1
    let day = data.getDate()
    let year = data.getFullYear()
    if(day<=9)
      day = '0' + day
    if(month<10)
      month = '0' + month
    const postDate = year + '-' + month + '-' + day
    
    return postDate
  }
  handleend_dateChange(value) {
    this.setState({
      ...this.state,
      ...{ end_date: new Date(value) }
    });
  }



  handleMeterChange(e){
    this.setState({
      meter_id: e.value
    })
}

componentDidMount() {
  axios.get(axios.defaults.baseURL+"/superadmin/meters/?operation=get")
        .then(response =>{
          console.log(response.data)
            var meters=[]
            response.data.map(meter =>{
              meters.push(
                {
                  label:meter.meter_name, value:meter.id
                }
              )
            
              return false;
            })

              this.setState({
                meters: meters
              })
        })
}

  createdummydata(e){
      e.preventDefault()
     axios.post(axios.defaults.baseURL+"/superadmin/meters/?operation=insertdummy",
                {
                    meter_id:this.state.meter_id,
                    start_date:this.handleDate(this.state.start_date),
                    end_date:this.handleDate(this.state.end_date)
                })
          .then(response =>{
             this.setState({
               data:response.data,
               message: {class:"success",message:" Data Generated successfully"}

             }) 
          }).catch(err =>{

            if(err.response){
              this.setState({
                message: {class:"error__content",message:"Error occured while generating data"}
              })
            }else if(err){
                this.setState({
                  message: {class:"error__content",message:" Couldn't make request please try again"}
                })
            }
          }) 
  }

  render() {
      console.log(this.handleDate(this.state.start_date))
    return (
      <Container fluid className="main-content-container  mt-3">
    <div className="card login-card">
          <div className="row no-gutters">
            <div className="">
              <div className="card-body">
              <div className="row bg-white text-center">
              <p className={"login-card-description "+this.state.message.class}>{this.state.message.message}</p>
               </div>
            <div className="row">
              <div className="col-4 ">
                <h5 className="text center"> Enter Duration </h5>
              </div>
              <div className="col-8">
                <InputGroup>
                  <DatePicker
                    size="sm"
                    selected={this.state.start_date}
                    onChange={this.handlestart_dateChange}
                    placeholderText="From"
                    dropdownMode="select"
                    className="text-center"
                  />
                  <DatePicker
                    size="sm"
                    selected={this.state.end_date}
                    onChange={this.handleend_dateChange}
                    placeholderText="To"
                    dropdownMode="select"
                    className="text-center"
                  />
                  <InputGroupAddon type="append">
                    <InputGroupText
                      style={{
                        height: "100%"
                      }}
                    >
                      <i className="material-icons">&#xE916;</i>
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </div>
            </div>
            <div>
              <div className="row">                 
                <div className="row">
                  <div className="col-4">
                    <h5 className="text center">Meter</h5>
                  </div>
                  <div className="col-3 ml-2 p-4">
                   <Select options={this.state.meters} onChange={this.handleMeterChange} />

                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-4 ">
                  </div>
                  <div className="col-5">
                        <button type="button" className="btn btn-primary" onClick={this.createdummydata}>Create Dummy Data</button>
                  </div>
                </div>
              </div>
            </div>
              </div>
            </div>
          </div>
        </div>
        </Container>
    );
  }
}

export default ArchiveData;
