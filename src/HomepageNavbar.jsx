import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import MenuIcon from "./Images/MenuIcon.svg";
import "./home.css";

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
    <nav class="headerNav">
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
          <Link to="/" class="logo" onClick={closeMenu}>
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
          <Link to="/" class="navButtons" onClick={closeMenuProjects}>
            Technology
          </Link>
          <Link to="/buyparts" class="navButtons" onClick={closeMenuProjects}>
            CTB
          </Link>
          <Link to="/addparts" class="navButtons" onClick={closeMenuProjects}>
            Add Parts
          </Link>
          <Link to="/inventory" class="navButtons" onClick={closeMenuProjects}>
            Inventory
          </Link>
          <Link to="/editpart" class="navButtons" onClick={closeMenuProjects}>
            Edit Parts
          </Link>
        </div>
      </div>
    </nav>
  );
}
