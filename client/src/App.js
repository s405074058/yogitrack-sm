import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Instructors from "./pages/Instructors";
import Customers from "./pages/Customers";
import Packages from "./pages/Packages";
import Classes from "./pages/Classes";
import Sales from "./pages/Sales";
import Attendance from "./pages/Attendance";
import Reports from "./pages/Reports";

function Home() {
  return (
    <div>
      <h2 className="page-title">Welcome to YogiTrack 🌸</h2>
      <div className="card">
        <h3>Yoga Studio Management</h3>
        <p>
          Manage instructors, customers, packages, classes, sales, attendance,
          and studio reports in one place.
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app-layout">
        <aside className="sidebar">
          <div className="logo-box">
            <h1>YogiTrack</h1>
            <p>Yoga Studio Management</p>
          </div>

          <Link className="nav-link" to="/">🏠 Home</Link>
          <Link className="nav-link" to="/instructors">🌷 Instructors</Link>
          <Link className="nav-link" to="/customers">🧁 Customers</Link>
          <Link className="nav-link" to="/packages">🎁 Packages</Link>
          <Link className="nav-link" to="/classes">📅 Classes</Link>
          <Link className="nav-link" to="/sales">🛒 Sales</Link>
          <Link className="nav-link" to="/attendance">✅ Attendance</Link>
          <Link className="nav-link" to="/reports">📊 Reports</Link>
        </aside>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/instructors" element={<Instructors />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;