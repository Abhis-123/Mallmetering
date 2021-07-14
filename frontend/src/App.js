import axios from "axios";
import React from "react";
import { BrowserRouter as Router,  Route } from "react-router-dom";
import "./top.css"
import routes from "./routes";
export class App extends React.Component {

  render() {
    //axios.defaults.baseURL="http://164.52.200.223:8006"
    axios.defaults.baseURL="http://127.0.0.1:8000"
    const currentpage = window.location.pathname;
    console.log(currentpage);

    return (
      <Router basename={process.env.REACT_APP_BASENAME || ""}>

        <div>

          {routes.map((route, index) => {
            const component = props => {
              return (
                  <route.component {...props} />
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
