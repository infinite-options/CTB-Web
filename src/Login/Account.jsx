import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import GoogleSignIn from "./GoogleSignIn";
import GoogleSignUp from "./GoogleSignUp";
import HomepageNavbar from "../components/HomepageNavbar";
function Account(props) {
  return (
    <div>
      <Container fluid>
        {" "}
        <Row>
          <Col>
            <GoogleSignIn />
          </Col>
          <Col>
            <GoogleSignUp />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Account;
