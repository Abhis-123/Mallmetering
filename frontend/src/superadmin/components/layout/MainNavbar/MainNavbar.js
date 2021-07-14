import React from "react";
import PropTypes from "prop-types";
import {  Navbar, NavbarBrand   } from "shards-react";
import Logo from "../../../assets/logo/logo.jpg";
import { NavItem, Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,NavLink,NavbarToggler,Nav, Collapse} from "shards-react";

import Menu from "../../../assets/logo/menu.jpg";
import AdminProfile from "./AdminProfile";
class MainNavbar extends React.Component{
  
  constructor(props) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);

    this.state = {
      dropdownOpen: false,
      collapseOpen: false,
      currentpage:"",
    };
  }

  toggleDropdown() {
    this.setState({
      ...this.state,
      ...{
        dropdownOpen: !this.state.dropdownOpen
      }
    });
  }

  toggleNavbar() {
    this.setState({
      ...this.state,
      ...{
        collapseOpen: !this.state.collapseOpen
      }
    });
  }
componentWillMount() {
  this.setState({
    currentpage:window.location.pathname
  })
}
  
 
render() {

  return (
    <Navbar type="dark"  className="bg-white main-navbar  sticky-top" expand="sm">
      
    <NavbarBrand href="/superadmin/home"><img src={Logo}  alt="Logo"/></NavbarBrand>
    <NavbarToggler onClick={this.toggleNavbar} ><img style={{height:"20px" , width:"20px"}} src={Menu} alt="Menu"/></NavbarToggler>
    <Collapse open={this.state.collapseOpen} className="navbar-collapse collapse justify-content-end"  navbar>
      <Nav navbar className="">
        <NavItem className={""+this.state.currentpage==="/superadmin/home"?"nav-link-active":"nav-link-inactive"}>
          <NavLink href="/superadmin/home" >
            Dashboard
          </NavLink>
        </NavItem>
        <NavItem className={""+this.state.currentpage==="/superadmin/customers"?"nav-link-active":"nav-link-inactive"}>
          <NavLink href="/superadmin/customers" >
            Customers
          </NavLink>
        </NavItem>
        <NavItem className={""+this.state.currentpage==="/superadmin/supervisers"?"nav-link-active":"nav-link-inactive"}>
          <NavLink  href="/superadmin/supervisers" >
            Supervisors
          </NavLink>

        </NavItem>
        <NavItem className={""+this.state.currentpage==="/superadmin/configuration/test/dummydata"?"nav-link-active":"nav-link-inactive"}>
          <NavLink  href="/superadmin/configuration/test/dummydata" >
              Test Data
          </NavLink>
          
        </NavItem>
        <NavItem className={""+this.state.currentpage==="/superadmin/configuration/archivedata"
                ||this.state.currentpage==="/superadmin/configuration/general"
                ||this.state.currentpage==="/superadmin/meters"?"nav-link-active":"nav-link-inactive"}>
        <Dropdown
              open={this.state.dropdownOpen}
              toggle={this.toggleDropdown}
            >
              <DropdownToggle nav  caret>
              Configuration
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem href="/superadmin/meters">Meters</DropdownItem>
                <DropdownItem href="/superadmin/configuration/archivedata">Archive Data</DropdownItem>
                <DropdownItem href="/superadmin/configuration/stats">Memory Usage</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            </NavItem>
      {/* <AdminProfile/> */}
      <NavItem> 
         <AdminProfile/>
    </NavItem>
      </Nav>
    </Collapse>
    
  </Navbar>
  );
}
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
