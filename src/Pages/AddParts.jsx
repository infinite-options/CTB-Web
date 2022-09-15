import {useState, useRef, useEffect} from "react";
import { Row, Col, Container, Form, Button, Table, Modal } from "react-bootstrap";
import HomepageNavbar from "../Components/HomepageNavbar";
import axios from "axios";
import '../Styles/AddParts.css'

const inventoryURL = "https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/Inventory";

const AddParts = () => {
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
    const [available_time, setAvailable_time] = useState('');

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
            "Lead_Time_Units": "days", 
            "Current_Inventory": CurrentInventory,
            "Current_Inventory_Unit": InventoryUnit,
            "Inventory_Available_Date": available_time
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
            "Current_Inventory_Unit": InventoryUnit,
            "Inventory_Available_Date": available_time
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
            <Form className="form-box">
                <Row>
                    <h1 className="font30 form-item">Add Parts</h1>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="formQuantity" className="form-item">
                            <Form.Label>Part Number</Form.Label>
                            <Form.Control 
                                type="quantity" 
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
                                placeholder="Weight"
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
                                placeholder="Current Inventory"
                                onChange={e => setCurrentInventory(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="formQuantity" className="form-item">
                            <Form.Label>Inventory Unit</Form.Label>
                            <Form.Control 
                                type="quantity" 
                                placeholder="Inventory Unit"
                                onChange={e => setInventoryUnit(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formQuantity" className="form-item">
                            <Form.Label>Available Time</Form.Label>
                            <Form.Control 
                                type="quantity" 
                                placeholder="Available Time"
                                onChange={e => setAvailable_time(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Button variant="secondary" onClick={sendJSON} className="bom-btn">
                        Upload BOM
                    </Button>{' '}
                </Row>
            </Form>
        </ Container>
    </div>
  )
}

export default AddParts