import React, { useContext, useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
// import landingVideo from "./Images/Landing1Video.mov";
import Landing1 from "./Images/Landing1.png";
import Landing2 from "./Images/Landing2.png";
import Landing3 from "./Images/Landing3.png";
import Landing4 from "./Images/Landing4.png";
import Landing5 from "./Images/Landing5.png";
import Landing6 from "./Images/Landing6.png";
import Landing7 from "./Images/Landing7.png";
import "./home.css";
import HomepageNavbar from "./HomepageNavbar";

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
            <div className="font22 left-text">VISION</div>

            <div className="font30 left-text ">
              We’re Changing the Way the World Thinks About Manufacturing{" "}
            </div>

            <div className="font22 left-text">
              Planning a build doesn't need to be complicated or time consuming.
              We simplified the process so you can find out what you need to
              order is seconds and track progress throughout the build cycle.
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={8} xl={6}>
            <img src={Landing2} id="colImg" />
          </Col>
        </Row>
        <Row className="whtBg">
          <Col xs={12} sm={12} md={12} lg={4} xl={6} className="colStyle">
            <div className="font28 left-text">SERVICES </div>

            <div className="font28 left-text">
              We Deliver Exceptional Web-Based Software Products and Services
              Around the World
            </div>

            <div className="font44 left-text">BUILD PLANNING</div>

            <div className="font22 left-text">
              Save time and money by ordering only what you need given existing
              inventory and current orders. Use simulations to identify problem
              areas, order buffer stock, and mitigate risks.
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={8} xl={6}>
            <img src={Landing3} id="colImg" />
          </Col>
        </Row>
        <Row className="whtBg">
          <Col xs={12} sm={12} md={12} lg={4} xl={6}>
            <img src={Landing4} id="colImg" />
          </Col>
          <Col xs={12} sm={12} md={12} lg={8} xl={6} className="colStyle">
            <div className="font44">REAL-TIME INFORMATION</div>
            <div className="font22">
              Know what you need, when you need it and where you need it in real
              time. See updates as material is checked in, quality inspections
              pass and sub-assemblies are completed.
            </div>
          </Col>
        </Row>
        <Row className="whtBg">
          <Col xs={12} sm={12} md={12} lg={4} xl={6} className="colStyle">
            <div className="font44 left-text">INTEGRATED QUALITY</div>

            <div className="font22 left-text">
              Put Quality First by integrating inspection results and quality
              checks throughout the ordering and manufacturing process.
              Integrate with vendor QA reports and enable visibility across your
              organization.
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={8} xl={6}>
            <img src={Landing5} id="colImg" />
          </Col>
        </Row>
        <Row id="parallax">
          <div className="text-on-image">
            <div className="font30">WHY BUILD SUCCESS</div>

            <div className="font30">
              A different approach.
              <br />A different thought process.
              <br /> A better result.
            </div>

            <div className="font22">
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
            <div className="font22">Build Success in Numbers</div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
