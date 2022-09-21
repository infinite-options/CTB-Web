import { findByLabelText } from "@testing-library/react";
import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Home from "./Home";
import HomepageNavbar from "../Components/HomepageNavbar";
import techImg1another from "../Assets/Images/techImg1.webp"
import techImg2 from "../Assets/Images/techImg2.webp"
import bomImg1 from "../Assets/Images/bom1imgWithArrow.PNG"
import bomImg2 from "../Assets/Images/bom2ImgWithArrow.PNG"
import bomImg3 from "../Assets/Images/updatedSizeBom3.webp"
import bomfull from "../Assets/Images/bomPg2Full.PNG"
import "../Styles/tech.css"

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
                        <div className="font28 subTitle">Build Success starts with the right materials.  <br/>Upload your Bill of Materials (BOM) and let's get started</div>

                    </div>

                </Row>
                <Row className ="bomPage1">
                    
                    
                    {/* <div className = "page2" >

                        <div className = "font34 col1 top"> Upload your BOM</div>
                        <div className = "font34 col2 top">And instantly see your Order List</div>
                        <div className="left">
                            <img width="615px" height="450px"src ={bomImg1} className = "bom1"></img>
                        </div>
                        
                        <div className = "mid">
                            <img width="380px" height="826px" src ={bomImg2} className = "bom2"></img>
            
                        </div>
                        
                        <img width="675px" height="288px" src ={bomImg3} id = "bom3"></img>
                        
                        
                    </div> */}
                    <div className="page2">
                        <img src={bomfull} id="bomImgFull"></img>
                    </div>
                    <button className="button">How we do it</button>

                </Row>
                <Row className ="bomPage1">
                    <div height="1000px">nothing here</div>
                    {/* <img src={techImg1another} id="techImg1" />
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

                    </div> */}

                </Row>

            </Container>
        </div>

    )
}