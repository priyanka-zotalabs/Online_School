import React, { Fragment } from "react";
import enhancer from "./enhancer";
import "./style.scss";
import Loading from "../../../../../shared/Components/Loading";
// import loginImage from '../../assets/images/signin.jpg'
// import appLogo from '../../assets/images/applogo.png'
// import locksvg from '../../assets/images/icon/lock.svg'
// import userSignInSvg from '../../assets/images/icon/user-signin.svg'
import signInImage from "../../../../../images/HeroImage.svg";
import { Button, Container, Col, Row, Form } from "react-bootstrap";

function MobileNumberSighUP(props) {
  let {
    loader,
    inputBlurHandler,
    inputChangeHandler,
    passwordForm,
    formIsValid,
    handleSignUpChange,
    error
  } = props;
  return (
    <Fragment>
      {loader ? (
        <Loading isLoading={true}></Loading>
      ) : (
        <div className="main-login-div-signup-e">
            <Container>
            <Row xs={1} md={12} sm={12} lg={12} >
                <Col md={5}  xs={12} sm={12} lg={5} className="hideFirstColViaEmail">
                <p className="main-header-signup-e">
                Upgrade or learn new skills on Zoops platform
                </p>
                  <img
                    src={signInImage}
                    className="signInImage-signup-e"
                    alt="signInImage"
                  ></img>
                </Col>
                <Col
                  md={5}
                  xs={11}
                  sm={11}
                  lg={5}
                  className="signInBox-signup-e"
                >
                   <div className="logInForm-div-signup-e">
                    <Row>
                      <Col md={12} lg={12}>
                        <p id="started-span-signup-e">Let's Get Started!</p>
                      </Col>
                      <Col md={12} lg={12}>
                        <span id="signIn-span-signupnew-e">Sign Up </span>
                      </Col>
                    </Row>
                    <div className="form-group-login-signup-e">
                      <Form>
                        <Form.Group>
                          <Row>
                            <Col md={5} lg={5} xs={5}>
                              <Form.Label id="signIn-label-signup-e">Password</Form.Label>
                            </Col>
                            <Col md={7} lg={7} xs={7}>
                              <Form.Control
                                type="password"
                                name="password"
                                onChange={(e) =>
                                  inputChangeHandler(e, "password")
                                }
                                onBlur={(e) => inputBlurHandler(e, "password")}
                                value={passwordForm.password.value}
                              />
                              {console.log(
                                passwordForm.password.invalid,
                                passwordForm.password.helperText
                              )}
                      <div id="error-message-signup-e" >
                               <span>
                              {passwordForm.password.invalid
                                ? passwordForm.password.helperText
                                : ""}
                            </span>
                            </div>
                            </Col>
                            
                          </Row>
                        </Form.Group>
                        <Form.Group>
                          <Row>
                          <Col md={5} lg={5} xs={5}>
                              <Form.Label id="signIn-label-signup-e">Confirm Password</Form.Label>
                            </Col>
                            <Col md={7} lg={7} xs={7}>
                              <Form.Control
                                type="password"
                                name="confirmPassword"
                                onChange={(e) =>
                                  inputChangeHandler(e, "confirmPassword")
                                }
                                onBlur={(e) => inputBlurHandler(e, "confirmPassword")}
                                value={passwordForm.confirmPassword.value}
                              />
                              {console.log(
                                passwordForm.confirmPassword.invalid,
                                passwordForm.confirmPassword.helperText
                              )}

                         <div id="error-message-signup-e" >
                         <span>
                              {passwordForm.confirmPassword.invalid
                                ? passwordForm.confirmPassword.helperText
                                : ""}
                            </span>
                            </div>
                            </Col>
                            {/* <span className="error-message">
                              {passwordForm.confirmPassword.invalid
                                ? passwordForm.confirmPassword.helperText
                                : ""}
                            </span> */}
                          </Row>
                        </Form.Group>
                        <Row>
                          <Col md={12} id="nextbtn-signup-e">
                            <Button
                              onClick={e => handleSignUpChange()}
                              id="form-next-btn-signup-e">NEXT</Button>
                          </Col>
                          {/* <span className="error-message">
                            {error
                              ? error
                              : ""}
                          </span> */}
                        </Row>
                        <Row>
                        <Col md={12}>
                          <span id="error-message-signup-e">
                            {error
                              ? error
                              : ""}
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
