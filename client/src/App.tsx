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
        path: "/profile",
        element: <Profile/>,
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
