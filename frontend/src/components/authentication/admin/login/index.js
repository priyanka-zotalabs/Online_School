import React, { Fragment } from "react";
import enhancer from "./enhancer";
import "./logIn.scss";
import Loading from "../../../../shared/Components/Loading";
import signInImage from "../../../../images/HeroImage.svg";
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
    error
  } = props;
  return (
    <Fragment>
      {loader ? (
        <Loading isLoading={true}></Loading>
      ) : (
          <div className="main-login-div">
            <Container>
              <Row xs={1} md={12}>
                <Col md={5} xs={12}>
                  <p className="main-header">
                    Welcome students to the largest community of world-class
                    teachers
                </p>
                  <img
                    src={signInImage}
                    style={{
                      width: "120%",
                    }}
                    alt="signInImage"
                  ></img>
                </Col>
                <Col
                  md={5}
                  xs={12}
                  style={{
                    background: "white",
                    marginTop: "7%",
                    marginLeft: "16%",
                    boxShadow: "0px 3px 80px #0000001A",
                    height: "511px",
                    borderRadius: "7%",
                  }}
                >
                  <div className="logInForm-div">
                    <Row>
                      <Col md={12}>
                        <p className="started-span">Let's Get Started!</p>
                      </Col>
                      <Col md={12}>
                        <span className="signIn-span">SignIn </span>
                      </Col>
                    </Row>
                    <div style={{ padding: "1rem" }}>
                      <Form>
                        <Form.Group>
                          <Row>
                            <Col md={5}>
                              <Form.Label id="signIn-label">
                                Email Address
                            </Form.Label>
                            </Col>
                            <Col md={7}>
                              <Form.Control
                                type="email"
                                name="email"
                                onChange={(e) => inputChangeHandler(e, "email")}
                                onBlur={(e) => inputBlurHandler(e, "email")}
                                value={loginForm.email.value}
                              />
                            </Col>
                            <span className="error-message">
                              {loginForm.email.invalid
                                ? loginForm.email.helperText
                                : ""}
                            </span>
                          </Row>
                        </Form.Group>
                        <Form.Group>
                          <Row>
                            <Col md={5}>
                              <Form.Label id="signIn-label">Password</Form.Label>
                            </Col>
                            <Col md={7}>
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
                            </Col>
                            <span className="error-message">
                              {loginForm.password.invalid
                                ? loginForm.password.helperText
                                : ""}
                            </span>
                          </Row>
                        </Form.Group>
                        <Row>
                          <Col md={{ span: "6", offset: "6" }}>
                            <a href="/forgotPassword">Forgot Password?</a>
                          </Col>

                          <Col md={12} style={{ marginTop: "5%" }}>
                            <Button
                              className="form-signIn-btn"
                              onClick={handleSignIn}
                              id="admin-signIn-btn"
                            >
                              SignIn
                          </Button>
                          </Col>
                          {/* <Col md={12} style={{ marginTop: "8%" }}>
                            <p onClick={(e) => handleSignUpChange(e)}>
                              Don't have account? Sign up
                          </p>
                          </Col> */}
                        </Row>
                        <span className="error-message">
                          {error
                            ? error
                            : ""}
                        </span>
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
