import React from 'react';
import {Link, useNavigate } from 'react-router-dom';
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
    const [Index, setIndex] = useState(-1);
    const [Edit, setEdit] = useState(0);
    const [SamePart, setSamePart] = useState([]);
    const [NewQty, setNewQty] = useState([]);
    


    React.useEffect(() => {
        axios.get(inventoryURL).then((response) => {
            setInventory(response.data);
        });
        console.log(Inventory);
        
      }, []);


    

    let navigate = useNavigate(); 

    const routeChange = (event) =>{ 
        let id = event.currentTarget.id;
        console.log(event.currentTarget.id);
        setIndex(event.currentTarget.id);
        setEdit(1);

        
        var temp = new Array(); //temp: Contain the element for Same parts
        var temp2 = new Array(); //temp2: Contain the element for newQty
        temp.push(Inventory[id]);
        temp2.push("");
        for(var i = 0; i < Inventory.length; i++){
            if(Inventory[i].inv_pn == Inventory[id].inv_pn && id != i){
                console.log("Fond one");
                setSamePart(prevArray => [...prevArray, i]);
                temp.push(Inventory[i]);
                temp2.push("");
            }
        }
        setSamePart(temp);
        setNewQty(temp2);
        console.log(temp);
        console.log(temp2);
        // let path = `/EditInventory`; 
        // navigate(path);
    }
    
    // document.getElementById('box2').selectedIndex = document.getElementById('box1').selectedIndex;

    function renderTable(Index, Edit){
        if(Index == -1 || SamePart == []){
            return(
                <table>
            <tr>
                <th>Part</th>
                <th>Location</th>
                <th>Qty</th>
                <th></th>
            </tr>

            {
                    Inventory.map((row, index) => (
                        <tr>
                        <td>{row.inv_pn}</td>
                        <td>{row.inv_loc}</td>
                        <td>{row.inv_qty}</td>
                        <td><button class="big-button" onClick={routeChange} id={index}>Adjust</button></td>
                        </tr>
                        
                    ))
            }

        </table>
            );
        }else{
            
            return(
                <table>
            <tr>
                <th>Part</th>
                <th>Location</th>
                <th>Qty</th>
                <th>New Qty</th>
                <th></th>
            </tr>
            {
                SamePart.map((row,num) => (
                    <tr>
                    <td>{SamePart[num].inv_pn}</td>
                    <td>{SamePart[num].inv_loc}</td>
                    <td>{SamePart[num].inv_qty}</td>
                    <td><input  id={num} onChange={changeNewQty} class="input-field" type="text" placeholder="New Qty" required/></td>
                    <td><button id={num} onClick={changeQty}>Save</button></td>
                    </tr>
                ))
                

            }
                 </table>
            );
            
        }
    } 
    
    //set the value of the qty parameter
    function changeNewQty(e){
        let id = e.currentTarget.id;
        var temp = NewQty;
        temp[id] = e.target.value;
        setNewQty(temp);
        console.log(temp);
    }

    //put the new value of qtry to the endpoint
    function changeQty(event){
        let id = event.currentTarget.id;
        console.log(SamePart[id]);
        console.log(NewQty[id]);

        axios.put(inventoryURL, {
            inv_uid: SamePart[id].inv_uid,
            inv_qty: NewQty[id]
          })
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
        });

        var temp = SamePart;
        temp[id].inv_qty = NewQty[id];
        setSamePart([...temp]);
        console.log(temp);
        renderTable(Index, Edit);
    }


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
        {renderTable(Index, Edit)}


        </div>
    );
    


   
}

export default Inventory;