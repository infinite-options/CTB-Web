import React, { useState } from 'react'
import axios from 'axios';
import HomepageNavbar from "../Components/HomepageNavbar";
import { Row, Col, Container, Form, Button, Table, Modal, FormGroup } from "react-bootstrap";
import "../Styles/AddParts.css"


const inventoryURL = "https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/Inventory";

const EditParts = () => {
      //get references for text input and button fields
  // var partNumber = document.getElementById("partNumber");
  // var description = document.getElementById("description");
  var submit = document.getElementById("submit");

  const [jsonText, setjsonText] = useState();
  const [response, setResponse] = useState();

  const [partNumber, setpartNumber] = useState('');
  const [description, setdescription] = useState('');
  const [unitCost, setunitCost] = useState('');
  const [costUnit, setcostUnit] = useState('');
  const [Weight, setWeight] = useState('');
  const [Weight_Unit, setWeight_Unit] = useState('');
  const [Material, setMaterial] = useState('');
  const [vendor, setvendor] = useState('');
  const [originLocation, setoriginLocation] = useState('');
  const [CurrentInventory, setCurrentInventory] = useState('');
  const [InventoryUnit, setInventoryUnit] = useState('');


  async function sendJSON(){
    // var data = {
    //     "PN":partNumber,
    //     "Description":description,
    //     "Unit_Cost":unitCost,
    //     "Cost_Unit":costUnit,
    //     "Weight": Weight,
    //     "Weight_Unit": Weight_Unit,
    //     "Material": Material,
    //     "Vendor":vendor,
    //     "Country_of_Origin":originLocation,
    //     "Lead_Time": 2,
    //     "Lead_Time_Units": "days"
    // };
    // setjsonText(JSON.stringify(data));
    // console.log(jsonText);

    await axios.post("https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/AddParts", {
    "PN":partNumber,
    "Description":description,
    "Unit_Cost":unitCost,
    "Cost_Unit":costUnit,
    "Weight": Weight,
    "Weight_Unit": Weight_Unit,
    "Material": Material,
    "Vendor":vendor,
    "Country_of_Origin":originLocation,
    "Lead_Time": 2,
    "Lead_Time_Units": "days"
})
    .then((response) => {
        console.log(response.data);
        setResponse("Successfully committed SQL command");
    })
    .catch(function (error) {
        console.log("error");
        setResponse("Request failed with status code 400");

    });



    await axios.post(inventoryURL, {
        "PN":partNumber,
        "Country_of_Origin":originLocation,
        "Current_Inventory": CurrentInventory,
        "Current_Inventory_Unit": InventoryUnit
    })
        .then((response) => {
        console.log(response.data);
        setResponse("Successfully committed SQL command");
        })
        .catch(function (error) {
        console.log("error");
        setResponse("Request failed with status code 400");

        });
  }
  return (
    <div>
        <Container fluid >
            <Row>
                <HomepageNavbar/>
            </Row>
            <Form className='form-box'>
                <Row>
                    <h1 className="font30 form-item">Edit Parts</h1>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="formQuantity" className="form-item">
                            <Form.Label>Part Number</Form.Label>
                            <Form.Control 
                                type="quantity" 
                                id="partNumber"
                                placeholder="Part Number"
                                onChange={e => setpartNumber(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formQuantity" className="form-item">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                type="quantity" 
                                id="description"
                                placeholder="Description"
                                onChange={e => setdescription(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col> 
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="formQuantity" className="form-item">
                            <Form.Label>Unit Cost</Form.Label>
                            <Form.Control 
                                type="quantity" 
                                id="unitCost"
                                placeholder="Unit Cost"
                                onChange={e => setunitCost(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formQuantity" className="form-item">
                            <Form.Label>Cost Unit</Form.Label>
                            <Form.Control 
                                type="quantity" 
                                id="costUnit"
                                placeholder="Cost Unit"
                                onChange={e => setcostUnit(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col> 
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="formQuantity" className="form-item">
                            <Form.Label>Weight</Form.Label>
                            <Form.Control 
                                type="quantity" 
                                id="Weight"
                                placeholder="Part Number"
                                onChange={e => setWeight(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formQuantity" className="form-item">
                            <Form.Label>Weight Unit</Form.Label>
                            <Form.Control 
                                type="quantity" 
                                id="Weight_Unit"
                                placeholder="Weight Unit"
                                onChange={e => setWeight_Unit(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col> 
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="formQuantity" className="form-item">
                            <Form.Label>Material</Form.Label>
                            <Form.Control 
                                type="quantity" 
                                id="Material"
                                placeholder="Material"
                                onChange={e => setMaterial(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formQuantity" className="form-item">
                            <Form.Label>Vendor</Form.Label>
                            <Form.Control 
                                type="quantity" 
                                id="vendor"
                                placeholder="Vendor"
                                onChange={e => setvendor(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col> 
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="formQuantity" className="form-item">
                            <Form.Label>Origin Locations</Form.Label>
                            <Form.Control 
                                type="quantity" 
                                id="originLocation"
                                placeholder="Origin Locations"
                                onChange={e => setoriginLocation(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formQuantity" className="form-item">
                            <Form.Label>Current Inventory</Form.Label>
                            <Form.Control 
                                type="quantity" 
                                id="inventory"
                                placeholder="Current Inventory"
                                onChange={e => setCurrentInventory(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col> 
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="formQuantity"
                        className="form-item" 
                        style={{
                            width: "50%", 
                            float: "left"
                        }}>
                            <Form.Label>Inventory Unit</Form.Label>
                            <Form.Control 
                                type="quantity" 
                                id="inventory"
                                placeholder="Inventory Unit"
                                onChange={e => setInventoryUnit(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Button variant="secondary" size="lg" onClick={sendJSON} className="bom-btn">
                        Submit
                    </Button>{' '}
                </Row>
            </Form>
        </Container>
    </div>
  )
}

export default EditParts