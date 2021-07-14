import React  from 'react'
import { Button } from 'react-bootstrap';
import GlobalContext from '../../state/GlobalContext';
import axios from "axios"
import { Container } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import DefaultImage from '../../assets/images/0.jpg'
import Select from 'react-select';

class EditCustomer extends React.Component  {
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
        display:DefaultImage,
        subscription_options:[
          {label:"One Month",value:1},
          {label:"Three Month",value:2},
          {label:"Six Month",value:3},
          {label:"One Year",value:4}
      ],
        id:'',
        edited:false,
    }

      

      this.handleusernameChange= this.handleusernameChange.bind(this);
      this.handlePasswordChange= this.handlePasswordChange.bind(this);
      this.handleEmailChange= this.handleEmailChange.bind(this);
      this.handleaddressChange= this.handleaddressChange.bind(this);
      this.handlemobnoChange= this.handlemobnoChange.bind(this);
      this.handlestatusChange= this.handlestatusChange.bind(this);
      this.handleSubscriptionChange= this.handleSubscriptionChange.bind(this);
      this.handleChange = this.handleChange.bind(this)
      this.save= this.save.bind(this);
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
  handlemobnoChange( e) {
      e.preventDefault();
      this.setState({
          mobile_no: e.target.value

      })
  }
  handlestatusChange( e) {
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

  
 
save(e){
  e.preventDefault();
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
  form.append('id',this.state.id)
  console.log(this.state + form)

  axios.post(axios.defaults.baseURL+"/superadmin/customers/?operation=update&id="+this.state.id,form,{
    headers: {
      'content-type': 'multipart/form-data',
    }})
  .then(response =>{
    if(response.status===200){
      if(response.status===200){
        this.setState({
          edited:true,
          message:{class:"success", message:"Customer details updated successfully"}
        })
      }
      
    }
  }).catch(error =>{
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


componentWillMount(){
  const action= this.context
    // console.log(sessionStorage.getItem("operation").operation)
    // console.log(action('get',{key:"operation"}))
  const operation=action('get',{key:"operation"})
  if(operation.operation!=="editcustomer"){
    this.setState({
      edited:true,
    })
  }
  if(operation.operation==="editcustomer"){
      axios.get(axios.defaults.baseURL+"/superadmin/customers/?operation=get&id="+operation.data.id)
      .then(response=>{
        if(response.status===200){
          this.setState({
            id:operation.data.id,
            username: response.data.username,
            email: response.data.email,
            mobile_no: response.data.mobile_no,
            password:response.data.password,
            status:response.data.status,
            subscription: response.data.subscription,
            address: response.data.address,
            message: {class:"info",message:'All fields are required *'}
          })
        }
      }).catch(error => {
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


}
render() {
  if(this.state.edited){
    return (<Redirect to="/customers"/>)
  }
  return (
    

    <Container fluid className="main-content-container  mt-3">
    <div className="card login-card">
          <div className="row no-gutters">
            <div className="">
              <div className="card-body">
              <p className={"login-card-description "+this.state.message.class}>{this.state.message.message}</p>
                <form action="#!">
                 
                <div className="form-group p-0 m-0">
                  <label htmlFor="username" className="">Username</label>
                  <input  name="username" id="username" value={this.state.username} onChange={this.handleusernameChange} className="form-control" />
                </div>
                <div className="form-group mb-1">
                  <label htmlFor="email" className="">Email</label>
                  <input  id="email" value={this.state.email} onChange={this.handleEmailChange} className="form-control" />
                </div>
                <div className="form-group mb-1">
                  <label htmlFor="password" className="">Password</label>
                  <input type="password" name="password" id="password" value={this.state.password} onChange={this.handlePasswordChange} className="form-control" />
                </div>
                <div className="form-group mb-1">
                  <label htmlFor="address" className="">Address</label>
                  <input  type="text-area" name="address" id="address" value={this.state.address} onChange={this.handleaddressChange} className="form-control" />
                </div>
                <div className="form-group mb-1">
                  <label htmlFor="mobno" className="">Mobile Number</label>
                  <input type="number" name="mobno" id="mobno" value={this.state.mobile_no} onChange={this.handlemobnoChange} className="form-control" />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="Subscription" className="">Subscription</label>
                  <Select options={this.state.subscription_options} onChange={this.handleSubscriptionChange} />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="status" className="">Status</label>
                  <input
                        type="checkbox"
                        name="delete"
                        id="delete"
                        checked={this.state.status}
                        onChange={this.handlestatusChange}
                        className="col-7 mr-4"
                      />                   </div>
                <div className="row no-gutters no-margin no-padding">
                 <div className="col-md-1"> 
                 <Button theme="primary" onClick={this.save} >Save</Button>
                   </div> 
                   <div className="col">
                   </div>
                </div>
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

export default EditCustomer;

