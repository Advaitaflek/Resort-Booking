import React from "react";
import resort from "../login_page/asssets/resort.png";
import "./login.css";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

// Assuming you're using React Router

function NavBar({ val = false, guest_id = 0 }) {
  if ((guest_id === 1)) {
    val = true;
  }
  const navigate = useNavigate(); // Hook for navigation

  const handleNavigate = (resortId) => {
    navigate("/profile", {
      state: { guest_id: guest_id },
    });
  };
  // Updated the parameter to use object destructuring
  console.log(guest_id);
  return (
    <div className="navbar">
      <div className="navrect">
        <img src={resort} className="resort" alt="Resort Logo" />
        <div className="navcontents">
          <ul className="Navlist">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li onClick={handleNavigate}>
              <Link>Bookings</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            {val && ( // Conditional rendering based on val
              <li>
                <Link to="/admin">Admin</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavBar;