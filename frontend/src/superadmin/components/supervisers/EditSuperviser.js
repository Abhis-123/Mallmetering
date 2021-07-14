import React from "react";
import { Button } from "react-bootstrap";
import GlobalContext from "../../state/GlobalContext";
import axios from "axios"
import { Container } from 'react-bootstrap';
import { Redirect } from "react-router-dom";

class EditSupervisor extends React.Component {
  static contextType = GlobalContext;

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: "",
      message: {
        class:"info",message:' Register Supervisor'
      },
       mobile_no:'',
      edited:false,
      id:'',
    };
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleusernameChange = this.handleusernameChange.bind(this);
    this.handlemobile_noChange= this.handlemobile_noChange.bind(this);
    this.save= this.save.bind(this);
  }

  handlePasswordChange(e) {
    e.preventDefault();
    this.setState({
      password: e.target.value
    });
  }

  handleEmailChange(e) {
    e.preventDefault();
    this.setState({
      email: e.target.value
    });
  }
  handleusernameChange(e) {
    e.preventDefault();
    this.setState({
      username: e.target.value
    });
  }


  handlemobile_noChange( e) {
    e.preventDefault();
    this.setState({
        mobile_no: e.target.value

    })
}
  save(e){
    if (this.state.username.length<1) {
      this.setState({
        message: {class:"error__content",message:"username is required"}
      })
      return false
    }
  
    if(this.state.email.length<1){
      this.setState({
        message: {class:"error__content",message:"Please enter email"}
      })
      return false
    }
  
    if (this.state.mobile_no.length<1) {
      this.setState({
        message: {class:"error__content",message:"Please enter a mobile no"}
      })
      return false
    }
    if (this.state.password.length<1) {
      this.setState({
        message: {class:"error__content",message:"Please enter a password"}
      })
      return false
    }
      // console.log(sessionStorage.getItem("operation").operation)
      // console.log(action('get',{key:"operation"}))
    // const operation=sessionStorage.getItem("operation")
    e.preventDefault();
    axios.post(axios.defaults.baseURL+"/superadmin/supervisors/?operation=update&id="+this.state.id,this.state)
    .then(response =>{
      if(response.status===200){
          this.setState({
            id:response.data.id,
            username: response.data.username,
            email: response.data.email,
            edited:true, message:{class:"error__content",message:'Updated details successfully'}

          })        
      }
    }).catch(err =>{
      if(err.response){
        if(err.response.status===400){
          this.setState({
            message:{class:"error__content",message:err.response.data['message']}
          })
        }
        if(err.response.status===500){
          this.setState({
            message: {class:"error__content",message:"internal server error"}
          })
        }
      }else{
        this.setState({
          message: {
            class:'error__content',message:"Something wrong happened while sending request"
          }
        })
      }
    })
  
  
  
  
  }
  componentWillMount(){
    const action= this.context
      // console.log(sessionStorage.getItem("operation").operation)
      // console.log(action('get',{key:"operation"}))
    // const operation=sessionStorage.getItem("operation")
    const operation=action('get',{key:"operation"})
    if(operation.operation!=="editsupervisor"){
      this.setState({
        message:{class:'error__content',message:'please select supervisor first!'}
      })
    }





    if(operation.operation==="editsupervisor"){
        axios.get(axios.defaults.baseURL+"/superadmin/supervisors/?operation=get&id="+operation.data.id)
        .then(response=>{
          if(response.status===200){
            this.setState({
              id:operation.data.id,
              username: response.data.username,
              email: response.data.email,
              mobile_no: response.data.mobile_no
            })
          }
        })
  
  
    }
  
  
  }

  render() {
    if(this.state.edited){
      return (<Redirect to="/supervisers"/>)
    }


    return (
      <Container fluid className="main-content-container  mt-3">
      <div className="card login-card">
            <div className="row no-gutters">
              <div className="">
                <div className="card-body">
                <p className={"login-card-description "+this.state.message.class}>{this.state.message.message}</p>
                  <form action="#!">
                  <div className="form-group mb-4">
                <label htmlFor="email" className="">
                  Email
                </label>
                <input
                  id="email"
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                  className="form-control"
                />

              </div>
              <div className="form-group mb-1">
                    <label htmlFor="mobile_no" className="">Mobile Number</label>
                    <input type="number" name="mobile_no" id="mobile_no" value={this.state.mobile_no} onChange={this.handlemobile_noChange} className="form-control" required/>
                  </div>
              <div className="form-group mb-4">
                <label htmlFor="password" className="">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="username" className="">
                  Username
                </label>
                <input
                  name="username"
                  id="username"
                  value={this.state.username}
                  onChange={this.handleusernameChange}
                  className="form-control"
                />
              </div>

              <Button theme="primary" onClick={this.save
              }>
                Save
              </Button>
                  </form>
                 
                  <nav className="login-card-footer-nav">
                  </nav>
                </div>
              </div>
            </div>
          </div>
          </Container>
    );
  }
}

export default EditSupervisor;

/*

*/