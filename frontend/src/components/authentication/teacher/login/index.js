import React, { Fragment } from "react";
import enhancer from "./enhancer";
import "./logIn.scss";
import Loading from "../../../../shared/Components/Loading";
import TeacherSignIn from "../../../../images/HeroImage.svg";
import Alert from "../../../../shared/Components/Alert";
import { Button, Container, Col, Row, Form } from "react-bootstrap";
function Login(props) {
  let {
    handleSignUpChange,
    loader,
    handleSignIn,
    loginForm,
    inputBlurHandler,
    inputChangeHandler,
    formIsValid,
    error,
  } = props;
  return (
    <Fragment>
      {loader ? (
        <Loading isLoading={true}></Loading>
      ) : (
        <div className="main-login-div-student">
          <Container>
            <Row className="Row-login" xs={1} md={12} lg={12} sm={12}>
              <Col md={5} lg={5} xs={12} sm={5} className="HideFirstColumn">
                <p className="main-header-login-student">
                  Connect and teach to more number of students on Zoops
                  plataform
                </p>
                <img
                  src={TeacherSignIn}
                  className="signInImage-login-student"
                  alt="signInImage"
                ></img>
              </Col>
              <Col
                md={6}
                xs={11}
                sm={11}
                lg={5}
                className="signInBox-loginstudentent"
              >
                <div className="logInForm-div">
                  <Row md={12} lg={12} sm={12}>
                    <Col md={12} lg={12} sm={12}>
                      <p id="started-span-student-new">Let's Get Started!</p>
                    </Col>
                    <Col md={12} lg={12} sm={12}>
                      <span id="signIn-span-student">Sign In </span>
                    </Col>
                  </Row>
                  <div className="form-group-login-student">
                    <Form>
                      {/* <Form.Group>
                        <Row>
                          <Col md={4} lg={5} xs={12} sm={5}>
                            <Form.Label id="signIn-label-student">
                              Mobile Number
                            </Form.Label>
                          </Col>
                          <Col md={2} xs={2} lg={1} sm={1}>
                            <div id="mobile91-login-student">
                              <h6>+91-</h6>
                            </div>
                          </Col>
                          <Col md={6} lg={6} xs={10} sm={6}>
                            <Form.Control
                              id="mobile-input-login-student"
                              // value={}
                              type="text"
                              name="mNumber"
                              onChange={(e) => inputChangeHandler(e, "mNumber")}
                              onBlur={(e) => inputBlurHandler(e, "mNumber")}
                              value={loginForm.mNumber.value}
                            />
                            <Row>
                              <Col md={12} sx={12} lg={12}>
                                <span id="error-message-student">
                                  {loginForm.mNumber.invalid
                                    ? loginForm.mNumber.helperText
                                    : ""}
                                </span>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Form.Group>
                      <p className="or-text-student">Or</p> */}
                      <Form.Group>
                        <Row>
                          <Col md={5}>
                            <Form.Label id="signIn-label-student">
                              Email Address
                            </Form.Label>
                          </Col>
                          <Col md={6}>
                            <Form.Control
                              type="email"
                              name="email"
                              onChange={(e) => inputChangeHandler(e, "email")}
                              onBlur={(e) => inputBlurHandler(e, "email")}
                              value={loginForm.email.value}
                            />
                            <span id="error-message-student">
                              {loginForm.email.invalid
                                ? loginForm.email.helperText
                                : ""}
                            </span>
                          </Col>
                        </Row>
                      </Form.Group>
                      <Form.Group>
                        <Row>
                          <Col md={5}>
                            <Form.Label id="signIn-label-student">
                              Password
                            </Form.Label>
                          </Col>
                          <Col md={6}>
                            <Form.Control
                              type="password"
                              name="password"
                              onChange={(e) =>
                                inputChangeHandler(e, "password")
                              }
                              onBlur={(e) => inputBlurHandler(e, "password")}
                              value={loginForm.password.value}
                            />
                            {console.log(
                              loginForm.password.invalid,
                              loginForm.password.helperText
                            )}
                            <span id="error-message-student">
                              {loginForm.password.invalid
                                ? loginForm.password.helperText
                                : ""}
                            </span>
                          </Col>
                        </Row>
                      </Form.Group>
                      <Row>
                        {/* <Col md={{ span: "6", offset: "6" }}>
                          <a
                            href="/forgotPassword"
                            id="forgetpass-login-student"
                          >
                            Forgot Password?
                          </a>
                        </Col> */}
                        <Col md={12} id="form-signin-col-student">
                          <Button
                            id="form-signIn-btn-teacher"
                            onClick={handleSignIn}
                          >
                            Sign In
                          </Button>
                        </Col>
                        {/* <Col md={12} id="form-signup-col-student">
                          <p
                            onClick={(e) => handleSignUpChange(e)}
                            style={{
                              textDecoration: "underline",
                              cursor: "pointer",
                            }}
                          >
                            Don't have account? Sign up
                          </p>
                        </Col> */}
                        {/*  */}
                      </Row>
                      <Col md={{ span: "6", offset: "3" }}>
                          <a
                            href="/forgotPassword"
                            id="forgetpass-login-teacher"
                          >
                            Forgot Password ?
                          </a>
                        </Col>
                      <Row>
                        <Col md={12} sx={12} lg={12}>
                          {/* <span id="error-message-stud">
                                  {error
                                    ? error
                                    : ""}
                                </span> */}
                          {error ? <Alert error={error} /> : ""}
                        </Col>
                      </Row>
                      {/* <span className="error-message">
                          {error
                            ? error
                            : ""}
                        </span> */}
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
