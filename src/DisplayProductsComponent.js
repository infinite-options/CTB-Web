import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
//import {findAllProducts} from "../services/ProductService";
import {
  CREATE_BOM_API_URL,
  DELETE_PRODUCT_API_URL,
  PRODUCTS_API_URL,
} from "./backendAPIs.js";
//import { useHistory } from 'react-router';
//import {withRouter} from "react-router";

class RowData {
  constructor(part, qty_per, order_qty) {
    this.part = part;
    this.qty_per = qty_per;
    this.order_qty = order_qty;
  }
}

class DisplayProductsComponent extends React.Component {
  // const history = useHistory();

  state = {
    products: null,
    random: "Hi",
    // Initially, no file is selected
    selectedFile: null,
    productDetails: null,
    bom: null,
    tempUID: null,
    productId: null,
    dataBOM: null,
    Rows: [],
    Top_Level: "A",
    Desired_Qty: 1,
  };

  // componentDidMount() {
  //     fetch(PRODUCTS_API_URL)
  //     .then(response => response.json()).then(response => {
  //         this.setState({
  //             products: response
  //         })
  //     })
  // }

  // On file select (from the pop up)
  changeTop_Level = (e) => {
    //setTop_Level(e.target.value);
    this.setState({
      Top_Level: e.target.value,
    });
    console.log(e.target.value);
  };

  changeDesired_Qty = (e) => {
    //setDesired_Qty(e.target.value);
    this.setState({
      Desired_Qty: e.target.value,
    });
    console.log(e.target.value);
  };
  updateTable = () => {
    let x = 0;
    let sum = 0;
    let rows = [];
    let data = [];

    //Create a list of bom object that has GP == A
    for (let i in this.state.dataBOM) {
      if (this.state.dataBOM[i].GrandParent_BOM_pn == this.state.Top_Level) {
        data.push(this.state.dataBOM[i]);
      }
    }

    var list = []; //Define the list of seen children
    var sth = []; //Define the list of ouput rows
    for (let i in data) {
      if (!list.includes(data[i].Child_pn)) {
        list.push(data[i].Child_pn);
        var row = new RowData(
          data[i].Child_pn,
          data[i].RequiredQty,
          data[i].RequiredQty
        );
        rows.push(row);
      } else {
        //update the value of reqQty
        rows.find((r) => r.part === data[i].Child_pn).qty_per +=
          data[i].RequiredQty;
      }
    }

    for (let i in rows) {
      rows[i].order_qty = rows[i].qty_per * this.state.Desired_Qty;
    }
    //setRows(rows);
    this.setState({
      Rows: rows,
    });
    console.log(rows);
  };

  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };
  getJSONobject = () => {
    console.log(this.state.productId);
    var stateTempUID = this.state.tempUID;
    console.log("tempuid" + this.state.tempUID);
    const postURL =
      "https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/RunCTB";
    const payload = {
      product_uid: this.state.tempUID,
    };
    axios.post(postURL, payload).then((res) => {
      console.log("in get Json object");
      console.log(res);
      console.log(res.data[0]);
      if (res.data[0] != null) {
        this.setState({ dataBOM: res.data, productID: stateTempUID });
        //setData(res.data);
      } else {
        console.log("bad");
        this.setState({ dataBOM: "Please enter a valid Product UID" });
        //setData("Please enter a valid Product UID")
      }
    });
  };

  // On file upload (click the upload button)
  onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append(
      "filepath",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    // Details of the uploaded file
    // console.log(this.state.selectedFile);

    // Request made to the backend api
    // Send formData object
    axios.post(CREATE_BOM_API_URL, formData).then(
      (response) => {
        // console.log('###')
        console.log(response);
        console.log(response.data);
        this.setState({
          productId: response.data,
          tempUID: response.data,
          random: "bye",
        });
        console.log(this.state.tempUID);
        console.log(this.state.productId);
        const postURL =
          "https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/RunCTB";
        const payload = {
          product_uid: response.data,
        };
        axios.post(postURL, payload).then((res) => {
          console.log("in get Json object");
          console.log(res);
          console.log(res.data[0]);
          if (res.data[0] != null) {
            this.setState({ dataBOM: res.data });
            //setData(res.data);
          } else {
            console.log("bad");
            this.setState({ dataBOM: "Please enter a valid Product UID" });
            //setData("Please enter a valid Product UID")
          }
        });
        // console.log(response.data);
        // console.log(response.status);
        // console.log(response.statusText);
        // console.log(response.headers);
        // console.log(response.config);
        fetch(PRODUCTS_API_URL)
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
            console.log(response[response.length - 1]);
            this.setState({
              products: response,
            });
            console.log(this.products);
          });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  deleteProduct = (productId) => {
    axios
      .post(`${DELETE_PRODUCT_API_URL}`, {
        product_uid: productId,
      })
      .then(
        (response) => {
          // console.log('***')
          // console.log(response.data);
          fetch(PRODUCTS_API_URL)
            .then((response) => response.json())
            .then((response) => {
              this.setState({
                products: response,
              });
            });
        },
        (error) => {
          console.log(error);
        }
      );
  };

  render() {
    return (
      <div>
        <div class="box">
          <h1>Clear to Build</h1>
          <br />
          <div class="text">Upload Your BOM</div>
          <button class="big-button">Upload Your BOM</button>
          <br />
          <br />
          <br />
          <form action="#">
            <div class="text">Enter Product ID</div>
            <button class="small-button">Save</button>
            <input
              class="input-field"
              type="text"
              placeholder="Product ID"
              required
            />
          </form>
          <br />
          <br />
          <br />
          <form action="#">
            <div class="text">Run Clear To Build</div>
            <button class="big-button" onClick={this.updateTable()}>
              Run Clear To Build
            </button>
          </form>
          <br />
          <br />
          <br />
          <form action="#">
            <div class="text">Enter Top Level Assy</div>
            <button class="small-button">Save</button>
            <input
              value={this.state.Top_Level}
              onChange={this.changeTop_Level()}
              class="input-field"
              type="text"
              placeholder="Top Level Assy"
              required
            />
          </form>
          <br />
          <br />
          <br />
          <form action="#">
            <div class="text">Enter Desired Qty</div>
            <button class="small-button">Save</button>
            <input
              value={this.state.Desired_Qty}
              onChange={this.changeDesired_Qty()}
              class="input-field"
              type="text"
              placeholder="Desired Qty"
              required
            />
          </form>
          <br />
          <br />
          <br />
          <br />

          <table>
            <caption class="table-title">
              Product {this.state.Top_Level} Qty {this.state.Desired_Qty}
            </caption>
            <tr>
              <th>Part</th>
              <th>Qty Per</th>
              <th>Order Qty</th>
            </tr>

            {this.state.Rows.map((row) => (
              <tr>
                <td>{row.part}</td>
                <td>{row.qty_per}</td>
                <td>{row.order_qty}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    );
  }
}

export default DisplayProductsComponent;
