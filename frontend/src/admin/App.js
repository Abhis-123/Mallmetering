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
    if(sessionStorage.getItem("SV_isLoggedIn")===null){
      sessionStorage.setItem("SV_isLoggedIn",false);
    } 
    //  
    if(sessionStorage.getItem("SV_token")===null){
      sessionStorage.setItem("SV_token","");
    } 

    if(sessionStorage.getItem("SV_userName")===null){
      sessionStorage.setItem("SV_userName","");
    }
    
    
    const action = this.context
    if(sessionStorage.getItem("SV_isLoggedIn")===true || sessionStorage.getItem("SV_isLoggedIn")==="true"){
      console.log("isLoggedIn"+action("get",{key:"isLoggedIn"}))
      if(!action("get",{key:"isLoggedIn"})){
        action("set", {key:"isLoggedIn",value:true});
        action("set", {key:"token",value:sessionStorage.getItem("SV_token")})
        action("set", {key:"userName",value:sessionStorage.getItem("SV_userName")})
      }
    }
  }
  
  render() {
    this.init();
      return (
        <Router basename="/supervisor">
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
