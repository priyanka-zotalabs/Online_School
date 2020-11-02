import React, { Fragment, useState } from "react";
import "./style.scss";
import { MDBBtn } from "mdbreact";
import "bootstrap/dist/css/bootstrap.css";
// impor./CourseModal/CourseModaldex"
import {Paper} from "@material-ui/core"; 
import topCard from "../../../images/courseCard.png";

import { BsThreeDotsVertical } from "react-icons/bs";
import { MDBIcon } from "mdbreact";
import CourseModal from "./CourseModal/index";

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
import Loading from "../../../shared/Components/Loading";

const TeacherDashBoard = (props) => {
  let {
    handleAddCourse,
    rows,
    loader,
    adminCourse,
    navigateTOModulePage,
    handleModalShow,
    modalShow,
    handleModalClose,

    handleDelete,
    handleUpdateCourse,
  } = props;

  return (
    <div>
      {loader ? (
        <Loading isLoading={true}></Loading>
      ) : (
        <div style={{marginBottom:"3%"}}>
          <CourseModal
            show={modalShow}
            onHide={() => handleModalClose()}
            handleDelete={() => handleDelete()}
            // loader={() => handleLoader(false)}
          />

  
          <Paper elevation={1} id="paper-test-header">
            {/* <Paper className={classes.paper} > */}
            <span className="create-test">Institute Courses</span>
            
          </Paper>
          {/* <div className="course-title">
            <span id="main-heading-courses-new">Institute Courses</span>

            {/* <MDBBtn id="create-course-btn-new" onClick={handleAddCourse}>
              CREATE NEW COURSE
            </MDBBtn> *
          </div> */}
          <div className="Your-course-div">
            <Container fluid>
              {/* <div>
                <span id="your-course-span">Your Courses</span>
              </div> */}
              {/* first row */}
              <Row>
                {adminCourse.length > 0 &&
                  adminCourse.map((element) => (
                    <Col
                      xs={12}
                      sm={6}
                      md={6}
                      className="col-courses"
                      key={element._id}
                    >
                      <Card
                         style={{
                          
                          cursor:"pointer"
                        }}
                        // onClick={(e) =>
                        //   navigateTOModulePage(e, element)
                        // }
                      >
                        <Container fluid>
                          <Row 
                          style={{
                            borderRadius: "10px",
                            // border: "solid  black 1px",
                          }}
                          
                          className="teacher-Course-card">
                            <Col
                              xs={5}
                              sm={4}
                              md={4}
                              style={{ padding: "0px" }}
                            >
                              <Card.Img
                              style={{width:"125px",height:"135px"}}

                                id="imageCss-Course"
                                src={element.courseImageUrl}
                                onClick={(e) =>
                                  navigateTOModulePage(e, element)
                                }
                              />
                            </Col>
                            <Col>
                              {/* <div
                                class="dropdown"
                                style={{
                                  display: "flex",
                                  float: "right",
                                  marginRight: "5px",
                                  marginTop: "5px",
                                }}
                              >
                                <a
                                  type="button"
                                  id="dropdownMenu2"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                  // onClick={() => console.log("hello")}
                                >
                                  <i
                                    class="fas fa-ellipsis-v"
                                    style={{ marginLeft: "auto" }}
                                  ></i>
                                </a>
                                <div
                                  class="dropdown-menu dropdown-primary"
                                  style={{ marginLeft: "-100px" }}
                                >
                                  <a
                                    class="dropdown-item"
                                    // href="#"
                                    onClick={(e) =>
                                      handleUpdateCourse(element._id)
                                    }
                                  >
                                    &nbsp;&nbsp;Update
                                  </a>
                                  <a
                                    class="dropdown-item"
                                    onClick={(e) =>
                                      handleModalShow(element._id)
                                    }
                                  >
                                    &nbsp;&nbsp;Delete
                                  </a>
                                </div>
                              </div> */}

                              <div
                                onClick={(e) =>
                                  navigateTOModulePage(e, element)
                                }
                              >
                                <div id="course-title">
                                  <h5>{element.name}</h5>
                                </div>
                                <p id="short-description">
                                  {element.description}
                                </p>
                              </div>
                            </Col>
                          </Row>
                        </Container>
                      </Card>
                    </Col>
                  ))}
                {adminCourse.length === 0 && (
                  <div style={{ marginTop: "50px", marginLeft: "25%" }}>
                    No Course created yet
                  </div>
                )}
              </Row>
            </Container>
          </div>
        </div>
      )}
    </div>
  );
};

export default enhancer(TeacherDashBoard);
