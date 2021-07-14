import React from "react";
import App from "./App";
import GlobalState from "./state/GlobalState";

class User extends React.Component {
  render() {
    return (
      <GlobalState>
        <App />
      </GlobalState>
    );
  }
}

export default User;
