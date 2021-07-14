import React  from 'react'
import { Button } from 'react-bootstrap';
import GlobalContext from '../../state/GlobalContext';
import axios from "axios"
//import { Container } from '@material-ui/core';
import { Container } from 'react-bootstrap';
import DefaultImage from '../../assets/images/0.jpg'


class ListCustomers extends React.Component  {
  static contextType = GlobalContext;  

  constructor(props) {
      super(props);
      
      this.state = {
          username:"",
          email:"",
          password:"",
          address:"",
          mobile_no:"",
          status:"",
          subscription:"",
          message: {
            class:"info",message:' Register Supervisor'
          },
          isLoggedIn: false,
          profile_pic: DefaultImage,
          display:DefaultImage,
      }

      

      this.handleusernameChange= this.handleusernameChange.bind(this);
      this.handlePasswordChange= this.handlePasswordChange.bind(this);
      this.handleEmailChange= this.handleEmailChange.bind(this);
      this.handlemobile_noChange= this.handlemobile_noChange.bind(this);
      this.register= this.register.bind(this);
      this.handleChange = this.handleChange.bind(this)

      
  }
  handleChange(event) {
    this.setState({
      profile_pic: event.target.files[0],
      display: URL.createObjectURL(event.target.files[0])
    })
  }


  handlePasswordChange( e) {
      e.preventDefault();
      this.setState({
          password: e.target.value

      })
  }

  handleusernameChange( e) {
    e.preventDefault();
    this.setState({
        username: e.target.value

    })
}

  handleEmailChange( e) {
      e.preventDefault();
      this.setState({
          email: e.target.value

      })
  }
  handleaddressChange( e) {
      e.preventDefault();
      this.setState({
          address: e.target.value

      })
  }
  handlemobile_noChange( e) {
      e.preventDefault();
      this.setState({
          mobile_no: e.target.value

      })
  }


 
  register(){
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

    var form= new FormData();
    form.append('username', this.state.username)
    form.append('email', this.state.email)
    form.append('password', this.state.password)
    form.append('mobile_no', this.state.mobile_no)
    form.append('profile_pic', this.state.profile_pic)
    console.log(this.state + form)

    axios.post(axios.defaults.baseURL+"/superadmin/supervisors/?operation=add",form,{
      headers: {
        'content-type': 'multipart/form-data',
      }}).then(response=>{
      
      window.alert("registered successfully")
      return true
    }).catch(error=>{
        if(error.response!==undefined&&error.response.status===400){
          this.setState({
            message: error.response.data.username + " " + error.response.data.status
          })
        }
        else if(error.response!==undefined&& error.response.status){
          this.setState({
            message:"please try with defferent username"
          })
        }
    })
}

UNSAFE_componentWillMount(){
  if(this.state.profile_pic===null){
      this.setState({
        profile_pic:URL.revokeObjectURL(DefaultImage),

      })
  }
  
}

render() {
 
  return (

    <Container fluid className="main-content-container  mt-3">
    <div className="card login-card">
          <div className="row no-gutters">
            <div className="">
              <div className="card-body">
              <p className={"login-card-description "+this.state.message.class}>{this.state.message.message}</p>
                <form action="#!">
                <div className="form-group mb-1">
                    <label htmlFor="username" className="">Profile {"    "}  </label>
                        <input type="file" accept="image/png, image/jpeg" onChange={this.handleChange} required/>
                        <img  style={{height:"50px"}} className="profile rounded" src={this.state.display} alt="profile"/>     
                     </div>
                <div className="form-group p-0 m-0">
                    <label htmlFor="username" className="">User Name</label>
                    <input value={this.state.username} onChange={this.handleusernameChange} className="form-control" required/>
                </div>
                  <div className="form-group mb-1">
                    <label htmlFor="email" className="">Email</label>
                    <input  id="email" value={this.state.email} onChange={this.handleEmailChange} className="form-control" required/>
                  </div>
                  <div className="form-group mb-1">
                    <label htmlFor="mobile_no" className="">Mobile Number</label>
                    <input type="number" name="mobile_no" id="mobile_no" value={this.state.mobile_no} onChange={this.handlemobile_noChange} className="form-control" required/>
                  </div>
                  <div className="form-group mb-1">
                    <label htmlFor="password" className="">Password</label>
                    <input type="password" name="password" id="password" value={this.state.password} onChange={this.handlePasswordChange} className="form-control" required/>
                  </div>

                  <Button theme="primary" onClick={this.register} >Register</Button>
                </form>
               
                <nav className="login-card-footer-nav">
                </nav>
              </div>
            </div>
          </div>
        </div>
        </Container>
   
     
  )
}
}

export default ListCustomers;
