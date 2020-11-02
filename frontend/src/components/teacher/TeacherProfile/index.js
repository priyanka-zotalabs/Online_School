import React from "react";
import enhancer from "./enhancer";
import "./style.scss";
import { Container, Row, Col } from "react-bootstrap";
import { Paper, TextField, Button } from "@material-ui/core";
import profileImage from "../../../images/profile.png";
import Loading from "../../../shared/Components/Loading/index";

const TeacherProfile = (props) => {
  let {
    auth,
    loader,
    handleSelectedResume,
    inputFirstPageBlurHandler,
    inputFirstPageChangedHandler,
    teacherForm,
    handleSelectedProfileImage,
    resumeError,
    profileError,
    handleSaveData,
    selectedResume,
  } = props;

  return (
    <div>
      {loader ? (
        <Loading isLoading={true}></Loading>
      ) : (
        <Container>
          <Row>
            <Col md="6">
              <Paper elevation={2} style={{ marginTop: "3%", padding: "10px",marginBottom:"2%"}}>
                <Container>
                  <Row>
                    <Col md="12">
                      <h3 style={{ color: "#175592",textAlign:"left" }}>My Profile</h3>
                    </Col>
                    <Col md="3">
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
                            teacherForm.profileImage.preview === ""
                              ? profileImage
                              : teacherForm.profileImage.preview
                          }
                          component="span"
                          className="profile-image"
                        ></img>
                      </label>
                      <span id="error-message-student">
                        {profileError ? profileError : ""}
                      </span>
                    </Col>
                    <Col md="9">
                      <Col md="12" className="internal-col-spacing">
                        <TextField
                          id="outlined-basic"
                          label="name *"
                          variant="outlined"
                          fullWidth
                          value={teacherForm.teacherName.value}
                          onChange={(e) =>
                            inputFirstPageChangedHandler(e, "teacherName")
                          }
                          onBlur={(e) =>
                            inputFirstPageBlurHandler(e, "teacherName")
                          }
                          error={teacherForm.teacherName.invalid}
                          helperText={teacherForm.teacherName.helperText}
                        />
                      </Col>
                      <Col md="12" className="internal-col-spacing">
                        <TextField
                          id="outlined-basic"
                          label="Phone Number *"
                          variant="outlined"
                          fullWidth
                          value={teacherForm.teacherPhoneNumber.value}
                          onChange={(e) =>
                            inputFirstPageChangedHandler(
                              e,
                              "teacherPhoneNumber"
                            )
                          }
                          onBlur={(e) =>
                            inputFirstPageBlurHandler(e, "teacherPhoneNumber")
                          }
                          error={teacherForm.teacherPhoneNumber.invalid}
                          helperText={teacherForm.teacherPhoneNumber.helperText}
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
                        />
                      </Col>
                    </Col>
                    <Col md="12" className="internal-col-spacing">
                      <TextField
                        id="outlined-basic"
                        label="About Me"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={3}
                        value={teacherForm.aboutMe.value}
                        onChange={(e) =>
                          inputFirstPageChangedHandler(e, "aboutMe")
                        }
                        onBlur={(e) => inputFirstPageBlurHandler(e, "aboutMe")}
                        error={teacherForm.aboutMe.invalid}
                        helperText={teacherForm.aboutMe.helperText}
                      />
                    </Col>
                    <Col md="6" className="internal-col-spacing">
                      <TextField
                        id="outlined-basic"
                        label="Subject"
                        variant="outlined"
                        fullWidth
                        value={teacherForm.subject.value}
                        onChange={(e) =>
                          inputFirstPageChangedHandler(e, "subject")
                        }
                        onBlur={(e) => inputFirstPageBlurHandler(e, "subject")}
                        error={teacherForm.subject.invalid}
                        helperText={teacherForm.subject.helperText}
                      />
                    </Col>
                    <Col md="6" className="internal-col-spacing">
                      <TextField
                        id="outlined-basic"
                        label="Board/University"
                        variant="outlined"
                        fullWidth
                        value={teacherForm.board.value}
                        onChange={(e) =>
                          inputFirstPageChangedHandler(e, "board")
                        }
                        onBlur={(e) => inputFirstPageBlurHandler(e, "board")}
                        error={teacherForm.board.invalid}
                        helperText={teacherForm.board.helperText}
                      />
                    </Col>
                    <Col md="6" className="internal-col-spacing">
                      <TextField
                        id="outlined-basic"
                        label="Qualification"
                        variant="outlined"
                        fullWidth
                        value={teacherForm.qualification.value}
                        onChange={(e) =>
                          inputFirstPageChangedHandler(e, "qualification")
                        }
                        onBlur={(e) =>
                          inputFirstPageBlurHandler(e, "qualification")
                        }
                        error={teacherForm.qualification.invalid}
                        helperText={teacherForm.qualification.helperText}
                      />
                    </Col>
                    <Col md="6" className="internal-col-spacing">
                      <TextField
                        id="outlined-basic"
                        label="Experience *"
                        variant="outlined"
                        fullWidth
                        value={teacherForm.experience.value}
                        onChange={(e) =>
                          inputFirstPageChangedHandler(e, "experience")
                        }
                        onBlur={(e) =>
                          inputFirstPageBlurHandler(e, "experience")
                        }
                        error={teacherForm.experience.invalid}
                        helperText={teacherForm.experience.helperText}
                      />
                    </Col>
                    <Col md="6" className="internal-col-spacing">
                      <TextField
                        id="outlined-basic"
                        label="Location"
                        variant="outlined"
                        fullWidth
                        value={teacherForm.location.value}
                        onChange={(e) =>
                          inputFirstPageChangedHandler(e, "location")
                        }
                        onBlur={(e) => inputFirstPageBlurHandler(e, "location")}
                        error={teacherForm.location.invalid}
                        helperText={teacherForm.location.helperText}
                      />
                    </Col>
                    <Col md="6" className="internal-col-spacing">
                      <TextField
                        id="outlined-basic"
                        label="LinkedIn Profile Url"
                        variant="outlined"
                        fullWidth
                        value={teacherForm.linkedInUrl.value}
                        onChange={(e) =>
                          inputFirstPageChangedHandler(e, "linkedInUrl")
                        }
                        onBlur={(e) =>
                          inputFirstPageBlurHandler(e, "linkedInUrl")
                        }
                        error={teacherForm.linkedInUrl.invalid}
                        helperText={teacherForm.linkedInUrl.helperText}
                      />
                    </Col>

                    <Col md="12" className="internal-col-spacing resume-upload">
                      <input
                        accept="pdf/*"
                        style={{ display: "none" }}
                        id="contained-resume-file"
                        type="file"
                        onChange={(event) =>
                          handleSelectedResume(event, "resume")
                        }
                      />
                      <label htmlFor="contained-resume-file">
                        {selectedResume ? (
                          <Button component="span" color="primary">
                            {selectedResume}
                          </Button>
                        ) : (
                          <Button component="span" color="primary">
                            Upload Resume
                          </Button>
                        )}
                      </label>
                    </Col>
                    <Col md="12">
                      <span id="error-message-student">
                        {resumeError ? resumeError : ""}
                      </span>
                    </Col>
                    <Col
                      md={{ span: "2", offset: "5" }}
                      className="internal-col-spacing"
                    >
                      <Button
                        variant="contained"
                        id="dashboard-save-button"
                        fullWidth
                        onClick={handleSaveData}
                      >
                        Save
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </Paper>
            </Col>{" "}
          </Row>
        </Container>
      )}
    </div>
  );
};

export default enhancer(TeacherProfile);
