import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Container, Nav, Navbar,NavbarBrand} from "shards-react";
import UserActions from "./NavbarNav/UserActions"
import Logo  from "../../../assets/logo/logo.jpg";
import {NavItem,NavLink} from "shards-react";
import Notifications from "./NavbarNav/Notifications";
const MainNavbar = ({ layout, stickyTop }) => {
  const classes = classNames(
    "main-navbar",
    "bg-white",
    stickyTop && "sticky-top"
  );

  return (
    <div className={classes}>
      <Container  className="p-0">
        <Navbar type="light" className="align-items-left flex-md-nowrap p-0">
          <NavbarBrand >
            <img src={Logo} alt="logo"/>
          </NavbarBrand>
          <Nav>
            <NavItem >
            <NavLink  href="/customer/home" >
              <div style={{padding:10}}>
              DashBoard
              </div>
              
          </NavLink>
            </NavItem>
            <NavItem >
            <NavLink  href="#" >
              <div style={{padding:10}}>
              Billing
              </div>
              
          </NavLink>
            </NavItem>
            <NavItem >
            <NavLink  href="#" >
              <div style={{padding:10}}>
              Invoice
              </div>
              
          </NavLink>
            </NavItem>
            <NavItem>
              <Notifications/>
            </NavItem>
            <NavItem>

            </NavItem>
            <NavItem>
              <UserActions/>
            </NavItem>
          </Nav>
        </Navbar>
      </Container>
    </div>
  );
};

MainNavbar.propTypes = {
  /**
   * The layout type where the MainNavbar is used.
   */
  layout: PropTypes.string,
  /**
   * Whether the main navbar is sticky to the top, or not.
   */
  stickyTop: PropTypes.bool
};

MainNavbar.defaultProps = {
  stickyTop: true
};

export default MainNavbar;
