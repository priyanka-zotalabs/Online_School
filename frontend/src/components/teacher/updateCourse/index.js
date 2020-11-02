import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from "mdbreact";
import { Row, Col, Modal } from "react-bootstrap";
import {
  Paper,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  TextField,
  IconButton,
  FormHelperText,
  makeStyles,
  Button,
  TextareaAutosize,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import "./style.scss";
import enhancer from "./enhancer";
import Loading from "../../../shared/Components/Loading/index";
import Switch from "@material-ui/core/Switch";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
    },
  },
  input: {
    display: "none",
  },
}));
const UpdateCourse = (props) => {
  let {
    swapFormActive,
    formActivePanel1,
    formActivePanel1Changed,
    inputList,
    handleAddClick,
    handleRemoveClick,
    moduleList,
    handleModuleRemoveClick,
    handleModuleAddClick,
    handleContentAddFile,
    modalShow,
    handleModalClose,

    handleInput,
    handleChapterInput,
    inputBlurHandlerForModule,
    inputBlurHandlerForChapter,
    inputFirstPageChangedHandler,
    inputFirstPageBlurHandler,
    firstPageData,
    lastPage,

    contentModuleIndex,
    contentChapterIndex,
    inputChangedLastPageHandler,
    inputBlurLastPageHandler,
    loader,
    handleCreateCourse,
    swapFormActiveBack,
    handleAddContent,
    inputChangedLastPageFileHandler,
    uploadHandle,
    handleVimeoChange,
    inputChangedLastPageVideoFileHandler,
    inputFirstPageImageUpload,
    inputModulePageFileUpload,
    teacherCurrentCourse,
    handleContentRemoveClick,
    progress,
  } = props;
  const classes = useStyles();

  return (
    <div>
      <MDBContainer>
        <Paper elevation={2} id="paper-course-header">
          <h3 className="create-course">Edit Course</h3>
        </Paper>
        <Paper>
          <table id="updateCourse-table">
            <tr>
              {formActivePanel1 == 1 ? (
                <th className="active">Edit Course</th>
              ) : (
                <th>Edit Course</th>
              )}
              {formActivePanel1 == 2 ? (
                <th className="active">Edit Module</th>
              ) : (
                <th>Edit Module</th>
              )}
              {formActivePanel1 == 3 ? (
                <th className="active">Edit Content</th>
              ) : (
                <th>Edit Content</th>
              )}
            </tr>
          </table>

          <form role="form" action="" method="post">
            <MDBRow>
              {formActivePanel1 == 1 && (
                <div className="panel-div">
                  <Paper elevation={3} style={{ width: "97%", margin: "auto" }}>
                    <MDBCol md="12">
                      <Row style={{ paddingBottom: "80px" }}>
                        <Col md={{ span: "12" }} id="panel-one-header">
                          <h3 className="course-heading">Overview</h3>
                          <hr style={{ marginTop: "0px" }} />
                        </Col>
                        <Col md={4}>
                          <TextField
                            id="outlined-basic"
                            label="Course Name"
                            variant="outlined"
                            style={{ width: "100%" }}
                            value={firstPageData.name.value}
                            onChange={(e) =>
                              inputFirstPageChangedHandler(e, "name")
                            }
                            onBlur={(e) => inputFirstPageBlurHandler(e, "name")}
                            error={firstPageData.name.invalid}
                            helperText={firstPageData.name.helperText}
                          />
                        </Col>
                        <Col md={8}>
                          <TextField
                            id="outlined-basic"
                            label="Course Description"
                            variant="outlined"
                            style={{ width: "100%" }}
                            value={firstPageData.description.value}
                            onChange={(e) =>
                              inputFirstPageChangedHandler(e, "description")
                            }
                            onBlur={(e) =>
                              inputFirstPageBlurHandler(e, "description")
                            }
                            error={firstPageData.description.invalid}
                            helperText={firstPageData.description.helperText}
                          />
                        </Col>
                        <Col md={{ span: "4" }} style={{ paddingTop: "20px" }}>
                          <TextField
                            id="outlined-basic"
                            label="subject"
                            variant="outlined"
                            style={{ width: "100%" }}
                            value={firstPageData.subject.value}
                            onChange={(e) =>
                              inputFirstPageChangedHandler(e, "subject")
                            }
                            onBlur={(e) =>
                              inputFirstPageBlurHandler(e, "subject")
                            }
                            error={firstPageData.subject.invalid}
                            helperText={firstPageData.subject.helperText}
                          />
                        </Col>
                        <Col md={{ span: "4" }} style={{ paddingTop: "20px" }}>
                          <FormControl
                            variant="outlined"
                            style={{ width: "100%" }}
                            error={firstPageData.format.invalid}
                          >
                            <InputLabel id="demo-simple-select-outlined-label">
                              Format
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              value={firstPageData.format.value}
                              onChange={(e) =>
                                inputFirstPageChangedHandler(e, "format")
                              }
                              onBlur={(e) =>
                                inputFirstPageBlurHandler(e, "format")
                              }
                              label="Format"
                            >
                              <MenuItem value="Online">online</MenuItem>
                              <MenuItem value="Offline">offline</MenuItem>
                              <MenuItem value="both">both</MenuItem>
                            </Select>
                            <FormHelperText>
                              {firstPageData.format.helperText}
                            </FormHelperText>
                          </FormControl>
                        </Col>
                        <Col md={{ span: "4" }}>
                          <Row style={{ paddingTop: "20px" }}>
                            <Col md={{ span: "7" }}>
                              {!firstPageData.courseImageUrl.clicked ? (
                                <img
                                  style={{ height: "auto", width: "100%" }}
                                  src={firstPageData.courseImageUrl.value}
                                />
                              ) : (
                                <TextField
                                  id="filled-uncontrolled"
                                  fullWidth
                                  // autoComplete="on"
                                  label="Course Image"
                                  value={
                                    firstPageData.courseImageUrl.name ===
                                      null ||
                                    firstPageData.courseImageUrl.name ===
                                      undefined
                                      ? ""
                                      : firstPageData.courseImageUrl.name
                                  }
                                  error={firstPageData.courseImageUrl.invalid}
                                  helperText={
                                    firstPageData.courseImageUrl.helperText
                                  }
                                />
                              )}
                            </Col>
                            <Col
                              md={{ span: "5" }}
                              style={{ paddingLeft: "0px" }}
                            >
                              <input
                                accept="image/*"
                                className={classes.input}
                                id="contained-button-file"
                                multiple
                                type="file"
                                onChange={(e) =>
                                  inputFirstPageImageUpload(e, "courseImageUrl")
                                }
                              />
                              <label htmlFor="contained-button-file">
                                <Button
                                  variant="contained"
                                  color="primary"
                                  component="span"
                                  size="large"
                                >
                                  Change Image
                                </Button>
                              </label>
                            </Col>
                          </Row>
                        </Col>
                        <Col md={{ span: "12" }}>
                          <div id="lock-First-page">
                            <Tooltip title="Enabling the feature will lock the further content for the student to view until the next chapter starts.">
                              <p>Do you want to lock the chapters?</p>
                            </Tooltip>
                            <Tooltip title="Enabling the feature will lock the further content for the student to view until the next chapter starts.">
                              <Switch
                                checked={firstPageData.isLock.value}
                                onChange={(e) =>
                                  inputFirstPageChangedHandler(e, "isLock")
                                }
                                color="primary"
                                name="checkedB"
                                inputProps={{
                                  "aria-label": "primary checkbox",
                                }}
                              />
                            </Tooltip>
                          </div>
                        </Col>
                      </Row>
                    </MDBCol>
                  </Paper>
                  <Row style={{ marginTop: "3%", padding: "0px 30px" }}>
                    <Col md={{ span: "4", offset: "8" }}>
                      <MDBBtn
                        // style={{ width: "100%" }}

                        style={{ width: "100%", backgroundColor: "#8499ff" }}
                        color="#8499ff"
                        // color="orange"
                        rounded
                        onClick={swapFormActive(1)(2)}
                        size="sm"
                      >
                        Next
                      </MDBBtn>
                    </Col>
                  </Row>
                </div>
              )}

              {formActivePanel1 == 2 && (
                <div className="panel-div">
                  <Paper elevation={3} style={{ width: "92%", margin: "auto" }}>
                    <MDBCol md="12">
                      <h3 className="font-weight-bold pl-0 course-heading">
                        <strong>{firstPageData.name.value}</strong>
                      </h3>
                      <hr style={{ marginTop: "0px" }} />
                      {moduleList.map((mx, mi) => {
                        return (
                          <div key={mx.id} className="box">
                            <Row>
                              <Col md={{ span: "4" }}>
                                <TextField
                                  id="outlined-basic"
                                  label="Module Name"
                                  variant="outlined"
                                  style={{ width: "100%" }}
                                  value={moduleList[mi]["moduleName"].value}
                                  onChange={(e) =>
                                    handleInput(e, "moduleName", mi)
                                  }
                                  onBlur={(e) =>
                                    inputBlurHandlerForModule(
                                      e,
                                      "moduleName",
                                      mi
                                    )
                                  }
                                  error={moduleList[mi]["moduleName"].invalid}
                                  helperText={
                                    moduleList[mi]["moduleName"].helperText
                                  }
                                />
                              </Col>

                              <Col md={{ span: "8" }}>
                                <Row>
                                  <Col md={{ span: "7" }}>
                                    {!moduleList[mi]["moduleImage"].clicked ? (
                                      <img
                                        style={{
                                          height: "100px",
                                          width: "100%",
                                        }}
                                        src={
                                          moduleList[mi]["moduleImage"].value
                                        }
                                      />
                                    ) : (
                                      <TextField
                                        id="standard-basic"
                                        fullWidth
                                        label="Module Image"
                                        value={
                                          moduleList[mi]["moduleImage"].name ===
                                            null ||
                                          moduleList[mi]["moduleImage"].name ===
                                            undefined
                                            ? ""
                                            : moduleList[mi]["moduleImage"].name
                                        }
                                        error={
                                          moduleList[mi]["moduleImage"].invalid
                                        }
                                        helperText={
                                          moduleList[mi]["moduleImage"]
                                            .helperText
                                        }
                                      />
                                    )}
                                  </Col>
                                  <Col
                                    md={{ span: "5" }}
                                    style={{ paddingLeft: "0px" }}
                                  >
                                    <input
                                      accept="image/*"
                                      className={classes.input}
                                      id={"contained-module-file" + mi}
                                      multiple
                                      type="file"
                                      onChange={(e) =>
                                        inputModulePageFileUpload(
                                          e,
                                          "moduleImage",
                                          mi
                                        )
                                      }
                                    />
                                    <label
                                      htmlFor={"contained-module-file" + mi}
                                    >
                                      <Button
                                        variant="contained"
                                        color="primary"
                                        component="span"
                                        size="large"
                                      >
                                        Change Image
                                      </Button>
                                    </label>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                            <Row
                              md={{ span: "12" }}
                              style={{
                                width: "94%",
                                paddingTop: "20px",
                                paddingLeft: "18px",
                              }}
                            >
                              <TextField
                                id="outlined-multiline-static"
                                multiline
                                rows={3}
                                label="Module Description"
                                variant="outlined"
                                style={{ width: "100%" }}
                                value={
                                  moduleList[mi]["moduleDescription"].value
                                }
                                onChange={(e) =>
                                  handleInput(e, "moduleDescription", mi)
                                }
                                onBlur={(e) =>
                                  inputBlurHandlerForModule(
                                    e,
                                    "moduleDescription",
                                    mi
                                  )
                                }
                                error={
                                  moduleList[mi]["moduleDescription"].invalid
                                }
                                helperText={
                                  moduleList[mi]["moduleDescription"].helperText
                                }
                              />
                            </Row>
                            {moduleList[mi].chapter
                              // .filter((x) => x.id[0] == mi)
                              .map((x, i) => {
                                return (
                                  <div key={x.id} className="my-3 chapter-div">
                                    <Row>
                                      <Col md={{ span: "3", offset: "1" }}>
                                        <TextField
                                          id="outlined-basic"
                                          label="Chapter Name"
                                          variant="outlined"
                                          style={{ width: "100%" }}
                                          value={
                                            moduleList[mi]["chapter"][i][
                                              "firstName"
                                            ].value
                                          }
                                          onChange={(e) =>
                                            handleChapterInput(
                                              e,
                                              "firstName",
                                              mi,
                                              i
                                            )
                                          }
                                          onBlur={(e) =>
                                            inputBlurHandlerForChapter(
                                              e,
                                              "firstName",
                                              mi,
                                              i
                                            )
                                          }
                                          error={
                                            moduleList[mi]["chapter"][i][
                                              "firstName"
                                            ].invalid
                                          }
                                          helperText={
                                            moduleList[mi]["chapter"][i][
                                              "firstName"
                                            ].helperText
                                          }
                                        />
                                      </Col>
                                      <Col md={{ span: "7" }}>
                                        <TextField
                                          id="outlined-basic"
                                          label="Chapter Description"
                                          variant="outlined"
                                          style={{ width: "100%" }}
                                          value={
                                            moduleList[mi]["chapter"][i][
                                              "lastName"
                                            ].value
                                          }
                                          onChange={(e) =>
                                            handleChapterInput(
                                              e,
                                              "lastName",
                                              mi,
                                              i
                                            )
                                          }
                                          onBlur={(e) =>
                                            inputBlurHandlerForChapter(
                                              e,
                                              "lastName",
                                              mi,
                                              i
                                            )
                                          }
                                          error={
                                            moduleList[mi]["chapter"][i][
                                              "lastName"
                                            ].invalid
                                          }
                                          helperText={
                                            moduleList[mi]["chapter"][i][
                                              "lastName"
                                            ].helperText
                                          }
                                        />
                                      </Col>
                                      {moduleList[mi].chapter.length !== 1 && (
                                        <Col md={{ span: "1" }}>
                                          <IconButton
                                            color="primary"
                                            aria-label="upload picture"
                                            component="span"
                                            onClick={(e) =>
                                              handleRemoveClick(mi, i)
                                            }
                                            style={{ marginTop: "15px" }}
                                          >
                                            <Delete />
                                          </IconButton>
                                        </Col>
                                      )}
                                    </Row>
                                    {moduleList[mi].chapter.length - 1 ===
                                      i && (
                                      <Row style={{ padding: "10px" }}>
                                        <Col md={{ span: "4", offset: "8" }}>
                                          <MDBBtn
                                            onClick={(e) => handleAddClick(mi)}
                                            className="float-right add-chapter-btn"
                                            size="sm"
                                          >
                                            Add Chapter
                                          </MDBBtn>
                                        </Col>
                                      </Row>
                                    )}
                                  </div>
                                );
                              })}
                            <div className="btn-box">
                              <Row>
                                {moduleList.length !== 1 && (
                                  <Col md={4}>
                                    <MDBBtn
                                      size="sm"
                                      className="mr10"
                                      outline
                                      color="danger"
                                      // style={{ float: "right" }}
                                      onClick={() =>
                                        handleModuleRemoveClick(mi)
                                      }
                                    >
                                      Remove Module
                                    </MDBBtn>
                                  </Col>
                                )}

                                {moduleList.length - 1 === mi && (
                                  <Col md={{ span: "3", offset: "9" }}>
                                    <MDBBtn
                                      size="sm"
                                      id="add-chapter-btn"
                                      style={{ float: "right", width: "100%" }}
                                      rounded
                                      onClick={handleModuleAddClick}
                                    >
                                      Add Module
                                    </MDBBtn>
                                  </Col>
                                )}
                              </Row>
                              <hr style={{ marginBottom: "2rem" }} />
                            </div>
                          </div>
                        );
                      })}
                    </MDBCol>
                  </Paper>
                  <Row style={{ marginTop: "3%", padding: "0px 30px" }}>
                    <Col md={4}>
                      <MDBBtn
                        // style={{ width: "100%" }}
                        // color="orange"

                        style={{
                          width: "100%",
                          backgroundColor: "white",
                          border: "2px solid #8499ff ",
                          color: "#8499ff",
                        }}
                        color=" #8499ff"
                        outline
                        onClick={swapFormActiveBack(1)(1)}
                        size="sm"
                      >
                        Back
                      </MDBBtn>
                    </Col>
                    <Col classname="d.none .d-md-block" md={4}></Col>
                    <Col md={4}>
                      <MDBBtn
                        // style={{ width: "100%" }}
                        // color="orange"

                        style={{ width: "100%", backgroundColor: "#8499ff" }}
                        color="#8499ff"
                        rounded
                        onClick={swapFormActive(1)(3)}
                        size="sm"
                      >
                        Next
                      </MDBBtn>
                    </Col>
                  </Row>
                </div>
              )}

              {formActivePanel1 == 3 && (
                <div className="panel-div container">
                  {loader ? (
                    <Loading isLoading={true}></Loading>
                  ) : (
                    <MDBCol md="12">
                      <Row style={{ paddingBottom: "10px" }}>
                        <Col md={{ span: "12" }} id="panel-one-header">
                          <h3 className="course-heading">
                            {firstPageData.name.value}
                          </h3>
                          <hr style={{ marginTop: "0px" }} />
                        </Col>
                      </Row>
                      <Paper elevation={3}>
                        {/* <Row style={{ paddingBottom: "80px" }}> */}
                        {moduleList.map((module, index) => {
                          return (
                            <Col style={{ paddingBottom: "80px" }}>
                              <Col md={{ span: "12" }} id="panel-one-header">
                                <h3 className="module-heading">
                                  {module.moduleName.value}
                                </h3>
                                <hr style={{ marginTop: "0px" }} />
                              </Col>
                              {module.chapter.map((chapter, cIndex) => {
                                return (
                                  <Row>
                                    <Col md={{ span: "4", offset: "1" }}>
                                      <p className="chapter-name">
                                        {chapter.firstName.value}
                                      </p>
                                    </Col>
                                    <Col md={{ span: "4", offset: "1" }}>
                                      <MDBBtn
                                        id="add-module-btn"
                                        rounded
                                        style={{ width: "70%" }}
                                        onClick={(e) =>
                                          handleContentAddFile(e, index, cIndex)
                                        }
                                        size="sm"
                                      >
                                        Edit File
                                      </MDBBtn>
                                    </Col>
                                  </Row>
                                );
                              })}
                            </Col>
                          );
                        })}
                        {/* </Row> */}
                      </Paper>
                    </MDBCol>
                  )}
                  <Row style={{ marginTop: "3%", padding: "0px 30px" }}>
                    <Col md={4}>
                      <MDBBtn
                        // style={{ width: "100%" }}
                        // color="orange"

                        style={{
                          width: "100%",
                          backgroundColor: "white",
                          border: "2px solid #8499ff ",
                          color: "#8499ff",
                        }}
                        color=" #8499ff"
                        outline
                        onClick={swapFormActiveBack(1)(2)}
                        size="sm"
                      >
                        Back
                      </MDBBtn>
                    </Col>
                    <Col classname="d.none .d-md-block" md={4}></Col>
                    <Col md={4}>
                      <MDBBtn
                        // style={{ width: "100%" }}
                        // color="orange"
                        style={{ width: "100%", backgroundColor: "#8499ff" }}
                        color="#8499ff"
                        rounded
                        onClick={(event) => handleCreateCourse(event)}
                        size="sm"
                      >
                        Update Course
                      </MDBBtn>
                    </Col>
                  </Row>

                  <Modal
                    show={modalShow}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                    <Modal.Header>
                      <Modal.Title id="contained-modal-title-vcenter">
                        Add Content
                      </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                      {/* <Paper elevation={3} style={{ padding: "30px" }}> */}
                      <Row>
                        {moduleList[contentModuleIndex].chapter[
                          contentChapterIndex
                        ].content.map((content, index) => {
                          return (
                            <Row style={{ margin: "auto", paddingTop: "20px" }}>
                              <Col sm={3}>
                                <FormControl
                                  variant="outlined"
                                  style={{ width: "100%" }}
                                  error={content["contentType"].invalid}
                                >
                                  <InputLabel id="demo-simple-select-outlined-label">
                                    Content Type
                                  </InputLabel>
                                  <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    label="Content Type"
                                    value={content["contentType"].value}
                                    onChange={(e) =>
                                      inputChangedLastPageHandler(
                                        e,
                                        "contentType",
                                        contentModuleIndex,
                                        contentChapterIndex,
                                        index
                                      )
                                    }
                                    onBlur={(e) =>
                                      inputBlurLastPageHandler(
                                        e,
                                        "contentType",
                                        contentModuleIndex,
                                        contentChapterIndex,
                                        index
                                      )
                                    }
                                  >
                                    <MenuItem value="Document">
                                      Document
                                    </MenuItem>
                                    <MenuItem value="Video">Video</MenuItem>
                                  </Select>
                                  <FormHelperText>
                                    {content["contentType"].helperText}
                                  </FormHelperText>
                                </FormControl>
                              </Col>
                              <Col sm={8}>
                                <TextField
                                  id="outlined-basic"
                                  label="Content Details"
                                  variant="outlined"
                                  fullWidth
                                  value={content.details.value}
                                  onChange={(e) =>
                                    inputChangedLastPageHandler(
                                      e,
                                      "details",
                                      contentModuleIndex,
                                      contentChapterIndex,
                                      index
                                    )
                                  }
                                  onBlur={(e) =>
                                    inputBlurLastPageHandler(
                                      e,
                                      "details",
                                      contentModuleIndex,
                                      contentChapterIndex,
                                      index
                                    )
                                  }
                                  error={content.details.invalid}
                                  helperText={content.details.helperText}
                                />
                              </Col>
                              <Row>
                                {content["contentType"].value === "Video" ? (
                                  <Row
                                    style={{
                                      margin: "auto",
                                      paddingTop: "10px",
                                      paddingLeft: "12px",
                                    }}
                                  >
                                    <Col md={5}>
                                      <TextField
                                        id="outlined-basic"
                                        label="Video Title"
                                        variant="outlined"
                                        style={{ width: "175px" }}
                                        value={content["title"].value}
                                        onChange={(e) =>
                                          inputChangedLastPageHandler(
                                            e,
                                            "title",
                                            contentModuleIndex,
                                            contentChapterIndex,
                                            index
                                          )
                                        }
                                        onBlur={(e) =>
                                          inputBlurLastPageHandler(
                                            e,
                                            "title",
                                            contentModuleIndex,
                                            contentChapterIndex,
                                            index
                                          )
                                        }
                                        error={content.title.invalid}
                                        helperText={content.title.helperText}
                                      />
                                    </Col>
                                    <Col md={5}>
                                      {content.link.url != undefined &&
                                      content.link.url != null &&
                                      content.link.url != "" ? (
                                        // <iframe src={content.link.url} width="640" height="360" frameborder="0" ></iframe>
                                        <a
                                          href={content.link.url}
                                          target="_blank"
                                        >
                                          Video
                                        </a>
                                      ) : (
                                        <TextField
                                          id="standard-basic"
                                          name="Video Url"
                                          variant="outlined"
                                          label="Upload Video"
                                          value={
                                            content.link.value === null ||
                                            content.link.value === undefined
                                              ? ""
                                              : content.link.value
                                          }
                                          error={content.link.invalid}
                                          helperText={
                                            content.link.helperText === ""
                                              ? "Supported Formats:mp4,mkv only"
                                              : content.link.helperText
                                          }
                                        />
                                      )}
                                    </Col>
                                    <Col md={2}>
                                      {
                                        <Col>
                                          <input
                                            accept="video/*"
                                            className={classes.input}
                                            id={index}
                                            multiple
                                            type="file"
                                            onChange={(e) =>
                                              handleVimeoChange(
                                                e,
                                                "link",
                                                contentModuleIndex,
                                                contentChapterIndex,
                                                index
                                              )
                                            }
                                          />
                                          <label htmlFor={index}>
                                            <Button
                                              variant="contained"
                                              color="primary"
                                              component="span"
                                              size="large"
                                            >
                                              Upload
                                            </Button>
                                          </label>
                                        </Col>
                                      }
                                    </Col>
                                  </Row>
                                ) : (
                                  <Row
                                    style={{
                                      margin: "auto",
                                      paddingTop: "10px",
                                      paddingLeft: "12px",
                                    }}
                                  >
                                    <Col sm={5}>
                                      <TextField
                                        id="outlined-basic"
                                        label="Document Title"
                                        variant="outlined"
                                        value={content["title"].value}
                                        style={{ width: "175px" }}
                                        onChange={(e) =>
                                          inputChangedLastPageHandler(
                                            e,
                                            "title",
                                            contentModuleIndex,
                                            contentChapterIndex,
                                            index
                                          )
                                        }
                                        onBlur={(e) =>
                                          inputBlurLastPageHandler(
                                            e,
                                            "title",
                                            contentModuleIndex,
                                            contentChapterIndex,
                                            index
                                          )
                                        }
                                        error={content.title.invalid}
                                        helperText={content.title.helperText}
                                      />
                                    </Col>
                                    <Col sm={5}>
                                      {content.documentLink.url != "" ? (
                                        <a
                                          href={content.documentLink.url}
                                          target="_blank"
                                        >
                                          Documet
                                        </a>
                                      ) : (
                                        <TextField
                                          id="standard-basic"
                                          name="Document Url"
                                          variant="outlined"
                                          label="Upload Document"
                                          value={content.documentLink.value}
                                          error={content.documentLink.invalid}
                                          helperText={
                                            content.documentLink.helperText ===
                                            ""
                                              ? "Upload Limit:5 mb Supported Format:PDF Only"
                                              : content.documentLink.helperText
                                          }
                                        />
                                      )}
                                    </Col>
                                    <Col md={2}>
                                      {
                                        <Col>
                                          <input
                                            accept="application/pdf"
                                            className={classes.input}
                                            id={index}
                                            multiple
                                            type="file"
                                            onChange={(e) =>
                                              uploadHandle(
                                                e,
                                                "documentLink",
                                                contentModuleIndex,
                                                contentChapterIndex,
                                                index
                                              )
                                            }
                                          />
                                          <label htmlFor={index}>
                                            <Button
                                              variant="contained"
                                              color="primary"
                                              component="span"
                                              size="large"
                                            >
                                              Upload
                                            </Button>
                                          </label>
                                        </Col>
                                      }
                                    </Col>
                                  </Row>
                                )}
                              </Row>
                              {moduleList[contentModuleIndex].chapter[
                                contentChapterIndex
                              ].content.length !== 1 && (
                                <Col md={1} style={{ marginLeft: "25%" }}>
                                  <IconButton
                                    color="primary"
                                    aria-label="upload picture"
                                    component="span"
                                    onClick={(e) =>
                                      handleContentRemoveClick(
                                        contentModuleIndex,
                                        contentChapterIndex,
                                        index
                                      )
                                    }
                                    style={{ marginTop: "15px" }}
                                  >
                                    <Delete />
                                  </IconButton>
                                </Col>
                              )}
                            </Row>
                          );
                        })}
                        <Col md={{ span: "3", offset: "9" }}>
                          <MDBBtn
                            size="sm"
                            id="add-chapter-btn"
                            style={{ float: "right", width: "100%" }}
                            rounded
                            onClick={(e) =>
                              handleAddContent(
                                contentModuleIndex,
                                contentChapterIndex
                              )
                            }
                          >
                            Add Content
                          </MDBBtn>
                        </Col>
                      </Row>
                      {/* </Paper> */}
                      <Col></Col>
                    </Modal.Body>

                    <Modal.Footer>
                      <div>
                        <MDBBtn
                          id="add-content-button"
                          onClick={handleModalClose}
                        >
                          Submit
                        </MDBBtn>
                        <MDBBtn
                          // id="add-content-button"
                          onClick={handleModalClose}
                        >
                          Close
                        </MDBBtn>
                      </div>
                    </Modal.Footer>
                  </Modal>
                </div>
              )}
            </MDBRow>
          </form>
        </Paper>
      </MDBContainer>
    </div>
  );
};

export default enhancer(UpdateCourse);
