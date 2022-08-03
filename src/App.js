import React, {useState} from "react";
import "./App.css";
import Nav from "./Nav";

export const LandingContext = React.createContext();

export default function App() {
    const [partTemp, setPartTemp] = useState("C");



    return (
        <div className="App">
            <LandingContext.Provider value={{
                partTemp,
                setPartTemp,
            }}>
                <Nav/>
            </LandingContext.Provider>
            {/*  <ShareExample/>*/}
        </div>
    );
}