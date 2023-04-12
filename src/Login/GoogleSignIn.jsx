import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Col, Row } from "react-bootstrap";

let CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function GoogleSignIn() {
  const [email, setEmail] = useState("");
  const [newFName, setNewFName] = useState("");
  const [newLName, setNewLName] = useState("");
  const [showSignedIn, setShowSignedIn] = useState(false);

  // gets back ID token, decoded to get email and other account info, used to sign in
  function handleCallBackResponse(response) {
    console.log("Encoded JWT ID token:" + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log("User object", userObject);
    setEmail(userObject.email);
    setNewFName(userObject.given_name);
    setNewLName(userObject.family_name);
    setShowSignedIn(!showSignedIn);
  }

  useEffect(() => {
    /* global google */

    if (window.google) {
      console.log("in here singnin");
      //  initializes the Sign In With Google client based on the configuration object
      google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleCallBackResponse,
      });
      //    method renders a Sign In With Google button in your web pages.
      google.accounts.id.renderButton(document.getElementById("signInDiv"), {
        theme: "outline",
        size: "large",
        text: "signin_with",
        shape: "pill",
      });
      // access tokens
    }
  }, [handleCallBackResponse]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",

        margin: 0,
        padding: 0,
        overflowX: "hidden",
      }}
    >
      Sign In
      <Row xs={12}>
        <Col></Col>
        <Col id="signInDiv"></Col>
        <Col></Col>
      </Row>
      {showSignedIn ? (
        <Row>
          {" "}
          <Col>SignIn Successful</Col>
          <Col>
            {newFName} {newLName}: {email}
          </Col>
        </Row>
      ) : (
        ""
      )}
    </div>
  );
}

export default GoogleSignIn;
