import React, { useContext, useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
// import landingVideo from "./Images/Landing1Video.mov";
import Landing1 from "../Assets/Images/Landing1.png";
import Landing2 from "../Assets/Images/croppedLanding2.PNG";
import Landing3 from "../Assets/Images/Landing3.png";
import Landing4 from "../Assets/Images/Landing4.png";
import Landing5 from "../Assets/Images/Landing5.png";
import Landing6 from "../Assets/Images/Landing6.png";
import Landing7 from "../Assets/Images/Landing7.png";
import "../Styles/home.css";
import HomepageNavbar from "../Components/HomepageNavbar";
import { Link } from "react-router-dom"; //for linking button on part4 to technology page

export default function Home() {
  useEffect(() => { }, []); //why useEffect here?

  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        zIndex: 1,
        flexDirection: "column",
        maxWidth: "100%",
        margin: 0,
        padding: 0,
        overflowX: "hidden",
        
      }}
    >
      <Container fluid>
        <Row
          style={{
            position: "relative",
          }}
        >
          
          <HomepageNavbar />

          <img src={Landing1} id="video" />

          <div
            className="header-on-image"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div className="font80"> THE FUTURE OF <br /> MANUFACTURING PLANNING</div>
            <div className="font28" style={{marginTop:"7vh"}}>
              SIMPLIFYING BUILD READINESS <br /> ORGANIZING QUALITY DATA
              <br /> PROVIDING REAL TIME METRICS
            </div>
          </div>
        </Row>
        <Row className="blkBg">
          <Col xs={12} sm={12} md={12} lg={4} xl={6} className="colStyle">
            <div className="container-vision">
              <div className="font22 left-text">VISION</div>

              <div className="font30-less-spaced left-text thickerBorder" style={{width:"25rem"}}>
                We’re Changing the Way the World Thinks About Manufacturing
              </div>

              <div className="font20 left-text">
                Planning a build doesn't need to be complicated or time consuming.
                We simplified the process so you can find out what you need to
                order is seconds and track progress throughout the build cycle.
              </div>
            </div>
            
          </Col>
          <Col xs={12} sm={12} md={12} lg={8} xl={6}>
            <img src={Landing2} id="colImg" />
          </Col>
        </Row>
        <Row className = "whtBg">
          <Col xs={12} sm={12} md={12} lg={4} xl={6} className="colStyle">
            <div className="container-part3">
              <div className="font22 left-text" style={{marginBottom:"2rem"}}>SERVICES </div>

              <div className="font28-less-spaced left-text">
                We Deliver Exceptional Web-Based Software Products and Services
                Around the World
              </div>
            </div>
            

          </Col>
        </Row>
        <Row className="whtBg">
          <Col xs={12} sm={12} md={12} lg={4} xl={6} className="colStyle">
            <div className="container-part4">
              <div className="font44-space left-text">BUILD PLANNING</div>

              <div className="font20 left-text">
                Save time and money by ordering only what you need given existing
                inventory and current orders. Use simulations to identify problem
                areas, order buffer stock, and mitigate risks.
              </div>
              {/* need to add button here that links to technology page */}
            </div>
            
          </Col>
          <Col xs={12} sm={12} md={12} lg={8} xl={6}>
            <img src={Landing3} id="colImg" className="landing3-styles"/>
          </Col>
        </Row>
        <Row className="whtBg">
          <Col xs={12} sm={12} md={12} lg={4} xl={6}>
            <img src={Landing4} id="colImg" className="landing4-styles"/>
          </Col>
          <Col xs={12} sm={12} md={12} lg={8} xl={6} className="colStyle">
            <div className="container-part5">
              <div className="font44-space">REAL-TIME INFORMATION</div>
              <div className="font20">
                Know what you need, when you need it and where you need it in real
                time. See updates as material is checked in, quality inspections
                pass and sub-assemblies are completed. 
              </div>
            </div>
            
          </Col>
        </Row>
        <Row className="whtBg">
          <Col xs={12} sm={12} md={12} lg={4} xl={6} className="colStyle">
            <div className="font44-less-space left-text">INTEGRATED QUALITY</div>

            <div className="font20 left-text">
              Put Quality First by integrating inspection results and quality
              checks throughout the ordering and manufacturing process.
              Integrate with vendor QA reports and enable visibility across your
              organization.
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={8} xl={6}>
            <img src={Landing5} id="colImg" className="landing5-styles"/>
          </Col>
        </Row>
        <Row id="parallax">
          <div className="text-on-image">
            <div className="left-text" style={
              {letterSpacing:"0.1em",
              fontSize:"18px",
              marginTop: "2rem",
              marginBottom: "2rem",
              marginLeft: "3rem",
              
            }
              }>WHY BUILD SUCCESS</div>

            <div className="font28-less-spaced left-text" style={{
              marginBottom: "10rem",
              marginLeft: "3rem"
            }}>
              A different approach.
              <br />A different thought process.
              <br /> A better result.
            </div>

            <div className="font20 left-text" style={{
              marginLeft: "3rem"
            }}>
              Why waste resources planning and executing a build? Track
              everything in one location from ordering to shipping
            </div>
          </div>
        </Row>
        <Row className="whtBg">
          <Col xs={12} sm={12} md={12} lg={4} xl={6}>
            <img src={Landing7} id="colImg" />
          </Col>

          <Col xs={12} sm={12} md={12} lg={8} xl={6} className="colStyle">
            <div className="font20">Build Success in Numbers</div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
