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
import { getPart, getProducts } from './helpers';
//import {useHistory} from "react-router-dom";
const baseURL = "https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/AllProducts";
const inventoryURL = "https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/Inventory";






export default function BuyPart() {
    

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
    var used = [];
    //const {partuse, setPartuse} = useState([]);

    

   


    

    React.useEffect(() => {
        axios.get("https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/GetParts").then((response) => {
            setInventory(response.data);
            console.log(response.data);
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
    

    



    

  





  //console.log(bom);
    return (
        <div class="box">
           
           <Link to="/inventory" >Inventory</Link>



           {
                inventory.map(row => {
                    var type = row.PN;
                    var mapping = getProducts();
                   
                    if(row.PN in mapping && !used.includes(row.PN)) {
                        var temp = row.inv_qty;
                        var temp1 = row.inv_loc;
                        var temp2 =row.inv_available_date;
                        used.push(row.PN);
                        return (<div>
                            <table>
                            <tr>
                                <th>Part Number</th>
                                <th>Part Description</th>
                                <th>Order Quantity</th>
                 
                            </tr>
                        <><tr>
                        <td>{row.PN}</td>
                        <td>{row.Description}</td>
                        <td>{mapping[row.PN]}</td>

                    </tr>

                    </>
                    </table>
                    <br/>
                    <table>
                            <tr>
                                <th>Select</th>
                                <th>Vendor</th>
                                <th>Location</th>
                                <th>Unit Cost</th>
                                <th>Shipping</th>
                                <th>Total Cost</th>
                            </tr>
                        
                        {inventory.map(slice => {
                            if(slice.PN===type) {
                                var mapped = mapping[row.PN];
                                mapping.delete(row.PN);
                                console.log(mapping);
                                return(<><tr>
                                    <td><input type="checkbox" id="myCheck"/></td>
                                    <td>{slice.Vendor}</td>
                                    <td>{slice.Country_of_Origin}</td>
                                    <td>{slice.Unit_Cost.toFixed(2)}</td>
                                    <td>20</td>
                                    <td>{(slice.Unit_Cost * mapped).toFixed(2)}</td>
  
                                </tr>
            
                                </>)
                            }
                            else {
                                return null
                            }
                        })}

                    
                    </table>
                    <br/>
                    <br/>
                    </div>)
                }
                else {
                    return null
                }
                    
                }
                    
                )
                }



            
            
            


        
        
        </div>
    );
}
