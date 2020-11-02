import React, { useState, useEffect } from "react";
import { Modal, Container, Row, Col } from "react-bootstrap";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
  Button,
} from "@material-ui/core";
import "./style.scss";
import enhancer from "./enhancer";
import { MDBBtn } from "mdbreact";
import ReactFileReader from "react-file-reader";
import BulkTemplate from "../../../../images/template.csv";

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
const AddStudentModal = (props) => {
  let {
    studentModalForm,
    inputBlurHandler,
    inputChangeHandler,
    handleSendStudentData,
    error,
    batchList,
    selectedBatch,
    handleBatchChange,
    feeStructure,
    handleFeeStructureChange,
    selectedFeeStructure,
    courseList,
    selectedCourse,
    handleCourseChange,
    singleStudentOnboarding,
    multipleStudentOnboarding,
    single,
    multiple,
    courseInBulk,
    batchInBulk,
    handleCourseBulk,
    handleBatchBulk,
    bulkUploadFile,
    setBulkUploadFile,
    handleStudentBulkUpload,
    inputFirstPageImageUpload,
    uploadedFilename,
    colseModal,
  } = props;
  const classes = useStyles();

  const handleFiles = (files) => {
    var reader = new FileReader();
    reader.onload = function (e) {
      // Use reader.result
      console.log("csv file reader", reader.result, e);
      alert("csv file upload successfully", reader.result);
      setBulkUploadFile(reader.result);
    };
    reader.readAsText(files[0]);
  };

  console.log("Bulk uploaded file", bulkUploadFile);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* <Modal.Header closeButton>
         <span style={{fontSize:"15px",float:"right",fontWeight:"bold"}}> &#10005;</span> 
        <Modal.Title id="contained-modal-title-vcenter">
         <span style={{fontSize:"20px"}}> Add Student</span>
        </Modal.Title> 


      </Modal.Header>*/}

      <Modal.Body>
        <Container>
          <Col sm={12} md={12}>
            <div style={{ marginBottom: "3%" }}>
              <span
                id="add-teacher-heading"
                style={{
                  marginLeft: "40%",
                  marginBottom: "4%",
                  fontSize: "20px",
                }}
              >
                Add Student
              </span>
              <span
                style={{ fontSize: "15px", float: "right", size: "20px" }}
                onClick={colseModal}
              >
                {" "}
                &#10005;
              </span>
            </div>
          </Col>
          {single ? (
            <Row>
              <Col md="12" className="internal-col-add-student">
                <TextField
                  id="outlined-basic"
                  label="Student Name*"
                  variant="outlined"
                  onChange={(e) => inputChangeHandler(e, "studentName")}
                  onBlur={(e) => inputBlurHandler(e, "studentName")}
                  value={studentModalForm.studentName.value}
                  fullWidth
                  size="small"
                />
                <span id="error-message-student">
                  {studentModalForm.studentName.invalid
                    ? studentModalForm.studentName.helperText
                    : ""}
                </span>
              </Col>
              <Col md="6" className="internal-col-add-student">
                <TextField
                  id="outlined-basic"
                  label="Student Email*"
                  variant="outlined"
                  onChange={(e) => inputChangeHandler(e, "studentEmail")}
                  onBlur={(e) => inputBlurHandler(e, "studentEmail")}
                  value={studentModalForm.studentEmail.value}
                  fullWidth
                  size="small"
                />
                <span id="error-message-student">
                  {studentModalForm.studentEmail.invalid
                    ? studentModalForm.studentEmail.helperText
                    : ""}
                </span>
              </Col>
              <Col md="6" className="internal-col-add-student">
                <TextField
                  id="outlined-basic"
                  label="Mobile Number*"
                  variant="outlined"
                  onChange={(e) => inputChangeHandler(e, "studentPhoneNumber")}
                  onBlur={(e) => inputBlurHandler(e, "studentPhoneNumber")}
                  value={studentModalForm.studentPhoneNumber.value}
                  fullWidth
                  size="small"
                />
                <span id="error-message-student">
                  {studentModalForm.studentPhoneNumber.invalid
                    ? studentModalForm.studentPhoneNumber.helperText
                    : ""}
                </span>
              </Col>
              {/* </Row>
          <Row style={{ marginTop: "2%" }}> */}
              <Col md="6" className="internal-col-add-student">
                <FormControl variant="outlined" fullWidth size="small">
                  <InputLabel id="demo-simple-select-outlined-label">
                    Course Name*
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={selectedCourse}
                    onChange={(event, data) => handleCourseChange(event, data)}
                    label="courseName"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {courseList.map((course) => (
                      <MenuItem
                        key={course._id}
                        value={course._id}
                        data={[course._id, course.name]}
                      >
                        {course.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Col>
              <Col md="6" className="internal-col-add-student">
                <FormControl variant="outlined" fullWidth size="small">
                  <InputLabel id="demo-simple-select-outlined-label">
                    Batch Name*
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={selectedBatch}
                    onChange={(event, data) => handleBatchChange(event, data)}
                    label="batchName"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {batchList.map((batch) => (
                      <MenuItem
                        key={batch._id}
                        value={batch._id}
                        data={[batch._id, batch.name]}
                      >
                        {batch.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Col>
              {/* <Col md="6" className="internal-col-add-student">
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label">
                  Fee Structure *
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={selectedFeeStructure}
                  onChange={(event, data) =>
                    handleFeeStructureChange(event, data)
                  }
                  label="feeStructure"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {feeStructure.map((fee) => (
                    <MenuItem
                      key={fee._id}
                      value={fee._id}
                      data={[fee._id, fee.name]}
                    >
                      {fee.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Col> */}
              {/* <Col md="6" className="internal-col-add-student">
              <TextField
                id="outlined-basic"
                label="Discount(Amount)"
                variant="outlined"
                onChange={(e) => inputChangeHandler(e, "discount")}
                onBlur={(e) => inputBlurHandler(e, "discount")}
                value={studentModalForm.discount.value}
                fullWidth
              />
              <span id="error-message-student">
                {studentModalForm.discount.invalid
                  ? studentModalForm.discount.helperText
                  : ""}
              </span>
            </Col> */}
            </Row>
          ) : null}

          {/*  for CSV upload */}
          {multiple ? (
            <Row>
              <Col md="6" className="internal-col-add-student">
                <FormControl variant="outlined" fullWidth size="small">
                  <InputLabel id="demo-simple-select-outlined-label">
                    Course Name*
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    // value={selectedCourse}
                    // onChange={(event, data) => handleCourseChange(event, data)}
                    value={courseInBulk}
                    onChange={handleCourseBulk}
                    // onChange={(event, data) => handleCourseBulk(event, data)}

                    label="courseName*"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {courseList.map((course) => (
                      <MenuItem
                        key={course._id}
                        value={course._id}
                        data={[course._id, course.name]}
                      >
                        {course.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Col>
              <Col md="6" className="internal-col-add-student">
                <FormControl variant="outlined" fullWidth size="small">
                  <InputLabel id="demo-simple-select-outlined-label">
                    Batch Name*
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    // value={selectedBatch}
                    // onChange={(event, data) => handleBatchChange(event, data)}

                    value={batchInBulk}
                    onChange={handleBatchBulk}
                    label="batchName*"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {batchList.map((batch) => (
                      <MenuItem
                        key={batch._id}
                        value={batch._id}
                        data={[batch._id, batch.name]}
                      >
                        {batch.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Col>

              <Col
                md={4}
                sm={4}
                //  md={{ span: 4, offset: 8}}
                style={{ marginTop: "2%" }}
              >
                {/* <Col
                              md={{ span: "8" }}
                              style={{ paddingLeft: "0px" }}
                            > */}
                <input
                  accept=".csv, .xlsx"
                  className={classes.input}
                  id="contained-button-file"
                  // multiple
                  type="file"
                  onChange={(e) => inputFirstPageImageUpload(e)}
                />
                <label htmlFor="contained-button-file">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    size="large"
                    // onClick={(e) =>
                    //   inputFirstPageImageUpload(e)
                    // }
                  >
                    Upload File
                  </Button>
                </label>
                {/* </Col> */}

                {/* <ReactFileReader handleFiles={handleFiles} fileTypes={".csv"}>
    <MDBBtn id="create-course-btn-new">upload csv</MDBBtn>
    {/* <button className='btn'>Upload</button> 
  </ReactFileReader>  */}
              </Col>
              <Col sm={8} md={8} style={{ marginTop: "3%" }}>
                {uploadedFilename ? (
                  <span style={{ color: "green", fontSize: "14px" }}>
                    {uploadedFilename}
                  </span>
                ) : null}
              </Col>

              <Col md={12} sm={12}>
                <span style={{ color: "grey", fontSize: "11px" }}>
                  {" "}
                  Supported file format (.csv , .xlsx)
                </span>
              </Col>

              <Col md={12} sm={12}>
                <a
                  style={{ float: "right" }}
                  href={BulkTemplate}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Bulk_upload_template.csv"
                >
                  <i className="fas fa-download" />
                  Download Template File(.csv)
                  {/* <Button>
<i className="fas fa-download"/>
Download Template File(.csv)
</Button> */}
                </a>
              </Col>
            </Row>
          ) : null}
          <Row>
            <div style={{ marginLeft: "46%", marginTop: "3%" }}>
              {single ? (
                <Button
                  id="modal-send-btn"
                   onClick={handleSendStudentData}
                >
                  Save
                </Button>
              ) : null}
              {multiple ? (
                <Button id="modal-send-btn" onClick={handleStudentBulkUpload}>
                  Save
                </Button>
              ) : null}
            </div>
            <span id="error-message-student">{error ? error : ""}</span>
          </Row>
        </Container>
      </Modal.Body>
      {/* {single ? (
        <Modal.Footer>
          <Button
            id="modal-send-btn"
            //  onClick={handleSendStudentData}
          >
            Save
          </Button>
        </Modal.Footer>
      ) : null}

      {multiple ? (
        <Modal.Footer>
          <Button id="modal-send-btn" onClick={handleStudentBulkUpload}>
            Save
          </Button>
        </Modal.Footer>
      ) : null}
      
      <span id="error-message-student">{error ? error : ""}</span> */}
    </Modal>
  );
};

export default enhancer(AddStudentModal);
