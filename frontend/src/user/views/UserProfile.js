import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";
import UserDetails from "../components/userprofile/UserDetails";
import UserAccountDetails from "../components/userprofile/UserAccountDetails";
import Invoice from "../components/invoice/Invoice";
import { ButtonGroup, Button } from "shards-react";

class UserPanel extends Component {
  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="currentpage-header py-4">
        
        </Row>
        <Row>
          <Col lg="4">
            <UserDetails />
          </Col>
          <Col lg="8">
            <UserAccountDetails />
          </Col>
        </Row>
      </Container>
    );
  }
}

export class UserProfile extends Component {
    constructor(props) {
      super(props);
      this.state={
        currentpage: "userdetails"

      };
      this.RenderUserDetails= this.RenderUserDetails.bind(this);
      this.RenderTeanacyDetails= this.RenderTeanacyDetails.bind(this);
      this.RenderEnergyDetails= this.RenderEnergyDetails.bind(this);
      this.RenderBillingDetails= this.RenderBillingDetails.bind(this);
    }

    RenderUserDetails(e) {
      e.preventDefault();
      this.setState({currentpage:"userdetails"})
    }
    RenderTeanacyDetails(e) {
      e.preventDefault();
      this.setState({currentpage:"tenacydetails"})
    }

    RenderBillingDetails(e) {
      e.preventDefault();
      this.setState({currentpage:"billing"})
    }
    RenderEnergyDetails(e) {
      e.preventDefault();
      this.setState({currentpage:"energy"})
    }
  render() {


    var content= <div></div>
    switch (this.state.currentpage) {
      case "userdetails":
        content= <UserPanel/>
        break;
      case "tenacydetails":
        content= <div>Tenacy</div>
        break;
      case "billing":
        content=<Invoice/>
        break;
      case "energy":
        content= <div>Energy</div>
        break;
      default:
        break;
    }
    console.log(this.state.currentpage)
    return (
            <div>
              <Row>
              <ButtonGroup className="mt-0">
              <Button theme={this.state.currentpage==="userdetails"?"primary":"white"}  onClick={this.RenderUserDetails}>User Account</Button>
              <Button theme={this.state.currentpage==="tenacydetails"?"primary":"white"}    onClick={this.RenderTeanacyDetails} > Tenacy Details</Button>
              <Button theme={this.state.currentpage==="billing"?"primary":"white"} onClick={this.RenderBillingDetails}  >Billing</Button>
              <Button theme={this.state.currentpage==="energy"?"primary":"white"}   onClick={this.RenderEnergyDetails}>Energy</Button>
              </ButtonGroup>
              </Row>
              {content}
            </div>
    );
  }
}

export default UserProfile;
