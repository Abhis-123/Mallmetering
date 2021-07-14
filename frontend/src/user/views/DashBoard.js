import React from "react";
import { Container, Row, Col,Card} from "shards-react";
import { Redirect } from 'react-router-dom';
import Consumptiongraph from '../components/blog/consumption_graph';

import Billinggraph from "../components/blog/billing_graph";
import UserStats from "../components/stats/UserStats";

import CounsumptionSummaryTable from "../components/table/CounsumptionSummaryTable";
// import BillingSummaryTable from "../components/table/BillingSummaryTable";
import GlobalContext from '../state/GlobalContext';



class DashBoard extends React.Component {
  static contextType = GlobalContext;  
  constructor(props) {
    super(props);
    this.state={
      table : ""
    }
    this.renderTable= this.renderTable.bind(this)
  }

  renderTable(data) {
      this.setState({
        table:data
      })
  }
  render() {
    const action= this.context
    console.log(action('get',{key:"isLoggedIn"}));
        if(action('get',{key:"isLoggedIn"})===false){
          return (<Redirect to ="/login" />)
        }


    //  var table= "" 
    //   switch (this.state.table) {
    //     case "consumption":
    //       table= <CounsumptionSummaryTable/>
    //       break;
    //     case "billing": 
    //       table= <BillingSummaryTable/>
    //       break;
    //     default:
    //       break;
    //   }
    return (
      <>
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <div class="jumbotron jumbotron-fluid">
            <div class="container">
              <p class="lead" >
                Hey {action("get",{key:"userName"})} Welcome Back !
              </p>
            </div>
          </div>
        </Row>

        {/* Small Stats Blocks */}
        <Row>
          <UserStats />
        </Row>

        <Row>
          {/* Users Overview */}

          
          
          <Col lg="6" md="12" sm="12" className="mb-4">
            <Card>
            <Consumptiongraph/>
            </Card>
          </Col>
          <Col lg="6" md="12" sm="12" className="mb-4">
            <Card>
            <Billinggraph />
            </Card>
          </Col> 

          <Col>
            <CounsumptionSummaryTable/>

          </Col>
          
        </Row>
        
      </Container>
      </>
    );
  }
}

export default DashBoard;
