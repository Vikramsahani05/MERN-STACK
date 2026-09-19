import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <div className="brand-lockup">
                <span className="brand-mark">ST</span>
                <h2>Student Task Portal</h2>
            </div>
            <div className="nav-links">
                <Link to="/">Dashboard</Link>
                <Link to="/tasks">Tasks</Link>
                <Link to="/tasks">Assignments</Link>
                <Link to="/tasks">Reports</Link>
            </div>
            <div className="nav-footer">
                <span className="nav-item">Settings</span>
                <span className="nav-item">Log out</span>
            </div>
        </nav>
    );
}

export default Navbar;