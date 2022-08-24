import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import NavBar from "./NavBar";
import "./App.css";
import "./home.css";
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
    delta_qty,
    allocatable_qty,
    allocated_qty,
    delta2_qty,
    inventory,
    available_inv,
    allocated,
    final_order_qty,
    unit_price,
    total_price
  ) {
    this.part_uid = part_uid;
    this.part = part;
    this.qty_per = qty_per;
    this.need_qty = need_qty;
    this.sub_qty = sub_qty;
    this.delta_qty = delta_qty;
    this.allocatable_qty = allocatable_qty;
    this.allocated_qty = allocated_qty;
    this.delta2_qty = delta2_qty;
    this.inventory = inventory;
    this.available_inv = available_inv;
    this.allocated = allocated;
    this.final_order_qty = final_order_qty;
    this.unit_price = unit_price;
    this.total_price = total_price;
  }
}

function Landing() {
  let x = 0;
  let sum = 0;
  let inputRef = React.useRef();
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
  const [selectedPartID, setSelectedPartID] = useState([]);
  const [selectedInvUID, setSelectedInvUID] = useState([]);
  const [selectedPrevInvUID, setSelectedPrevInvUID] = useState("");
  const [selectedChildrenID, setSelectedChildrenID] = useState([]);
  const [allocationQty, setAllocationQty] = useState(0);

  const [allocatedQty, setAllocatedQty] = useState(0);
  const [prevValue, setPrevValue] = useState(0);
  const [allocationObject, setAllocationObject] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setAllocationQty(0);
    setPrevValue(0);
    setSelectedPrevInvUID("");
    setSelectedInvUID([]);
    setSelectedChildrenID([]);
    setAllocatedQty(0);
  };
  const handleShow = () => setShow(true);

  console.log("allocationObject", allocationObject);
  // save changes function for allocation
  const handleSave = () => {
    let payload = [];
    let tempPayload = [];
    console.log(options);
    tempPayload = options.map((option) => {
      return option.child_pn === selectedPartID.split("-")[0] &&
        option["allocate"] !== 0 &&
        option["original_allocate"] < option["allocate"]
        ? {
            product_uid: productId,
            inv_uid: option["inv_uid"],
            assembly: option["parent_pn"],
            assy_lft: option["gp_lft"],
            allocated: parseInt(option["allocate"]),
          }
        : option.child_pn === selectedPartID.split("-")[0] &&
          option["allocate"] !== 0 &&
          option["original_allocate"] > option["allocate"]
        ? {
            product_uid: productId,
            inv_uid: option["inv_uid"],
            assembly: option["parent_pn"],
            assy_lft: option["gp_lft"],
            allocated:
              parseInt(option["allocate"]) -
              parseInt(option["original_allocate"]),
          }
        : "";
    });
    console.log(tempPayload);

    for (let i = 0; i < tempPayload.length; i++) {
      if (tempPayload[i] !== "") {
        payload.push(tempPayload[i]);
      }
    }
    console.log(payload);
    const postURL =
      "https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/Allocation";
    // const payload = allocationObject;
    axios.post(postURL, payload).then((res) => {
      console.log(res);
      // axios
      //   .get(
      //     `https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/GetAllocation/${productId}`
      //   )
      //   .then((response) => {
      //     console.log(response);

      //     setAllocationObject(response.data);
      //   });
    });
    setShow(false);
    setAllocationQty(0);
    setSelectedInvUID("");
    setSelectedPrevInvUID("");
    setSelectedInvUID([]);
    setSelectedChildrenID([]);
    updateTable();
  };
  console.log(Rows);

  // split string function
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
    // console.log(part);
    // console.log(Desired_Date);
    // console.log(allocate);
    let option = [];
    for (let i in allocate) {
      if (
        allocate[i]["gp_lft"] < parseInt(part.split("-")[1]) &&
        parseInt(part.split("-")[1]) < allocate[i]["gp_rgt"] &&
        allocate[i]["inv_available_date"] < Desired_Date
      ) {
        for (let j in Rows) {
          if (
            Rows[j]["part"] ===
            allocate[i]["child_pn"] + "-" + allocate[i]["child_lft"]
          ) {
            allocate[i]["order"] =
              allocationObject.length > 0
                ? allocationObject.map((al) =>
                    al.child_pn + "-" + al.child_lft === Rows[j]["part"]
                      ? Rows[j]["delta2_qty"]
                      : Rows[j]["delta2_qty"]
                  )[0]
                : Rows[j]["delta2_qty"];
            console.log(allocate[i]["order"]);
            allocate[i]["allocate"] = 0;
            allocate[i]["original_allocate"] = 0;
            allocate[i]["allocated"] =
              allocate[i]["allocate"] * allocate[i]["Qty_per"];
            for (let k in allocationObject) {
              if (
                allocationObject[k]["Allocation_inventory_uid"] ===
                  allocate[i]["inv_uid"] &&
                allocate[i]["child_pn"] === allocationObject[k]["child_pn"] &&
                allocate[i]["child_lft"] === allocationObject[k]["child_lft"]
              ) {
                allocate[i]["original_allocate"] +=
                  allocationObject[k]["sum(Allocation_allocated_qty)"];
                allocate[i]["allocate"] +=
                  allocationObject[k]["sum(Allocation_allocated_qty)"];

                allocate[i]["allocated"] +=
                  allocationObject[k]["sum(Allocation_allocated_qty)"] *
                  allocate[i]["Qty_per"];
              }
            }

            // allocate[i]["updatedOrder"] = Rows[j]["order_qty"];
          }
        }
        option.push(allocate[i]);
      }
    }
    option.sort((a, b) =>
      a.inv_uid > b.inv_uid ? 1 : b.inv_uid > a.inv_uid ? -1 : 0
    );
    console.log(option);
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

  let changeAllocationQty = (id, invID, e) => {
    let children = [];
    const { value } = e.target;
    options.map((option) =>
      option["inv_uid"] === invID ? children.push(option["child_pn"]) : ""
    );

    setSelectedChildrenID(children);
    console.log("selected children", children);
    console.log("prevvalue", value);
    for (let x = 0; x <= options.length; x++) {
      if (id === x) {
        if (selectedPrevInvUID === "") {
          console.log("prevValue here if else", value, options[x]["allocate"]);
          setAllocationQty(parseInt(value) - options[x]["allocate"]);
          setAllocatedQty(parseInt(value) * options[x]["Qty_per"]);
          setSelectedInvUID(options[x]["inv_uid"]);
          console.log(options[x]["inv_uid"], children);
          setOptions((option) =>
            option?.map((list, index) =>
              index === id || list["inv_uid"] === invID
                ? {
                    ...list,
                    allocate: value,
                    allocated: value * list["Qty_per"],
                  }
                : list
            )
          );
          console.log(" prevValue here if else", options[x]);
          setSelectedPrevInvUID(options[x]["inv_uid"]);
          setPrevValue(value);
        } else if (selectedPrevInvUID === options[x]["inv_uid"]) {
          console.log(
            "prevValue here else if else",
            value,
            options[x]["allocate"]
          );
          setAllocationQty(allocationQty + 1);
          setAllocatedQty(allocationQty + 1 * options[x]["Qty_per"]);
          setSelectedInvUID(options[x]["inv_uid"]);
          console.log(options[x]["inv_uid"]);
          setOptions((option) =>
            option?.map((list, index) =>
              index === id || list["inv_uid"] === invID
                ? {
                    ...list,
                    allocate: value,
                    allocated: value * list["Qty_per"],
                  }
                : list
            )
          );
          setSelectedPrevInvUID(options[x]["inv_uid"]);
          setPrevValue(value);
        } else {
          console.log("prevValue here else else");
          setAllocationQty(allocationQty + 1);
          setAllocatedQty((allocationQty + 1) * options[x]["Qty_per"]);
          setSelectedInvUID(options[x]["inv_uid"]);
          console.log(options[x]["inv_uid"]);
          setOptions((option) =>
            option?.map((list, index) =>
              index === id || list["inv_uid"] === invID
                ? {
                    ...list,
                    allocate: value,
                    allocated: value * list["Qty_per"],
                  }
                : list
            )
          );
          setSelectedPrevInvUID(options[x]["inv_uid"]);
          setPrevValue(value);
        }
      }
    }
    // console.log(options);
    // for (let i = 0; i < options.length; i++) {
    //   for (let j = 0; j < options.length; j++) {
    //     if (options[i]["child_pn"] === options[j]["child_pn"]) {
    //       options[i]["updatedOrder"] =
    //         options[i]["updatedOrder"] -
    //         options[j]["allocate"] * options[j]["Qty_per"];
    //     }
    //   }
    // }
    // var result = options;
    // console.log(result);
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

  function updateTable() {
    // event.preventDefault();
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
      const postURL3 =
        "https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/GetAllocation/";
      axios.get(postURL2).then((response) => {
        axios
          .get(
            `https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/GetAllocation/${productId}`
          )
          .then((resp) => {
            console.log(resp);
            var alObj = resp.data;
            var allParts = response.data;
            setAllocationObject(resp.data);

            console.log("in get Json object");
            // console.log(res);

            if (res.data.ctb[0] != null) {
              setBom(res.data.ctb);
              setAllocate(res.data.allocation);
              //setData(res.data);
              for (let i in res.data.ctb) {
                // console.log(i);
                // console.log(res.data.ctb[i].GrandParent_BOM_pn);
                // console.log(Top_Level);
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
                var allocatable = 0;
                var allocated = 0;
                var delta2_qty = 0;
                var final_order_qty = 0;
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
                let allocate = res.data.allocation;
                console.log(allocate);
                order_Qty = data[i].RequiredQty - data[i].childInv;
                for (let j in allocate) {
                  if (
                    allocate[j].child_pn === data[i].child_pn &&
                    allocate[j].child_lft === data[i].child_lft &&
                    // allocate[j].inv_loc == country &&
                    // allocate[j].gp_lft < data[i].child_lft &&
                    // data[i].child_lft < allocate[j].gp_rgt &&
                    allocate[j].inv_available_date < Desired_Date
                  ) {
                    allocatable += allocate[j].SubAssyQty;
                  }
                }
                // let alObj = allocationObject;
                console.log(alObj);
                for (let j in alObj) {
                  if (
                    alObj[j].child_pn === data[i].child_pn &&
                    alObj[j].child_lft === data[i].child_lft
                  ) {
                    allocated += alObj[j].allocated_qty;
                  }
                }
                delta2_qty = order_Qty - allocated;
                final_order_qty = delta2_qty;
                console.log(allocated, delta2_qty, final_order_qty);
                for (let j in allParts) {
                  if (allParts[j].PN === data[i].child_pn) {
                    unitCost = allParts[j].Unit_Cost;
                  }
                }
                // order_Qty =
                //   data[i].RequiredQty - data[i].subAssemblyQty - data[i].rawInv;

                // console.log(data[i].child_pn, String(data[i].child_lft));
                var allocate_input = 0;
                var avaiInv = 0;
                var row = new RowData(
                  tempUID,
                  data[i].child_pn + "-" + String(data[i].child_lft),
                  data[i].QtyPerAssembly,
                  data[i].RequiredQty,
                  data[i].childInv,
                  order_Qty,
                  allocatable,
                  allocated,
                  delta2_qty,
                  tempInv,
                  avaiInv,
                  allocate_input,
                  final_order_qty,
                  unitCost,
                  10
                );
                // console.log(row);
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

      <table>
        <caption class="table-title">
          Product {Top_Level} Qty {Desired_Qty}
        </caption>
        <tr>
          <th>Part ID</th>
          <th>Part</th>
          <th>Qty Per Assembly</th>
          <th>Required Qty</th>
          <th>Sub Assembly Qty</th>
          <th>Delta Qty</th>
          <th>Allocatable Sub Assy Qty</th>
          <th>Allocated Sub Assy Qty</th>
          <th>Delta2 Qty</th>
          <th>Raw Inventory</th>
          <th>Available Inventory</th>
          <th>Allocated</th>
          {/* <th>Get Allocation</th> */}
          <th>Order Qty</th>
          <th>Unit Price</th>
          <th>Total Price</th>
        </tr>

        {Rows.map((row) => (
          <tr>
            <td>{row.part_uid}</td>
            <td>{row.part}</td>
            <td>{row.qty_per}</td>
            <td>{row.need_qty}</td>
            <td>{row.sub_qty}</td>
            <td>{row.delta_qty}</td>
            <td
              onClick={() => {
                getAllocate(row.part);
                setSelectedPartID(row.part);
              }}
            >
              {row.allocatable_qty}
            </td>
            <td>
              {/* {allocationObject.length > 0
                ? allocationObject.map((allocate) =>
                    allocate.child_pn + "-" + allocate.child_lft === row.part
                      ? allocate.allocated_qty
                      : null
                  )
                : 0} */}
              {row.allocated_qty}
            </td>
            <td>
              {/* {allocationObject.length > 0
                ? allocationObject.map((allocate) =>
                    allocate.child_pn + "-" + allocate.child_lft === row.part
                      ? row.delta_qty - allocate.allocated_qty
                      : null
                  )
                : 0} */}
              {row.delta2_qty}
            </td>
            <td>{row.inventory}</td>
            <td>{row.available_inv}</td>
            <td>
              <input type="number" />
            </td>

            <td>{row.final_order_qty}</td>
            <td>{row.unit_price}</td>
            <td>{row.total_price}</td>
          </tr>
        ))}
      </table>
      <br></br>
      <button style={{ float: "right", marginRight: "500" }}>Buy Parts</button>

      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        dialogClassName="modalSize"
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedPartID}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <tr>
            <th style={{ width: "15%" }}>Invoice ID</th>
            <th style={{ width: "5%" }}>Assembly</th>
            <th style={{ width: "12%" }}>Date Available</th>
            <th style={{ width: "10%" }}>Inventory Qty</th>
            <th style={{ width: "10%" }}>Allocate</th>
            <th style={{ width: "10%" }}>Child</th>
            <th style={{ width: "10%" }}>Qty Per Assembly</th>
            <th style={{ width: "10%" }}>Allocated</th>
            <th style={{ width: "10%" }}>Order Qty</th>
            {/* <th style={{ width: "5%" }}>Set Value</th> */}
          </tr>

          {options.map((option, i) => (
            <tr key={i}>
              <td>{option.inv_uid}</td>
              <td>
                {option.parent_pn}-{option.gp_lft}
              </td>
              <td>{option.inv_available_date}</td>
              <td>{option.inv_qty}</td>
              <td>
                {option.child_pn === selectedPartID.split("-")[0] ? (
                  <input
                    key={i}
                    type="number"
                    min="0"
                    name={option.inv_uid}
                    max={option.inv_qty}
                    value={option.allocate}
                    onChange={(val) => {
                      changeAllocationQty(i, option.inv_uid, val);
                    }}
                  />
                ) : (
                  ""
                )}
              </td>
              <td>{option.child_pn}</td>
              <td>{option.Qty_per}</td>
              <td>{option.allocated}</td>
              {console.log(
                "option.inv_uid,",
                option.inv_uid,
                " selectedInvUID,",
                selectedInvUID,
                "option.child_pn,",
                option.child_pn,
                "prevValue > option.allocate,",
                prevValue > option.allocate,
                "prevValue,",
                prevValue,
                " option.original_allocate,",
                option.original_allocate,
                " option.allocate,",
                option.allocate,
                " option.allocated,",
                option.allocated,
                "allocationQty,",
                allocationQty,
                "allocatedQty,",
                allocatedQty,
                "option.order,",
                option.order
              )}

              <td>
                {selectedChildrenID.some((item) => option["child_pn"] === item)
                  ? option.order - allocationQty * option.Qty_per
                  : option.order}
              </td>
              {/* <td>
                {option.original_allocate < option.allocate
                  ? selectedChildrenID.some(
                      (item) => option["child_pn"] === item
                    )
                    ? option.order - allocationQty * option.Qty_per
                    : option.order
                  : option.original_allocate > option.allocate
                  ? selectedChildrenID.some(
                      (item) => option["child_pn"] === item
                    )
                    ? option.order - allocationQty * option.Qty_per
                    : option.order
                  : option.order}
              </td> */}

              {/* <td>
                {prevValue > option.allocate &&
                selectedChildrenID.some(
                  (item) => option["child_pn"] === item
                ) &&
                option.inv_uid === selectedInvUID
                  ? option.order + allocationQty * option.Qty_per
                  : prevValue > option.allocate &&
                    selectedChildrenID.some(
                      (item) => option["child_pn"] === item
                    ) &&
                    option.inv_uid !== selectedInvUID
                  ? option.order - allocationQty * option.Qty_per
                  : prevValue <= option.allocate &&
                    selectedChildrenID.some(
                      (item) => option["child_pn"] === item
                    )
                  ? option.order - allocationQty * option.Qty_per
                  : option.order - option.allocate * option.Qty_per}
              </td> */}
              {/* <td>{option.order}</td> */}
            </tr>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Landing;
