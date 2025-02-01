import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import Login from "./auth/Login";
import MainLayout from "./MainLayout";
import Signup from "./auth/Singup";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import VerifyEmail from "./auth/VerifyEmail";
import HeroSection from "./components/HeroSection";
import Profile from "./components/Profile";
import SearchPage from "./components/SearchPage";
import ResturantDetail from "./components/ResturantDetails";
import Cart from "./components/Cart";
import Resturant from "./admin/Resturant";
import AddMenu from "./admin/AddMenu";
import Orders from "./admin/Orders";
import Success from "./components/Success";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HeroSection/>,
      },
     
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path:"/forgot-password",
        element:<ForgotPassword/>
      },
      {
        path:"/reset-password",
        element:<ResetPassword/>
      },
      {
        path:"/verify-code",
        element:<VerifyEmail/>
      },
      {
        path: "/profile",
        element: <Profile/>,
      },
      {
        path: "/search/:text",
        element: <SearchPage/>,
      },
      {
        path: "/resturant/:text",
        element: <ResturantDetail/>,
      },
      {
        path: "/cart",
        element: <Cart/>,
      },
      {
        path: "/admin/resturant",
        element: <Resturant/>,
      },
      {
        path: "/admin/menu",
        element: <AddMenu/>,
      },
      {
        path: "/admin/orders",
        element: <Orders/>,
      },
      {
        path: "/admin/status",
        element: <Success/>,
      }
    ],
  },
]);
function App() {
  return (
    
      <RouterProvider router={appRouter}>
        
      </RouterProvider>
    
  );
}

export default App;
