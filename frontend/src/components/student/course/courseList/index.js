import React, { Fragment } from "react";
import "./style.scss";
import { MDBBtn } from "mdbreact";
import "bootstrap/dist/css/bootstrap.css";

import topCard from "../../../../images/courseCard.png";

import { BsThreeDotsVertical } from "react-icons/bs";
import {Paper} from "@material-ui/core"; 

import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  ProgressBar,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import enhancer from "./enhancer";
import Loading from "../../../../shared/Components/Loading";

const MyCourse = (props) => {
  let { navigateTOModulePage, rows, loader, course } = props;
  console.log({ course });
  return (
    <div>
      {loader ? (
        <Loading isLoading={true}></Loading>
      ) : (
        <div style={{marginBottom:"3%"}}>
          {/* <div className="course-title"></div> */}
          {/* <Row>
            <Col xs={12} sm={12} md={12}>
              <div className="course-titles">
                <span id="main-heading-courses-news">My Courses</span>
              </div>
            </Col>
          </Row> */}

           {/* import {Paper} from "@material-ui/core";  */}
          {/* import { Modal, Button, Row, Col, Form } from "react-bootstrap"; */}

          <Paper elevation={1} id="paper-test-header">
            {/* <Paper className={classes.paper} > */}
            <span className="create-test">My Courses</span>
            
          </Paper>
          <div className="Your-course-div">
            {/* <Container fluid> */}
              {/* <Container> */}

              {/* <div>
                <span id="your-course-span">My Courses</span>
              </div> */}
              {/* first row */}
              <Row>
                {course.length > 0 &&
                  course.map((element) => (
                    <Col
                      xs={12}
                      sm={6}
                      md={6}
                      className="col-courses"
                      key={element._id}
                     
                    >
                      <Card
                        style={{
                          borderRadius: "10px",
                          // border: "solid grey 1px",
                          cursor:"pointer"
                        }}
                        onClick={(e) => navigateTOModulePage(e, element)}
                      >
                        <Container fluid>
                          <Row className="teacher-Course-card">
                            <Col
                              xs={5}
                              sm={4}
                              md={4}
                              style={{ padding: "0px" }}
                            >
                              <Card.Img
                                style={{ width: "125px", height: "135px" }}
                                id="imageCss-Course"
                                src={element.courseImageUrl}
                              />
                            </Col>
                            <Col>
                              <div id="course-title">
                                <h5>{element.name}</h5>
                              </div>
                              <p id="short-description">
                                {element.description}
                              </p>
                            </Col>
                          </Row>
                        </Container>
                      </Card>
                    </Col>
                  ))}
                {course.length === 0 && (
                  <div style={{ marginTop: "50px", marginLeft: "25%" }}>
                    No Course yet
                  </div>
                )}
              </Row>
            {/* </Container> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default enhancer(MyCourse);
