import React from "react";
import { BrowserRouter as Router,  Route } from "react-router-dom";

import routes from "./routes";
import "./assets/styles/custom.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/shards-dashboards.1.1.0.min.css";
import GlobalContext from "./state/GlobalContext";
import axios from "axios";

export class App extends React.Component {
  static contextType = GlobalContext;
  constructor(props) {
    super(props);
    this.init= this.init.bind(this);

  }
  init(){
    // check that sessionStorage contains key and
    if(sessionStorage.getItem("su_isLoggedIn")===null){
      sessionStorage.setItem("su_isLoggedIn",false);
    } 
    //  
    if(sessionStorage.getItem("su_token")===null){
      sessionStorage.setItem("su_token","");
    } 

    if(sessionStorage.getItem("su_userName")===null){
      sessionStorage.setItem("su_userName","");
    }
    axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("su_token");

    axios.get("/superadmin/dashboard/?operation=isAuthenticated").then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    })
    
    const action = this.context
    if(sessionStorage.getItem("su_isLoggedIn")==="true" || sessionStorage.getItem("su_isLoggedIn")===true){

      if(!action("get",{key:"isLoggedIn"})){
        action("set", {key:"isLoggedIn",value:true});
        action("set", {key:"token",value:sessionStorage.getItem("su_token")})
        action("set", {key:"userName",value:sessionStorage.getItem("su_userName")})
      }
    }else{

    }
    console.log("context"+ action('get',{key:"isLoggedIn"}) + " session :" + sessionStorage.getItem("su_isLoggedIn"))

  }
  UNSAFE_componentWillMount() {
    this.init();
  }
  render() {
      return (
        
        <Router basename="/superadmin">
          <div>
            {routes.map((route, index) => {
              const component = props => {

                return (
                  <route.layout {...props}>
                    <route.component {...props} />
                  </route.layout>
                );
              };
              return (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={component}
                  // component={withTracker(props => {
                  //   return (
                  //     <route.layout {...props}>
                  //       <route.component {...props} />
                  //     </route.layout>
                  //   );
                  // })}
                />
              );
            })}
          </div>
        </Router>
      );
    
  }
}

export default App;
