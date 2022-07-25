import logo from './logo.svg';
import './App.css';
//import bom from './bom';
import axios from 'axios';
//import New from './new';
import { useState, useEffect, useContext } from 'react';
import React from 'react'
import { LandingContext } from './App';
//import {useHistory} from "react-router-dom";
const baseURL = "https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/AllProducts";
const inventoryURL = "https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/Inventory";






export default function SpecificPart() {
    

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
    const {part} = useContext(LandingContext);

    

   


    

    React.useEffect(() => {
       
        axios.get(inventoryURL).then((response) => {
            setInventory(response.data);
            console.log(response.data);
        });
        
      }, []);
    

    



    

  





  //console.log(bom);
    return (
        <div>
           
            <table>
            <caption class="table-title">Product Qty Location</caption>
            <tr>
                <th>Part</th>
                <th>Quantiy</th>
                <th>Location</th>
 
            </tr>

            {
                inventory.map(row => {
                    if(row.inv_pn==="C") {
                        return (<><tr>
                        <td>{row.inv_pn}</td>
                        <td>{row.inv_qty}</td>
                        <td>{row.inv_loc}</td>
                    </tr>

                    </>)
                }
                else {
                    return null
                }
                    
                }
                    
                )}

            
            </table>
            <h1>Hi</h1>
            


        
        
        </div>
    );
}
