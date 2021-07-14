//import { Container } from "@material-ui/core";
import React, { Component } from "react";
import {
  InputGroup,
  DatePicker,
  InputGroupAddon,
  InputGroupText,
} from "shards-react";
import Select from 'react-select';
import { Container } from 'react-bootstrap';
import axios from "axios";

import {CSVLink} from 'react-csv'
class ArchiveData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message:{class:'info',message:"Enter Details"},
      startDate: undefined,
      endDate: undefined,
      format: "csv",
      customername:"",
      delete:false,
      id:'',
      meters:[],
      data:[]
    };

    this.csvRef= React.createRef();

      this.headers=[
        {label:"id",key:"id"},
        {label:"reading_value",key:"reading_value"}
        ,{label:"time_stamp",key:"time_stamp"}
        ,{label:"meter_id",key:"meter_id"}
      ];
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.radioChange = this.radioChange.bind(this);
    this.handleCustomerNameChange= this.handleCustomerNameChange.bind(this);
    this.handleDeleteChange= this.handleDeleteChange.bind(this);
    this.handleMeterIdChange= this.handleMeterIdChange.bind(this);
    this.download=this.download.bind(this);
    this.downloadFile= this.downloadFile.bind(this);
    this.dowenloadCSV= this.dowenloadCSV.bind(this);
    this.fetch= this.fetch.bind(this);
  }

  handleStartDateChange(value) {
    this.setState({
      ...this.state,
      ...{ startDate: new Date(value) }
    });
  }

  handleDeleteChange(e){
    this.setState({
      delete:e.target.checked
    })
  }

  handleEndDateChange(value) {
    this.setState({
      ...this.state,
      ...{ endDate: new Date(value) }
    });
  }

  radioChange(e) {
    this.setState({
      format: e.currentTarget.value
    });
  }
  handleCustomerNameChange(e){
      e.preventDefault();
      this.setState({
          customername:e.target.value
      })
  }


  handleMeterIdChange(e){
          this.setState({
            id: e.value
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
        }).catch(error=>{
      
          if(error.response){
            
            if(error.response.status===400){
              var message =error.response.data['message']
                this.setState({
                  message:{class:"error__content",message:message}
                })
            }
          }else if (error.request){
            this.setState({
              message:{class:"error__content",message:"server didn't resonded "}
            })
          }else{
            this.setState({
              class:"error__content",message:"check your internet connection"
            })
          }
        })
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

  
  dowenloadCSV =async()=>{
    const data = await this.fetch()
    // this.setState({
    //   message:{class:"info",message:" doweloding csv"}
    // },()=>{
    //   setTimeout(()=>{
    //     this.csvRef.current.link.click()
    //   })
    // })
      console.log(this.state.data)
      console.log(data)
    this.csvRef.current.link.click()
   
    
  }

  downloadFile = async () => {
    const myData = this.state.data; 
    console.log(myData)
    const fileName = "readings";
    const json = JSON.stringify(myData);
    const blob = new Blob([json],{type:'application/json'});
    const href = await URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }


fetch(){
      axios.post(axios.defaults.baseURL+"/superadmin/config/?operation=archivedata",{
        meter_id:this.state.id,
        start_date:this.handleDate(this.state.startDate),
        end_date:this.handleDate(this.state.endDate),
        delete:this.state.delete
    }).then(response =>{
        const data = response.data
        this.setState({
          data: data,
        })
  }).catch(err =>{
    this.setState({
      message:{class:"error__content",message:'Error occured while processing request'}
    })
  })

}


download(e){
  e.preventDefault();
  if(this.state.format==="json"){
    this.downloadFile()
  }else if(this.state.format==='csv'){
    this.dowenloadCSV()
  }

}

  render() {
    console.log({
      meter_id:this.state.id,
      start_date:this.handleDate(this.state.startDate),
      end_date:this.handleDate(this.state.endDate),
      delete:this.state.delete
})
    return (
      <Container fluid className="main-content-container  mt-3 mb-0">
    <div className="card ">
      
          <div className="row no-gutters">
            <div className="">
              <div className="card-body">
              <div className="row bg-white text-center">
                  <h5>{this.state.message.message}</h5>
               </div>
            <div className="row">
              <div className="col-4 ">
                <h5 className="text center"> Enter Duration </h5>
              </div>
              <div className="col-8">
                <InputGroup>
                  <DatePicker
                    size="sm"
                    selected={this.state.startDate}
                    onChange={this.handleStartDateChange}
                    placeholderText="From"
                    dropdownMode="select"
                    className="text-center"
                  />
                  <DatePicker
                    size="sm"
                    selected={this.state.endDate}
                    onChange={this.handleEndDateChange}
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
                <div className="col-4 ">
                  <h5 className="text center"> Format </h5>
                </div>
                <div className="col-8">
                  <div className="row ">
                    <div className="col-3">
                      <input
                        type="radio"
                        value="csv"
                        checked={this.state.format === "csv"}
                        onChange={this.radioChange}
                      />
                      CSV
                    </div>
                    <div className="col-3">
                      <input
                        type="radio"
                        value="json"
                        checked={this.state.format === "json"}
                        onChange={this.radioChange}
                      />
                      JSON
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <h5 className="text center">Delete From Database</h5>
                  </div>
                  <div className="col-lg-3 col-sm-6 ml-2">
                      <input
                        type="checkbox"
                        name="delete"
                        id="delete"
                        checked={this.state.delete}
                        onChange={this.handleDeleteChange}
                        className="col-7 mr-4"
                      />
                      {/* <FormInput className="ml-2" value={this.state.customername} onChange={this.handleCustomerNameChange} placeholder="username" /> */}
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-4">
                    <h5 className="text center">Select Meter</h5>
                  </div>
                  <div className="col-lg-3 col-sm-6 ml-2">
                      <Select options={this.state.meters} onChange={this.handleMeterIdChange} />
                      {/* <FormInput className="ml-2" value={this.state.customername} onChange={this.handleCustomerNameChange} placeholder="username" /> */}
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-4 ">
                  </div>
                  <div className="col-5">
                        <button type="button" className="btn btn-primary" onClick={this.download}>download</button>
                  </div>
                  <div>
                    <CSVLink
                    headers={this.headers}
                    data={this.state.data}
                    fileName="meter-reading.csv"
                    ref={this.csvRef}
                    />
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
