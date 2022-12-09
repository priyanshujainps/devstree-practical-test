import "./App.css";
import { Login } from "./Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./Dashboard";
import { PrivateRoute } from "./PrivateRoute";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute Component={Dashboard} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
