import React  from 'react'
import { Button,Container } from 'react-bootstrap';
import GlobalContext from '../../state/GlobalContext';
import axios from "axios"
class GeneralProfileSetting extends React.Component  {
  static contextType = GlobalContext;  

  constructor(props) {
      super(props);
      this.state = {
          username:"",
          email:"",
          password:"",
          address:"",
          mobile_no:"",
          message: {class:'info',message:" Adminstrator Details "},
          id:"",
      }

      

      this.handleusernameChange= this.handleusernameChange.bind(this);
      this.handlePasswordChange= this.handlePasswordChange.bind(this);
      this.handleEmailChange= this.handleEmailChange.bind(this);
      this.handleaddressChange= this.handleaddressChange.bind(this);
      this.handlemobile_noChange= this.handlemobile_noChange.bind(this);
      this.handlestatusChange= this.handlestatusChange.bind(this);
      this.handleSubscriptionChange= this.handleSubscriptionChange.bind(this);
      this.save= this.save.bind(this);
      this.componentDidMount= this.componentDidMount.bind(this);
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
  handlestatusChange( e) {
      e.preventDefault();
      this.setState({
          status: e.target.value

      })
  }
  handleSubscriptionChange( e) {
      e.preventDefault();
      this.setState({
          Subscription: e.target.value

      })
  }

 
save(e){
  e.preventDefault();
  axios.post(axios.defaults.baseURL+"/superadmin/profile/?operation=update",this.state)
  .then(response =>{
    if(response.status===200){
      if(response.status===200){
        this.setState({
          id:response.data.id,
          username: response.data.username,
          email: response.data.email,
          mobile_no:response.data.mobile_no,
          message:{class:"success",message:"Details updated Successfully"}
        })
      }
     
    }
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


componentDidMount() {
    axios.get(axios.defaults.baseURL+"/superadmin/profile/?operation=get&id=1").then(response =>{
        this.setState({
            username:response.data.username,
            email:response.data.email
        })
       console.log(response)
        if(response.status===200){
          console.log(response.data)
            this.setState({
                username:response.data.username,
                email:response.data.email,
                mobile_no: response.data.mobile_no
            })
        }
    }).catch(error=>{
        console.log(error)
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
                <div className="form-group p-0 m-0">
                    <label htmlFor="username" className="">Username</label>
                    <input  name="username" id="username" value={this.state.username} onChange={this.handleusernameChange} className="form-control" />
                  </div>
                  <div className="form-group mb-1">
                    <label htmlFor="email" className="">Email</label>
                    <input  id="email" value={this.state.email} onChange={this.handleEmailChange} className="form-control" />
                  </div>
                  <div className="form-group mb-1">
                    <label htmlFor="mobile_no" className="">Mobile Number</label>
                    <input type="tel" name="mobile_no" id="mobile_no" value={this.state.mobile_no} onChange={this.handlemobile_noChange} className="form-control" />
                  </div>
                  <div className="row no-gutters no-margin no-padding">
                     <div className="col-md-1 col-sm-2"> 
                     <Button theme="primary" onClick={this.save} >Save</Button>
                     </div> 
                     <div className="col">
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

export default GeneralProfileSetting;
