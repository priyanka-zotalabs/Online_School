import React, { Fragment } from "react";
import enhancer from "./enhancer";
import "./style.scss";
import Loading from "../../../../../shared/Components/Loading";
import signInImage from "../../../../../images/HeroImage.svg";
import {
  Button,
  Container,
  Col,
  Row,
  Form,
  Select,
  Option,
} from "react-bootstrap";
function Login(props) {
  let {
    handleSignInChange,
    loader,
    handleNext,
    signUpForm,
    inputBlurHandler,
    inputChangeHandler,
    // classList,
    // boardList,
    // handleBoardChange,
    // handleGradeChange,
    // selectedBoard,
    // selectedGrade,
    error,
  } = props;
  return (
    <Fragment>
      {loader ? (
        <Loading isLoading={true}></Loading>
      ) : (
        <div className="main-login-div-signup-studentdetails">
          <Container>
            <Row xs={1} md={12} sm={12} lg={12}>
              <Col md={5} xs={12} sm={5} lg={5} className="hideFirstCol-signup">
                <p className="main-header-signup-studentdetails">
                Upgrade or learn new skills on Zoops platform
                </p>
                <img
                  src={signInImage}
                  className="signInImage-signup-studentdetails"
                  alt="signInImage"
                ></img>
              </Col>
              <Col
                md={6}
                xs={11}
                sm={11}
                lg={5}
                className="signInBox-signup-studentdetails"
              >
                <div className="logInForm-div-signup-studentdetails">
                  <Row>
                    <Col md={12} lg={12} sm={12}>
                      <p id="started-span-signup-studentdetailsnew">
                        Let's Get Started!
                      </p>
                    </Col>
                    <Col md={12} lg={12} sm={12}>
                      <span id="signIn-span-signupnew-studentdetails">
                        Sign Up{" "}
                      </span>
                    </Col>
                  </Row>
                  <div className="form-group-login-signup-studentdetails">
                    <Form>
                      <Form.Group>
                        <Row>
                          <Col md={3} xs={12} lg={3} sm={12}>
                            <Form.Label id="signIn-label-signup-studentdetails">
                              Name
                            </Form.Label>
                          </Col>
                          <Col md={8} lg={8} sm={12} xs={12}>
                            <Form.Control
                              type="text"
                              name="name"
                              onChange={(e) => inputChangeHandler(e, "name")}
                              onBlur={(e) => inputBlurHandler(e, "name")}
                              value={signUpForm.name.value}
                            />
                          </Col>
                          <span id="error-message-signup-studentdetails">
                            {signUpForm.name.invalid
                              ? signUpForm.name.helperText
                              : ""}
                          </span>
                        </Row>
                      </Form.Group>
                      {/* <Form.Group>
                        <Row>
                          <Col md={3} xs={12} lg={3} sm={12}>
                            <Form.Label id="signIn-label-signup-studentdetails">
                              Class
                            </Form.Label>
                          </Col>
                          <Col md={8} lg={8} sm={12} xs={12}>
                            <Form.Control
                              type="text"
                              // type="email"
                              name="className"
                              // onChange={(e) =>
                              //   handleGradeChange(e, "className")
                              // }
                              onBlur={(e) => inputBlurHandler(e, "className")}
                              // value={selectedGrade}
                            >
                             <option></option>
                              {classList.map((one) => (
                                <option value={one.code}>
                                  {one.displayName}
                                </option> 
                             ))}
                            </Form.Control>
                          </Col>
                          <span id="error-message-signup-studentdetails">
                            {signUpForm.className.invalid
                              ? signUpForm.className.helperText
                              : ""}
                          </span>
                        </Row>
                      </Form.Group> */}
                      {/* <Form.Group>
                        <Row>
                          <Col md={3} xs={12} lg={3} sm={12}>
                            <Form.Label id="signIn-label-signup-studentdetails">
                              Board
                            </Form.Label>
                          </Col>
                          <Col md={8} lg={8} sm={12} xs={12}>
                            <Form.Control
                              type="text"
                              name="boardName"
                              // onChange={(e) =>
                                // handleBoardChange(e, "boardName")
                              // }
                              // onBlur={(e) => inputBlurHandler(e, "boardName")}
                              // value={selectedBoard}
                            >
                              {/* <option></option>
                              {boardList.map((one) => (
                                <option value={one.code}>
                                  {one.displayName}
                                </option>
                              ))} 
                            </Form.Control>
                          </Col>
                          <span id="error-message-signup-studentdetails">
                            {signUpForm.boardName.invalid
                              ? signUpForm.boardName.helperText
                              : ""}
                          </span>
                        </Row>
                      </Form.Group> */}
                      
                      <Row>
                        <Col
                          md={12}
                          lg={12}
                          sm={12}
                          xs={12}
                          id="form-signin-col-signup-studentdetails"
                        >
                          <Button
                            id="form-signIn-btn-signup-studentdetails"
                            onClick={handleNext}
                          >
                            SIGN UP
                          </Button>
                        </Col>
                        <Col
                          md={12}
                          lg={12}
                          id="form-signup-col-signup-studentdetails"
                        >
                          <a
                            onClick={(e) => handleSignInChange(e)}
                            style={{
                              textDecoration: "underline",
                              cursor: "pointer",
                            }}
                          >
                            Already have an account? Sign In
                          </a>
                          <Row>
                            <Col md={12} lg={12} sm={12}>
                              <span id="error-message-signup-studentdetails">
                                {error ? error : ""}
                              </span>
                            </Col>
                          </Row>
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
  /* <div className="main-login-div">
            <Container>
              <Row xs={1} md={12}>
                <Col md={5} xs={12}>
                  <p className="main-header">
                    Welcome studentdetailss to the largest community of world-class
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
                    marginTop: "7%",
                    marginLeft: "16%",
                    boxShadow: "0px 3px 80px #0000001A",
                    height: "455px",
                    borderRadius: "7%",
                  }}
                >
                  <div className="logInForm-div">
                    <Row>
                      <Col md={12}>
                        <p className="started-span">Let's Get Started!</p>
                      </Col>
                      <Col md={12}>
                        <span className="signIn-span">Sign Up </span>
                      </Col>
                    </Row>
                    <div style={{ padding: "1rem" }}>
                      <Form>
                        <Form.Group>
                          <Row>
                            <Col md={5} xs={12}>
                              <Form.Label id="signIn-label">
                                Name
                            </Form.Label>
                            </Col>
                            <Col md={7} xs={10}>
                              <Form.Control
                                type="text"
                                name="name"
                                onChange={(e) => inputChangeHandler(e, "name")}
                                onBlur={(e) => inputBlurHandler(e, "name")}
                                value={signUpForm.name.value}
                              />
                            </Col>
                            <span className="error-message">
                              {signUpForm.name.invalid
                                ? signUpForm.name.helperText
                                : ""}
                            </span>
                          </Row>
                        </Form.Group>
                        <Form.Group>
                          <Row>
                            <Col md={5}>
                              <Form.Label id="signIn-label">
                                Class
                            </Form.Label>
                            </Col>
                            <Col md={7}>
                              <Form.Control as="select"
                                // type="email"
                                name="className"
                                onChange={(e) => handleGradeChange(e, "courseName")}
                                // onBlur={(e) => inputBlurHandler(e, "courseName")}
                                value={selectedGrade}
                              >
                                <option>All Classes...</option>
                                {classList.map(one => (<option value={one.code}>{one.displayName}</option>))}
                              </Form.Control>
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group>
                          <Row>
                            <Col md={5}>
                              <Form.Label id="signIn-label">
                                Board
                            </Form.Label>
                            </Col>
                            <Col md={7}>
                              <Form.Control as="select"
                                name="boardName"
                                onChange={(e) => handleBoardChange(e, "boardName")}
                                // onBlur={(e) => inputBlurHandler(e, "email")}
                                value={selectedBoard}
                              >
                                <option>All Board...</option>
                                {boardList.map(one => (<option value={one.code}>{one.displayName}</option>))}
                              </Form.Control>
                            </Col>
                          </Row>
                        </Form.Group>
                        <Row>
                          <Col md={12} style={{ marginTop: "5%" }}>
                            <Button
                              className="form-signIn-btn"
                              onClick={handleNext}
                            >
                              SIGN UP
                          </Button>
                          </Col>
                          <Col md={12} style={{ marginTop: "8%" }}>
                            <a onClick={(e) => handleSignInChange(e)}>
                              Already have an account? Sign In
                          </a>
                          </Col>
                          <span className="error-message">
                            {error
                              ? error
                              : ""}
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
    </Fragment> */
}
