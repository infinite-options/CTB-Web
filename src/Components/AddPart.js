import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { useState, useEffect, Component } from "react";
import axios from "axios";

const AddPart = (useEffect) => {
  //get references for text input and button fields
  // var partNumber = document.getElementById("partNumber");
  // var description = document.getElementById("description");
  var submit = document.getElementById("submit");

  const [jsonText, setjsonText] = useState();
  const [response, setResponse] = useState();

  const [partNumber, setpartNumber] = useState("");
  const [description, setdescription] = useState("");
  const [unitCost, setunitCost] = useState("");
  const [costUnit, setcostUnit] = useState("");
  const [Weight, setWeight] = useState("");
  const [Weight_Unit, setWeight_Unit] = useState("");
  const [Material, setMaterial] = useState("");
  const [vendor, setvendor] = useState("");
  const [originLocation, setoriginLocation] = useState("");

  async function sendJSON() {
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

    await axios
      .post(
        "https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/AddParts",
        {
          PN: partNumber,
          Description: description,
          Unit_Cost: unitCost,
          Cost_Unit: costUnit,
          Weight: Weight,
          Weight_Unit: Weight_Unit,
          Material: Material,
          Vendor: vendor,
          Country_of_Origin: originLocation,
          Lead_Time: 2,
          Lead_Time_Units: "days",
        }
      )
      .then((response) => {
        console.log(response.data);
        setResponse("Successfully committed SQL command");
      })
      .catch(function (error) {
        console.log("error");
        setResponse("Request failed with status code 400");
      });
  }

  return (
    <div class="box">
      <h1>Add Parts</h1>
      <nav
        style={{
          borderTop: "solid 1px",
          paddingTop: "1rem",
        }}
      >
        <Link to="/">CTB</Link>
        <Link to="/add" style={{ float: "right" }}>
          Add Parts
        </Link>
      </nav>

      <br />
      <br />
      <br />
      <div class="text">Part Number</div>
      <input
        class="input-field"
        id="partNumber"
        type="text"
        placeholder="Part Number"
        onChange={(e) => setpartNumber(e.target.value)}
        required
      />
      <br />
      <br />
      <br />
      <div class="text">Description</div>
      <input
        class="input-field"
        id="description"
        type="text"
        placeholder="Description"
        onChange={(e) => setdescription(e.target.value)}
        required
      />
      <br />
      <br />
      <br />
      <div class="text">Unit Cost</div>
      <input
        class="input-field"
        id="unitCost"
        type="text"
        placeholder="Unit Cost"
        onChange={(e) => setunitCost(e.target.value)}
        required
      />
      <br />
      <br />
      <br />
      <div class="text">Cost Unit</div>
      <input
        class="input-field"
        id="costUnit"
        type="text"
        placeholder="Cost Unit"
        onChange={(e) => setcostUnit(e.target.value)}
        required
      />
      <br />
      <br />
      <br />
      <div class="text">Weight</div>
      <input
        class="input-field"
        id="Weight"
        type="text"
        placeholder="Weight"
        onChange={(e) => setWeight(e.target.value)}
        required
      />
      <br />
      <br />
      <br />
      <div class="text">Weight Unit</div>
      <input
        class="input-field"
        id="Weight_Unit"
        type="text"
        placeholder="Weight_Unit"
        onChange={(e) => setWeight_Unit(e.target.value)}
        required
      />
      <br />
      <br />
      <br />
      <div class="text">Material</div>
      <input
        class="input-field"
        id="Material"
        type="text"
        placeholder="Material"
        onChange={(e) => setMaterial(e.target.value)}
        required
      />
      <br />
      <br />
      <br />
      <div class="text">Vendor</div>
      <input
        class="input-field"
        id="vendor"
        type="text"
        placeholder="Vendor"
        onChange={(e) => setvendor(e.target.value)}
        required
      />
      <br />
      <br />
      <br />
      <div class="text">Origin Locatons</div>
      <input
        class="input-field"
        id="originLocation"
        type="text"
        placeholder="Origin Locatons"
        onChange={(e) => setoriginLocation(e.target.value)}
        required
      />
      <br />
      <br />
      <br />
      <button class="big-button" id="submit" onClick={sendJSON}>
        Submit
      </button>
      <br />
      <br />
      <br />

      <p>{response}</p>
    </div>
  );
};

export default AddPart;
