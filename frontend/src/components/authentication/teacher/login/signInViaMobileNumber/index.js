import React, { Fragment } from "react";
import enhancer from "./enhancer";
import "./style.scss";
import Loading from "../../../../../shared/Components/Loading";
import signInImage from "../../../../../images/HeroImage.svg";
import { Button, Container, Col, Row, Form } from "react-bootstrap";
import Alert from "../../../../../shared/Components/Alert";

function MobileNumberSighUP(props) {
  let {
    loader,
    inputBlurHandler,
    inputChangeHandler,
    otpForm,
    handleSignUpChange,
    error,
  } = props;
  return (
    <Fragment>
      {loader ? (
        <Loading isLoading={true}></Loading>
      ) : (
        <div className="main-login-div-signup-m">
          <Container>
            <Row xs={1} md={12} sm={12} lg={12}>
              <Col md={5} xs={12} sm={12} lg={5}>
                <p className="main-header-signup-m">
                Connect and teach to more number of students on Zoops plataform
                </p>
                <img
                  src={signInImage}
                  className="signInImage-signup-m"
                  alt="signInImage"
                ></img>
              </Col>
              <Col md={5} xs={11} sm={11} lg={5} className="signInBox-signup-m">
                <div className="logInForm-div-signup-m">
                  <Row>
                    <Col md={12} lg={12}>
                      <p id="started-span-signup-m">Let's Get Started!</p>
                    </Col>
                    <Col md={12} lg={12}>
                      <span id="signIn-span-signupnew-m">Sign Up </span>
                    </Col>
                  </Row>
                  <div className="form-group-login-signup-m">
                    <Form>
                      <Form.Group>
                        <Row>
                          <Col md={12} xs={12} sm={12} lg={12}>
                            <p id="OTP-signup-m">
                              OTP sent on +91-XXXXXXXX
                              {props.match.params.contactNumber.substring(
                                6,
                                10
                              )}
                            </p>
                          </Col>
                        </Row>
                      </Form.Group>
                      <Form.Group>
                        <Row>
                          <Col md={4} lg={4} sm={5} xs={5}>
                            <Form.Label>Enter OTP</Form.Label>
                          </Col>
                          <Col md={8} lg={8} sm={7} xs={7}>
                            <Form.Control
                              type="number"
                              name="otp"
                              onChange={(e) => inputChangeHandler(e, "otp")}
                              onBlur={(e) => inputBlurHandler(e, "otp")}
                              value={otpForm.otp.value}
                            />
                            <div id="error-message-signup-m">
                              <span>
                                {otpForm.otp.invalid
                                  ? otpForm.otp.helperText
                                  : ""}
                              </span>
                            </div>
                          </Col>
                        </Row>
                      </Form.Group>
                      <Row>
                        <Col md={12} id="resendOTP-signup-m">
                          <a href="/">Resend OTP</a>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12} id="nextbtn-signup-m">
                          <Button
                            onClick={(e) => handleSignUpChange()}
                            id="form-next-btn-signup-m"
                          >
                            NEXT
                          </Button>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <span id="error-message-signup-m">
                            {error ? <Alert error={error} /> : ""}
                          </span>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </Fragment>
  );
}

export default enhancer(MobileNumberSighUP);
