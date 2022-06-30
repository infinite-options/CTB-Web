import logo from './logo.svg';
import './App.css';
import bom from './bom';
import New from './new';
import { useState } from 'react';



class RowData{
    constructor(part, qty_per, order_qty){
        this.part = part;
        this.qty_per = qty_per;
        this.order_qty = order_qty;
    }
}

function App() {
    

    let x = 0;
    let sum = 0;
    //let rows = [];

    const [Rows, setRows] = useState([]);
    const [Top_Level, setTop_Level] = useState();
    const [Desired_Qty, setDesired_Qty] = useState();

    let changeTop_Level = (e) =>{
        setTop_Level(e.target.value);
        console.log(e.target.value);
    }

    let changeDesired_Qty = (e) =>{
        setDesired_Qty(e.target.value);
        console.log(e.target.value);
    }



    function updateTable(){
        let x = 0;
        let sum = 0;
        let rows = [];
        let data = [];
      
        
        //Create a list of bom object that has GP == A
        for(let i in bom){
          if (bom[i].GrandParent_BOM_pn == Top_Level) {
              data.push(bom[i])
          }
        }
      
        var list = [];//Define the list of seen children
        var sth = [];//Define the list of ouput rows
        for(let i in data){
          if (!list.includes(data[i].Child_pn)) {
              list.push(data[i].Child_pn);
              var row = new RowData(data[i].Child_pn, data[i].RequiredQty, data[i].RequiredQty);
              rows.push(row);
          }   
          else{
              //update the value of reqQty
              rows.find(r => r.part === data[i].Child_pn).qty_per += data[i].RequiredQty
          }
        }

        for(let i in rows){
            rows[i].order_qty = rows[i].qty_per * Desired_Qty;
        }
        setRows(rows);
        console.log(rows);
    }



  //console.log(bom);
    return (
        <div class="box">
        <h1>Clear to Build</h1>
        <br/>
        <div class="text">Upload Your BOM</div>
        <button class="big-button" >Upload Your BOM</button>
        <br/>
        <br/>
        <br/>
        <form action="#">
            <div class="text">Enter Product ID</div>
            <button class="small-button">Save</button>
            <input class="input-field" type="text" placeholder="Product ID" required/>
        </form>
        <br/>
        <br/>
        <br/>
        <form action="#">
            <div class="text">Run Clear To Build</div>
            <button class="big-button" onClick={updateTable}>Run Clear To Build</button>
            
        </form>
        <br/>
        <br/>
        <br/>
        <form action="#">
            <div class="text">Enter Top Level Assy</div>
            <button class="small-button">Save</button>
            <input value={Top_Level} onChange={changeTop_Level} class="input-field" type="text" placeholder="Top Level Assy" required/>
        </form>
        <br/>
        <br/>
        <br/>
        <form action="#">
            <div class="text">Enter Desired Qty</div>
            <button class="small-button">Save</button>
            <input value={Desired_Qty} onChange={changeDesired_Qty} class="input-field" type="text" placeholder="Desired Qty" required/>
        </form>
        <br/>
        <br/>
        <br/>
        <br/>

        <table>
            <caption class="table-title">Product A Qty 10</caption>
            <tr>
                <th>Part</th>
                <th>Qty Per</th>
                <th>Order Qty</th>
            </tr>

            {
                Rows.map(row => (
                    <tr>
                    <td>{row.part}</td>
                    <td>{row.qty_per}</td>
                    <td>{row.order_qty}</td>
                    </tr>
                ))
            }

            
        </table>

        
        
        </div>
    );
}

export default App;
