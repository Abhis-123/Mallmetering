import React from "react";
import { Container, Row } from "shards-react";
import { Redirect } from 'react-router-dom';

import UserStats from "../components/stats/UserStats";

import GlobalContext from '../state/GlobalContext';
import UserCunsumptionGraph from "../components/dashboard/UserCunsumptionGraph";
import { Col } from "react-bootstrap";

class DashBoard extends React.Component {
  static contextType = GlobalContext;  



  render() {
    const action= this.context
    console.log(action('get',{key:"isLoggedIn"}));
        if(!action('get',{key:"isLoggedIn"})){
          return (<Redirect to ="/login" />)
        }
    return (
      <Container fluid className="main-content-container px-4">
        <Row className="mt-3">
          <UserStats />
        </Row>
        <Row className="row-gutters">
          <Col lg={12}>
          <UserCunsumptionGraph/>
          </Col>  
        </Row>
     
      </Container>
    );
  }
}

export default DashBoard;
