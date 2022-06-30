import logo from './logo.svg';
import './App.css';
import bom from './bom';
import New from './new';
import { useState } from 'react';

function updateTable(){
  // console.log(bom);
  // for (let key in bom) {
  //   console.log(key, bom[key]);

  // }
  let x = 0;
  let sum = 0;
  let rows = [];
  let data = [];

//   for(let i = 0; bom[i].GrandParent_BOM_pn == "A"; i++){
//     rows.push(new RowData(bom[i].Child_pn, bom[i].Qty_per, bom[i].Qty_per));
//     // console.log(bom[x].Qty_per);
//     // sum += bom[x].Qty_per;
//     // x++;
//   }

  
  //Create a list of bom object that has GP == A
  for(let i in bom){
    if (bom[i].GrandParent_BOM_pn == "A") {
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

  console.log(rows);

}

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

    const [rows, setRows] = useState([]);


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
            <input class="input-field" type="text" placeholder="Top Level Assy" required/>
        </form>
        <br/>
        <br/>
        <br/>
        <form action="#">
            <div class="text">Enter Desired Qty</div>
            <button class="small-button">Save</button>
            <input class="input-field" type="text" placeholder="Desired Qty" required/>
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
            <tr>
                <td>J</td>
                <td>5.0</td>
                <td>50</td>
            </tr>
            <tr>
                <td>K</td>
                <td>9.0</td>
                <td>90</td>
            </tr>
            <tr>
                <td></td>
                <td>...</td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
            </tr>

            
        </table>

        <New>z</New>
        
        </div>
    );
}

export default App;
