

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import Errors from "./views/Errors";
import Login from "./components/auth/Login";
import LoginLayout from "./layouts/LoginLayout"
import Setup from "./views/Setup";
import ListCustomers from "./components/customer/ListCustomers";
import ActiveCustomers from "./components/customer/ActiveCustomers"
import AddCustomer from "./components/customer/AddCustomer";
import GeneralSetting from "./components/setting/GeneralSetting";
import DashBoard from "./views/DashBoard";
import EditCustomer from "./components/customer/EditCustomer";
import EditSuperviser from "./components/supervisers/EditSuperviser";
import RegisterSuperviser from "./components/supervisers/RegisterSuperviser";
import Supervisers from "./components/supervisers/Supervisers";
import ChangePassword from "./components/profile/ChangePassword";
import DummyData from "./components/setting/test/DummyData";
import AdminProfile from "./components/profile/AdminProfile";
import Meters from "./components/meters/Meters";
import UnlinkedMeters from "./components/meters/UnlinkedMeters";
import LinkedMeters from "./components/meters/LinkedMeters";
import AddMeter from "./components/meters/AddMeter";
import EditMeter from "./components/meters/EditMeter";
import ArchiveData from "./components/archivedata/ArchiveData";
import stats from "./components/statistics/stats";
import ProfileSetting from "./components/profile/ProfileSetting";
import ChangeProfileImage from "./components/profile/ChangeProfileImage";
import GeneralProfileSetting from "./components/profile/GeneralProfileSetting";
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
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path:"/login",
    layout:LoginLayout,
    component:Login
  }
  
  ,
  {
    path:"/customers",
    layout:DefaultLayout,
    exact:true,
    component:ListCustomers
  },
  {
    path:"/customers/activecustomers", layout:DefaultLayout,
    component:ActiveCustomers
  },
  {
    path:"/addcustomer",
    exact:true,
    layout:DefaultLayout,
    component:AddCustomer
  },
  
  {
    path:"/editcustomer",
    layout:DefaultLayout,
    component:EditCustomer
  },
  {
    path:"/supervisers",
    layout:DefaultLayout,
    component:Supervisers
  },

  {
    path:"/addsupervisor",
    layout:DefaultLayout,
    component:RegisterSuperviser
  },
  {
    path:"/editsupervisor",
    layout:DefaultLayout,
    component:EditSuperviser
  }
  ,

  {
    path:"/meters",
    exact:true,
    layout:DefaultLayout,
    component:Meters
  },
  {path:"/meters/linkedmeters",
  layout:DefaultLayout,
  component:LinkedMeters

  },{
    path:"/meters/unlinkedmeters",
    layout:DefaultLayout,
    component:UnlinkedMeters
  },
  {
    path:"/meters/editmeter",
    layout:DefaultLayout,
    component:EditMeter
  },
  {
    path:"/meters/addmeter",
    layout:DefaultLayout,
    component:AddMeter

  },
  {
      path:"/meters/linkedmeters",
      layout:DefaultLayout,
      component:LinkedMeters
  },

  {
    path:"/configuration/general",
    exact: true,
    layout:DefaultLayout,
    component:GeneralSetting
  }
  ,
  {
    path:"/configuration/archivedata",
    layout:DefaultLayout,
    component:ArchiveData
  },
  {
    path:"/configuration/test/dummydata",
    layout:DefaultLayout,
    component:DummyData
  },
  {
    path:"/profile",
    exact:true,
    layout:DefaultLayout,
    component:AdminProfile
  },
  {
    path:"/profilesetting/changepassword",    
    layout:DefaultLayout,
    component: ChangePassword,

  },
  {
    path:"/configuration/stats",    
    layout:DefaultLayout,
    component: stats,

  },
  {
    path:"/profilesetting",
    exact:true,
    layout:DefaultLayout,
    component:ProfileSetting
  },
  {
    path:"/profilesetting/changepassword",    
    layout:DefaultLayout,
    component: ChangePassword,

  },
  {
    path:"/profilesetting/profileimage",
    layout:DefaultLayout,
    component:ChangeProfileImage
  }
  ,
  {
    path:"/profilesetting/general",
    layout:DefaultLayout,
    component:GeneralProfileSetting
  }
];
