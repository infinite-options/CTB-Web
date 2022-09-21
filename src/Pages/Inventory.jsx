import React, {useState} from 'react'
import axios from 'axios';
import { Table, Row, Container, Button } from 'react-bootstrap';
import HomepageNavbar from "../Components/HomepageNavbar";


const inventoryURL = "https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/Inventory";


const Inventory = () => {
    const [response, setResponse] = useState();
    const [Inventory, setInventory] = useState([]);
    const [Index, setIndex] = useState(-1);
    const [Edit, setEdit] = useState(0);
    const [SamePart, setSamePart] = useState([]);
    const [NewQty, setNewQty] = useState([]);
    const [originLocation, setoriginLocation] = useState('');
    const [CurrentInventory, setCurrentInventory] = useState('');
    const [available_time, setAvailable_time] = useState('');


    React.useEffect(() => {
        axios.get(inventoryURL).then((response) => {
            setInventory(response.data);
        });
        console.log(Inventory);


    }, []);




    const routeChange = (event) => {
        let id = event.currentTarget.id;
        console.log(event.currentTarget.id);
        setIndex(event.currentTarget.id);
        setEdit(1);


        var temp = new Array(); //temp: Contain the element for Same parts
        var temp2 = new Array(); //temp2: Contain the element for newQty
        temp.push(Inventory[id]);
        temp2.push("");
        for (var i = 0; i < Inventory.length; i++) {
            if (Inventory[i].inv_pn == Inventory[id].inv_pn && id != i) {
                console.log("Fond one");
                setSamePart(prevArray => [...prevArray, i]);
                temp.push(Inventory[i]);
                temp2.push("");
            }
        }
        setSamePart(temp);
        setNewQty(temp2);
        console.log(temp);
        console.log(temp2);
        // let path = `/EditInventory`; 
        // navigate(path);
    }

    // document.getElementById('box2').selectedIndex = document.getElementById('box1').selectedIndex;


    function status(date){
        if(date <= new Date().toISOString().split('T')[0]){
            return "Available";
        }else{
            return date;
        }

    }


    function renderTable(Index, Edit) {
        //View Inventory
        if (Index === -1 || SamePart === []) {
            return (
                <Table striped bordered hover className="table">
                    <thead>
                        <tr>
                            <th>Part</th>
                            <th>Status</th>
                            <th>Location</th>
                            <th>Qty</th>
                            <th></th>
                        </tr>    
                    </thead>                    
                    
                    <tbody>
                        {
                            Inventory.map((row, index) => (
                                <tr>
                                    <td>{row.inv_pn}</td>
                                    <td>{status(row.inv_available_date)}</td>
                                    <td>{row.inv_loc}</td>
                                    <td>{row.inv_qty}</td>
                                    <td>
                                        <Button 
                                            variant="secondary" 
                                            onClick={routeChange} 
                                            id={index}
                                        >
                                            Adjust
                                        </Button>
                                    </td>
                                </tr>

                            ))
                        }    
                    </tbody>
                </Table>
            );
        //Edit Inventory
        } else {
            return (
                <Table striped bordered hover className="table">
                    <thead>
                        <tr>
                            <th>Part</th>
                            <th>Status</th>
                            <th>Location</th>
                            <th>Qty</th>
                            <th>New Qty</th>
                            <th>New Location</th>
                            <th>Transportation Time</th>
                            <th></th>
                        </tr>    
                    </thead>
                    <tbody>
                        {
                            SamePart.map((row, num) => (
                                <tr>
                                    <td>{SamePart[num].inv_pn}</td>
                                    <td>{status(SamePart[num].inv_available_date)}</td>
                                    <td>{SamePart[num].inv_loc}</td>
                                    <td>{SamePart[num].inv_qty}</td>
                                    <td><input id={num} onChange={changeNewQty} className="input-field" type="text" placeholder="New Qty" required /></td>
                                    <td><input id={num}  className="input-field" type="text" placeholder="New Location" required /></td>
                                    <td><input id={num}  className="input-field" type="text" placeholder="Transportation Time" required /></td>
                                    <td><Button variant="secondary" id={num} onClick={changeQty}>Save</Button></td>
                                </tr>
                            ))
                        }
        
                        <tr>
                            <td>{SamePart[0].inv_pn}</td>
                            <td><input className="input-field" id="available_date" type="text" placeholder="Available Date"
                                onChange={e => setAvailable_time(e.target.value)} required /></td>
                            <td><input className="input-field" id="originLocation" type="text" placeholder="Origin Locations"
                                onChange={e => setoriginLocation(e.target.value)} required /></td>
                            <td></td>
                            <td><input className="input-field" id="inventory" type="text" placeholder="Current Inventory"
                                onChange={e => setCurrentInventory(e.target.value)} required /></td>
                            <td></td>
                            <td></td>
                            <td><Button variant="secondary" onClick={addNewInventory}>Save</Button></td>
                        </tr>    
                    </tbody>
                    
                </Table>
            );

        }
    }

    async function addNewInventory() {
        await axios.post(inventoryURL, {
            "PN": SamePart[0].inv_pn,
            "Country_of_Origin": originLocation,
            "Current_Inventory": CurrentInventory,
            "Current_Inventory_Unit": "",
            "Inventory_Available_Date": available_time

        })
            .then((response) => {
                console.log(response.data);
                setResponse("Successfully committed SQL command");
                alert("Successfully committed SQL command");
                window.location = 'http://localhost:3000/inventory';
            })
            .catch(function (error) {
                console.log("error");
                setResponse("Request failed with status code 400");

        });
    }

    //set the value of the qty parameter
    function changeNewQty(e) {
        let id = e.currentTarget.id;
        var temp = NewQty;
        temp[id] = e.target.value;
        setNewQty(temp);
        console.log(temp);
    }

    //put the new value of qtry to the endpoint
    function changeQty(event) {
        let id = event.currentTarget.id;
        console.log(SamePart[id]);
        console.log(NewQty[id]);

        axios.put(inventoryURL, {
            inv_uid: SamePart[id].inv_uid,
            inv_qty: NewQty[id],
            inv_loc: originLocation,
            inv_available_date: available_time
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });

        var temp = SamePart;
        temp[id].inv_qty = NewQty[id];
        setSamePart([...temp]);
        console.log(temp);
        renderTable(Index, Edit);
    }

    return (
        <div>
            <Container fluid >
                <Row>
                    <HomepageNavbar />
                </Row>
                <Row style={{margin: "80px auto 0px"}}>
                    <h1 className="font30 form-item">Inventory</h1>
                </Row>
                <Row>
                    {renderTable(Index, Edit)}
                </Row>
            </Container>
        </div>
    )
}

export default Inventory