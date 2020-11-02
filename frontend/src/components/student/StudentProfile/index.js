import React from "react";
import enhancer from "./enhancer";
import "./style.scss";
import { Container, Row, Col } from "react-bootstrap";
import { Paper, TextField, Button, Divider } from "@material-ui/core";
import profileImage from "../../../images/profile.png";
import Loading from "../../../shared/Components/Loading/index";
import moment from "moment";

const TeacherProfile = (props) => {
  let {
    auth,
    loader,
    inputFirstPageBlurHandler,
    inputFirstPageChangedHandler,
    studentForm,
    handleSelectedProfileImage,
    profileError,
    handleSaveData,
    data,
    handleFeeView,
  } = props;

  return (
    <div>
      {loader ? (
        <Loading isLoading={true}></Loading>
      ) : (
        <Container>
          <Row>
            <Col md="6" style={{ marginBottom: "2%" }}>
              <Paper elevation={2} style={{ marginTop: "3%", padding: "10px" }}>
                <Container>
                  <Row>
                    <Col md="12">
                      <h3 style={{ color: "#175592" }}>Profile</h3>
                    </Col>
                    <Col md="12">
                      <Divider></Divider>
                    </Col>
                    <Col md="12">
                      <input
                        accept="image/*"
                        style={{ display: "none" }}
                        id="contained-button-file"
                        type="file"
                        onChange={(event) =>
                          handleSelectedProfileImage(event, "profileImage")
                        }
                      />
                      <label htmlFor="contained-button-file">
                        <img
                          src={
                            studentForm.profileImage.preview === ""
                              ? profileImage
                              : studentForm.profileImage.preview
                          }
                          component="span"
                          className="student-profile-image"
                        ></img>
                      </label>
                      {/* <span id="error-message-student">
                        {profileError ? profileError : ""}
                      </span> */}
                    </Col>

                    <Col md="12" className="internal-col-spacing">
                      <TextField
                        id="outlined-basic"
                        label="name *"
                        variant="outlined"
                        fullWidth
                        value={studentForm.name.value}
                        onChange={(e) =>
                          inputFirstPageChangedHandler(e, "name")
                        }
                        onBlur={(e) => inputFirstPageBlurHandler(e, "name")}
                        error={studentForm.name.invalid}
                        helperText={studentForm.name.helperText}
                      />
                    </Col>

                    <Col md="12" className="internal-col-spacing">
                      <TextField
                        id="outlined-basic"
                        label="Phone Number *"
                        variant="outlined"
                        fullWidth
                        value={studentForm.contactNumber.value}
                        disabled
                        // onChange={(e) =>
                        //   inputFirstPageChangedHandler(e, "contactNumber")
                        // }
                        // onBlur={(e) =>
                        //   inputFirstPageBlurHandler(e, "contactNumber")
                        // }
                        // error={studentForm.contactNumber.invalid}
                        // helperText={studentForm.contactNumber.helperText}
                      />
                    </Col>
                    <Col md="12" className="internal-col-spacing">
                      <TextField
                        id="outlined-basic"
                        label="Email Id"
                        variant="outlined"
                        fullWidth
                        value={auth.email}
                        disabled
                        // onChange={(e) =>
                        //   inputFirstPageChangedHandler(e, "email")
                        // }
                        // onBlur={(e) => inputFirstPageBlurHandler(e, "email")}
                        // error={studentForm.email.invalid}
                        // helperText={studentForm.email.helperText}
                      />
                    </Col>

                    <Col md="6" className="internal-col-spacing">
                      <TextField
                        id="outlined-basic"
                        label="Class"
                        variant="outlined"
                        fullWidth
                        value={studentForm.class.value}
                        onChange={(e) =>
                          inputFirstPageChangedHandler(e, "class")
                        }
                        onBlur={(e) => inputFirstPageBlurHandler(e, "class")}
                        error={studentForm.class.invalid}
                        helperText={studentForm.class.helperText}
                      />
                    </Col>
                    <Col md="6" className="internal-col-spacing">
                      <TextField
                        id="outlined-basic"
                        label="Board"
                        variant="outlined"
                        fullWidth
                        value={studentForm.board.value}
                        onChange={(e) =>
                          inputFirstPageChangedHandler(e, "board")
                        }
                        onBlur={(e) => inputFirstPageBlurHandler(e, "board")}
                        error={studentForm.board.invalid}
                        helperText={studentForm.board.helperText}
                      />
                    </Col>
                    <Col md="6" className="internal-col-spacing">
                      <TextField
                        id="outlined-basic"
                        label="School"
                        variant="outlined"
                        fullWidth
                        value={studentForm.school.value}
                        onChange={(e) =>
                          inputFirstPageChangedHandler(e, "school")
                        }
                        onBlur={(e) => inputFirstPageBlurHandler(e, "school")}
                        error={studentForm.school.invalid}
                        helperText={studentForm.school.helperText}
                      />
                    </Col>

                    <Col md="6" className="internal-col-spacing">
                      <TextField
                        id="outlined-basic"
                        label="Location"
                        variant="outlined"
                        fullWidth
                        value={studentForm.location.value}
                        onChange={(e) =>
                          inputFirstPageChangedHandler(e, "location")
                        }
                        onBlur={(e) => inputFirstPageBlurHandler(e, "location")}
                        error={studentForm.location.invalid}
                        helperText={studentForm.location.helperText}
                      />
                    </Col>

                    <Col
                      md={{ span: "2", offset: "5" }}
                      className="internal-col-spacing"
                    >
                      <Button
                        variant="contained"
                        id="dashboard-save-button"
                        style={{ backgroundColor: "#8499ff" }}
                        fullWidth
                        onClick={handleSaveData}
                      >
                        Save
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </Paper>
            </Col>
            {/* <Col md="6">
              <Paper elevation={2} style={{ marginTop: "3%", padding: "10px" }}>
                <Container>
                  <Row>
                    {data.map((batch) => (
                      <Row>
                        <Col md="6" className="internal-col-spacing">
                          <h4 style={{ color: "#175592" }}>
                            {batch.courseId.name}
                          </h4>
                        </Col>
                        <Col md="6" className="internal-col-spacing">
                          <Button
                            variant="contained"
                            id="dashboard-save-button"

                            style={{backgroundColor:"#8499ff"}}
                            onClick={(e) => handleFeeView(e, batch._id)}
                          >
                            Complete Reg.
                          </Button>
                        </Col>
                        <Col md="12" className="internal-col-spacing">
                          <Divider></Divider>
                        </Col>
                        <Col md="12" className="internal-col-spacing">
                        
                        </Col>
                        <Col md="6" className="internal-col-spacing">
                          <p>
                            No. of Installments - {batch.installments.length}
                          </p>
                        </Col>
                        <Col md="6" className="internal-col-spacing">
                         <Row>
                         <Col md="5" sm="5"><span>  Due On:</span> </Col>
                         <Col md="7" sm="7">

                         {batch.installments.map((installment) => {
                              if (!installment.isPaid) {
                               
                                return(

                                  <Row>
                                    {console.log("student installments",(installment.date))}
                                    <Col sm="12" md="12">
                                   <span style={{float:"right"}}>{moment((installment.date)).format("DD-MMM-YYYY")},</span>
                                      
                                       </Col>
                                  </Row>
                                )
                               

                              }
                            })}
                         </Col>
                         </Row>

                        
                        </Col>
                      </Row>
                    ))}
                  </Row>
                </Container>
              </Paper>
            </Col> */}
          </Row>
        </Container>
      )}
    </div>
  );
};

export default enhancer(TeacherProfile);
