import React, { useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import "./style.scss";
import enhancer from "./enhancer";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import {
  Paper,
  Container,
  // Grid,
  // Card,
  // CardContent,
  Typography,

} from "@material-ui/core";
const ScheduleModal = (props) => {
  let {
    handleDateChange,
    selectedDate,
    handleSubmit,
    inputBlurHandler,
    inputChangeHandler,
    registerForm,
    scheduleForm,
    courseList,
    moduleList,
    error,
    index,
    handleClose,
    handleShow,
    show,
    chapterList,
    batchList,
    // courseName,
  } = props;

  return (
    <div>

<Paper elevation={1} id="paper-test-header" style={{marginBottom:"5%"}}>
            {/* <Paper className={classes.paper} > */}
            <span className="create-test">Schedule</span>
            <Button
              id="create-test-btn"
              onClick={handleShow}
            >
              SCHEDULE NEW CLASS
        </Button>
          </Paper>
      {/* <div className="schedule-modal-div">
        <h1 id="schedule-modal-heading">Schedule</h1>
        <Button
          id="schedule-modal-btn"
          //  variant="primary"
          onClick={handleShow}
        >
          SCHEDULE NEW CLASS
        </Button>
      </div> */}
      <Modal
        show={show}
        onHide={handleClose}
        // show={true}
        // {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {/* <Modal.Header closeButton> */}

        {/* </Modal.Header> */}
        <Modal.Body>
          <p id="modal-heading">Schedule Class</p>
          <Form>
            <Form.Group as={Row}>
              <Form.Label column sm={4}>
                Course Name
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  as="select"
                  placeholder="Enter course"
                  type="text"
                  name="course"
                  onChange={(e) => inputChangeHandler(e, "course")}
                  onBlur={(e) => inputBlurHandler(e, "course")}
                  value={scheduleForm.course.value}
                  className={scheduleForm.course.invalid ? "border-danger" : ""}
                >
                  <option key=""></option>
                  {courseList.map((course) => (
                    <option value={course.id}>{course.value}</option>
                  ))}
                </Form.Control>
              </Col>
              <span className="error-message">
                {scheduleForm.course.invalid
                  ? scheduleForm.course.helperText
                  : ""}
              </span>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={4}>
                Module Name
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  as="select"
                  placeholder="Enter module"
                  name="module"
                  onChange={(e) => inputChangeHandler(e, "module")}
                  onBlur={(e) => inputBlurHandler(e, "module")}
                  value={scheduleForm.module.value}
                // className={scheduleForm.module.invalid ? "border-danger" : ""}
                >
                  <option key=""></option>
                  {moduleList.map((module) => (
                    <option value={module.id}>{module.value}</option>
                  ))}
                </Form.Control>
              </Col>
              {/* <span className="error-message">
                {scheduleForm.module.invalid
                  ? scheduleForm.module.helperText
                  : ""}
              </span> */}
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={4}>
                Chapter Name
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  as="select"
                  placeholder="Enter Chapter"
                  onChange={(e) => inputChangeHandler(e, "chapter")}
                  onBlur={(e) => inputBlurHandler(e, "chapter")}
                  value={scheduleForm.chapter.value}
                // className={
                //   scheduleForm.chapter.invalid ? "border-danger" : ""
                // }
                >
                  <option key=""></option>
                  {chapterList.map((chapter) => (
                    <option value={chapter.id}>{chapter.value}</option>
                  ))}
                </Form.Control>
              </Col>
              {/* <span className="error-message">
                {scheduleForm.chapter.invalid
                  ? scheduleForm.chapter.helperText
                  : ""}
              </span> */}
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={4}>
                Batch
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  as="select"
                  placeholder="Enter Batch"
                  onChange={(e) => inputChangeHandler(e, "batch")}
                  onBlur={(e) => inputBlurHandler(e, "batch")}
                  value={scheduleForm.batch.value}
                  className={
                    scheduleForm.batch.invalid ? "border-danger" : ""
                  }
                >
                  <option key=""></option>
                  {batchList.map((batch) => (
                    <option value={batch.id}>{batch.value}</option>
                  ))}
                </Form.Control>
              </Col>
              <span className="error-message">
                {scheduleForm.batch.invalid
                  ? scheduleForm.batch.helperText
                  : ""}
              </span>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={4}>
                Format
              </Form.Label>
              <Col sm={8}>
                <Form.Check inline type="radio" label="Online" name="format" id='online' value='online' onChange={(e) => inputChangeHandler(e, "format")}
                  onBlur={(e) => inputBlurHandler(e, "format")} />
                <Form.Check inline type="radio" label="Offline" name="format" id='offline' value='offline' onChange={(e) => inputChangeHandler(e, "format")}
                  onBlur={(e) => inputBlurHandler(e, "format")} />
              </Col>
              <span className="error-message">
                {scheduleForm.format.invalid
                  ? scheduleForm.format.helperText
                  : ""}
              </span>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={4}>
                Platform
              </Form.Label>
              <Col sm={8}>
                {/* <Form.Check inline type="radio" label="Eumetry Live" name="platform" id='liveclass' value="liveclass" onChange={(e) => inputChangeHandler(e, "platform")}
                  onBlur={(e) => inputBlurHandler(e, "platform")} /> */}
                <Form.Check inline type="radio" label="Eumetry Liveclass" name="platform" id='liveclass' value="liveclass" onChange={(e) => inputChangeHandler(e, "platform")}
                  onBlur={(e) => inputBlurHandler(e, "platform")} />
                <Form.Check inline type="radio" label="Big Blue Button" name="platform" id='bigbluebutton' value='bigbluebutton' onChange={(e) => inputChangeHandler(e, "platform")}
                  onBlur={(e) => inputBlurHandler(e, "platform")} />
                <Form.Check inline type="radio" label="Zoom" name="platform" id='zoom' value="zoom" onChange={(e) => inputChangeHandler(e, "platform")}
                  onBlur={(e) => inputBlurHandler(e, "platform")} />
              </Col>
              <span className="error-message">
                {scheduleForm.platform.invalid
                  ? scheduleForm.platform.helperText
                  : ""}
              </span>
            </Form.Group>
          </Form>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container spacing={4}>
              <Grid item sm={4} style={{ leftMargin: "10px" }}>
                {/* <Form.Label column sm={4} id="schedule-date"> */}
                <Form.Label id="schedule-date">Date</Form.Label>
              </Grid>
              <Grid item sm={4}>

                <KeyboardDatePicker
                  id="date-picker-dialog"
                  // label="Date"
                  format="MM/dd/yyyy"
                  fullWidth
                  minDate={new Date()}
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={4}>
                <Form.Label id="schedule-date">Time</Form.Label>
              </Grid>
              <Grid item xs={4}>
                <KeyboardTimePicker
                  id="time-picker"
                  // label="Time"
                  fullWidth
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                />
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>

          <Button
            id="createschedule-modal-btn"
            onClick={(e) => {
              handleSubmit();
            }}
          >
            Schedule New Class
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default enhancer(ScheduleModal);