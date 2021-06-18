import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import Groups from "./containers/Groups/Groups";


export const appRoutes = [
  {
    path: "/user",
    name: "My Profile",
    icon: Person,
  },
  {
    path: "/groups",
    name: "My Groups",
    icon: BubbleChart,
    component: Groups,
  },
  {
    path: "/typography",
    name: "Typography",
    icon: LibraryBooks,
  },
  {
    path: "/icons",
    name: "Icons",
    icon: BubbleChart,
  },
  {
    path: "/maps",
    name: "Maps",
    icon: LocationOn,
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: Notifications,
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
