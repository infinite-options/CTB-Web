import logo from "./logo.svg";
import "./App.css";
//import bom from './bom';
import axios from "axios";
//import New from './new';
import { useState, useEffect } from "react";
import React from "react";
import ReactDOM from "react-dom";
import Nav from "./Nav";
import Home from "./Home";
const baseURL =
  "https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/AllProducts";
const inventoryURL =
  "https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/Inventory";

function App() {
  return (
    <div className="App">
      <Nav />
    </div>
  );
}

export default App;
