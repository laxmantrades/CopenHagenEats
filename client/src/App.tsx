import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import Login from "./auth/Login";
import MainLayout from "./MainLayout";
import Signup from "./auth/Singup";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
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
