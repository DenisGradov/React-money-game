import Navigation from "./Navigation";
import { Outlet } from "react-router-dom";
function MainLayoute() {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
}

export default MainLayoute;
