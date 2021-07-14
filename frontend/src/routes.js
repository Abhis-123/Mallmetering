import React from "react";
import { Redirect } from "react-router-dom";
import Supervisor from "./admin/Admin";

// Layout Types
import SuperAdmin from "./superadmin/SuperAdmin";
import User from "./user/User";

export default [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/customer" />
  },
  
  {
    path: "/supervisor",
    component: Supervisor
  },
  {
    path: "/customer",
    component: User
  },
  {
    path: "/superadmin",
    component: SuperAdmin
  }
];
