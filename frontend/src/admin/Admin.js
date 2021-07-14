import React from "react";
import App from "./App";
import GlobalState from "./state/GlobalState";

class Admin extends React.Component {
    
    render() {
        
        return (
            <GlobalState>
                <App/>
                </GlobalState>
        );
    }
}

export default Admin;