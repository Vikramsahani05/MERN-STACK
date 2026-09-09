import "./App.css";
import Navbar from "./components/navbar.jsx";
import Welcome from "./components/Welcome.jsx";
import Dashboard from "./components/dashboard.jsx";

function App() {
  return (
    <div>
      <Navbar />
      <Welcome />
      <Dashboard />
    </div>
  );
}

export default App;