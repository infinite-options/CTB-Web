import React from 'react';
import { Link } from 'react-router-dom';


const NavBar = () =>(
    <nav style={{
        borderTop: "solid 1px",
        paddingTop: "1rem",
      }}>
      <div id="outer">
      <Link to="/" style={{display: 'inline-block',  padding: "10px", paddingLeft: "0px"}}>CTB</Link>
      <Link to="/addparts" style={{display: 'inline-block',  padding: "10px"}}>Add Parts</Link>
      <Link to="/inventory" style={{display: 'inline-block',  justifyContent:'center', padding: "10px"}}> Inventory</Link>
      <Link to="/editpart" style={{display: 'inline-block',  padding: "10px"}}>Edit Parts</Link>
      </div>
    </nav>

);

export default NavBar; 