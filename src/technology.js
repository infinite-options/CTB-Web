import { findByLabelText } from "@testing-library/react";
import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Home from "./Home";
import HomepageNavbar from "./HomepageNavbar";
import techImg1another from "./Images/techImg1another.webp"
import techImg2 from "./Images/techImg2.webp"

import "./tech.css"
export default function Technology(){
    return(
        <div className = "technology-div" style={{overflowX:"hidden",overflowY:"hidden"}}>
            <Container fluid>
                
                <Row className ="buildReadiness">
                    <HomepageNavbar/>
                    <img src={techImg1another} id="techImg1" />
                    <div className = "page1" style = {{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <div className="font80 title">BUILD READINESS</div>
                        <div className="font28">Build Success starts with the right materials.  <br/>Upload your Bill of Materials (BOM) and let's get started</div>

                    </div>

                </Row>
                <Row className ="bomPage1">
                    {/* <img src={techImg1another} id="techImg1" /> */}
                    <div className = "page2" style = {{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        marginTop: "1rem",
                    }}>

                        <div className = "font34 col1"> Upload your BOM</div>
                        <div className = "font34 col2">And instantly see your Order List</div>
                    </div>

                </Row>
                <Row className ="bomPage1">
                    {/* <img src={techImg1another} id="techImg1" /> */}
                    <div className = "page2" style = {{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: "1rem",
                    }}>

                        <div className = "col1 left-text"> 
                            <div className="font34">THE AUTONO CAR</div>
                            <div className="font30" >Using groundbreaking perception-enabled sensor technology,
                                 the Autono car is a fully driverless vehicle engineered 
                                 to the highest degree of precision and safety. 
                                 It’s autonomous driving reimagined.</div>
                        </div>
                        <img src={techImg2} className="right-picture-col"/> 

                    </div>

                </Row>

            </Container>
        </div>

    )
}