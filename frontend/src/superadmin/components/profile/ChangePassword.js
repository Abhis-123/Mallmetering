import React, { Component } from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container } from 'react-bootstrap';
import axios from 'axios';
export class ChangePassword extends Component {
        

        constructor(props) {
            super(props)
            this.state={
                    oldpassword:"",
                    newpassword:"",
                    retypenewpassword:"",
                    message:{class:"info",message:"Change Password"}

            }
            this.validateForm= this.validateForm.bind(this)
            this.handleSubmit= this.handleSubmit.bind(this);
        }



    validateForm() {
        if (this.state.oldpassword.length<1|| this.state.newpassword.length<1|| this.state.retypenewpassword<1) {
            return false
        }
        if (this.state.newpassword===this.state.retypenewpassword) {
            return true;
        }
    }
    handleSubmit() {

        if (this.state.oldpassword.length<1|| this.state.newpassword.length<1|| this.state.retypenewpassword<1) {
                this.setState({
                    message: {class:"error__content",message:"field cannot be empty"}
                })
        }
        if (this.state.newpassword===this.state.retypenewpassword) {
            this.setState({
                message: {class:"error__content",message:"both new password and retypenewpassword should be same"}
            })
        }



                axios.post("/superadmin/profile/?operation=changepassword",this.state).then(response => {
                            this.setState({
                                message:{
                                    class:'success',
                                    message:"Password changed Successfully",
                                    oldpassword:"", newpassword:"",retypenewpassword:""
                                }
                            })
                }).catch(err => {
                    if (err.response){
                        this.setState({
                            message:{class:'error__content',message:err.response.data.message}
                        })
                    }else{
                        this.setState({
                            message:{class:'err__content',message:"error occured while updating password"}
                        })
                    }
                })
    }

    render() {
        return (

            <Container fluid className="main-content-container  mt-3">
    <div className="card login-card">
          <div className="row no-gutters">
            <div className="">
              <div className="card-body">
              <p className={"login-card-description "+this.state.message.class}>{this.state.message.message}</p>
                    <form>
                   <Form.Group size="lg" controlId="password" className="row">
                    <label  className="col-4">Current Password</label>
                     <input
                        className="col-6 form-control"
                           type="password"
                          value={this.state.oldpassword}
                           onChange={(e) => (this.setState({oldpassword:e.target.value}))}
                       />

                    </Form.Group>
                    <Form.Group size="lg" controlId="password" className="row">

                    <div className="form-group">
                    <label className="col-4">New  Password</label>
                     <input  className="col-6  form-control"
                           type="password"
                          value={this.state.newpassword}
                           onChange={(e) => (this.setState({newpassword:e.target.value}))}
                       />
                       
                    </div>
                    </Form.Group>
                    <Form.Group size="lg" controlId="password" className="row">
                    <label className="col-4">Retype New Password</label>
                     <input  className="col-6 form-control"
                           type="password"
                          value={this.state.retypenewpassword}
                           onChange={(e) => (this.setState({retypenewpassword:e.target.value}))}
                       />
                       
                    </Form.Group>
                    <div className="row">
                        <div className="col-4"></div>
                        <div className="col-4">
                          <Button  align="center" size="sm" onClick={this.handleSubmit} disabled={!this.validateForm}>
                          ChangePassword
                         </Button>
                        </div>
                          
                    </div>
                    </form>
              </div>
            </div>
          </div>
        </div>
        </Container>




           
        )
    }
}

export default ChangePassword
