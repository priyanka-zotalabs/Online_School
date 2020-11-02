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
const HomeworkModal = (props) => {
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
      <div style={{ textAlign: "center", width: "100%", fontSize: "48px", padding: "50px", color: "#175592", fontWeight: "bold" }}>
        Coming Soon {"🥳"}
      </div>
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

export default enhancer(HomeworkModal);