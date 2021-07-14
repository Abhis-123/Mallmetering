

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import Setup from "./views/Setup";
import Login from "./components/auth/Login"
import DashBoard from "./views/DashBoard";
import UserProfile from "./views/UserProfile";
import LoginLayout from "./layouts/LoginLayout";
import Profile from "./views/profile";

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
    component: DashBoard
  },
  {
    path: "/profile",
    layout: DefaultLayout,
    component:UserProfile
  }
  ,{
    path: "/login",
    layout:LoginLayout,
    component:Login
  },
  {
    path: "/userprofile",
    layout:DefaultLayout,
    component:Profile
  },
];
