import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import "../css/Navbar.css";
import { useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
const Navbar = ({ isAuthenticated }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout=()=>{
    localStorage.removeItem('token');
      toast.error('Logged Out Successfully')
        navigate('/signin');
  }
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <a class="navbar-brand" href="#">
          GharDhundo
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul id="home" class="navbar-nav">
            <li class="nav-item active">
              <Link id="" class="nav-link" to="">
                Home{" "}
              </Link>
            </li>
            {localStorage.getItem('token') ? (
                <ul className="navbar-nav">
                <li>
                  <Link class="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="btn btn-danger" to="/logout">Logout</button>
                </li>
                </ul>
            ) : (
              <>
                <li>
                  <Link class="nav-link" to="/signin">Login</Link>
                </li>
                <li>
                  <Link class="nav-link" to="/signup">Sign Up</Link>
                </li>
              </>
            )}
            <li class="nav-item active">
              <Link class="nav-link" to="propertyform">
                Sell Property{" "}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
