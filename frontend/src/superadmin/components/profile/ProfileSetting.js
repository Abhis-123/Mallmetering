import React, { Component } from "react";
import { Row } from "react-bootstrap";
import { Button} from "shards-react";
import ChangePassword from "./ChangePassword";
import ChangeProfileImage from "./ChangeProfileImage";
import GeneralProfileSetting from "./GeneralProfileSetting";

class ProfileSetting extends Component {
    constructor(props) {
        super(props);
        this.state={
          currentpage: "general"
  
        };
        this.GeneralProfileSetting= this.GeneralProfileSetting.bind(this);
        this.ChangePassword= this.ChangePassword.bind(this);
        this.ChangeProfileImage= this.ChangeProfileImage.bind(this);
      }
  
      GeneralProfileSetting(e) {
        e.preventDefault();
        this.setState({currentpage:"general"})
      }
      ChangePassword(e) {
        e.preventDefault();
        this.setState({currentpage:"changepassword"})
      }
  
      ChangeProfileImage(e) {
        e.preventDefault();
        this.setState({currentpage:"changeprofileimage"})
      }
    render() {
  
  
      var content= <div></div>
      switch (this.state.currentpage) {
        case "general":
          content= <GeneralProfileSetting/>
          break;
        case "changepassword":
          content= <ChangePassword/>
          break;
        case "changeprofileimage":
          content=<ChangeProfileImage/>
          break;
        default:
          break;
      }
      console.log(this.state.currentpage)
      return (
              <div style={{height:"78vh"}} className="main-content-container mt-1 ml-5">
                <Row className=" align-items-center pl-4 ml-3">
                    <div className="col-1"></div>
                      <Button className="col-2" theme={this.state.currentpage==="general"?"primary":"white"}  onClick={this.GeneralProfileSetting}>General</Button>
                      <div className="col-1"></div>
                  <Button className="col-3" theme={this.state.currentpage==="changepassword"?"primary":"white"}    onClick={this.ChangePassword} >Password</Button>
                  <div className="col-1"></div>
                  <Button className="col-3 " theme={this.state.currentpage==="changeprofileimage"?"primary":"white"} onClick={this.ChangeProfileImage}  >Profile Image</Button>
                </Row>
                {content}
              </div>
      );
    }
}

export default ProfileSetting;
