import React  from 'react'
import { Button,Container } from 'react-bootstrap';
import GlobalContext from '../../state/GlobalContext';
import axios from "axios"

class SupervisorProfile extends React.Component  {
  static contextType = GlobalContext;  

  constructor(props) {
      super(props);
      this.state = {
          username:"",
          email:"",
          password:"",
          
          message: "SuperVisor profile",
          id:"",
      }

      

      this.handleusernameChange= this.handleusernameChange.bind(this);
      this.handlePasswordChange= this.handlePasswordChange.bind(this);
      this.handleEmailChange= this.handleEmailChange.bind(this);
      
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
  

 
save(e){
    const action=this.context
    const u=action('get',{key:"userName"})
  e.preventDefault();
  axios.post(axios.defaults.baseURL+"/supervisor/update_supervisor/"+u+"/",this.state)
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
    const action=this.context
    const u=action('get',{key:"userName"})
   

    axios.get(axios.defaults.baseURL+"/supervisor/listsupervisor/"+u+"/").then(response =>{
        this.setState({
            username:response.data.username,
            email:response.data.email,
            password:response.data.password
        })

       console.log(response)
        if(response.status===200){
            this.setState({
                username:response.data.username,
                email:response.data.email,
                password:response.data.password
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
                    <input readOnly = {true} name="username" id="username" value={this.state.username} className="form-control" />
                  </div>
                  <div className="form-group mb-1">
                    <label htmlFor="email" className="">Email</label>
                    <input readOnly = {true} id="email" value={this.state.email} className="form-control" />
                  </div>
                  <div className="form-group mb-1">
                    <label htmlFor="password" className="">Password</label>
                    <input  id="password" value={this.state.password} onChange={this.handlePasswordChange} className="form-control" />
                  </div>
                  <div className="row no-gutters no-margin no-padding">
                     <div className="col-md-1 col-sm-2"> 
                     <Button theme="primary" onClick={this.save} >Save</Button>
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

export default SupervisorProfile;

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