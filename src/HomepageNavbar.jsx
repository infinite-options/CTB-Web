import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import "./home.css";

const HomepageNavbar = () => (
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
        <Link to="/" class="logo">
          BUILD SUCCESS
        </Link>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "flex-end",
        }}
      >
        <Link to="/" class="navButtons">
          Technology
        </Link>
        <Link to="/buyparts" class="navButtons">
          CTB
        </Link>
        <Link to="/addparts" class="navButtons">
          Add Parts
        </Link>
        <Link to="/inventory" class="navButtons">
          Inventory
        </Link>
        <Link to="/editpart" class="navButtons">
          Edit Parts
        </Link>
      </div>
    </div>
  </nav>
);

export default HomepageNavbar;
