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
import { setPart } from './helpers';
//import {useHistory} from "react-router-dom";
const baseURL = "https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/AllProducts";
const inventoryURL = "https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/Inventory";






export default function Inventory() {
    

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
    const [country, setCountry] = useState("US");

    

   


    

    React.useEffect(() => {
       
        axios.get(inventoryURL).then((response) => {
            setInventory(response.data);
            console.log(response.data);
        });
        
      }, []);
      function changePart(a) {
        console.log(a);
        setPart(a);
      }
    

    



    

  





  //console.log(bom);
    return (
        <div class="box">
           <nav style={{
        borderTop: "solid 1px",
        paddingTop: "1rem",
      }}>
      <div id="outer">
      <Link to="/" style={{display: 'inline-block',  padding: "10px", paddingLeft: "0px"}}>CTB</Link>
      <Link to="/addparts" style={{display: 'inline-block',  padding: "10px"}}>Add Parts</Link>
      <Link to="/inventory" style={{display: 'inline-block',  justifyContent:'center', padding: "10px"}}> Inventory</Link>
      <Link to="/editpart" style={{display: 'inline-block',  padding: "10px"}}>Edit Parts</Link>
      </div>
    </nav>
            <table>
            <caption class="table-title">Product Qty Location</caption>
            <tr>
                <th>Part</th>
                <th>Quantiy</th>
                <th>Location</th>
 
            </tr>

            


{
                inventory.map(row => {
                    if(true) {
                        var temp = row.inv_pn
                        return (<><tr>
                            <td>{row.inv_pn}</td>
                            <td>{row.inv_qty}</td>
                            <td>{row.inv_loc}</td>
                            <td>
                            <Link to="/edit">
                                <button type="button" class="small-button" onClick={() =>changePart(temp)}>Adjust</button>
                            </Link>
                                </td>
                        </tr>
                            
                        </>)
                }
                else {
                    return null
                }
                    
                }
                    
                )
                }

            
            </table>
            


        
        
        </div>
    );
}

