import React, { useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import "../style.scss";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import enhancer from "./enhancer";
import { Multiselect } from 'multiselect-react-dropdown';
const DailyAcitivityModal = (props) => {
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
    contentList,
    selectedContentList,
    onSelectContentRemove,
    onSelectContentAdd
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
          <Col sm={6}>
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
          <Col sm={6}>
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
        </Form.Group>
        <Form.Group as={Row} sm={12}>
          {/* // Chapter */}
          <Col sm={6}>
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
          {/* // Content */}
          <Col sm={6}>
            {/* <Form.Control
              as="select"
              placeholder="Enter Content"
              onChange={(e) => inputChangeHandler(e, "content")}
              onBlur={(e) => inputBlurHandler(e, "content")}
              value={scheduleForm.content.value}
            // className={
            //   scheduleForm.chapter.invalid ? "border-danger" : ""
            // }
            >
              <option key="">Select Content</option>
              {contentList.map((content) => (
                <option value={content.id}>{content.value}</option>
              ))}
            </Form.Control> */}
            <Multiselect
              options={contentList}
              displayValue="value"
              showCheckbox={true}
              selectedValue={selectedContentList}
              onSelect={onSelectContentAdd}
              onRemove={onSelectContentRemove}
              placeholder="Select Content"
            />
            {console.log("selectedContentList", selectedContentList)}


            <span className="error-message">
              {scheduleForm.chapter.invalid
                ? scheduleForm.chapter.helperText
                : ""}
            </span>
          </Col>
        </Form.Group>

        {/* Fourth Row */}
        <Form.Group as={Row} sm={12}>
          <Col sm={6}>
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
          <Col sm={6}>
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

export default enhancer(DailyAcitivityModal);