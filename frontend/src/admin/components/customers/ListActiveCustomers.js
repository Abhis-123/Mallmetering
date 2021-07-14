import React from "react";
import GlobalContext from "../../state/GlobalContext";
// import axios from "axios"
import { Container, Row, Col } from "shards-react";
import { Card, CardHeader, Button, CardBody } from "shards-react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Check from '@material-ui/icons/CheckCircle'
import Cancel from '@material-ui/icons/Cancel'

//const $= require('jquery')

class ListCustomers extends React.Component {
  static contextType = GlobalContext;

  constructor(props) {
    super(props);
    this.state = {
      updted: "",
      tableheadings: [ "Email","Username", "Consumption","status"],
      data: [],
      tabledata: [],
      mode: "normal",
      row :{}
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.fetchcustomers= this.fetchcustomers.bind(this);
  }




  fetchcustomers() {
    console.log(axios.defaults.baseURL);
    axios
      .get(axios.defaults.baseURL + "/supervisor/listactivecustomers/")
      .then(res => {
        this.setState({ data: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  componentDidMount() {
    this.fetchcustomers()
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
    
    // sessionStorage.setItem("operation",{
    //   operation:"editcustomer",  
    //   data:row
    // })
  }
  render() {
    
    if(this.state.mode==="editcustomer"){
      return (
        <Redirect to="/editcustomer" />
      )
    }
    const headings = this.state.tableheadings.map((heading, i) => {
      return (
        <th
          style={{
            fontWeight: "500"
          }}
          scope="col"
          className="border table-heading"
          key={i}
        >
          {heading}
        </th>
      );
    });

    const table_rows = this.state.data.map((row, index) => {
      return (
        <tr
          style={{
            fontWeight: "450"
          }}
          className="table-row"
          id={index}
          key={index}
        > 
          <td>{row.email}</td>
          <td>{row.username}</td>
          <td>{row.status==="active"?(<Check style={{ color: "green" }}/>):(<Cancel style={{ color: "red" }}/>)}</td>
        </tr>
      );
    });



    return (
      <Container fluid className="main-content-container px-4 mt-4 " style={{
        height:"75vh"
      }}>
            {/* Default Light Table */}
            <Row>
              <Col>
                <Card className="mb-4">
                  <CardHeader className="border-bottom">
                    <Row>
                      <Col lg={4}>
                        <h4 className="m-0">List of Registered Customers</h4>
                      </Col>
                      <Col>
                      </Col>
                      <Col lg={3}>
                     <Button href="/superadmin/addcustomer">Add</Button>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody className="p-0 pb-3">
                    <table className="table mb-0">
                      <thead className="bg-light">
                        <tr>{headings}</tr>
                      </thead>
                      <tbody>{table_rows}</tbody>
                    </table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
    );
  }
}

export default ListCustomers;
