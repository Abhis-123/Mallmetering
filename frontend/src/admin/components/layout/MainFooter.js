import React from "react";
import { Container, Row, Col } from "shards-react";
import jivasslogo from "../../assets/logo/jivasslogo.jpg";
class MainFooter extends React.Component {
  render() {
    const styles ={
      maxWidth:"40px"
    }
    return(
      <footer className="main-footer d-flex bg-white mb-0">
      <Container fluid={true} className=" flex" >
      <Row className="m-0 p-0 h-50 no-gutters">
        <Col sm={4} className="p-0 m-0">
        <span className="copyright ml-auto my-auto mr-0">Copyright @ MallMeterings 2021</span>
        </Col>
        <Col>
        </Col>
        <Col sm={7} md={5}>
        Brought to you by Jivass Technologies   <img src={jivasslogo} style={styles} alt="jivass logo"  className="footer-logo logo mt-1"/>

        </Col>
     
 
      </Row>
    </Container>
  </footer>

    )
  }
}

export default MainFooter;

