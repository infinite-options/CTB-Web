import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/App.css';
import NavBar from '../Components/NavBar';
import { useState, useEffect, Component } from 'react';
import axios from 'axios';
const inventoryURL = "https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/Inventory";

const EditPart = (useEffect) => {

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
    const [CurrentInventory, setCurrentInventory] = useState('');
    const [InventoryUnit, setInventoryUnit] = useState('');





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
          "Lead_Time_Units": "days"
      })
          .then((response) => {
            console.log(response.data);
            setResponse("Successfully committed SQL command");
          })
          .catch(function (error) {
            console.log("error");
            setResponse("Request failed with status code 400");

          });



          await axios.post(inventoryURL, {
            "PN":partNumber,
            "Country_of_Origin":originLocation,
            "Current_Inventory": CurrentInventory,
            "Current_Inventory_Unit": InventoryUnit
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





    return(


        <div className="box">
        
        <h1>Edit Parts</h1>
        <div></div>
            <NavBar></NavBar>


            <br/>
            <br/>
            <br/>
            <div className="text">Part Number</div>
            <input  className="input-field" id="partNumber" type="text" placeholder="Part Number" 
            onChange={e => setpartNumber(e.target.value)} required/>
            <br/>
            <br/>
            <br/>
            <div className="text">Description</div>
            <input  className="input-field" id="description" type="text" placeholder="Description" 
            onChange={e => setdescription(e.target.value)} required/>
            <br/>
            <br/>
            <br/>
            <div className="text">Unit Cost</div>
            <input  className="input-field" id="unitCost" type="text" placeholder="Unit Cost" 
            onChange={e => setunitCost(e.target.value)} required/>
            <br/>
            <br/>
            <br/>
            <div className="text">Cost Unit</div>
            <input  className="input-field" id="costUnit" type="text" placeholder="Cost Unit" 
            onChange={e => setcostUnit(e.target.value)} required/>
            <br/>
            <br/>
            <br/>
            <div className="text">Weight</div>
            <input  className="input-field" id="Weight" type="text" placeholder="Weight" 
            onChange={e => setWeight(e.target.value)} required/>
            <br/>
            <br/>
            <br/>
            <div className="text">Weight Unit</div>
            <input  className="input-field" id="Weight_Unit" type="text" placeholder="Weight_Unit" 
            onChange={e => setWeight_Unit(e.target.value)} required/>
            <br/>
            <br/>
            <br/>
            <div className="text">Material</div>
            <input  className="input-field" id="Material" type="text" placeholder="Material" 
            onChange={e => setMaterial(e.target.value)} required/>
            <br/>
            <br/>
            <br/>
            <div className="text">Vendor</div>
            <input  className="input-field" id="vendor"  type="text" placeholder="Vendor" 
            onChange={e => setvendor(e.target.value)} required/>
            <br/>
            <br/>
            <br/>
            <div className="text">Origin Locatons</div>
            <input  className="input-field" id="originLocation" type="text" placeholder="Origin Locatons" 
            onChange={e => setoriginLocation(e.target.value)} required/>
            <br/>
            <br/>
            <br/>
            <div className="text">Current Inventory</div>
            <input  className="input-field" id="inventory" type="text" placeholder="Current Inventory" 
            onChange={e => setCurrentInventory(e.target.value)} required/>
            <br/>
            <br/>
            <br/>
            <div className="text">Inventory Unit</div>
            <input  className="input-field" id="inventory" type="text" placeholder="Inventory Unit" 
            onChange={e => setInventoryUnit(e.target.value)} required/>
            <br/>
            <br/>
            <br/>
            <button className="big-button" id="submit" onClick={sendJSON}>Submit</button>
            <br/>
            <br/>
            <br/>

            <p>{response}</p>

        </div>


    );
        


    

};

export default EditPart;