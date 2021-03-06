import React, { Fragment } from "react";
import "../style.scss";
import { MDBBtn } from "mdbreact";
import "bootstrap/dist/css/bootstrap.css";
import {Paper} from "@material-ui/core"; 

import topCard from "../../../../images/courseCard.png";

import { BsThreeDotsVertical } from "react-icons/bs";

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

const MyCourseModule = (props) => {
  let { data, navigateTOChapterPage, teacherCurrentCourse } = props;
  // console.log("data input", teacherCurrentCourse);
  return (
    <div>
      <div style={{marginBottom:"3%"}}>
        {/* <div className="course-title">
          <span id="main-heading-courses-new">
            {" "}
            {teacherCurrentCourse.name}
          </span>
        </div> */}



         {/* import {Paper} from "@material-ui/core";  */}
          {/* import { Modal, Button, Row, Col, Form } from "react-bootstrap"; */}

          <Paper elevation={1} id="paper-test-header">
            {/* <Paper className={classes.paper} > */}
            <span className="create-test"> {" "}
            {teacherCurrentCourse.name}</span>
           
          </Paper>
        <div className="Your-course-div">
          <Container fluid>
            {/* first row */}
            <Row>
              {data.length > 0 &&
                data.map((element) => (
                  <Col
                    xs={12}
                    sm={6}
                    md={6}
                    className="col-courses"
                    key={element._id}
                    // onClick={(e) => navigateTOChapterPage(e, element)}
                  >
                    <Card
                      style={{
                        borderRadius: "10px",
                        // border: "solid grey 1px",
                        cursor:"pointer"
                      }}
                      onClick={(e) => navigateTOChapterPage(e, element)}
                    >
                      <Container fluid>
                        <Row className="teacher-Course-card">
                          {/* <Col xs={5} sm={4} md={4} style={{ padding: "0px" }}>
                            <Card.Img
                              id="imageCss-Courses"
                              src="https://workingnation.com/wp-content/uploads/2018/04/Screen-Shot-2018-04-05-at-2.36.41-PM.png"
                            />
                          </Col> */}
                          <Col>
                            <div id="course-title">
                              <h5>{element.name}</h5>
                            </div>

                            <p id="short-description">{element.description}</p>
                          </Col>
                        </Row>
                      </Container>
                    </Card>
                  </Col>
                ))}
              {data.length === 0 && (
                <div style={{ marginTop: "50px", marginLeft: "25%" }}>
                  No Module yet
                </div>
              )}
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};
export default enhancer(MyCourseModule);
