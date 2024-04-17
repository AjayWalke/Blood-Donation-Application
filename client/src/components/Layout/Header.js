import React from "react";
import { BiUserCircle } from "react-icons/bi";
import { BiSolidDonateBlood } from "react-icons/bi";
import {useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";

const Header = () => {
    const {user} = useSelector(state => state.auth);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        alert('Logout Successfully');
        navigate('/login');
    }
  return (
    <>
      <nav className="navbar">
        <div className="container-fluid ">
          <div className="navbar-brand h1 ">
              <BiSolidDonateBlood color="red" />
              Blood Blank Application
              <BiSolidDonateBlood color="red" />
          </div>
          <ul className="navbar-nav flex-row">
            <li className="nav-item mx-3">
                {/* show the user name and their roles */}
              <p className="nav-link">
                <BiUserCircle /> Hello {user?.name || user?.organization || user?.hospital} {" "} &nbsp;
                <span class="badge bg-info">{user?.rule}</span>
              </p> 
            </li>
            <li className="nav-item mx-3">
              <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
