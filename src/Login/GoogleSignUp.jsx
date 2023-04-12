import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Row, Col, Button } from "react-bootstrap";

let CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
let CLIENT_SECRET = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;
let SCOPES = "https://www.googleapis.com/auth/calendar";

function GoogleSignUp(props) {
  const [email, setEmail] = useState("");
  const [newFName, setNewFName] = useState("");
  const [newLName, setNewLName] = useState("");
  const [socialId, setSocialId] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [accessExpiresIn, setAccessExpiresIn] = useState("");
  const [showSignedUp, setShowSignedup] = useState(false);
  let codeClient = {};

  //   run onclick for authorization and eventually sign up
  function getAuthorizationCode() {
    // Request authorization code and obtain user consent,  method of the code client to trigger the user flow
    codeClient.requestCode();
  }

  useEffect(() => {
    /* global google */

    if (window.google) {
      console.log("in here signup");

      // initialize a code client for the authorization code flow.
      codeClient = google.accounts.oauth2.initCodeClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: (tokenResponse) => {
          console.log(tokenResponse);
          // gets back authorization code
          if (tokenResponse && tokenResponse.code) {
            let auth_code = tokenResponse.code;
            let authorization_url =
              "https://accounts.google.com/o/oauth2/token";

            console.log("auth_code", auth_code);
            var details = {
              code: auth_code,
              client_id: CLIENT_ID,
              client_secret: CLIENT_SECRET,
              redirect_uri: "postmessage",
              grant_type: "authorization_code",
            };

            var formBody = [];
            for (var property in details) {
              var encodedKey = encodeURIComponent(property);
              var encodedValue = encodeURIComponent(details[property]);
              formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            // use authorization code, send it to google endpoint to get back ACCESS TOKEN n REFRESH TOKEN
            fetch(authorization_url, {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/x-www-form-urlencoded;charset=UTF-8",
              },
              body: formBody,
            })
              .then((response) => {
                return response.json();
              })
              .then((responseData) => {
                console.log(responseData);
                return responseData;
              })
              //   got ACCESS TOKEN n REFRESH TOKEN

              .then((data) => {
                console.log(data);
                let at = data["access_token"];
                let rt = data["refresh_token"];
                let ax = data["expires_in"];
                //  expires every 1 hr
                setAccessToken(at);
                // stays the same and used to refresh ACCESS token
                setRefreshToken(rt);
                setAccessExpiresIn(ax);
                //  use ACCESS token, to get email and other account info
                axios
                  .get(
                    "https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" +
                      at
                  )
                  .then((response) => {
                    console.log(response.data);

                    let data = response.data;
                    //setUserInfo(data);
                    let e = data["email"];
                    let fn = data["given_name"];
                    let ln = data["family_name"];
                    let si = data["id"];

                    setEmail(e);
                    setNewFName(fn);
                    setNewLName(ln);
                    setSocialId(si);
                    setShowSignedup(!showSignedUp);
                  })
                  .catch((error) => {
                    console.log("its in landing page");
                    console.log(error);
                  });

                // setSocialSignUpModalShow(!socialSignUpModalShow);

                return (
                  accessToken,
                  refreshToken,
                  accessExpiresIn,
                  email,
                  newFName,
                  newLName,
                  socialId
                );
              })
              .catch((err) => {
                console.log(err);
              });
          }
        },
      });
    }
  }, [getAuthorizationCode]);
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
      Sign Up
      <Row xs={12}>
        <Col></Col>
        <Col id="signUpDiv">
          <Button onClick={() => getAuthorizationCode()}>
            Signup with google
          </Button>
        </Col>

        <Col></Col>
      </Row>
      {showSignedUp ? (
        <Row>
          {" "}
          <Col>Signup Successful</Col>
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

export default GoogleSignUp;
