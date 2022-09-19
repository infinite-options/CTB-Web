import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import MenuIcon from "../Assets/Images/MenuIcon.svg";
import "../Styles/home.css";

export default function HomepageNavbar() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    console.log("here handleclick");
    setOpen(!open);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  const closeMenuProjects = () => {
    setOpen(false);
  };

  return (
    <nav className="headerNav">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <div
          xs={6}
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <Link to="/" className="logo" onClick={closeMenu}>
            BUILD SUCCESS
          </Link>
        </div>
        <div>
          {open ? (
            <img
              src={MenuIcon}
              className="nav-icon"
              onClick={() => {
                handleClick();
              }}
            />
          ) : (
            <img
              src={MenuIcon}
              className="nav-icon"
              onClick={() => {
                handleClick();
              }}
            />
          )}
        </div>
        <div className={open ? "nav-links active" : "nav-links"}>
          <Link to="/technology" className="navButtons" onClick={closeMenuProjects}>
            Technology
          </Link>
          <Link to="/cleartobuild" className="navButtons" onClick={closeMenuProjects}>
            CTB
          </Link>
          <Link to="/addparts" className="navButtons" onClick={closeMenuProjects}>
            Add Parts
          </Link>
          <Link to="/inventory" className="navButtons" onClick={closeMenuProjects}>
            Inventory
          </Link>
          <Link to="/editparts" className="navButtons" onClick={closeMenuProjects}>
            Edit Parts
          </Link>
        </div>
      </div>
    </nav>
  );
}
