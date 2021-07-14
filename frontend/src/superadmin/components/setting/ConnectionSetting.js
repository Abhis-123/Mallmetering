import React, { Component } from 'react'
import { Container,  Row, Col, Card, CardHeader,Button, CardBody} from 'shards-react'
import {Table} from "react-bootstrap";
import axios from 'axios';
import GlobalContext from '../../state/GlobalContext';
class ConnectionSetting extends Component {
  static contextType=GlobalContext
    constructor(props) {
        super(props);
        this.state = {
            previtabledata: [],
            tableheadings:['Meter No',"Meter Name","Meter Connection","Working"],
            tabledata:[],
          
      }
      this.componentWillMount=this.componentWillMount.bind(this)
      this.getContent= this.getContent.bind(this);
      this.Add= this.Add.bind(this);
      }

      componentWillMount(){
        axios.get(axios.defaults.baseURL+"/meters/getmeters/").then(response =>(
                    this.setState({
                              tabledata:response.data
                    })

        )        
        ).catch(error =>(
          console.log(error.response)
        ))
      }

      Edit(row){
        const action = this.context
        action("set",{key:"operation",value:{
          operation:"editmeter",                
          data:row
        }})          
      }
    render() {
        const headings=this.state.tableheadings.map(
            (heading, i) => {
              return (
                <th style={{
                  fontWeight:"500",
                }} scope="col" className="border"
                key={i}>
                          {heading}
                </th>
              )
            }
          )
      
          const table_rows= this.state.tabledata.map((row,index)=>{
            return (
              <tr style={{
                fontWeight:"450",
              }} className="table_row_edit" id={index} key={index}  onClick={() => this.Edit(row)}>
                   <td>{row.id}</td>
                   <td>{row.meter_name}</td>
                   <td>{row.meter_connections} </td>
                   <td>{row.working?"yes":"no"} </td>     
              </tr>
            )
          })
          
          
        return (
           <Container fluid className="main-content-container px-4 mt-3">
               <Row>
                <Col sm={12} md={7}>
                   <Card small className=" ml-0">
                    <CardHeader className="border-bottom">
                        <Row>
                        <Col><h6 className="m-0">Meter Connections</h6></Col>
                        </Row> 
                    </CardHeader>
                    <CardBody className="p-0 pb-3">
                    <div className="row border-bottom p-3">
                    <div className="col-sm-3">
                                <Button
                                style={{
                                    fontWeight: "100",
                                    border: "1px solid black"
                                }}
                                className="btn-white border mr-0 download-btn"
                                >
                                 Refresh
                                </Button>
                            </div>
                            <div className="col">

                            </div>
                            <div className="col-sm-3">
                                <Button
                                style={{
                                    fontWeight: "100",
                                    border: "1px solid black"
                                }}
                                onClick={this.Add}
                                className="btn-white border mr-0 download-btn"
                                >
                                 Add New
                                </Button>
                            </div>
                            </div>
                        <Row>
                            <Col>
                            <Table className="table mb-0 w-100">
                            <thead className="bg-light">
                            <tr>
                            {headings}
                            </tr>
                        </thead>
                        <tbody>
                            {table_rows}
                        </tbody>
                        </Table></Col>
                        
                        </Row>
                    </CardBody>
                    </Card>
                   </Col>
               </Row>
           </Container>
        )
    }
}

export default ConnectionSetting
