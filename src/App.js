import "./App.css";
import Navbar from "./components/Navbar";
import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar />

      <div className="text-center" style={{ marginTop: "150px" }}>
        <h3>Welcome to Medstore Manager</h3>
        <h6>Medicine Management made easy</h6>
      </div>
      <br />
      <br />
      <div className="text-center">
        <Link to={"/register"} className="btn btn-dark">
          Register
        </Link>
        <p style={{ marginTop: "200px" }}>Already have an account?</p>
        <Link to={"/login"}>Login</Link>
      </div>
    </div>
  );
}

export default App;
