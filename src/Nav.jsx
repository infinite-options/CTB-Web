import React, {useContext, useState, useEffect} from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {Route, Routes, } from "react-router-dom";
import Landing from "./Landing";
import AddPart from "./AddPart";
import Inventory from "./Inventory"
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
                        <Route path="/" element={<Landing />} />
                        <Route path="/addparts" element={<AddPart />} />
                        <Route path="/inventory" element={<Inventory />} />
                    </Routes>
        </Router>
    );
}