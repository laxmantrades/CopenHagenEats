import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
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
import { useUserStore } from "./store/useUserStore";
import { useEffect } from "react";
import Loading from "./components/Loading";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user, checkAuthentication, isCheckingAuth } =
    useUserStore();
  console.log(user?.isVerified);

   if(isCheckingAuth){
     return<h1>..Loading</h1>
   }
  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }
  if (!user) {
    checkAuthentication();
  }

  if (!user?.isVerified) {
    return <Navigate to={"/verify-code"} replace />;
  }

  return children;
};
const AuthenticatedUser = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!user?.admin) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <MainLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "/",
        element: <HeroSection />,
      },

      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/search/:text",
        element: <SearchPage />,
      },
      {
        path: "/resturant/:text",
        element: <ResturantDetail />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/admin/resturant",
        element: (
          <AdminRoute>
            <Resturant />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/menu",
        element: (
          <AdminRoute>
            <AddMenu />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/orders",
        element: (
          <AdminRoute>
            <Orders />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/status",
        element: (
          <AdminRoute>
            <Success />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <AuthenticatedUser>
        <Login />
      </AuthenticatedUser>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthenticatedUser>
        <Signup />
      </AuthenticatedUser>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <AuthenticatedUser>
        <ForgotPassword />
      </AuthenticatedUser>
    ),
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
  },
  {
    path: "/verify-code",
    element: <VerifyEmail />,
  },
]);
function App() {
  const { checkAuthentication, isCheckingAuth, user } = useUserStore();

  useEffect(() => {
    checkAuthentication();
    console.log(user);
  }, []);
  if(isCheckingAuth) return <Loading/>
  return (
    <main>
      <RouterProvider router={appRouter}></RouterProvider>
    </main>
  );
}

export default App;
