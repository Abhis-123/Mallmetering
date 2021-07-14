import React  from 'react'
import { Button } from 'react-bootstrap';
import GlobalContext from '../../state/GlobalContext';
import axios from "axios"
//import { Container } from '@material-ui/core';
import { Container } from 'react-bootstrap';
import DefaultImage from '../../assets/images/0.jpg'
import Select from 'react-select';


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
          message: {class:"info",message:"Register New Customer"},
          isLoggedIn: false,
          profile_pic: DefaultImage,
          subscription_options:[
              {label:"One Month",value:1},
              {label:"Three Month",value:2},
              {label:"Six Month",value:3},
              {label:"One Year",value:4}
          ],
          display:DefaultImage,
      }

      

      this.handleusernameChange= this.handleusernameChange.bind(this);
      this.handlePasswordChange= this.handlePasswordChange.bind(this);
      this.handleEmailChange= this.handleEmailChange.bind(this);
      this.handleaddressChange= this.handleaddressChange.bind(this);
      this.handlemobile_noChange= this.handlemobile_noChange.bind(this);
      this.handlestatusChange= this.handlestatusChange.bind(this);
      this.handleSubscriptionChange= this.handleSubscriptionChange.bind(this);
      this.register= this.register.bind(this);
      this.handleChange = this.handleChange.bind(this)

      
  }
  handleChange(event) {
    this.setState({
      profile_pic: event.target.files[0],
      display:URL.createObjectURL(event.target.files[0]),
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
  handlestatusChange(e) {
      e.preventDefault();
      this.setState({
          status: e.target.checked

      })
  }
  handleSubscriptionChange( e) {
      this.setState({
        subscription: e.value
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

    if(this.state.address.length<1){
      this.setState({
        message: {class:"error__content",message:"Please enter address"}
      })
      return false
    }

    if (this.state.subscription.length<1) {
      this.setState({
        message: {class:"error__content",message:"subscription cannot be empty"}
      })
      return false
    }

    var form= new FormData();
    form.append('username', this.state.username)
    form.append('email', this.state.email)
    form.append('password', this.state.password)
    form.append('address', this.state.address)
    form.append('status', this.state.status)
    form.append('mobile_no', this.state.mobile_no)
    form.append('subscription', this.state.subscription)
    form.append('profile_pic', this.state.profile_pic)
    console.log(this.state + form)

    axios.post(axios.defaults.baseURL+"/superadmin/customers/?operation=add",form,{
      headers: {
        'content-type': 'multipart/form-data',
      }}).then(response=>{
        this.setState({
          message: {
            class:"success",
            message:"Registered Successfully"
          }
        })
        return true
    }).catch(error=>{
      
      if(error.response){
        
        if(error.response.status===400){
          var message =error.response.data['message']
            this.setState({
              message:{class:"error__content",message:message}
            })
        }
      }else if (error.request){
        this.setState({
          message:{class:"error__content",message:"server didn't resonded "}
        })
      }else{
        this.setState({
          class:"error__content",message:"check your internet connection"
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
                    <label htmlFor="password" className="">Password</label>
                    <input type="password" name="password" id="password" value={this.state.password} onChange={this.handlePasswordChange} className="form-control" required/>
                  </div>
                  <div className="form-group mb-1">
                    <label htmlFor="address" className="">Address</label>
                    <input  type="text-area" name="address" id="address" value={this.state.address} onChange={this.handleaddressChange} className="form-control" required/>
                  </div>
                  <div className="form-group mb-1">
                    <label htmlFor="mobile_no" className="">Mobile Number</label>
                    <input type="tel" name="mobile_no" id="mobile_no" value={this.state.mobile_no} onChange={this.handlemobile_noChange} className="form-control" required/>
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="Subscription" className="">Subscription</label>
                    <Select options={this.state.subscription_options} onChange={this.handleSubscriptionChange} />
                  </div>
                  <div className="form-group mb-1">
                    <label htmlFor="status" className="">Status</label>
                    <input
                        type="checkbox"
                        name="delete"
                        id="delete"
                        checked={this.state.status}
                        onChange={this.handlestatusChange}
                        className="col-7 mr-4"
                      />                  
                      </div>
                  
                  <Button theme="primary" onClick={this.register} >Register Customer</Button>
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
