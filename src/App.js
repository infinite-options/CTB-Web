import logo from './logo.svg';
import './App.css';
//import bom from './bom';
import axios from 'axios';
//import New from './new';
import { useState } from 'react';
import React from 'react'
import ReactDOM from 'react-dom'



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
    const [selectedFile, setSelectedFile] = useState();
    const [productId, setProductId] = useState();
    const [bom, setBom] = useState([]);

    let changeTop_Level = (e) =>{
        setTop_Level(e.target.value);
        console.log(e.target.value);
    }

    let changeDesired_Qty = (e) =>{
        setDesired_Qty(e.target.value);
        console.log(e.target.value);
    }
    let onFileChange = (event) => {

      // Update the state
      //this.setState({ selectedFile: event.target.files[0] });
      setSelectedFile(event.target.files[0]);

  };



    function updateTable(){
        let x = 0;
        let sum = 0;
        let rows = [];
        let data = [];
      
        const postURL = "https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/RunCTB"
              const payload = {
                  "product_uid": productId
              }
              axios.post(postURL, payload).then((res) => {
                  console.log("in get Json object");
                  console.log(res);
                  console.log(res.data[0]);
                  if(res.data[0]!=null) {
                      setBom(res.data);
                      //setData(res.data);
                      for(let i in res.data){
                        if (res.data[i].GrandParent_BOM_pn == Top_Level) {
                            data.push(res.data[i])
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
                  else {
                      console.log("bad");
                      //this.setState({ data: "Please enter a valid Product UID" });
                      
                      //setData("Please enter a valid Product UID")
                  }
              
              })
        
        //Create a list of bom object that has GP == A

    }

    function onFileUpload(){

      // Create an object of formData
      const payload = "https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/ImportFile"
      const formData = new FormData();

      // Update the formData object
      formData.append(
          "filepath",
          selectedFile,
          selectedFile.name
      );

      // Details of the uploaded file
      // console.log(this.state.selectedFile);

      // Request made to the backend api
      // Send formData object
      axios.post(payload, formData)
          .then((response) => {
              // console.log('###')
              console.log(response);
              console.log(response.data)
              // this.setState({
              //     productId: response.data,
              // })
              setProductId(response.data)
              //console.log(this.state.tempUID);
              console.log(productId);
              // const postURL = "https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/RunCTB"
              // const payload = {
              //     "product_uid": response.data
              // }
              // axios.post(postURL, payload).then((res) => {
              //     console.log("in get Json object");
              //     console.log(res);
              //     console.log(res.data[0]);
              //     if(res.data[0]!=null) {
              //         this.setState({ data: res.data });
              //         //setData(res.data);
                      
              //     }
              //     else {
              //         console.log("bad");
              //         this.setState({ data: "Please enter a valid Product UID" });
              //         //setData("Please enter a valid Product UID")
              //     }
              
              })
              // console.log(response.data);
              // console.log(response.status);
              // console.log(response.statusText);
              // console.log(response.headers);
              // console.log(response.config);
      //         fetch(PRODUCTS_API_URL)
      // .then(response => response.json()).then(response => {
      //             console.log(response);
      //             console.log(response[response.length - 1]);
      //             this.setState({
                      
      //                 products: response
      //             })
      //             console.log(this.products);
      //         })
              
      //     }, (error) => {
      //         console.log(error);
      //     });
          
  };



  //console.log(bom);
    return (
        <div class="box">
        <h1>Clear to Build</h1>
        <br/>
        <div class="text">Upload Your BOM</div>
        <br/>
        <input type="file" onChange={onFileChange} />
        <button type="button" class="big-button" onClick={onFileUpload}>Upload BOM</button>
        <br/>
        <br/>
        <br/>
        <form action="#">
            <div class="text">Enter Product ID</div>
            {/* <button class="small-button">Save</button> */}
            <input class="input-field" value={productId} onChange={(e)=>setProductId(e.target.value)} type="text" placeholder="Product ID" required/>
        </form>
        <br/>
        <br/>
        <br/>

        <form action="#">
            <div class="text">Enter Top Level Assy</div>
            {/* <button class="small-button">Save</button> */}
            <input value={Top_Level} onChange={changeTop_Level} class="input-field" type="text" placeholder="Top Level Assy" required/>
        </form>
        <br/>
        <br/>
        <br/>
        <form action="#">
            <div class="text">Enter Desired Qty</div>
            {/* <button class="small-button">Save</button> */}
            <input value={Desired_Qty} onChange={changeDesired_Qty} class="input-field" type="text" placeholder="Desired Qty" required/>
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

        <table>
            <caption class="table-title">Product {Top_Level} Qty {Desired_Qty}</caption>
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