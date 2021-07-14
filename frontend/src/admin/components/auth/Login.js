import React, { Component } from 'react'

// import LoginCardImage from "../../assets/images/5.jpg";
import { Button } from 'react-bootstrap';
import GlobalContext from '../../state/GlobalContext';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
class Login extends Component {
        
        static contextType = GlobalContext;  
        constructor(props) {
            super(props);
            this.state = {
                username:"",
                password:"",
                message: {
                  class:"info",message:"Sign in as Supervisor"
                },
                isLoggedIn: false,
                state:"error",

            }
            this.handleUserNameChange= this.handleUserNameChange.bind(this);
            this.handlePasswordChange= this.handlePasswordChange.bind(this);
            this.login= this.login.bind(this);
        }

        handleUserNameChange( e) {
            e.preventDefault();
            this.setState({
                    username: e.target.value
            })
        }
        handlePasswordChange( e) {
            e.preventDefault();
            this.setState({
                password: e.target.value

            })
        }

        login(e){
          e.preventDefault();

          if(this.state.password.length<1){
            this.setState({
              message: {
                class:"error__content",message:"Password cannot be empty"
              }
            })
            return false
          }
          if(this.state.username.length<1){
            this.setState({
              message: {
                class:"error__content",message:"Username cannot be empty"
              }
            })
            return false
          }
          const action= this.context
          // validate empty
          axios.post(axios.defaults.baseURL+"/supervisor/loginsupervisor/",
             this.state
            ).then(response=>{
                if(response.status===200){
                    const token= response.data.token
                    const expires= response.data.expiry
                    sessionStorage.setItem("SV_isLoggedIn",true)
                    sessionStorage.setItem("SV_token",token)
                    sessionStorage.setItem("SV_expires",expires)
                    sessionStorage.setItem("SV_userName",this.state.username)
                    action('set',{key:"isLoggedIn",value:true})
                    action('set',{key:"token",value:token})
                    action('set',{key:"userName",value:this.state.username})
                }
            }).catch(err=>{
              if(err.response){
                if(err.response.status===400){
                  if(err.response.data.message){
                    this.setState({
                      message:{
                        class:"error__content",message:err.response.data.message
                      }
                    })
                  }else{
                    this.setState({
                      class:"error__content",message:"Something is wrong with your values"
                    })
                  }
                }
            }else{
              this.setState({
                message:{
                  class:"error__content",message:"Couldn't send request !"
                }
              })
            }
    
                


            })
        }
    
    
        render() {
          const action=this.context
          if(action('get',{key:"isLoggedIn"})===true){
            return (<Redirect to ="/home" />)
          }
          return (
  
              <main className="login-page w-100 d-flex align-items-center"  >
              <div className="w-100  row">
                <div className="col-lg-7 col-md-3 col-sm-1 "></div>
                <div className="card col-lg-4 col-md-6 col-sm-11 b-block login-card">
                  <div className="row no-gutters">
                    <div className="">
                      <div className="card-body">
                      <p className={"login-card-description "+this.state.message.class}>{this.state.message.message}</p>
                        <form action="#!">
                          <div className="form-group">
                            <label htmlFor="username" className="">Username</label>
                            <input type="username" name="username" id="username" value={this.state.username} onChange={this.handleUserNameChange} className="form-control"   />
                          </div>
                          <div className="form-group mb-4">
                            <label htmlFor="password" className="">Password</label>
                            <input type="password" name="password" id="password" value={this.state.password} onChange={this.handlePasswordChange} className="form-control" />
                          </div>
                          <Button theme="primary" onClick={this.login}>Login</Button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
               
              </div>
            </main>
  
          )
      }}

export default Login
