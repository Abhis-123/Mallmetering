import React  from 'react'
import { Button,Container } from 'react-bootstrap';
import GlobalContext from '../../state/GlobalContext';
import axios from "axios"
class AdminProfile extends React.Component  {
  static contextType = GlobalContext;  

  constructor(props) {
      super(props);
      this.state = {
          username:"",
          email:"",
          password:"",
          address:"",
          mobno:"",
          status:"",
          Subscription:"",
          message: "Admin profile",
          id:"",
      }

      

      this.handleusernameChange= this.handleusernameChange.bind(this);
      this.handlePasswordChange= this.handlePasswordChange.bind(this);
      this.handleEmailChange= this.handleEmailChange.bind(this);
      this.handleaddressChange= this.handleaddressChange.bind(this);
      this.handlemobnoChange= this.handlemobnoChange.bind(this);
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
  handlemobnoChange( e) {
      e.preventDefault();
      this.setState({
          mobno: e.target.value

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
  axios.post(axios.defaults.baseURL+"/superadmin/update_admin/",this.state)
  .then(response =>{
    if(response.status===200){
      if(response.status===200){
        this.setState({
          id:response.data.id,
          username: response.data.username,
          email: response.data.email
        })
      }
      window.alert("update success!");
    }
  })




}


componentDidMount() {
    axios.get(axios.defaults.baseURL+"/superadmin/listadmins/").then(response =>{
        this.setState({
            username:response.data.username,
            email:response.data.email
        })
       console.log(response)
        if(response.status===200){
            this.setState({
                username:response.data.username,
                email:response.data.email
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
                <p className="login-card-description">{this.state.message}</p>
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
                    <label htmlFor="address" className="">Address</label>
                    <input  type="text-area" name="address" id="address" value={this.state.address} onChange={this.handleaddressChange} className="form-control" />
                  </div>
                  <div className="form-group mb-1">
                    <label htmlFor="mobno" className="">Mobile Number</label>
                    <input type="number" name="mobno" id="mobno" value={this.state.mobno} onChange={this.handlemobnoChange} className="form-control" />
                  </div>
                  <div className="row no-gutters no-margin no-padding">
                     <div className="col-md-1 col-sm-2"> 
                     <Button theme="primary" onClick={this.save} >Save</Button>
                     </div> 
                     <div className="col">
                     </div>
                     <div className="col-md-2 col-sm-2"> 
                      <Button theme="primary" onClick={this.delete} >Delete</Button>
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

export default AdminProfile;

/*
 <main style={{height:"76vh"}} className="d-flex align-items-center py-3 py-md-0">
      <div className="container mt-1">
        <div className="card login-card row no-gutters col-md-7">
          <div className="">
            <div className="">
              <div className="card-body">
                <p className="login-card-description">{this.state.message}</p>
                <form action="#!">
                
                </form>
              </div>
            </div>
          </div>
        </div>
       
      </div>
    </main>





*/