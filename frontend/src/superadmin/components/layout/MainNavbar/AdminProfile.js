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
import img from "../../../assets/images/0.jpg";
import GlobalContext from "../../../state/GlobalContext";
export default class AdminProfile extends React.Component {
  static contextType = GlobalContext;
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      updated:true
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
    this.logout= this.logout.bind(this);
  }

  logout(e) {
    e.preventDefault();
    const action= this.context
      sessionStorage.removeItem("su_isLoggedIn")
      sessionStorage.removeItem("su_userName")
      sessionStorage.removeItem("su_token")
      console.log("logged out")
      action("set",{key:"isLoggedIn",value:false})
      this.setState({
        updated:!this.state.updated
      })
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }
  render() {
    const action=this.context
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          <img
            className="user-avatar rounded-circle mr-2"
            src={img}
            alt="User Avatar"
          />{" "}
          <span className="d-none d-md-inline-block">{action('get',{key:"userName"})}</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem tag={Link} to="/profilesetting">
            <i className="material-icons">&#xE7FD;</i> Profile
          </DropdownItem>
          {/* <DropdownItem tag={Link} to="/profilesetting">
            <i className="material-icons">&#xE8B8;</i>profile Settings
          </DropdownItem> */}
          <DropdownItem divider />
          <DropdownItem  className="text-danger">
            <div onClick={this.logout} className="btn btn-default"><i className="material-icons text-danger" >&#xE879;</i> Logout</div>
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}
