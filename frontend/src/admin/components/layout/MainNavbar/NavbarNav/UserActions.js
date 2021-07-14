import React from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";
import img from "../../../../assets/images/0.jpg";
import GlobalContext from "../../../../state/GlobalContext";
export default class UserActions extends React.Component {
  static contextType = GlobalContext;
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
    this.logout = this.logout.bind(this);

  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  logout() {
    const action= this.context
      sessionStorage.removeItem("SV_isLoggedIn")
      sessionStorage.removeItem("SV_userName")
      sessionStorage.removeItem("SV_token")
      action("set",{key:"isLoggedIn",value:false})
  }

  render() {
    const action=this.context

    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3" >
          <img
            className="user-avatar rounded-circle mr-2"
            src={img}
            alt="User Avatar"
          />{" "}
          <span className="d-none d-md-inline-block">{action('get',{key:"id"})}</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem tag={Link} to="/profile">
            <i className="material-icons">&#xE7FD;</i> Profile
          </DropdownItem>
          
          <DropdownItem divider />
          <DropdownItem  className="text-danger">
            <i className="material-icons text-danger" onClick={this.logout}>&#xE879;</i> Logout
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}
