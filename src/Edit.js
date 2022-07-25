import logo from './logo.svg';
//import './App.css';
//import bom from './bom';
import axios from 'axios';
//import New from './new';
import { useState, useEffect, useContext } from 'react';
import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom';
import AddPart from './AddPart';
import { LandingContext } from './App';
//import {useHistory} from "react-router-dom";
const baseURL = "https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/AllProducts";
const inventoryURL = "https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/Inventory";






export default function Edit({setPart}) {
    

    let x = 0;
    let sum = 0;
    //let rows = [];
    let options = null;
    //const history = useHistory();
    const [Rows, setRows] = useState([]);
    const [Top_Level, setTop_Level] = useState();
    const [Desired_Qty, setDesired_Qty] = useState();
    const [selectedFile, setSelectedFile] = useState();
    const [productId, setProductId] = useState();
    const [bom, setBom] = useState([]);
    const [Info, setInfo] = React.useState([]);
    const [index, setIndex] = useState();
    const [parent, setParent] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [country, setCountry] = useState("");
    const {part} = useContext(LandingContext);

    

   


    

    React.useEffect(() => {
       
        axios.get(inventoryURL).then((response) => {
            setInventory(response.data);
            console.log(response.data);
        });
        
      }, []);
      function patch(id, quantity) {
        console.log("clicked");
        console.log(id);
        console.log(quantity);
        const payload = 
            {
                inv_uid: id,
                inv_qty: quantity
                }
            axios.put(inventoryURL, payload).then((res) => {
                axios.get(inventoryURL).then((response) => {
                    setInventory(response.data);
                    console.log(response.data);
                });
            })
        
      }

      function poster() {
        console.log("clicked");
        console.log(country);
        console.log(Desired_Qty);
        const payload = 
            {
                PN: "A",
                Country_of_Origin: country,
                Current_Inventory: Desired_Qty,
                Current_Inventory_Unit: "each"
            }
            axios.post(inventoryURL, payload).then((res) => {
                axios.get(inventoryURL).then((response) => {
                    setInventory(response.data);
                    console.log(response.data);
                });
            })
        
      }
    

    



    

  





  //console.log(bom);
    return (
        <div>
           
           <Link to="/inventory" >Inventory</Link>

            <table>
            <caption class="table-title">Product Qty Location</caption>
            <tr>
                <th>Part</th>
                <th>Quantiy</th>
                <th>Location</th>
 
            </tr>

            {
                inventory.map(row => {
                    if(row.inv_pn==="A") {
                        var temp = row.inv_qty;
                        return (<><tr>
                        <td>{row.inv_pn}</td>
                        <td><input  class="input-field" id="partNumber" type="text" placeholder={row.inv_qty} onChange={e => {temp = e.target.value}}/></td>
                        <td>{row.inv_loc}</td>
                        
                        <td><button class="big-button" id="submit" onClick={
                            () => patch(row.inv_uid, temp)                     
                            }>Save</button></td>
                    </tr>

                    </>)
                }
                else {
                    return null
                }
                    
                }
                    
                )

                

                }
                <><tr>
                    <td>A</td>
                    <td><input  class="input-field" id="partNumber" type="text" placeholder="Enter Quantity" onChange={(event) => setDesired_Qty(event.target.value)}/></td>
                    <td><input  class="input-field" id="partNumber" type="text" placeholder="Enter Location" onChange={(event) => setCountry(event.target.value)}/></td>
                    
                    <td><button class="big-button" id="submit" onClick={
                        () => poster()                    
                        }>Save</button></td>
                </tr>

                </>

            
            </table>
            


        
        
        </div>
    );
}
