import logo from './logo.svg';
import './App.css';
//import bom from './bom';
import axios from 'axios';
//import New from './new';
import { useState, useEffect, useContext } from 'react';
import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom';
import AddPart from './AddPart';
import { LandingContext } from './App';
import { getPart } from './helpers';
//import {useHistory} from "react-router-dom";
const baseURL = "https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/AllProducts";
const inventoryURL = "https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/Inventory";






export default function Edit() {
    

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
    const [inventorySort, setInventorySort] = useState([]);
    const [inventoryunSort, setInventoryunSort] = useState([]);
    const [country, setCountry] = useState("");
    const [mode, setMode] = useState(0);
    //const {partuse, setPartuse} = useState([]);

    

   


    

    React.useEffect(() => {
        axios.get(inventoryURL).then((response) => {
            setInventory(response.data);
            setInventoryunSort(response.data);
            console.log(response.data);
            //
        });
        axios.get(inventoryURL).then((response) => {
            var temp = response.data;
            temp.sort((a,b) => (a.inv_loc > b.inv_loc) ? 1 : ((b.inv_loc > a.inv_loc) ? -1 : 0))
            setInventorySort(temp);
            console.log(temp);
            //
        });
        
      }, []);
      function patch(id, quantity, location, date) {
        console.log("clicked");
        console.log(id);
        console.log(quantity);
        const payload = 
            {
                inv_uid: id,
                inv_qty: quantity,
                inv_loc: location,
                inv_available_date: date
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
                PN: getPart(),
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
      function sort() {
        if(mode===0) {
            setInventory(inventorySort);
        }
        else {
            setInventory(inventoryunSort);
        }
        var temp = mode;
        setMode(1-temp);
      }
      
    

    



    

  





  //console.log(bom);
    return (
        <div class="box">
           
           <Link to="/inventory" >Inventory</Link>

            <table>
            <caption class="table-title">Product Qty Location</caption>
            <tr>
                <th>Part</th>
                <th>Quantiy</th>
                <th>Location <button onClick={e => sort()}>sort</button></th>
                <th>Availability</th>
                <th>New Location</th>
                <th>Arrival Date</th>
 
            </tr>

            {
                inventory.map(row => {
                    if(row.inv_pn===getPart()) {
                        var temp = row.inv_qty;
                        var temp1 = row.inv_loc;
                        var temp2 =row.inv_available_date;
                        return (<><tr>
                        <td>{row.inv_pn}</td>
                        <td><input  class="input-field" id="partNumber" type="text" placeholder={row.inv_qty} onChange={e => {temp = e.target.value}}/></td>
                        <td>{row.inv_loc}</td>
                        <td>{row.inv_available_date}</td>
                        <td><input  class="input-field" id="partNumber" type="text" placeholder="" onChange={e => {temp1 = e.target.value}}/></td>
                        <td><input  class="input-field" id="partNumber" type="text" placeholder="yyyy-mm-dd" onChange={e => {temp2 = e.target.value}}/></td>
                        
                        <td><button class="big-button" id="submit" onClick={
                            () => patch(row.inv_uid, temp, temp1, temp2)                     
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
                    <td>{getPart()}</td>
                    <td><input  class="input-field" id="partNumber" type="text" placeholder="Enter Quantity" onChange={(event) => setDesired_Qty(event.target.value)}/></td>
                    <td><input  class="input-field" id="partNumber" type="text" placeholder="Enter Location" onChange={(event) => setCountry(event.target.value)}/></td>
                    <td></td>
                    <td></td>
                    <td><button class="big-button" id="submit" onClick={
                        () => poster()                    
                        }>Save</button></td>
                </tr>

                </>

            
            </table>
            
            


        
        
        </div>
    );
}
