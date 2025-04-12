import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./component/HomePage";
import Login from "./component/gate/Login";
import Register from "./component/gate/Register";
import ForgotPassword from "./component/gate/ForgetPassword";
import Dashboard from "./component/user/general/Dashboard";
import PrivateRoute from "./protection/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard/>}/>
     </Route>
      </Routes>
    </Router>
  );
}

export default App;
