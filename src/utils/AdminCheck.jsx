
import { useContext } from "react";
import IsAdminCheck from "./isAdminCheck";
import { AdminContext } from "./AdminProvider";

const AdminRoute = ({ children }) => {

// const {isAdmin}=IsAdminCheck();7
const {isAdmin}=useContext(AdminContext);






  return isAdmin ? children : <Navigate to="/" replace />;
};

export default AdminRoute;