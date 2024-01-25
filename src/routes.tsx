// Admin Imports
import ProductList from "views/admin/product";
import Profile from "views/admin/profile";

// Auth Imports
import SignIn from "views/auth/SignIn";
import SignUp from "views/auth/SignUp";


// Icon Imports
import {
  MdHome,
  MdPerson,
  MdLock,
  MdLockOpen

} from "react-icons/md";

const routes: RoutesType[] = [
  
  {
    name: "Product List",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <ProductList />,
  },
  
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
  {
    name: "Sign Up",
    layout: "/auth",
    path: "sign-up",
    icon: <MdLockOpen className="h-6 w-6" />,
    component: <SignUp />,
  },
 
  {
    name: "Log Out",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
  
];

export default routes
