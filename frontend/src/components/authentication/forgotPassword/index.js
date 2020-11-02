import React, { Fragment } from "react";
import enhancer from "./enhancer";
import "./style.scss";
import Loading from "../../../shared/Components/Loading";
import signInImage from "../../../images/HeroImage.svg";
import { Button, Container, Col, Row, Form } from "react-bootstrap";
function Login(props) {
  let {
    handleSignUpChange,
    loader,
    inputBlurHandler,
    inputChangeHandler,
    sendResetPasswordLink,
    forgotPasswordForm,
  } = props;
  return (
    <Fragment>
      {loader ? (
        <Loading isLoading={true}></Loading>
      ) : (
        <div className="main-login-div-Pass-stud">
          <Container>
            <Row xs={1} md={12} sm={12} lg={12}>
              <Col md={5} xs={12} sm={12} lg={5} className="hideFirstColForgetPass">
                <p className="main-header-Pass-stud">
                Upgrade or learn new skills on Zoops platform
                </p>
                <img
                  src={signInImage}
                  className="signInImage-Pass-stud"
                  alt="signInImage"
                ></img>
              </Col>
              <Col
                md={5}
                xs={11}
                sm={11}
                lg={5}
                className="signInBox-Pass-stud"
              >
                <div className="logInForm-div-Pass-stud">
                  <Row>
                    {/* <Col md={12}>
                        <p className="started-span-Pass-stud">Let's Get Started!</p>
                      </Col>*/}
                    <Col md={12}>
                      <span id="signIn-span-Pass-stud-new">
                        Forgot Password{" "}
                      </span>
                    </Col>
                  </Row>
                  <div className="form-group-login-Pass-stud">
                    <Form>
                      <Form.Group>
                        <Row>
                          <Col md={5}>
                            <Form.Label id="signIn-label-Pass-stud">
                              Email Address
                            </Form.Label>
                          </Col>
                          <Col md={7}>
                            <Form.Control
                              type="email"
                              name="email"
                              onChange={(e) => inputChangeHandler(e, "email")}
                              onBlur={(e) => inputBlurHandler(e, "email")}
                              value={forgotPasswordForm.email.value}
                            />
                            <span id="error-message-stud">
                              {forgotPasswordForm.email.invalid
                                ? forgotPasswordForm.email.helperText
                                : ""}
                            </span>
                          </Col>
                        </Row>
                      </Form.Group>

                      <Row>
                        <Col md={12} id="resetPassButtonCol">
                          <Button
                            onClick={(e) => sendResetPasswordLink(e)}
                            className="form-signIn-btn-Pass-stud"
                            id="reset-btn"
                          >
                            Reset Password
                          </Button>
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

export default enhancer(Login);

{
  /* <div className="main-forgot-password-div">
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
                  ></img>
                </Col>
                <Col
                  md={5}
                  xs={12}
                  style={{
                    background: "white",
                    marginTop: "13%",
                    marginLeft: "16%",
                    boxShadow: "0px 3px 80px #0000001A",
                    height: "365px",
                    borderRadius: "7%",
                  }}
                >
                  <div className="main-form-div">
                    <Row>
                      <Col md={12}>
                        <p className="started-span">Let's Get Started!</p>
                      </Col>
                      <Col md={12}>
                        <span className="signIn-span">SignIn </span>
                      </Col>
                    </Row>
                    <div className="sub-form-div" style={{ padding: "1rem" }}>
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
                                value={forgotPasswordForm.email.value}
                              />
                            </Col>
                            <span className="error-message">
                              {forgotPasswordForm.email.invalid
                                ? forgotPasswordForm.email.helperText
                                : ""}
                            </span>
                          </Row>
                        </Form.Group>

                        <Row>
                          <Col md={12} style={{ marginTop: "14%" }}>
                            <Button
                              onClick={e => sendResetPasswordLink()}
                              className="form-reset-btn">
                              Reset Password
                          </Button>
                          </Col>
                        </Row>
                      </Form>
                    </div>
                  </div>
              </Row>
            </Container>
          </div>
        )}
    </Fragment>
  );
}

export default enhancer(Login);
*/
}
