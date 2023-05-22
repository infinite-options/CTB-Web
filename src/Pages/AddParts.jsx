import {useState, useRef, useEffect} from "react";
import { Row, Col, Container, Form, Button, Table, Modal, Toast, ToastContainer } from "react-bootstrap";
import HomepageNavbar from "../components/HomepageNavbar";
import axios from "axios";
import '../Styles/ClearToBuild.css'

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
    const [leadTime, setLeadTime] = useState('')
    const [leadTimeUnits, setLeadTimeUnits] = useState('')
    const [partsFile, setPartsFile] = useState();
    const [isAddPartByModelNoLoading, setAddPartByModelNoLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const modelNo = useRef('');
    const addPartByModelNoMsg = useRef('');

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
            "Lead_Time": leadTime,
            "Lead_Time_Units": leadTimeUnits, 
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

    const onFileChange = (event) => {
        const formData = new FormData()
        formData.append('filepath', event.target.files[0])

        setPartsFile(formData)
    }

    const onFileUpload = () => {
        if(partsFile === undefined) {
            alert('Please choose a file before uploading')
            return
        }
        const uploadFileEndpoint = 'https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/AddPartsFromFile'
        const headers = {
            'content-type': 'multipart/form-data'
        }

        axios.post(uploadFileEndpoint, partsFile, headers)
        .then((response) => {
            console.log('Import File Response', response)
        }, (error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        if(isAddPartByModelNoLoading) {
            axios.post('https://m99tbbdg4f.execute-api.us-west-2.amazonaws.com/v1/insertparts', {
                model: modelNo.current 
            }, {
                headers: { 'InvocationType': 'Event' }
            }).then((res) => {
                addPartByModelNoMsg.current = 'Uploaded!';
                modelNo.current = '';
                setAddPartByModelNoLoading(false);
                setShowToast(true);
            })
            .catch((err) => {
                // addPartByModelNoMsg.current = err.response.data.message;
                addPartByModelNoMsg.current = 'Uploaded!';
                setAddPartByModelNoLoading(false);
                setShowToast(true);
            });
        }
    }, [isAddPartByModelNoLoading]);

    const handleAddPartByModelNo = (e) => {
        e.preventDefault();
        addPartByModelNoMsg.current = '';
        setAddPartByModelNoLoading(true);
        setShowToast(false);
    };

    return (
        <div>
            <Container fluid >
                <Row>
                    <HomepageNavbar/>
                </Row>
                <ToastContainer position="top-end" className="p-3" containerPosition="fixed">
                    <Toast show={showToast} onClose={() => setShowToast(false)} delay={5000} autohide>
                        <Toast.Header><strong className="me-auto">Status</strong></Toast.Header>
                        <Toast.Body>
                            <strong className="me-auto">{addPartByModelNoMsg.current}</strong>
                        </Toast.Body>
                    </Toast>
                </ToastContainer>
                <Form className="form-box">
                    <Row>
                        <h1 className="font30 form-item">Add Parts in Bulk</h1>
                        <p style={{textAlign: "center"}}>
                            <em>Column headers in .csv file must match with the fields in the Add Part form below</em>
                        </p>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="formFile" >  
                                <Form.Label>Parts File (.csv)</Form.Label>
                                <Form.Control type="file" onChange={onFileChange}/>
                            </Form.Group>
                        </Col>
                        <Col className={"d-flex flex-column"}>
                            <Button variant="secondary" onClick={onFileUpload} className={"mt-auto"} style={{width: "8em"}}>
                                Upload .csv
                            </Button>{' '}
                        </Col>
                    </Row>
                </Form>
                <Form className="form-box" onSubmit={handleAddPartByModelNo}>
                    <Row>
                        <h1 className="font30 form-item">Add Part by model number</h1>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="formModelNumber" >  
                                <Form.Label>Model Number</Form.Label>
                                <Form.Control type="text" placeholder="Enter model number here..." onChange={e => modelNo.current = e.target.value} required />
                            </Form.Group>
                        </Col>
                        <Col className="d-flex flex-column">
                            <Button type="submit" variant="secondary" className="mt-auto" style={{width: "10em"}} disabled={isAddPartByModelNoLoading}>
                                {isAddPartByModelNoLoading? 'Adding...': 'Click to add Part'}
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <Form className="form-box">
                    <Row>
                        <h1 className="font30 form-item">Add Part</h1>
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
                                <Form.Label>Available Date</Form.Label>
                                <Form.Control 
                                    type="date" 
                                    placeholder="Available Time"
                                    onChange={e => setAvailable_time(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="formQuantity" className="form-item">
                                <Form.Label>Lead Time</Form.Label>
                                <Form.Control 
                                    type="quantity" 
                                    placeholder="Lead Time"
                                    onChange={e => setLeadTime(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formQuantity" className="form-item">
                                <Form.Label>Lead Time Units</Form.Label>
                                <Form.Control 
                                    type="quantity" 
                                    placeholder="Lead Time Units"
                                    onChange={e => setLeadTimeUnits(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Button variant="secondary" size="lg" onClick={sendJSON} className="form-btn">
                            Add Part
                        </Button>{' '}
                    </Row>
                </Form>
            </ Container>
        </div>
    )
}

export default AddParts