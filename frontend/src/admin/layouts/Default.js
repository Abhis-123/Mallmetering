import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";
// import NavExample from "../components/layout/MainNavbar/ExamplNav";
import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import MainFooter from "../components/layout/MainFooter"
const DefaultLayout = ({ children, noNavbar}) => (
  <Container fluid>
    <Row>
      <Col
        className="main-content p-0"
        lg={{ size: 12, offset: 0 }}
        md={{ size: 12, offset: 0 }}
        sm="12"
        tag="main"
      >
        {!noNavbar && <MainNavbar />}
        {children}
      </Col>
    </Row>
    <Row className="bg-white pt-4 mb-5 mt-5">
          <MainFooter/>
      </Row>
  </Container>
);

DefaultLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool
};

DefaultLayout.defaultProps = {
  noNavbar: false,
  noFooter: false
};

export default DefaultLayout;
