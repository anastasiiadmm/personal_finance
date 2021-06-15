import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Groups from "./containers/Groups/Groups";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import UserProfile from "./containers/UserProfile/UserProfile";


export const appRoutes = [
  {
    path: "/user",
    name: "My Profile",
    icon: Person,
    component: UserProfile,
    layout: "/",
  },
  {
    path: "/table",
    name: "Table List",
    icon: "content_paste",
    layout: "/",
    component: Groups,
  },
  {
    path: "/typography",
    name: "Typography",
    icon: LibraryBooks,
    layout: "/",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: BubbleChart,
    layout: "/",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: LocationOn,
    layout: "/",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: Notifications,
    layout: "/",
  }
];

export const landingRoutes = [
  {
    path: "/login",
    name: "Login",
    icon: Dashboard,
    component: Login,
    exact: false,
    layout: "/",
  },
  {
    path: "/signup",
    name: "SignUp",
    icon: Dashboard,
    component: Register,
    exact: false,
    layout: "/",
  },

];
