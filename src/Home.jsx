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
  useEffect(() => {}, []);

  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        zIndex: 1,
        flexDirection: "column",
      }}
    >
      <Container fluid>
        <Row
          style={{
            position: "relative",
          }}
        >
          {/* <video
          autoPlay={true}
          loop={true}
          controls={true}
          playsInline
          muted
          src="Landing1Video.mov"
          type="video/mp4"
        /> */}
          <HomepageNavbar />
          <div class="boxS">
            <img src={Landing1} id="video" />
          </div>

          <div
            class="header-on-image"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginLeft: "2rem",
            }}
          >
            <div
              style={{
                font: "normal normal normal 80px Montserrat-Medium",
                marginTop: "2rem",
              }}
            >
              {" "}
              THE FUTURE OF MANUFACTURING PLANNING
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                lineHeight: 1.5,
                font: "normal normal normal 28px Montserrat-Regular",
              }}
            >
              {" "}
              SIMPLIFYING BUILD READINESS <br /> ORGANIZING QUALITY DATA
              <br /> PROVIDING REAL TIME METRICS
            </div>
          </div>
        </Row>
        <Row
          style={{
            display: "flex",
            backgroundColor: "black",
            color: "white",
            boxShadow: "0px 0px 10px 10px #000",
          }}
        >
          <Col
            xs={6}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginLeft: "2rem",
            }}
          >
            <div
              style={{
                font: "normal normal normal 28px Montserrat-Medium",
                lineHeight: 5,
              }}
            >
              VISION
            </div>

            <div
              style={{
                font: "normal normal normal 34px Montserrat-Medium",
                lineHeight: 1.6,
              }}
            >
              We’re Changing the Way the World Thinks About Manufacturing{" "}
            </div>
            <br />
            <br />
            <br />
            <div
              style={{
                font: "normal normal normal 22px Montserrat-Regular",
                lineHeight: 1.6,
              }}
            >
              Planning a build doesn't need to be complicated or time consuming.
              We simplified the process so you can find out what you need to
              order is seconds and track progress throughout the build cycle.
            </div>
          </Col>
          <Col xs={6}>
            <img src={Landing2} id="colImg" />
          </Col>
        </Row>
        <Row
          style={{ display: "flex", backgroundColor: "white", color: "black" }}
        >
          <Col
            xs={6}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginLeft: "2rem",
            }}
          >
            <div
              style={{
                font: "normal normal normal 22px Montserrat-Regular",
                lineHeight: 3,
              }}
            >
              SERVICES{" "}
            </div>

            <div
              style={{
                font: "normal normal normal 28px Montserrat-Medium",
                lineHeight: 2,
              }}
            >
              We Deliver Exceptional Web-Based Software Products and Services
              Around the World
            </div>
            <br />
            <br />

            <div
              style={{
                font: "normal normal normal 44px Montserrat-Medium",
                lineHeight: 2,
              }}
            >
              BUILD PLANNING
            </div>
            <br />
            <div
              style={{
                font: "normal normal normal 22px Montserrat-Regular",
                lineHeight: 1.6,
              }}
            >
              Save time and money by ordering only what you need given existing
              inventory and current orders. Use simulations to identify problem
              areas, order buffer stock, and mitigate risks.
            </div>
            <br />
            <br />
          </Col>
          <Col xs={6}>
            <img src={Landing3} id="colImg" />
          </Col>
        </Row>
        <Row
          style={{ display: "flex", backgroundColor: "white", color: "black" }}
        >
          <Col xs={6}>
            <img src={Landing4} id="colImg" />
          </Col>
          <Col
            xs={6}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginRight: "2rem",
              marginTop: "-2rem",
            }}
          >
            <div
              style={{
                font: "normal normal normal 44px Montserrat-Medium",
                lineHeight: 2,
              }}
            >
              REAL-TIME INFORMATION
            </div>
            <div
              style={{
                font: "normal normal normal 22px Montserrat-Regular",
                lineHeight: 1.6,
              }}
            >
              Know what you need, when you need it and where you need it in real
              time. See updates as material is checked in, quality inspections
              pass and sub-assemblies are completed.
            </div>
          </Col>
        </Row>
        <Row
          style={{ display: "flex", backgroundColor: "white", color: "black" }}
        >
          <Col
            xs={6}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginLeft: "2rem",
            }}
          >
            <div
              style={{
                font: "normal normal normal 44px Montserrat-Medium",
                lineHeight: 1,
              }}
            >
              INTEGRATED QUALITY
            </div>
            <br />{" "}
            <div
              style={{
                font: "normal normal normal 22px Montserrat-Regular",
                lineHeight: 1.6,
              }}
            >
              Put Quality First by integrating inspection results and quality
              checks throughout the ordering and manufacturing process.
              Integrate with vendor QA reports and enable visibility across your
              organization.
            </div>
          </Col>
          <Col xs={6}>
            <img src={Landing5} id="colImg" />
          </Col>
        </Row>
        <Row id="parallax">
          <div
            class="text-on-image"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginLeft: "2rem",
            }}
          >
            <div
              style={{
                font: "normal normal normal 22px Montserrat-Regular",
                lineHeight: 3,
              }}
            >
              WHY BUILD SUCCESS
            </div>
            <div
              style={{
                font: "normal normal normal 34px Montserrat-Medium",
                lineHeight: 1.2,
              }}
            >
              A different approach.
              <br />A different thought process.
              <br /> A better result.
            </div>
            <br />
            <br />
            <br />
            <br />
            <div
              style={{
                font: "normal normal normal 22px Montserrat-Regular",
                lineHeight: 1.6,
              }}
            >
              Why waste resources planning and executing a build? Track
              everything in one location from ordering to shipping
            </div>
          </div>
        </Row>
        <Row
          style={{ display: "flex", backgroundColor: "white", color: "black" }}
        >
          <Col>
            <img src={Landing7} id="colImg" />
          </Col>

          <Col
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginLeft: "2rem",
            }}
          >
            <div
              style={{
                font: "normal normal normal 22px Montserrat-Regular",
                lineHeight: 1.6,
              }}
            >
              Build Success in Numbers
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
