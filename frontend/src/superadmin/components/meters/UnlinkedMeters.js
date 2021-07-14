import React, { Component } from "react";
import {
  Container,
  Row
} from "shards-react";
import axios from "axios";
import GlobalContext from "../../state/GlobalContext";
import { Redirect } from "react-router-dom";
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import MUIDataTable from "mui-datatables";
import CustomToolbar from "./CustomToolbar"
class Meters extends Component {
  static contextType = GlobalContext;
  constructor(props) {
    super(props);
    this.state = {
      previtabledata: [],
      tableheadings: ["Meter Name","url", "Working","Linked","Edit","Delete"],
      tabledata: [],
      columns: [
        {
          name:"meter_name",
          label:"Meter Name", options:{ filter:true, sort:true}
        },
        {
          name:"url",
          label:"Url", options:{ filter:true, sort:true}

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
      mode: "",
      rows:"",
      options:{

        selectableRowsHideCheckboxes: true,
        customToolbar: () => {
          return (
            <CustomToolbar />
          );
        }
      },
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }



  componentDidMount() {
    axios
      .get(axios.defaults.baseURL + "/superadmin/meters/?operation=get")
      .then(res =>{
        let data= []
          res.data.map(row => {
            if(row.linked===false){
              data.push({
                meter_name:row.meter_name,
                url:row.meter_connections,
                edit : () => <div style={{cursor:"pointer"}} onClick={()=>(this.EditMeter(row))}> <Edit/></div>,
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
      .catch(error => console.log(error.response));
  }

  delete(id) {
    axios.delete(axios.defaults.baseURL +"/superadmin/meters/?operation=delete&id=" + id).then(res => {
      if (res.status===200 || res.status===204){
        window.alert("deleted meter successfully");
        this.setState({
          updated:id,
        },this.fetchcustomers())
      }
    }).catch(err => {
      console.log(err);
    })
    
}

/**
* 
* @param {*} row 
* @returns redirect to /editmeter
*/
EditMeter(row) {
const action = this.context
this.setState({
  mode:"editmeter", 
  row:row
},() => {
  action("set", {
    key: "operation",
    value: {
      operation: "editmeter",
      data: row
    }
  })
})
}
  render() {
    if(this.state.mode==="editmeter"){
      return (
        <Redirect to="/meters/editmeter" />
      )
    }

    return (
      <Container fluid className="main-content-container px-4 mt-3">
        <Row>
        <MUIDataTable
                      title="Linked Meters List"
                      data={this.state.data}
                      columns={this.state.columns}
                      options={this.state.options}
                    />

        </Row>
      </Container>
    );
  }
}

export default Meters;
