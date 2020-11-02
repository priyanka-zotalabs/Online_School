import React from "react";
import enhancer from "./enhancer";
import "./style.scss";
import { Container, Row, Col } from "react-bootstrap";
import {
  Paper,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import profileImage from "../../../images/profile.png";
import Loading from "../../../shared/Components/Loading/index";

const TeacherProfile = (props) => {
  let {
    auth,
    // handleChange,
    // flag,
    handleUpload,
    instituteForm,
    selectedBrochure,
    brochureError,
    instituteProfileError,
    inputBlurHandler,
    inputChangedHandler,
    // teacherForm,
    handleSaveInstituteData,
    loader,
  } = props;
  return (
    <div>
      {loader ? (
        <Loading isLoading={true}></Loading>
      ) : (
        <Container>
          <Row>
            <Col md="6" style={{marginBottom:"2%"}}>
              <Paper elevation={2} style={{ marginTop: "3%", padding: "10px" }}>
                <Container>
                  <Row>
                    <Col md="12">
                      <h3 style={{ color: "#175592" }}>Institute Profile</h3>
                    </Col>

                    <Col md="3">
                      <input
                        accept="image/*"
                        style={{ display: "none" }}
                        id="contained-button-file"
                        type="file"
                        onChange={(event) =>
                          handleUpload(event, "instituteProfileImage")
                        }
                      />
                      <label htmlFor="contained-button-file">
                        <img
                          src={
                            instituteForm.instituteProfileImage.preview === ""
                              ? profileImage
                              : instituteForm.instituteProfileImage.preview
                          }
                          component="span"
                          className="profile-image"
                        ></img>
                      </label>
                      <span id="error-message-student">
                        {instituteProfileError ? instituteProfileError : ""}
                      </span>
                    </Col>
                    <Col md="9">
                      <Col md="12" className="internal-col-spacing">
                        <TextField
                          id="outlined-basic"
                          label="name *"
                          variant="outlined"
                          fullWidth
                          value={instituteForm.name.value}
                          onChange={(e) =>
                            inputChangedHandler(e, "name", "institute")
                          }
                          onBlur={(e) =>
                            inputBlurHandler(e, "name", "institute")
                          }
                          error={instituteForm.name.invalid}
                          helperText={instituteForm.name.helperText}
                        />
                      </Col>

                      <Col md="12" className="internal-col-spacing">
                        <TextField
                          id="outlined-basic"
                          label="Phone Number *"
                          variant="outlined"
                          fullWidth
                          value={instituteForm.contactNumber.value}
                          onChange={(e) =>
                            inputChangedHandler(e, "contactNumber", "institute")
                          }
                          onBlur={(e) =>
                            inputBlurHandler(e, "contactNumber", "institute")
                          }
                          error={instituteForm.contactNumber.invalid}
                          helperText={instituteForm.contactNumber.helperText}
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
                        value={instituteForm.aboutMe.value}
                        onChange={(e) =>
                          inputChangedHandler(e, "aboutMe", "institute")
                        }
                        onBlur={(e) =>
                          inputBlurHandler(e, "aboutMe", "institute")
                        }
                        error={instituteForm.aboutMe.invalid}
                        helperText={instituteForm.aboutMe.helperText}
                      />
                    </Col>
                    <Col md="6" className="internal-col-spacing">
                      <TextField
                        id="outlined-basic"
                        label="Subject"
                        variant="outlined"
                        fullWidth
                        value={instituteForm.subject.value}
                        onChange={(e) =>
                          inputChangedHandler(e, "subject", "institute")
                        }
                        onBlur={(e) =>
                          inputBlurHandler(e, "subject", "institute")
                        }
                        error={instituteForm.subject.invalid}
                        helperText={instituteForm.subject.helperText}
                      />
                    </Col>
                    <Col md="6" className="internal-col-spacing">
                      <TextField
                        id="outlined-basic"
                        label="Board/University"
                        variant="outlined"
                        fullWidth
                        value={instituteForm.board.value}
                        onChange={(e) =>
                          inputChangedHandler(e, "board", "institute")
                        }
                        onBlur={(e) =>
                          inputBlurHandler(e, "board", "institute")
                        }
                        error={instituteForm.board.invalid}
                        helperText={instituteForm.board.helperText}
                      />
                    </Col>
                    <Col md="6" className="internal-col-spacing">
                      <TextField
                        id="outlined-basic"
                        label="Location"
                        variant="outlined"
                        fullWidth
                        value={instituteForm.location.value}
                        onChange={(e) =>
                          inputChangedHandler(e, "location", "institute")
                        }
                        onBlur={(e) =>
                          inputBlurHandler(e, "location", "institute")
                        }
                        error={instituteForm.location.invalid}
                        helperText={instituteForm.location.helperText}
                      />
                    </Col>
                    <Col md="6" className="internal-col-spacing">
                      <TextField
                        id="outlined-basic"
                        label="WebSite"
                        variant="outlined"
                        fullWidth
                        value={instituteForm.website.value}
                        onChange={(e) =>
                          inputChangedHandler(e, "website", "institute")
                        }
                        onBlur={(e) =>
                          inputBlurHandler(e, "website", "institute")
                        }
                        error={instituteForm.website.invalid}
                        helperText={instituteForm.website.helperText}
                      />
                    </Col>

                    <Col md="12" className="internal-col-spacing resume-upload">
                      <input
                        accept="pdf/*"
                        style={{ display: "none" }}
                        id="contained-brochure-file"
                        type="file"
                        onChange={(event) => handleUpload(event, "brochure")}
                      />
                      <label htmlFor="contained-brochure-file">
                        {selectedBrochure ? (
                          <Button component="span" color="primary">
                            {selectedBrochure}
                          </Button>
                        ) : (
                          <Button component="span" color="primary">
                            Upload Brochure
                          </Button>
                        )}
                      </label>
                    </Col>
                    <Col md="12">
                      <span id="error-message-student">
                        {brochureError ? brochureError : ""}
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
                        onClick={handleSaveInstituteData}
                      >
                        Save
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </Paper>
              {/* <div className="checkBox-div">
            <FormControlLabel
              control={
                <Checkbox
                  checked={flag.checkedA}
                  onChange={handleChange}
                  name="checkedA"
                  color="primary"
                />
              }
              label="I am also a Teacher"
            />
          </div> */}
            </Col>
            {/* {flag.checkedA ? (
          <Col md="6">
            <Paper elevation={2} style={{ marginTop: "3%", padding: "10px" }}>
              <Container>
                <Row>
                  <Col md="12">
                    <h3 style={{ color: "#008CCB" }}>My Profile</h3>
                  </Col>
                  <Col md="3">
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="contained-button-file"
                      type="file"
                      // onChange={(event) =>
                      //   handleSelectedProfileImage(event, "profileImage")
                      // }
                    />
                    <label htmlFor="contained-button-file">
                      <img
                        src={
                          // teacherForm.profileImage.preview === ""?
                          profileImage
                          // : teacherForm.profileImage.preview
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
                    <Row>
                      <Col md="12" className="internal-col-spacing">
                        <TextField
                          id="outlined-basic"
                          label="name *"
                          variant="outlined"
                          fullWidth
                          value={teacherForm.teacherName.value}
                          onChange={(e) =>
                            inputChangedHandler(e, "teacherName", "teacher")
                          }
                          onBlur={(e) =>
                            inputBlurHandler(e, "teacherName", "teacher")
                          }
                          error={teacherForm.teacherName.invalid}
                          helperText={teacherForm.teacherName.helperText}
                        />
                      </Col>
                    </Row>
                    <Col md="12" className="internal-col-spacing">
                      <TextField
                        id="outlined-basic"
                        label="Phone Number *"
                        variant="outlined"
                        fullWidth
                        value={teacherForm.teacherPhoneNumber.value}
                        onChange={(e) =>
                          inputChangedHandler(
                            e,
                            "teacherPhoneNumber",
                            "teacher"
                          )
                        }
                        onBlur={(e) =>
                          inputBlurHandler(e, "teacherPhoneNumber", "teacher")
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
                        // value={auth.email}
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
                        inputChangedHandler(e, "aboutMe", "teacher")
                      }
                      onBlur={(e) => inputBlurHandler(e, "aboutMe", "teacher")}
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
                        inputChangedHandler(e, "subject", "teacher")
                      }
                      onBlur={(e) => inputBlurHandler(e, "subject", "teacher")}
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
                        inputChangedHandler(e, "board", "teacher")
                      }
                      onBlur={(e) => inputBlurHandler(e, "board", "teacher")}
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
                        inputChangedHandler(e, "qualification", "teacher")
                      }
                      onBlur={(e) =>
                        inputBlurHandler(e, "qualification", "teacher")
                      }
                      error={teacherForm.qualification.invalid}
                      helperText={teacherForm.qualification.helperText}
                    />
                  </Col>
                  <Col md="6" className="internal-col-spacing">
                    <TextField
                      id="outlined-basic"
                      label="Experience"
                      variant="outlined"
                      fullWidth
                      value={teacherForm.experience.value}
                      onChange={(e) =>
                        inputChangedHandler(e, "experience", "teacher")
                      }
                      onBlur={(e) =>
                        inputBlurHandler(e, "experience", "teacher")
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
                        inputChangedHandler(e, "location", "teacher")
                      }
                      onBlur={(e) => inputBlurHandler(e, "location", "teacher")}
                      error={teacherForm.location.invalid}
                      helperText={teacherForm.location.helperText}
                    />
                  </Col>
                  <Col md="6" className="internal-col-spacing">
                    <TextField
                      id="outlined-basic"
                      label="WebSite"
                      variant="outlined"
                      fullWidth
                      value={teacherForm.linkedInUrl.value}
                      onChange={(e) =>
                        inputChangedHandler(e, "linkedInUrl", "teacher")
                      }
                      onBlur={(e) =>
                        inputBlurHandler(e, "linkedInUrl", "teacher")
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
                      // onChange={(event) => handleSelectedResume(event, "resume")}
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
                      // onClick={handleSaveData}
                    >
                      Save
                    </Button>
                  </Col>
                  <Col md="12">
                  <span id="error-message-student">{error ? error : ""}</span>
                </Col>
                </Row>
              </Container>
            </Paper>
          </Col>
        ) : (
          ""
        )} */}
          </Row>
        </Container>
      )}
    </div>
  );
};

export default enhancer(TeacherProfile);
