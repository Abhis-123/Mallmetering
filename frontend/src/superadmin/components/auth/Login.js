import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import GlobalContext from '../../state/GlobalContext';
import { Redirect } from 'react-router';
import axios from  "axios"
class Login extends Component {
        static contextType = GlobalContext;  

        constructor(props) {
            super(props);
            this.state = {
                username:"",
                password:"",
                email:"",
                message: {class:"info",message:"Sign in as Administrator"},
                isLoggedIn: false
            }
            this.handlePasswordChange= this.handlePasswordChange.bind(this);
            this.login= this.login.bind(this);
        }


        handlePasswordChange( e) {
            e.preventDefault();
            this.setState({
                password: e.target.value,
            })
        }


        componentDidMount(){
          axios.get(axios.defaults.baseURL+"/superadmin/dashboard/?operation=getadmin").then(response =>{
            this.setState({
                username:response.data.username,
                email:response.data.email
            })
            console.log(response)  
            console.log("KKKKKKKKKKKKKKKK")
            console.log(this.state.username)          
            if(response.status===200){
                this.setState({
                    username:response.data.username,
                    email:response.data.email
                })
                
              
            }
            }).catch(error=>{
              if(error.response){
                if(error.response.status===400){
                    this.setState({
                      message:{class:"error__content",message:error.response.data['non_field_errors']}
                    })
                }
              }else if (error.request){
                this.setState({
                  message:{class:"error__content",message:"couldn't connect to server"}
                })
              }else{
                this.setState({
                  class:"error__content",message:" something wrong happened"
                })
              }
            })
        }




        login(e){
          e.preventDefault();
          if(this.state.password.length<1){
            this.setState({
              message: {class:"error__content",message:" Password cannot be empty"}
            })
            return false
          }

          if(this.state.username.length<1){
            this.setState({
              message: {class:"error__content",message:"error occurred while fetching details"}
            })
          }
          const action= this.context
          // validate empty
          axios.post(axios.defaults.baseURL+"/superadmin/api/login/",
             this.state
            ).then(response=>{
                if(response.status===200){
                    const token= response.data.token
                    const expires= response.data.expiry
                    sessionStorage.setItem("su_isLoggedIn",true)
                    sessionStorage.setItem("su_token",token)
                    sessionStorage.setItem("su_expires",expires)
                    sessionStorage.setItem("su_userName",this.state.username)
                    action('set',{key:"isLoggedIn",value:true})
                    action('set',{key:"token",value:token})
                    action('set',{key:"userName",value:this.state.username})
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
    
    
      render() {
        const action=this.context
        // console.log(action('get',{key:"isLoggedIn"}))
        //console.log(action('get',{key:"userName"}))
        if(action('get',{key:"isLoggedIn"})===true){
          return (<Redirect to ="/home" />)
        }else{
        return (
          <main  className="login-page w-100 d-flex align-items-center"  >
          <div className="w-100  row">
            <div className="col-lg-7 col-md-3 col-sm-1 "></div>
            <div className="card col-lg-4 col-md-6 col-sm-11 b-block login-card">
              <div className="row no-gutters">
                <div className="">
                  <div className="card-body">
                      <p className={"login-card-description "+this.state.message.class}>{this.state.message.message}</p>
                      <form onSubmit={this.login}>
                        <div className="form-group mb-4">
                          <label htmlFor="password" className="">Password</label>
                          <input type="password" name="password" id="password" value={this.state.password} onChange={this.handlePasswordChange} className="form-control" />
                        </div>
                        <Button theme="primary" onClick={this.login}>Login</Button>
                      </form>
                      <a href="#!" className="forgot-password-link">Forgot password?</a>
                    </div>
                  </div>
                </div>
              </div>
             
            </div>
          </main>
        )
                }
    }
}

export default Login
