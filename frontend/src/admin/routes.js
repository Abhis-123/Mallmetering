
import { DefaultLayout } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import Errors from "./views/Errors";
import Login from "./components/auth/Login";
import LoginLayout from "./layouts/LoginLayout"
import Setup from "./views/Setup";
import ListCustomers from "./components/customers/ListCustomers";
import ListActiveCustomers from "./components/customers/ListActiveCustomers";
import CreateNewConnection from "./components/dashboard/CreateNewConnection";
import SupervisorProfile from "./components/profile/supervisorprofile"
export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: Setup
  },
  {
    path: "/home",
    layout: DefaultLayout,
    component: BlogOverview
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path:"/login",
    layout:LoginLayout,
    component:Login
  },
  {
    path:"/listcustomers",
    layout:DefaultLayout,
    component:ListCustomers
  },
  {
    path:"/addconnection",
    layout:DefaultLayout,
    component:CreateNewConnection
  },
  {
    path:"/activecustomers",
    layout:DefaultLayout,
    component:ListActiveCustomers
  },
  {
    path:"/profile",
    layout:DefaultLayout,
    component:SupervisorProfile
  },
];
