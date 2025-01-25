import { Outlet } from "react-router";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen m-2 md:m-0">
      <header>
        <NavBar />
      </header>
      <div className="flex-1">
        <Outlet/>
      </div>

      
        <footer><Footer></Footer></footer>
      
    </div>
  );
};
export default MainLayout;
