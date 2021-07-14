import React from "react";
import GlobalContext from "../../state/GlobalContext";
import { Container, Row, Col } from "shards-react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Check from '@material-ui/icons/CheckCircle'
import Cancel from '@material-ui/icons/Cancel'
// import DefaultImage from '../../assets/images/0.jpg'


import View from '@material-ui/icons/Visibility';
import MUIDataTable from "mui-datatables";
import CustomToolbar from "./CustomToolbar.js"
class ActiveCustomers extends React.Component {
  static contextType = GlobalContext;
  constructor(props) {
    super(props);
    this.state = {
      updated:"",
      columns: [{
        name: "profile_pic",
        label: "Profile",
      },
          {
            name:"email",
            label:"Email", options:{ filter:true, sort:true}
          },
          {
            name:"username",
            label:"Name", options:{ filter:true, sort:true}

          },
          {
            name: "mobile_no",
            label:"Mobile Number", options:{ filter:true, sort:true}
          },{
            name:"linked_meter", label:"Linked Meter"

          },
          {
              name:'status', label:'Status'
          },
          {
            name:"view",
            lable:"view",
            options:{ filter:false, sort:false}
          },
            {
              name:"edit",
              label:"Edit", options:{ filter:false, sort:false}
            }
            ,
            {
              name:"delete",
              label:"Delete", options:{ filter:false, sort:false}
            }
      ],
      data: [],
      mode: "normal",
      row :{},
      options:{

        selectableRowsHideCheckboxes: true,
        responsive: 'horizontal',
        customToolbar: () => {
          return (
            <CustomToolbar />
          );
        }
      },
      styles:{
        backgroundColor: "#dbbd9d9",
        
    }
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.EditCustomer= this.EditCustomer.bind(this);
    this.delete= this.delete.bind(this);
    this.fetchCustomers= this.fetchCustomers.bind(this);
  }
  
  delete(id) {
    axios.delete(axios.defaults.baseURL +"/superadmin/customers/?operation=delete&id=" + id).then(res => {
      if (res.status===200 || res.status===204){
        window.alert("deleted customer");
      }
    }).catch(err => {
      console.log(err);
    })
    this.setState({
      updated:id,
    })
}




  fetchCustomers() {
    axios
    .get(axios.defaults.baseURL + "/superadmin/customers/?operation=get")
    .then(res => {
       let data= []
        res.data.map(row => {
          if (row.status){
          data.push({
            email:row.email,
            username:row.username,
            profile_pic:() => <div> <img  style={{height:"30px"}} className="profile circle" src={axios.defaults.baseURL+row.profile_pic} alt="profile"/>  </div>,
            mobile_no:row.mobile_no,
            linked_meter:row.linked_meter,
            status: () =><div style={{cursor:"pointer"}} onClick={ ()=>(this.updateStatus(row))}>{row.status ===true ?<Check style={{ color: "green" }}/>:<Cancel style={{ color: "red" }}/>}</div>,
            view : () =><div style={{cursor:"pointer"}}><View/></div> ,
            edit : () => <div style={{cursor:"pointer"}} onClick={()=>(this.EditCustomer(row))}> <Edit/></div>,
            delete :() => <div style={{cursor:"pointer"}} onClick={()=>(this.delete(row.id))}>
            <Delete/>
           </div>

          })
        }
        
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

  componentDidMount() {
      this.fetchCustomers()
  
  }
  /**
   * 
   * @param {*} row 
   * @returns redirect to /editcustomer
   */
  EditCustomer(row) {
    const action = this.context
    this.setState({
      mode:"editcustomer", 
      row:row
    },() => {
      action("set",{key:"operation",value:{
        operation:"editcustomer",
        data:row
      }})
    })

  }

  updateStatus(row) {
    var row2 =row
    row2.status=!row.status
    axios.post(axios.defaults.baseURL+"/superadmin/customers/?operation=updatestatus&id="+row.id).then(response =>{
      this.fetchCustomers()
    }).catch(error =>{
      console.log(error.response)
    })


  }
  render() {
    
    if(this.state.mode==="editcustomer"){
      return (
        <Redirect to="/editcustomer" />
      )
      }

    return (
      <Container fluid className="main-content-container px-4 mt-4">
            {/* Default Light Table */}
            <Row>
              <Col>
            
                  <MUIDataTable
                      title="Customers List"
                      data={this.state.data}
                      columns={this.state.columns}
                      options={this.state.options}
                    />

           
              </Col>
            </Row>
          </Container>
    );
  }
}

export default ActiveCustomers;
