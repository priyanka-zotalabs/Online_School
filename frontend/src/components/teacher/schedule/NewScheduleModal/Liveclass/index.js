import React, { useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import "../style.scss";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import enhancer from "./enhancer";
const LiveclassModal = (props) => {
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
    chapterList,
    batchList,
  } = props;

  return (
    <>
      <Form>
        <Form.Group as={Row} sm={12}>
          <Col sm={6}>
            <Form.Control
              as="select"
              placeholder="Enter Class"
              type="text"
              name="course"
              onChange={(e) => inputChangeHandler(e, "course")}
              onBlur={(e) => inputBlurHandler(e, "course")}
              value={scheduleForm.course.value}
              className={scheduleForm.course.invalid ? "border-danger" : ""}
            >
              <option key="">Select Class</option>
              {courseList.map((course) => (
                <option value={course.id}>{course.value}</option>
              ))}
            </Form.Control>
            <span className="error-message">
              {scheduleForm.course.invalid
                ? scheduleForm.course.helperText
                : ""}
            </span>
          </Col>
          <Col sm={6}>
            <Form.Control
              as="select"
              placeholder="Select Section"
              onChange={(e) => inputChangeHandler(e, "batch")}
              onBlur={(e) => inputBlurHandler(e, "batch")}
              value={scheduleForm.batch.value}
              className={
                scheduleForm.batch.invalid ? "border-danger" : ""
              }
            >
              <option key="">Select Section</option>
              {batchList.map((batch) => (
                <option value={batch.id}>{batch.value}</option>
              ))}
            </Form.Control>
            <span className="error-message">
              {scheduleForm.batch.invalid
                ? scheduleForm.batch.helperText
                : ""}
            </span>
          </Col>
        </Form.Group>

        {/* Second Row */}
        <Form.Group as={Row} sm={12}>

          {/* // Subject */}
          <Col sm={4}>
            <Form.Control
              as="select"
              placeholder="Enter module"
              name="module"
              onChange={(e) => inputChangeHandler(e, "module")}
              onBlur={(e) => inputBlurHandler(e, "module")}
              value={scheduleForm.module.value}
            // className={scheduleForm.module.invalid ? "border-danger" : ""}
            >
              <option key="">Select Subject</option>
              {moduleList.map((module) => (
                <option value={module.id}>{module.value}</option>
              ))}
            </Form.Control>

            <span className="error-message">
              {scheduleForm.module.invalid
                ? scheduleForm.module.helperText
                : ""}
            </span>
          </Col>

          {/*  // Module */}
          <Col sm={4}>
            <Form.Control
              as="select"
              placeholder="Enter module"
              name="module"
              onChange={(e) => inputChangeHandler(e, "module")}
              onBlur={(e) => inputBlurHandler(e, "module")}
              value={scheduleForm.module.value}
            // className={scheduleForm.module.invalid ? "border-danger" : ""}
            >
              <option key="">Select Module</option>
              {moduleList.map((module) => (
                <option value={module.id}>{module.value}</option>
              ))}
            </Form.Control>

            <span className="error-message">
              {scheduleForm.module.invalid
                ? scheduleForm.module.helperText
                : ""}
            </span>
          </Col>

          {/* // Chapter */}
          <Col sm={4}>
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
              <option key="">Select Chapter</option>
              {chapterList.map((chapter) => (
                <option value={chapter.id}>{chapter.value}</option>
              ))}
            </Form.Control>
            <span className="error-message">
              {scheduleForm.chapter.invalid
                ? scheduleForm.chapter.helperText
                : ""}
            </span>
          </Col>
        </Form.Group>

        {/* Third Row */}
        <Form.Group as={Row} sm={12}>
          <Col sm={2}>
            Format
                  <span className="error-message">
              {scheduleForm.format.invalid
                ? scheduleForm.format.helperText
                : ""}
            </span>
          </Col>
          <Col sm={2}>
            <Form.Check inline type="radio" label="Online" name="format" id='online' value='online' onChange={(e) => inputChangeHandler(e, "format")}
              onBlur={(e) => inputBlurHandler(e, "format")} />
          </Col>
          <Col sm={2}>
            <Form.Check inline type="radio" label="Offline" name="format" id='offline' value='offline' onChange={(e) => inputChangeHandler(e, "format")}
              onBlur={(e) => inputBlurHandler(e, "format")} />
          </Col>
          <Col sm={3}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
            </MuiPickersUtilsProvider>
          </Col>
          <Col sm={3}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
            </MuiPickersUtilsProvider>
          </Col>
        </Form.Group>
      </Form>
      <Button
        id="createschedule-modal-btn"
        onClick={(e) => {
          handleSubmit();
        }}
      >
        ADD TO SCHEDULE
          </Button>
    </>
  );
};

export default enhancer(LiveclassModal);