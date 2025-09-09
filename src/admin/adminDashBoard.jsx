import { useState, useEffect } from 'react';
import { Menu, Search, LogOut, BarChart2, Settings } from 'lucide-react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const token = localStorage.getItem("admintoken");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const logout = () => {
    localStorage.removeItem("admintoken")
    toast.success("Logged out successfully!");
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  useEffect(() => {
    if (!token) {
      toast.error("Login First");
      setTimeout(() => {
        navigate("/adminlogin");
      }, 1500);
    }
  }, [token, navigate]);

  return (
    <>
      <div className="app-container">
        {/* Sidebar */}
        <aside className={`sidebar ${isSidebarOpen ? '' : 'sidebar-hidden'}`}>
          <div className="sidebar-header">
            <div className="user-avatar">A</div>
            <div>
              <h2 className="user-name">Welcome : {localStorage.getItem("adminid")}</h2>
            </div>
          </div>
          <nav className="sidebar-nav">
            <ul>
              <li>
                <Link
                  style={{ color: "white", textDecoration: "none", cursor: "pointer" }}
                  to="/forgotPass"
                >
                  Change Password
                </Link>
              </li>
              <li>
                <a href="#" className="nav-item">
                  <BarChart2 className="nav-icon" />
                  <Link style={{ textDecoration: 'none', color: "white" }} to="addPro">Add Product</Link>
                </a>
              </li>
              <li>
                <a href="#" className="nav-item">
                  <BarChart2 className="nav-icon" />
                  <Link style={{ textDecoration: 'none', color: "white" }} to="ourpro">Our Orders</Link>
                </a>
              </li>
              <li>
                <a href="#" className="nav-item">
                  <BarChart2 className="nav-icon" />
                  <Link style={{ textDecoration: 'none', color: "white" }} to="prolist">Product List</Link>
                </a>
              </li>
              <li>
                <a href="#" className="nav-item">
                  <Settings className="nav-icon" />
                  Settings
                </a>
              </li>
            </ul>
          </nav>
          <div className="sidebar-footer">
            <a href="#" className="nav-item" onClick={logout} style={{ textDecoration: "none", color: "white" }}>
              <LogOut className="nav-icon" /> Logout
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
          {/* Header */}
          <header className="header">
            <div className="header-left">
              <button onClick={toggleSidebar} className="toggle-btn">
                <Menu className="menu-icon" />
              </button>
              <h1 className="header-title">Dashboard</h1>
            </div>
            <div className="header-right">
              <div className="search-container">
                <Search className="search-icon" />
                <input type="text" placeholder="Search..." className="search-input" />
              </div>
              <div className="user-avatar">A</div>
            </div>
          </header>

          {/* Main Dashboard */}
          <Outlet />
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-center" autoClose={1500} hideProgressBar={false} />
    </>
  );
};

export default AdminDashboard;
