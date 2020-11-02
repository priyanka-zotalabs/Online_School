import React, { Fragment } from "react";
import enhancer from "./enhancer";
import "./style.scss";
import Loading from "../../../../../shared/Components/Loading";
// import loginImage from '../../assets/images/signin.jpg'
// import appLogo from '../../assets/images/applogo.png'
// import locksvg from '../../assets/images/icon/lock.svg'
// import userSignInSvg from '../../assets/images/icon/user-signin.svg'
// import signInImage from "../../../../../images/signIn.png";
import TeacherSignIn from "../../../../../images/HeroImage.svg";
import { Button, Container, Col, Row, Form } from "react-bootstrap";

function MobileNumberSighUP(props) {
  let {
    loader,
    inputBlurHandler,
    inputChangeHandler,
    passwordForm,
    formIsValid,
    handleSignUpChange,
    error,
  } = props;
  return (
    <Fragment>
      {loader ? (
        <Loading isLoading={true}></Loading>
      ) : (
        <div className="main-login-div-signupteacher-e">
          <Container>
            <Row xs={1} md={12} sm={12} lg={12}>
              <Col
                md={5}
                xs={12}
                sm={12}
                lg={5}
                className="hideFirstColsignupteachertechE"
              >
                <p className="main-header-signupteacher-e">
                Connect and teach to more number of students on Zoops plataform
                </p>
                <img
                  src={TeacherSignIn}
                  className="signInImage-signupteacher-e"
                  alt="signInImage"
                ></img>
              </Col>
              <Col
                md={5}
                xs={11}
                sm={11}
                lg={5}
                className="signInBox-signupteacher-e"
              >
                <div className="logInForm-div-signupteacher-e">
                  <Row>
                    <Col md={12} lg={12}>
                      <p id="started-span-signupteacher-e">
                        Let's Get Started!
                      </p>
                    </Col>
                    <Col md={12} lg={12}>
                      <span id="signIn-span-signupteachernew-e">Sign Up </span>
                    </Col>
                  </Row>
                  <div className="form-group-login-signupteacher-e">
                    <Form>
                      <Form.Group>
                        <Row>
                          <Col md={5} lg={5} xs={5}>
                            <Form.Label id="signIn-label-signupteacher-e">
                              Name
                            </Form.Label>
                          </Col>
                          <Col md={7} lg={7} xs={7}>
                            <Form.Control
                              type="text"
                              name="name"
                              onChange={(e) => inputChangeHandler(e, "name")}
                              onBlur={(e) => inputBlurHandler(e, "name")}
                              value={passwordForm.name.value}
                            />
                          </Col>
                          <span id="error-message-signup-studentdetails">
                            {passwordForm.name.invalid
                              ? passwordForm.name.helperText
                              : ""}
                          </span>
                        </Row>
                      </Form.Group>
                      <Form.Group>
                        <Row>
                          <Col md={5} lg={5} xs={5}>
                            <Form.Label id="signIn-label-signupteacher-e">
                              Password
                            </Form.Label>
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
                            <div id="error-message-signupteacher-e">
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
                            <Form.Label id="signIn-label-signupteacher-e">
                              Confirm Password
                            </Form.Label>
                          </Col>
                          <Col md={7} lg={7} xs={7}>
                            <Form.Control
                              type="password"
                              name="confirmPassword"
                              onChange={(e) =>
                                inputChangeHandler(e, "confirmPassword")
                              }
                              onBlur={(e) =>
                                inputBlurHandler(e, "confirmPassword")
                              }
                              value={passwordForm.confirmPassword.value}
                            />
                            {console.log(
                              passwordForm.confirmPassword.invalid,
                              passwordForm.confirmPassword.helperText
                            )}

                            <div id="error-message-signupteacher-e">
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
                        <Col md={12} id="nextbtn-signupteacher-e">
                          <Button
                            onClick={(e) => handleSignUpChange()}
                            id="form-next-btn-signupteacher-e"
                          >
                            NEXT
                          </Button>
                        </Col>
                        {/* <span className="error-message">
                        {error
                          ? error
                          : ""}
                      </span> */}
                      </Row>
                      <Row>
                        <Col md={12}>
                          <span id="error-message-signupteacher-e">
                            {error ? error : ""}
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
