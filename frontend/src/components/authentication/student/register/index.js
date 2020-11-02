import React, { Fragment } from "react";
import enhancer from "./enhancer";
import "./style.scss";
import Loading from "../../../../shared/Components/Loading";
import signInImage from "../../../../images/HeroImage.svg";
import { Button, Container, Col, Row, Form } from "react-bootstrap";
function Login(props) {
  let {
    handleSignInChange,
    loader,
    handleNext,
    signUpForm,
    inputBlurHandler,
    inputChangeHandler,
    error,
  } = props;
  return (
    <Fragment>
      {loader ? (
        <Loading isLoading={true}></Loading>
      ) : (
        <div className="main-login-div-signup-student">
          <Container>
            <Row xs={1} md={12} sm={12} lg={12}>
              <Col md={5} xs={12} sm={5} lg={5} className="hideFirstCol-signup">
                <p className="main-header-signup-student">
                Upgrade or learn new skills on Zoops platform
                </p>
                <img
                  src={signInImage}
                  className="signInImage-signup-student"
                  alt="signInImage"
                ></img>
              </Col>
              <Col
                md={6}
                xs={11}
                sm={11}
                lg={5}
                className="signInBox-signup-student"
              >
                <div className="logInForm-div-signup-student">
                  <Row>
                    <Col md={12} lg={12} sm={12}>
                      <p id="started-span-signup-studentnew">
                        Let's Get Started!
                      </p>
                    </Col>
                    <Col md={12} lg={12} sm={12}>
                      <span id="signIn-span-signupnew-student">Sign Up </span>
                    </Col>
                  </Row>
                  <div className="form-group-login-signup-student">
                    <Form>
                      {/* <Form.Group>
                        <Row>
                          <Col md={4} lg={5} xs={12} sm={5}>
                            <Form.Label id="signIn-label-signup-student">
                              Mobile Number
                            </Form.Label>
                          </Col>
                          <Col md={2} xs={1} lg={2} sm={1}>
                            <h6 id="mobile91-login-signup-student">+91-</h6>
                          </Col>
                          <Col md={5} lg={5} xs={10} sm={6}>
                            <Form.Control
                              type="text"
                              name="mNumber"
                              onChange={(e) => inputChangeHandler(e, "mNumber")}
                              onBlur={(e) => inputBlurHandler(e, "mNumber")}
                              value={signUpForm.mNumber.value}
                            />
                            <Row>
                              <Col md={12} lg={12} sm={12}>
                                <span id="error-message-signup-student">
                                  {signUpForm.mNumber.invalid
                                    ? signUpForm.mNumber.helperText
                                    : ""}
                                </span>
                              </Col>
                            </Row>
                          </Col>
                           <span id="error-message-signup">
                              {signUpForm.mNumber.invalid
                                ? signUpForm.mNumber.helperText
                                : ""}
                            </span> 
                        </Row>
                      </Form.Group>
                      <p className="or-text-signup-student">or</p> */}
                      <Form.Group>
                        <Row>
                          <Col md={5} lg={5}>
                            <Form.Label id="signIn-label-signup-student">
                              Email Address
                            </Form.Label>
                          </Col>
                          <Col md={7} lg={7}>
                            <Form.Control
                              type="email"
                              name="email"
                              onChange={(e) => inputChangeHandler(e, "email")}
                              onBlur={(e) => inputBlurHandler(e, "email")}
                              value={signUpForm.email.value}
                            />
                            <Row>
                              <Col md={12} lg={12} sm={12}>
                                <span id="error-message-signup-student">
                                  {signUpForm.email.invalid
                                    ? signUpForm.email.helperText
                                    : ""}
                                </span>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Form.Group>

                      <Row>
                        <Col
                          md={12}
                          lg={12}
                          id="form-signin-col-signup-student"
                        >
                          <Button
                            id="form-signIn-btn-signup-student"
                            onClick={handleNext}
                          >
                            NEXT
                          </Button>
                        </Col>
                        <Col
                          md={12}
                          lg={12}
                          id="form-signup-col-signup-student"
                        >
                          <p
                            onClick={(e) => handleSignInChange(e)}
                            style={{
                              textDecoration: "underline",
                              cursor: "pointer",
                            }}
                          >
                            Already have an account? Sign In
                          </p>
                          <Row>
                            <Col md={12} lg={12} sm={12}>
                              <span id="error-message-signup-student">
                                {error ? error : ""}
                              </span>
                            </Col>
                          </Row>
                        </Col>

                        {/* <span id="error-message-signup">
                            {error
                              ? error
                              : ""}
                          </span> */}
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

export default enhancer(Login);
