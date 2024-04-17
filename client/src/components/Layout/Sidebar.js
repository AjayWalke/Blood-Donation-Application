import React, { useState } from "react";
import { userMenu } from "./Menu/userMenu";
import { Link, useLocation } from "react-router-dom";
import "../../styles/Layout.css";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { location } = useLocation();
  const { user } = useSelector((state) => state.auth);
  return (
    // <img src alt></img>
    <div>
      <div className="sidebar">
        <div className="menu">
          {(user?.rule === "organisation" || user?.rule === "donar") && (
            <div className="menu-item">
              <i class={"fa-solid fa-warehouse"}></i>
              <Link to={"/"}>{"Inventory"}</Link>
            </div>
          )}
          {(user?.rule === "admin" ||
            user?.rule === "organisation" ||
            user?.rule === "hospital") && (
            <div className="menu-item">
              <i class={"fa-solid fa-hand-holding-medical"}></i>
              <Link to={"/donar"}>{"Donar"}</Link>
            </div>
          )}
          {(user?.rule === "admin" || user?.rule === "organisation") && (
            <div className="menu-item">
              <i class={"fa-solid fa-hospital"}></i>
              <Link to={"/hospital"}>{"Hospital"}</Link>
            </div>
          )}
          {(user?.rule === "admin" ||
            user?.rule === "organisation" ||
            user?.rule === "donar" ||
            user?.rule === "hospital") && (
            <div className="menu-item">
              <i class={"fa-solid fa-building-ngo"}></i>
              <Link to={"/organization"}>{"Organization"}</Link>
            </div>
          )}
          {user?.rule === "organisation" && (
            <div className="menu-item">
              <i class="fa-solid fa-magnifying-glass-chart"></i>
              <Link to={"/blood-data"}>{"Blood Data"}</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
