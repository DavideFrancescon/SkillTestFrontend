import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import { RootState } from "store";
import { useSelector } from "react-redux";
import userModel from "model/userModel";
import Datas from "components/Dashboard/components/Datas";
import DataTable from "components/Dashboard/components/DataTable";
import Profile from "components/Profile/Profile";
import Signup from "components/Signup/Signup";

function App() {
  const user: userModel = useSelector((state: RootState) => state.user);
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/changepassword"
        element={<div> fai finta che abbia cambiato la password </div>}
      />
      <Route
        path="/dashboard"
        element={
          <Protected isLogged={user.jwt !== ""}>
            <Dashboard />
          </Protected>
        }
      >
        <Route path="home" element={<Datas />} />
        <Route path="table" element={<DataTable />} />
      </Route>

      <Route
        path="profile"
        element={
          <Protected isLogged={user.jwt !== ""}>
            <Profile />
          </Protected>
        }
      />
    </Routes>
  );
}
interface ProtectedProps {
  isLogged: boolean;
  children: JSX.Element;
}
const Protected: React.FC<ProtectedProps> = ({ isLogged, children }) => {
  if (!isLogged) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default App;
