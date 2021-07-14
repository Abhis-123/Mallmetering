import React from "react";
import GlobalContext from "../../state/GlobalContext";
import { Container, Row, Col } from "shards-react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import View from '@material-ui/icons/Visibility';
import MUIDataTable from "mui-datatables";
import CustomToolbar from "./CustomToolbar.js"
class Supervisors extends React.Component {
  static contextType = GlobalContext;

  constructor(props) {
    super(props);
    this.state = {
      updated:"",
      columns: [
        {
          name: "profile_pic",
          label: "Profile",
        },{
            name:"email",
            label:"Email", options:{ filter:true, sort:true}
          },
          {
            name:"username",
            label:"Name", options:{ filter:true, sort:true}

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
        responsive:"horizontal",
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
  }
  
  delete(id) {
    axios.delete(axios.defaults.baseURL +"/superadmin/supervisors/?operation=delete&id="+id).then(res => {
      if (res.status===200 || res.status===204){
        window.alert("deleted Supervisor");
      }
    }).catch(err => {
      console.log(err);
    })
    this.setState({
      updated:id,
    })
}


  componentDidMount() {
    console.log(axios.defaults.baseURL);
    axios
      .get(axios.defaults.baseURL + "/superadmin/supervisors/?operation=get")
      .then(res => {
         let data= []
          res.data.map(row => {
            
            data.push({
              email:row.email,
              username:row.username,
              profile_pic:() => <div> <img  style={{height:"30px"}} className="profile circle" src={axios.defaults.baseURL+row.profile_pic} alt="profile"/>  </div>,
              view : () =><div style={{cursor:"pointer"}}><View/></div> ,
              edit : () => <div style={{cursor:"pointer"}} onClick={()=>(this.EditCustomer(row))}> <Edit/></div>,
              delete :() => <div style={{cursor:"pointer"}} onClick={()=>(this.delete(row.id))}>
              <Delete/>
             </div>

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
  /**
   * 
   * @param {*} row 
   * @returns redirect to /editcustomer
   */
  EditCustomer(row) {
    const action = this.context
    this.setState({
      mode:"editsupervisor", 
      row:row
    },() => {
      action("set",{key:"operation",value:{
        operation:"editsupervisor",
        data:row
      }})
    })

  }
  render() {
    
    if(this.state.mode==="editsupervisor"){
      return (
        <Redirect to="/editsupervisor" />
      )
      }

    return (
      <Container fluid className="main-content-container px-4 mt-4">
            {/* Default Light Table */}
            <Row>
              <Col>
            
                  <MUIDataTable
                      title="Supervisors List"
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

export default Supervisors;
