import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { useState, useEffect, Component } from 'react';
import axios from 'axios';
const inventoryURL = "https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/Inventory";

const  EditInventory = () => {
    class RowData{
        constructor(inv_pn, inv_loc, inv_qty){
            this.inv_pn = inv_pn;
            this.inv_loc = inv_loc;
            this.inv_qty = inv_qty;
        }
    }

    const [Inventory, setInventory] = useState([]);
    const [Quantity, setQuantity] = useState();

    React.useEffect(() => {
        axios.get(inventoryURL).then((response) => {
            setInventory(response.data);
        });
        console.log(Inventory);
        
      }, []);




    return(


        <div class="box">
        <h1>Inventory</h1>
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
                <th>Current Qty</th>
                <th>New Qty</th>
                <th></th>
            </tr>

            

            {
                Inventory.map(row => (
                    <tr>
                    <td>{row.inv_pn}</td>
                    <td>{row.inv_loc}</td>
                    <td>{row.inv_qty}</td>
                    <td><input   class="input-field" type="text" placeholder="New Qty" required/></td>
                    <td><button>Save</button></td>
                    </tr>
                ))
            }

        </table>

        </div>
    );
    


}

export default EditInventory;