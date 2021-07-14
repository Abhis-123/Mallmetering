import React from "react";
import { Container, Row, Col, CardHeader} from "shards-react";

import axios from 'axios';
import MUIDataTable from "mui-datatables";
import GlobalContext from '../../state/GlobalContext';


class CounsumptionSummaryTable extends React.Component {
  static contextType = GlobalContext;
  constructor(props) {
    super(props);
    this.state = {
        name:"Sierra",
        tableheadings:['Date',"Meter Reading Start","Meter Reading End","Consumption"],
        tabledata:[{
          data:"5-may-2021",
          MeteredingStart:0,
          MeterreadingEnd:100
        },
        {
          data:"6-may-2021",
          MeteredingStart:101,
          MeterreadingEnd:167
        }
      ,{
        data:"7-may-2021",
        MeteredingStart:168,
        MeterreadingEnd:200
      },{
        data:"5-may-2021",
        MeteredingStart:0,
        MeterreadingEnd:100
      },
      {
        data:"6-may-2021",
        MeteredingStart:101,
        MeterreadingEnd:167
      }
    ,{
      data:"7-may-2021",
      MeteredingStart:168,
      MeterreadingEnd:200
    }],
    styles:{
      backgroundColor: "#dbd9d9"
      
  },
    columns: [
      {
        name:"time_stamp",
        label:"Day-Time", options:{ filter:true, sort:true}
      },
      {
        name:"reading_value",
        label:"Bill", options:{ filter:true, sort:true}

      },

  ],
  data:[],
  }
  this.fetchdata = this.fetchdata.bind(this);
  }


  fetchdata() {

    const action=this.context
    const u=action('get',{key:"userName"})
    axios
    .get(axios.defaults.baseURL + "/customers/getreadings/"+u+"/")
    .then(res => {
       let data= []
        res.data.map(row => {
          
          data.push({
            time_stamp:row.time_stamp,
            reading_value:row.reading_value*5,
            
          })
          return 0
        })
        this.setState({ 
          data:data
        })
    })
    .catch(err => {
      console.log(err);
    });

}
componentDidMount(){
  this.fetchdata()
  
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
                  <h4 className="m-0">Billing Table</h4>
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
    )
  }

    
}

export default CounsumptionSummaryTable;
