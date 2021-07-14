import React from "react";
import GlobalContext from "../../state/GlobalContext";
// import axios from "axios"
import { Container, Row, Col } from "shards-react";
import {  CardHeader} from "shards-react";
import axios from "axios";
import Save from "@material-ui/icons/Save";
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import MUIDataTable from "mui-datatables";

import {
  
  DropdownMenu,
  
  Collapse,
  
} from "shards-react";







class ListConnections extends React.Component {
  static contextType = GlobalContext;

  constructor(props) {
    super(props);
    this.state = {
      updted: "",
      selecteduser:"",
      initial_meter:"",
      meter_data:[],
      visible: false,
      columns: [
        {
          name:"CustomerName",
          label:"Customer Name", options:{ filter:true, sort:true}
        },
        {
          name:"MeterName",
          label:"Meter Name", options:{ filter:true, sort:true}

        },
        {
          name:"Edit",
          options:{ filter:false, sort:false}

        }

    ],
     
      mode: "normal",
      row: {},
      styles:{
        backgroundColor: "#dbd9d9"
        
    },
    gridApi:"",
    data:[],
    columnDefs: [  
      { headerName: "Customer", field: "username", sortable: true, filter: true,floatingFilter:true,flex:1},  
      { headerName: "Meter Name", field: "meter_name", sortable: true, filter: true,floatingFilter:true,flex:1,editable:true}, 
      { headerName: "Save",  cellRendererFramework:(params)=><div onClick={()=>(this.savedata(params.data.username,params.data.meter_name))}>
      <Save/>
        </div>,width:100}, 
      
  ],  
    };

    this.fetchdata = this.fetchdata.bind(this);
    this.savedata=this.savedata.bind(this);
    this.toggleUserActions=this.toggleUserActions.bind(this);
    this.handleChange=this.handleChange.bind(this);


    
  }


  handleChange(e){
    this.setState({a:e.username, b:e.meter_name})
   }


  toggleUserActions(u,metername) {
    this.setState({
      visible: !this.state.visible,
      selecteduser: u,
      initial_meter:metername

    });
  }



  fetchdata() {
    console.log(axios.defaults.baseURL);
    axios
      .get(axios.defaults.baseURL + "/superadmin/meters/?operation=getfilter")
      .then(res => {
        this.setState({ meter_data: res.data });
        this.setState({
          meter_data: this.state.meter_data.concat({"meter_name":"Not Selected"})
        })
        console.log("&&&&&&&&&&&&&&&&&&&&&&&&&")
        console.log(res.data.meter_name)
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {

    
    this.fetchdata()

    axios
    .get(axios.defaults.baseURL + "/supervisor/listconnections/")
    .then(res => {
       let data= []
        res.data.map(row => {
          
          data.push({
            CustomerName:row.username,
            MeterName:row.meter_name,
            Edit : () =><div onClick={()=>(this.toggleUserActions(row.username,row.meter_name))}>
              <ArrowDropDownCircleIcon/>
              {row.username===this.state.selecteduser?<Collapse tag={DropdownMenu} right small open={this.state.visible}>
                    {this.state.meter_data.map(key=>(
                      
                        <div onClick={(params)=>(this.savedata(this.state.selecteduser,key.meter_name,this.state.initial_meter))} style={{
                          fontSize: 15,
                          padding:10,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          border: '1px solid rgba(0, 0, 0, 1)'
                        }}>
                          {key.meter_name}
                        </div>
                        
                    ))}
                    
         
        </Collapse>:
        <Collapse tag={DropdownMenu} right small open={false}>
        {this.state.meter_data.map(key=>(
          
            <div onClick={(params)=>(this.savedata(this.state.selecteduser,key.meter_name,this.state.initial_meter))} style={{fontSize: 14}}>
              {key.meter_name}
            </div>

          
        ))}

</Collapse>}
              
              
            </div> ,
           

          })
          return row
        })
        this.setState({ 
          data:data
        })
    })
    .catch(err => {
      console.log(err);
    });

  
  }

 savedata(username1,metername1,metername){

  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  console.log(username1)
  console.log(metername1)
  console.log(metername)

  axios.post(axios.defaults.baseURL+"/supervisor/update_connection/"+username1+"/",{"meter_name":metername1,"initial_meter":metername})
  .then(response =>{
    if(response.status===200){
      if(response.status===200){
      }
      window.alert("update success!");
      window.location.reload();
    }
  })


 }
  

 
  render() {
    


   




    return (
      <Container
        fluid
        className="main-content-container  px-4"
        style={{
          height: "75vh"
        }}
      >
        <Row>
          <Col>
            
              <CardHeader className="border-bottom" style={this.state.styles} >
                <Row>
                  <Col lg={4}>
                    <h4 className="m-0">List of Connections</h4>
                  </Col>
                  <Col>
                 </Col>
                  <Col>
                  </Col>
                 
                </Row>
              </CardHeader>
              <MUIDataTable
                     
                      data={this.state.data}
                      columns={this.state.columns}
                      //options={this.state.options}
                    /> 
              
            
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ListConnections;

