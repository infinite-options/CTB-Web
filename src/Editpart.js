import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { useState, useEffect, Component } from 'react';
import axios from 'axios';

const Editpart = (useEffect) => {

        //get references for text input and button fields
    // var partNumber = document.getElementById("partNumber");
    // var description = document.getElementById("description");
    var submit = document.getElementById("submit");

    const [jsonText, setjsonText] = useState();
    const [response, setResponse] = useState();

    const [partNumber, setpartNumber] = useState('');
    const [description, setdescription] = useState('');
    const [unitCost, setunitCost] = useState('');
    const [costUnit, setcostUnit] = useState('');
    const [Weight, setWeight] = useState('');
    const [Weight_Unit, setWeight_Unit] = useState('');
    const [Material, setMaterial] = useState('');
    const [vendor, setvendor] = useState('');
    const [originLocation, setoriginLocation] = useState('');
    const [currInventory, setCurrInventory] = useState('');
    const [currInventoryUnit, setCurrInventoryUnit] = useState('');




    async function sendJSON(){
      


        // var data = {
        //     "PN":partNumber,
        //     "Description":description,
        //     "Unit_Cost":unitCost,
        //     "Cost_Unit":costUnit,
        //     "Weight": Weight,
        //     "Weight_Unit": Weight_Unit,
        //     "Material": Material,
        //     "Vendor":vendor,
        //     "Country_of_Origin":originLocation,
        //     "Lead_Time": 2,
        //     "Lead_Time_Units": "days"
        // };
        // setjsonText(JSON.stringify(data));
        // console.log(jsonText);

        await axios.post("https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/AddParts", {
          "PN":partNumber,
          "Description":description,
          "Unit_Cost":unitCost,
          "Cost_Unit":costUnit,
          "Weight": Weight,
          "Weight_Unit": Weight_Unit,
          "Material": Material,
          "Vendor":vendor,
          "Country_of_Origin":originLocation,
          "Lead_Time": 2,
          "Lead_Time_Units": "days",
          "Current_Inventory": currInventory,
        "Current_Inventory_Unit": currInventoryUnit
      })
          .then((response) => {
            console.log(response.data);
            setResponse("Successfully committed SQL command");
          })
          .catch(function (error) {
            console.log("error");
            setResponse("Request failed with status code 400");

          });

    }

    function savePart() {
        axios.get("https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/GetParts").then((response) => {
            console.log(response);
            for(let i in response.data){
                if(response.data[i].PN===partNumber) {
                    setdescription(response.data[i].Description)
                    setunitCost(response.data[i].Unit_Cost)
                    setcostUnit(response.data[i].Cost_Unit)
                    setWeight(response.data[i].Weight)
                    setWeight_Unit(response.data[i].Weight_Unit)
                    setMaterial(response.data[i].Material)
                    setvendor(response.data[i].Vendor)
                    setoriginLocation(response.data[i].Country_of_Origin)
                    
                }
            }
          })
    }





    return(


        <div class="box">
        <h1>Add Parts</h1>
        <nav style={{
          borderTop: "solid 1px",
          paddingTop: "1rem",
        }}>
        <Link to="/" style={{display: 'flex', float: "left"}}>CTB</Link>
        <Link to="/addparts" style={{display: 'flex', float: "right"}}>Add Parts</Link>
        <Link to="/inventory" style={{display: 'flex',  justifyContent:'center'}}> Inventory</Link>
        </nav>


            <br/>
            <br/>
            <br/>
            <div class="text">Part Number</div>
            <input  class="input-field" id="partNumber" type="text" placeholder={partNumber}
            onChange={e => setpartNumber(e.target.value)} required/>
            <br/>
            <br/>
            <button class="big-button" id="submit" onClick={savePart}>Submit</button>
            <br/>
            <br/>
            <br/>
            <h1 style={{display: 'flex',  justifyContent:'center'}}>Information about Parts</h1>
            <div class="text">Description</div>
            <input  class="input-field" id="description" type="text" placeholder={description}
            onChange={e => setdescription(e.target.value)} required/>
            <br/>
            <br/>
            <br/>
            <div class="text">Unit Cost</div>
            <input  class="input-field" id="unitCost" type="text" placeholder={unitCost}
            onChange={e => setunitCost(e.target.value)} required/>
            <br/>
            <br/>
            <br/>
            <div class="text">Cost Unit</div>
            <input  class="input-field" id="costUnit" type="text" placeholder={costUnit} 
            onChange={e => setcostUnit(e.target.value)} required/>
            <br/>
            <br/>
            <br/>
            <div class="text">Weight</div>
            <input  class="input-field" id="Weight" type="text" placeholder={Weight}
            onChange={e => setWeight(e.target.value)} required/>
            <br/>
            <br/>
            <br/>
            <div class="text">Weight Unit</div>
            <input  class="input-field" id="Weight_Unit" type="text" placeholder={Weight_Unit} 
            onChange={e => setWeight_Unit(e.target.value)} required/>
            <br/>
            <br/>
            <br/>
            <div class="text">Material</div>
            <input  class="input-field" id="Material" type="text" placeholder={Material} 
            onChange={e => setMaterial(e.target.value)} required/>
            <br/>
            <br/>
            <br/>
            <div class="text">Vendor</div>
            <input  class="input-field" id="vendor"  type="text" placeholder={vendor}
            onChange={e => setvendor(e.target.value)} required/>
            <br/>
            <br/>
            <br/>
            <div class="text">Origin Locatons</div>
            <input  class="input-field" id="originLocation" type="text" placeholder={originLocation}
            onChange={e => setoriginLocation(e.target.value)} required/>
            <br/>
            <br/>
            <br/>
            <div class="text">Current Inventory</div>
            <input  class="input-field" id="originLocation" type="text" placeholder={currInventory} 
            onChange={e => setCurrInventory(e.target.value)} required/>
            <br/>
            <br/>
            <br/>
            <div class="text">Current Inventory Units</div>
            <input  class="input-field" id="originLocation" type="text" placeholder={currInventoryUnit}
            onChange={e => setCurrInventoryUnit(e.target.value)} required/>
            <br/>
            <br/>
            <br/>
            <button class="big-button" id="submit" onClick={sendJSON}>Change</button>
            <br/>
            <br/>
            <br/>

            <p>{response}</p>

        </div>


    );
        


    

};

export default Editpart;