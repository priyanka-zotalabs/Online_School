import React, { Fragment } from "react";
import enhancer from "./enhancer";
import "./style.scss";
import Loading from "../../../../shared/Components/Loading";
// import loginImage from '../../assets/images/signin.jpg'
// import appLogo from '../../assets/images/applogo.png'
// import locksvg from '../../assets/images/icon/lock.svg'
// import userSignInSvg from '../../assets/images/icon/user-signin.svg'
import signInImage from "../../../../images/HeroImage.svg";
import { Button, Container, Col, Row, Form } from "react-bootstrap";

function ResetPassword(props) {
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
        <div className="main-login-div">
          <Container>
            <Row xs={1} md={12}>
              <Col md={5} xs={12} className="HideFirstColumn">
                <p className="main-header">
                  Upgrade or learn new skills on Zoops platform
                </p>
                <img
                  src={signInImage}
                  style={{
                    width: "120%",
                  }}
                  alt="signInImage"
                ></img>
              </Col>
              <Col md={5} xs={12} className="reset-password-form-col">
                <div className="reset-password-Form-div ">
                  <Row>
                    <Col md={12}>
                      <p className="reset-password-text">Reset Password</p>
                    </Col>
                  </Row>
                  <div className="reset-password-input-fields">
                    <Form>
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
                              value={passwordForm.password.value}
                            />
                            {console.log(
                              passwordForm.password.invalid,
                              passwordForm.password.helperText
                            )}
                          </Col>
                          <span className="error-message">
                            {passwordForm.password.invalid
                              ? passwordForm.password.helperText
                              : ""}
                          </span>
                        </Row>
                      </Form.Group>
                      <Form.Group>
                        <Row>
                          <Col md={5}>
                            <Form.Label id="signIn-label">
                              Confirm Password
                            </Form.Label>
                          </Col>
                          <Col md={7}>
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
                          </Col>
                          <span className="error-message">
                            {passwordForm.confirmPassword.invalid
                              ? passwordForm.confirmPassword.helperText
                              : ""}
                          </span>
                        </Row>
                      </Form.Group>
                      <Row>
                        <Col md={12} style={{ marginTop: "10%" }}>
                          <Button
                            onClick={(e) => handleSignUpChange()}
                            className="form-signIn-btn"
                            id="submit-btn"
                          >
                            Submit
                          </Button>
                        </Col>
                        <span className="error-message">
                          {error ? error : ""}
                        </span>
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

export default enhancer(ResetPassword);
