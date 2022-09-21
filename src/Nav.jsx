import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Inventory2 from "./components/Inventory";
import Home from "./Pages/Home";
import Technology from "./Pages/Technology"
import ClearToBuild from "./Pages/ClearToBuild"
import AddParts from "./Pages/AddParts.jsx";
import EditParts from "./Pages/EditParts.jsx";
import Inventory from "./Pages/Inventory.jsx";

//import temp1 from "./Temp";

//import Ably from 'ably/promises';

//const client = new Ably.Realtime('KdQRaQ.Xl1OGw:yvmvuVmPZkzLf3ZF');

// export const LandingContext = React.createContext();

export default function Nav() {
  useEffect(() => {
    // async function subscribe(){
    //     await channel_waiting.subscribe(something => {
    //         console.log("newPlayerName", something.data.newPlayerName);
    //         channel_joining.publish({data: {rounds: rounds, roundNumber: roundNumber, path: window.location.pathname}})
    //     })
    // }
    // subscribe();
    // return function cleanup(){
    //     channel_joining.unsubscribe();
    // }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/technology" element={<Technology />} />
        {/* <Route path="/buyparts" element={<Landing />} />
        <Route path="/addpart" element={<AddPart />} /> */}
        {/* <Route path="/inventory2" element={<Inventory2 />} /> */}
        {/* <Route path="/EditPart" element={<EditPart />} /> */}
        <Route path="/cleartobuild" element={<ClearToBuild />} />
        <Route path="/addparts"  element={<AddParts />} />
        <Route path="/editparts"  element={<EditParts />} />
        <Route path="/inventory" element={<Inventory />} />

      </Routes>
    </Router>
  );
}
