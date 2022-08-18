import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import NavBar from "./NavBar";
import "./App.css";

const baseURL =
  "https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/AllProducts";
const inventoryURL =
  "https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/Inventory";

class RowData {
  constructor(
    part_uid,
    part,
    qty_per,
    need_qty,
    sub_qty,
    order_qty2,
    unit_price,
    total_price,
    inventory,
    order_qty
  ) {
    this.part_uid = part_uid;
    this.part = part;
    this.qty_per = qty_per;
    this.need_qty = need_qty;
    this.sub_qty = sub_qty;
    this.order_qty2 = order_qty2;
    this.unit_price = unit_price;
    this.total_price = total_price;
    this.inventory = inventory;
    this.order_qty = order_qty;
  }
}

function Landing() {
  let x = 0;
  let sum = 0;
  //let rows = [];
  // let options = null;
  //const history = useHistory();
  const [Rows, setRows] = useState([]);
  const [Top_Level, setTop_Level] = useState();
  const [Desired_Qty, setDesired_Qty] = useState();
  const [Desired_Date, setDesired_Date] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [productId, setProductId] = useState();
  const [bom, setBom] = useState([]);
  const [allocate, setAllocate] = useState([]);
  const [Info, setInfo] = React.useState([]);
  const [index, setIndex] = useState();
  const [parent, setParent] = useState([]);
  const [inventory, setInventory] = useState();
  const [country, setCountry] = useState("US");
  const [options, setOptions] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (index) {
    // options = () =>{for (let i = 0; i < parent.length; i++) {
    //     <option value={parent[i]}>{parent[i]}</option>
    // }};
    // options = parent.map((i) => <option value={parent[i]}>{parent[i]}</option>);
    // console.log(index);
  }

  function splitString(string) {
    let wordArray = [];
    let incompleteWord = "";
    let quotePos = 0;
    //console.log(string);
    for (let i = 0; i < string.length; i++) {
      if (string.charAt(i) === '"') {
        if (quotePos === 0) quotePos = 1;
        else {
          wordArray.push(incompleteWord.trim());
          incompleteWord = "";
          quotePos = 0;
          continue;
        }
      } else {
        if (quotePos === 1) incompleteWord += string.charAt(i);
      }
    }
    return wordArray;
  }
  const getAllocate = (part) => {
    console.log(part);
    console.log(allocate);
    let option = [];
    for (let i in allocate) {
      if (allocate[i]["child_pn"] + "-" + allocate[i]["child_lft"] === part) {
        console.log(allocate[i]["child_pn"]);
        option.push(allocate[i]);
      }
    }
    setOptions(option);
    handleShow();
  };
  const changeBox2 = (event) => {
    console.log(document.getElementById("box1").value);
    setProductId(event.target.value);
    document.getElementById("box2").selectedIndex =
      document.getElementById("box1").selectedIndex;
    console.log(document.getElementById("box1").selectedIndex);
    var temp = document.getElementById("box1").selectedIndex;
    setIndex(temp);

    let parents = Info.map((a) => a.product_parents);
    setParent(parents[document.getElementById("box1").selectedIndex]);
    setTop_Level("A");
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
  };

  const changeBox1 = (event) => {
    console.log(event.target.value);
    document.getElementById("box1").selectedIndex =
      document.getElementById("box2").selectedIndex;
    setIndex(document.getElementById("box2").selectedIndex);
    console.log(index);
    setProductId(document.getElementById("box1").value);
    let parents = Info.map((a) => a.product_parents);
    setParent(parents[document.getElementById("box1").selectedIndex]);
    let string3 =
      '"this is a question"random omitted "answer one" text between quotes "answer two" zzz "answer three"';
    console.log(splitString(parents[0]));
    setTop_Level("A");
  };

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setInfo(response.data);

      let parents = response.data.map((a) => a.product_parents);
      //   console.log(parents);
      setParent(parents[0]);
      setTop_Level("A");
    });
    axios.get(inventoryURL).then((response) => {
      setInventory(response.data);
    });
  }, []);

  let changeTop_Level = (e) => {
    setTop_Level(e.target.value);
    console.log(e.target.value);
  };
  let changeCountry = (e) => {
    setCountry(e.target.value);
    console.log(e.target.value);
  };

  let changeDesired_Qty = (e) => {
    setDesired_Qty(e.target.value);
    console.log(e.target.value);
  };
  let changeDesired_Date = (e) => {
    setDesired_Date(e.target.value);
    console.log(e.target.value);
  };
  let onFileChange = (event) => {
    // Update the state
    //this.setState({ selectedFile: event.target.files[0] });
    setSelectedFile(event.target.files[0]);
  };

  function updateTable(event) {
    event.preventDefault();
    let x = 0;
    let sum = 0;
    let rows = [];
    let data = [];
    console.log(Info.length);

    const postURL =
      "https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/RunOrderList";
    const payload = {
      product_uid: productId,
      product: Top_Level,
      qty: Desired_Qty,
      location: country,
    };
    axios.post(postURL, payload).then((res) => {
      const postURL2 =
        "https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/GetParts";
      axios.get(postURL2).then((response) => {
        console.log("in get Json object");
        console.log(res);
        console.log(res.data.ctb);
        if (res.data.ctb[0] != null) {
          var allParts = response.data;
          setBom(res.data.ctb);
          setAllocate(res.data.allocation);
          //setData(res.data);
          for (let i in res.data.ctb) {
            console.log(i);
            console.log(res.data.ctb[i].GrandParent_BOM_pn);
            console.log(Top_Level);
            if (res.data.ctb[i].GrandParent_BOM_pn === Top_Level) {
              data.push(res.data.ctb[i]);
            }
          }
          console.log(data);
          var list = []; //Define the list of seen children
          var sth = []; //Define the list of ouput rows
          for (let i in data) {
            // if (list.includes(data[i].child_pn)) {
            list.push(data[i].child_pn);
            var tempInv = 0;
            var unitCost = 0;
            var tempUID = 0;
            var order_Qty = 0;
            for (let j in inventory) {
              if (
                inventory[j].inv_pn === data[i].child_pn &&
                inventory[j].inv_loc == country
              ) {
                tempInv += inventory[j].inv_qty;
                tempUID = inventory[j].inv_uid;
              }
            }
            for (let j in allParts) {
              if (allParts[j].PN === data[i].child_pn) {
                unitCost = allParts[j].Unit_Cost;
              }
            }
            // order_Qty =
            //   data[i].RequiredQty - data[i].subAssemblyQty - data[i].rawInv;
            order_Qty = data[i].RequiredQty - data[i].childInv;
            console.log(order_Qty);
            console.log(data[i].child_pn, String(data[i].child_lft));
            var row = new RowData(
              tempUID,
              data[i].child_pn + "-" + String(data[i].child_lft),
              data[i].QtyPerAssembly,
              data[i].RequiredQty,
              data[i].childInv,
              order_Qty,
              unitCost,
              10,
              data[i].rawInv,
              data[i].orderQty
            );
            console.log(row);
            rows.push(row);
            // } else {
            //   //update the value of reqQty
            //   rows.find((r) => r.part === data[i].child_pn).qty_per +=
            //     data[i].RequiredQty;
            // }
          }

          for (let i in rows) {
            rows[i].need_qty = rows[i].qty_per * Desired_Qty;
            // rows[i].order_qty = Math.max(
            //   0,
            //   data[i].RequiredQty - data[i].subAssemblyQty - data[i].rawInv
            // );
            rows[i].order_qty = Math.max(
              0,
              data[i].RequiredQty - data[i].childInv
            );
            rows[i].total_price = rows[i].unit_price * rows[i].order_qty;
            rows[i].total_price = rows[i].total_price.toFixed(2);
          }
          setRows(rows);
          console.log(rows);
        } else {
          console.log("bad");
          //this.setState({ data: "Please enter a valid Product UID" });

          //setData("Please enter a valid Product UID")
        }
      });
    });

    //Create a list of bom object that has GP == A
  }

  async function onFileUpload() {
    // Create an object of formData
    const payload =
      "https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/ImportFile";
    const formData = new FormData();

    // Update the formData object
    formData.append("filepath", selectedFile, selectedFile.name);

    // Details of the uploaded file
    // console.log(this.state.selectedFile);

    // Request made to the backend api
    // Send formData object
    await axios.post(payload, formData).then((response) => {
      // console.log('###')
      console.log(response);
      console.log(response.data);
      // this.setState({
      //     productId: response.data,
      // })
      setProductId(response.data);
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
    });
    await axios.get(baseURL).then((response) => {
      setInfo(response.data);
      console.log("hi");
      //document.getElementById('box1').selectedIndex = response.data.length -1;
      setTimeout(() => {
        var len = response.data.length - 1;
        document.getElementById("box1").selectedIndex = len;
        document.getElementById("box2").selectedIndex = len;

        let parents = response.data.map((a) => a.product_parents);
        setParent(parents[document.getElementById("box1").selectedIndex]);
        setTop_Level("A");

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
  }

  //console.log(bom);
  return (
    <div class="box">
      <h1>Clear to Build</h1>

      <NavBar></NavBar>

      <br />
      <div class="text">Upload Your BOM</div>
      <br />
      <input type="file" onChange={onFileChange} />
      <button type="button" class="big-button" onClick={onFileUpload}>
        Upload BOM
      </button>
      <br />
      <br />
      <br />
      <label>Choose a product_uid: </label>
      <select id="box1" onChange={changeBox2}>
        {Info.map((info) => (
          <option value={info.product_uid}>{info.product_uid}</option>
        ))}
      </select>
      <br />
      <br />
      <br />
      <label>Choose a product_desc: </label>
      <select id="box2" onChange={changeBox1}>
        {Info.map((info) => (
          <option value={info.product_desc}>{info.product_desc}</option>
        ))}
      </select>
      <br />
      <br />
      <br />
      <label>Choose a product_parents: </label>
      <select id="box3" onChange={changeTop_Level}>
        {splitString(parent).map((p) => (
          <option value={p}>{p}</option>
        ))}
        {/* {<option value={parent}>{parent}</option>}
            {console.log(parent[1])} */}
      </select>
      <br />
      <br />
      <br />

      <form action="#">
        <div class="text">Enter Desired Qty</div>
        {/* <button class="small-button">Save</button> */}
        <input
          value={Desired_Qty}
          onChange={changeDesired_Qty}
          class="input-field"
          type="text"
          placeholder="Desired Qty"
          required
        />
      </form>
      <br />
      <br />
      <br />
      <form action="#">
        <div class="text">Enter Desired Date</div>
        {/* <button class="small-button">Save</button> */}
        <input
          value={Desired_Date}
          onChange={changeDesired_Date}
          class="input-field"
          type="date"
          placeholder="Desired Qty"
          required
        />
      </form>
      <br />
      <br />
      <br />
      <label>Choose a Location: </label>
      <select id="box4" onChange={changeCountry}>
        <option value="US">US</option>
        <option value="France">France</option>
        <option value="Germany">Germany</option>
      </select>
      <br />
      <br />
      <br />

      <div class="text">Run Clear To Build</div>
      <button class="big-button" onClick={updateTable}>
        Run Clear To Build
      </button>

      <br />
      <br />
      <br />

      <table style={{ width: "100%" }}>
        <caption class="table-title">
          Product {Top_Level} Qty {Desired_Qty}
        </caption>
        <tr>
          <th style={{ width: "10%" }}>Part ID</th>
          <th style={{ width: "10%" }}>Part</th>
          <th style={{ width: "10%" }}>Qty Per Assembly</th>
          <th style={{ width: "10%" }}>Required Qty</th>
          <th style={{ width: "10%" }}>Sub Assembly Qty</th>
          <th style={{ width: "10%" }}>Delta Qty</th>
          <th style={{ width: "10%" }}>Unit Price</th>
          <th style={{ width: "10%" }}>Total Price</th>
          <th style={{ width: "10%" }}>Raw Inventory</th>
          <th style={{ width: "10%" }}>Order Qty</th>
        </tr>

        {Rows.map((row) => (
          <tr>
            <td>{row.part_uid}</td>
            <td>{row.part}</td>
            <td>{row.qty_per}</td>
            <td>{row.need_qty}</td>
            <td>{row.sub_qty}</td>
            <td>{row.order_qty2}</td>
            <td>{row.unit_price}</td>
            <td>{row.total_price}</td>
            <td>
              <button onClick={() => getAllocate(row.part)}>
                Get Allocation
              </button>
            </td>
            <td>{row.order_qty}</td>
          </tr>
        ))}
      </table>
      <br></br>
      <button style={{ float: "right", marginRight: "500" }}>Buy Parts</button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        animation={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <tr>
            <th>Invoice ID</th>
            <th>Parent</th>
            <th>Qty Per Assembly</th>
            <th>Required Qty</th>
            <th>Sub Assembly Qty</th>
          </tr>

          {options.map((option) => (
            <tr>
              <td>{option.inv_uid}</td>
              <td>{option.parent_pn}</td>
              <td>{option.Qty_per}</td>
              <td>{option.RequiredQty}</td>
              <td>{option.SubAssyQty}</td>
            </tr>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Landing;
