import React from "react";
import { BrowserRouter as Router,  Route } from "react-router-dom";

import routes from "./routes";
import "./assets/styles/custom.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/shards-dashboards.1.1.0.min.css";
import GlobalContext from "./state/GlobalContext";

export class App extends React.Component {
  static contextType = GlobalContext;
  init(){
    // check that sessionStorage contains key and
    if(sessionStorage.getItem("SU_isLoggedIn")===null){
      sessionStorage.setItem("SU_isLoggedIn",false);
    } 
    //  
    if(sessionStorage.getItem("SU_token")===null){
      sessionStorage.setItem("SU_token","");
    } 

    if(sessionStorage.getItem("SU_userName")===null){
      sessionStorage.setItem("SU_userName","");
    }
    
    
    const action = this.context
    if(sessionStorage.getItem("SU_isLoggedIn")===true || sessionStorage.getItem("SU_isLoggedIn")==="true"){
      if(!action("get",{key:"isLoggedIn"})){
        action("set", {key:"isLoggedIn",value:true});
        action("set", {key:"token",value:sessionStorage.getItem("SU_token")})
        action("set", {key:"userName",value:sessionStorage.getItem("SU_userName")})
      }
    }
  }
  
  render() {
    this.init();
      return (
        <Router basename="/customer">
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
