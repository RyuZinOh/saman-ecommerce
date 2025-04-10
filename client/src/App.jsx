import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./component/homepage";
import Login from "./component/gate/Login";
import Register from "./component/gate/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
