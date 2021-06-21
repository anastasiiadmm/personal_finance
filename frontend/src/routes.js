import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import Groups from "./containers/Groups/Groups";
import Categories from "./containers/Categories/Categories";
import UserProfile from "./containers/UserProfile/UserProfile";
import SingleGroup from "./containers/Groups/SingleGroup/SingleGroup";
import CategoryForm from "./containers/Categories/CategoryForm/CategoryForm";


export const appRoutes = [
  {
    layout: "/",
    path: "/user",
    name: "My Profile",
    icon: Person,
    component: UserProfile,
  },
  {
    layout: "/",
    path: "/groups",
    name: "My Groups",
    icon: BubbleChart,
    component: Groups,
  },
  {
    layout: "/groups",
    path: "/:id",
    name: "My Groups",
    component: SingleGroup,
  },
  {
    layout: "/",
    path: "/typography",
    name: "Typography",
    icon: LibraryBooks,
  },
  {
    layout: "/",
    path: "/icons",
    name: "Icons",
    icon: BubbleChart,
  },
  {
    layout: "/",
    path: "/maps",
    name: "Maps",
    icon: LocationOn,
  },
  {
    layout: "/",
    path: "/notifications",
    name: "Notifications",
    icon: Notifications,
  },
  {
    layout: "/",
    path: "/categories",
    name: "Categories",
    icon: Notifications,
    component: Categories
  },
  {
    layout: "/category",
    path: "/add",
    name: "Categories",
    component: CategoryForm
  },
  {
    layout: "/category",
    path: "/:id",
    name: "Categories",
    icon: Notifications,
    component: CategoryForm
  },
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
