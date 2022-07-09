import logo from './logo.svg';
import './App.css';
//import bom from './bom';
import axios from 'axios';
//import New from './new';
import { useState, useEffect } from 'react';
import React from 'react'
import ReactDOM from 'react-dom'
const baseURL = "https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/AllProducts";



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
    let options = null;

    const [Rows, setRows] = useState([]);
    const [Top_Level, setTop_Level] = useState();
    const [Desired_Qty, setDesired_Qty] = useState();
    const [selectedFile, setSelectedFile] = useState();
    const [productId, setProductId] = useState();
    const [bom, setBom] = useState([]);
    const [Info, setInfo] = React.useState([]);
    const [index, setIndex] = useState();
    const [parent, setParent] = useState([]);

    if (index) {
        
        // options = () =>{for (let i = 0; i < parent.length; i++) {
        //     <option value={parent[i]}>{parent[i]}</option>
        // }};
        // options = parent.map((i) => <option value={parent[i]}>{parent[i]}</option>);
        console.log(index);

    }

    function splitString(string) {
        let wordArray = []
        let incompleteWord = ""
        let quotePos = 0;
        //console.log(string);
        for(let i = 0; i < string.length; i++) {
          if(string.charAt(i) === '"'){
            if(quotePos === 0)
              quotePos = 1
            else {
              wordArray.push(incompleteWord.trim())
              incompleteWord = ""
              quotePos = 0
              continue
            }
          } else {
            if(quotePos === 1)
             incompleteWord += string.charAt(i)
          }
        }
        return wordArray
      }


    const changeBox2 = () => {
        document.getElementById('box2').selectedIndex = document.getElementById('box1').selectedIndex;
        console.log(document.getElementById('box1').selectedIndex)
        var temp = document.getElementById('box1').selectedIndex;
        setIndex(temp);

        let parents = Info.map(a => a.product_parents);
        setParent(parents[document.getElementById('box1').selectedIndex]);

            // setIndex(document.getElementById('box1').selectedIndex);
            

        // useEffect(() => console.log("re-render because x changed:", index), []);
            // setIndex(temp);
            // console.log(temp);


        // setIndex(document.getElementById('box1').selectedIndex);
        // var temp = document.getElementById('box1').selectedIndex;
        // this.setIndex({value: temp}, function () {
        //     console.log(this);
        // });
         
        // useIndex(() => console.log(index));
        // console.log(this.index);
    }

    const changeBox1 = () => {
        document.getElementById('box1').selectedIndex = document.getElementById('box2').selectedIndex;
        setIndex(document.getElementById('box2').selectedIndex);
        console.log(index);

        let parents = Info.map(a => a.product_parents);
        setParent(parents[document.getElementById('box1').selectedIndex]);
        let string3 = '"this is a question"random omitted "answer one" text between quotes "answer two" zzz "answer three"'
        console.log(splitString(parents[0]));
    }

    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
            setInfo(response.data);
        });
      }, []);
    

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



    function updateTable(event){
        event.preventDefault();
        let x = 0;
        let sum = 0;
        let rows = [];
        let data = [];
        console.log(Info.length);
      
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

    async function onFileUpload(){

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
      await axios.post(payload, formData)
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
            await axios.get(baseURL).then((response) => {
                setInfo(response.data);
                console.log("hi");
                //document.getElementById('box1').selectedIndex = response.data.length -1;
                setTimeout(() => {
                    var len = response.data.length-1;
                     document.getElementById('box1').selectedIndex = len;
                     document.getElementById('box2').selectedIndex = len;

                    let parents = response.data.map(a => a.product_parents);
                    setParent(parents[document.getElementById('box1').selectedIndex]);

                     //let parents = Info.map(a => a.product_parents);
                     //setParent(parents[document.getElementById('box1').selectedIndex]);
                });
                //var len = response.data.length;
                // while(len>Info.length) {
                //      len -= 0.1;
                //      //console.log(len + "  " + Info.length);
                //  }
                
            });
            console.log("reached set info");
            console.log(Info);
            console.log(Info.length);
            //document.getElementById('box2').selectedIndex = -1;
            
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
        <label>Choose a product_uid: </label>
        <select id="box1" onChange={changeBox2}>
            {
                Info.map(info => (
                    
                    <option value={info.product_uid}>{info.product_uid}</option>
                ))
            }
        </select>
        <br/>
        <br/>
        <br/>
        <label>Choose a product_desc: </label>
        <select id="box2" onChange={changeBox1}>
            {
                Info.map(info => (
                    
                    <option value={info.product_desc}>{info.product_desc}</option>
                ))
            }
        </select>
        <br/>
        <br/>
        <br/>
        <label>Choose a product_parents: </label>
        <select id="box3" >
            {
                splitString(parent).map(p => (
                    
                    <option value={p}>{p}</option>
                ))
            }
            {/* {<option value={parent}>{parent}</option>}
            {console.log(parent[1])} */}
        </select>
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
        
            <div class="text">Run Clear To Build</div>
            <button class="big-button" onClick={updateTable}>Run Clear To Build</button>
        

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