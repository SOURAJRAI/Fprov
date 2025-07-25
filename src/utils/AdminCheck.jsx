
import IsAdminCheck from "./isAdminCheck";

const AdminRoute = ({ children }) => {

const {isAdmin}=IsAdminCheck();






  return isAdmin ? children : null;
};

export default AdminRoute;