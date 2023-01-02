import axios from 'axios';
import { useEffect, useState } from 'react';
import '../App.css';
import Table from '../components/Table';
import {
    useParams
  } from "react-router-dom";

function DisplayTable() {
  const [dataTable, setDataTable] = useState([]);
  const [BOMView, setBOMView] = useState([]);
  let { productid } = useParams();
  const payload = {

    product_uid: productid,

    };

  useEffect(() => {

    axios('https://jsonplaceholder.typicode.com/users')
      .then(res => setDataTable(res.data))
      .catch(err => console.log(err))
  ;
    axios.post("https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/GetBOMView", payload)
        .then(res => setBOMView(res.data))
        .catch(err => console.log(err))
}, []);

  //console.log("Bom view", BOMView);  
  const totalParts = BOMView.length;
  var maxLevel = 0;
  var tableList = [];

  for (let i=0; i<totalParts; i++){
    //console.log(BOMView[i]["Level"])
    if (BOMView[i]["BOM_Level"] > maxLevel){
        maxLevel = BOMView[i]["BOM_Level"]
    }
  }

  
  for (let i=0; i<totalParts; i++ ){
    var singleObj = {};
    for (let j=0; j<maxLevel + 1; j++){  
        var colName = "Col " + parseInt(j)
        if (BOMView[i]["BOM_Level"] == j){
            singleObj[colName] = BOMView[i]["BOM_pn"];
        }
        else{
            singleObj[colName] = null;
        }
    }
    singleObj["Qty"] = BOMView[i]["BOM_qty"]
    singleObj["Left"] = BOMView[i]["BOM_lft"]
    singleObj["Right"] = BOMView[i]["BOM_rgt"]
    singleObj["Parent"] = BOMView[i]["BOM_Parent"]
    tableList.push(singleObj)
}


   console.log("Table List", tableList)


//   const column = [
//     { heading: 'Name', value: 'name' },
//     { heading: 'Email', value: 'email' },
//     { heading: 'Phone', value: 'phone' },
//     { heading: 'City', value: 'address.city' },
//     { heading: 'username', value: 'username' },
//   ]


  const column = []
  var firstObj = tableList[0]

  for (const property in firstObj) {
    column.push({ heading: property, value: property })
  }
  

  console.log(column)
  console.log("=====",productid)

  return (
    <div className="DisplayTable">
      <h1>BOM Details</h1>
      <Table data={tableList} column={column} />
    </div>
  );
}

export default DisplayTable;