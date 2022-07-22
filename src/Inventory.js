import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { useState, useEffect, Component } from 'react';
import axios from 'axios';
const inventoryURL = "https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/Inventory";

const  Inventory = () => {
    class RowData{
        constructor(inv_pn, inv_loc, inv_qty){
            this.inv_pn = inv_pn;
            this.inv_loc = inv_loc;
            this.inv_qty = inv_qty;
        }
    }

    const [Inventory, setInventory] = useState([]);

    React.useEffect(() => {
        axios.get(inventoryURL).then((response) => {
            setInventory(response.data);
        });
        console.log(Inventory);
        
      }, []);


    
    

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
        <br></br>
        <br></br>
        <table>
            <tr>
                <th>Part</th>
                <th>Location</th>
                <th>Qty</th>
                <th></th>
            </tr>

            {console.log(Inventory)}

            {
                Inventory.map(row => (
                    <tr>
                    <td>{row.inv_pn}</td>
                    <td>{row.inv_loc}</td>
                    <td>{row.inv_qty}</td>
                    <td><button class="big-button">Adjust</button></td>
                    </tr>
                ))
            }

        </table>


        </div>
    );
    


}

export default Inventory;