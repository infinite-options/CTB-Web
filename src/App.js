import React, {useState} from "react";
import "./App.css";
import Nav from "./Nav";

export const LandingContext = React.createContext();

export default function App() {
    const [part, setPart] = useState("C");



    return (
        <div className="App">
            <LandingContext.Provider value={{
                part,
                setPart,
            }}>
                <Nav/>
            </LandingContext.Provider>
            {/*  <ShareExample/>*/}
        </div>
    );
}