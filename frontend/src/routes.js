import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import BubbleChart from "@material-ui/icons/BubbleChart";
import HomeIcon from '@material-ui/icons/Home';
import Notifications from "@material-ui/icons/Notifications";
import CategoryIcon from '@material-ui/icons/Category';
import GroupIcon from '@material-ui/icons/Group';
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import Groups from "./containers/Groups/Groups";
import Categories from "./containers/Categories/Categories";
import UserProfile from "./containers/UserProfile/UserProfile";
import SingleGroup from "./containers/Groups/SingleGroup/SingleGroup";
import CategoryForm from "./containers/Categories/CategoryForm/CategoryForm";
import LandingPage from "./containers/LandingPages/LandingPage/LandingPage";
import About from "./containers/LandingPages/Footer/FooterComponents/About";
import Transactions from "./containers/Transactions/Transactions";
import TransactionsTabs from "./containers/Transactions/TransactionsTabs/TransactionsTabs";

export const appRoutes = [
  {
    layout: "/",
    path: "/",
    name: "Home",
    icon: HomeIcon,
    component: Transactions,
  },
  {
    layout: "/",
    path: "/user",
    name: "My Profile",
    icon: Person,
    component: UserProfile,
  },
  {
    layout: "/",
    path: "/transactions-tabs",
    name: "Tabs Menu",
    icon: BubbleChart,
    component: TransactionsTabs
  },
  {
    layout: "/",
    path: "/groups",
    name: "My Groups",
    icon: GroupIcon,
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
    path: "/categories",
    name: "Categories",
    icon: CategoryIcon,
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
  }
];

export const landingRoutes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    exact: true,
    layout: "/",
  },
  {
    path: "/",
    component: LandingPage,
    exact: true,
    layout: "/",
  },
  {
    path: "/about",
    component: About,
    exact: true,
    layout: "/",
  },
  {
    path: "/signup",
    name: "SignUp",
    icon: Dashboard,
    component: Register,
    exact: true,
    layout: "/",
  },

];
