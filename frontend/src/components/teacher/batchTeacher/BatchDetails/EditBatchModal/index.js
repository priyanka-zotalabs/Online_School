import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import styles from "./editBatchModal.module.css";
// import enhancer from "./enhancer";
import enhancer from "./enhancer";

import DateFnsUtils from "@date-io/date-fns";

import "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { Multiselect } from 'multiselect-react-dropdown';


import { urls } from "../../../../../url";
import { appConfig } from "../../../../../constants";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Loading from "../../../../../shared/Components/Loading";
import moment from "moment";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  formControl: {
    marginLeft: theme.spacing(3),
    minWidth: "90%",
  },
  selectEmpty: {
    marginLeft: theme.spacing(3),
  },
  formControlNew: {
    marginLeft: theme.spacing(3),
    minWidth: "90%",
  },
}));

const Index = (props) => {
  let {
    // auth,
    teacherList,
    courseList,
    handleSubmit,

    // getDeatils,
    addNewBatchForm,
    loader,
    error,

    inputBlurHandler,
    inputChangeHandler,

    formIsValid,
    specificBatchInfo,
    courseArray,
    teacherArray,
    selectedStartDate,

    handleDateChange,
    selectedEndDate,
    handleEndDateChange,


    selectedTeacherList,
    onSelectTeacherAdd,
    onSelectTeacherRemove,
    check,
    handleCheck
  } = props;
  const classes = useStyles();

  // some changes here

  return (
    <React.Fragment>
      {loader ? (
        <Loading isLoading={true}></Loading>
      ) : (
        <div>
          <Modal
            {...props}
            //   show={show}
            //   onHide={() => setShow(false)}
            //   dialogClassName="modal-90w"

            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{ borderRadius: "25px", width: "100%" }}
          >
            <Modal.Header style={{ border: "none" }} closeButton>
              {/* <p>{props.batchId}</p> */}
              <div id={styles.batchEditModalHeading}>
                <span className={styles.editBatch_Modal_heading}>
                  Edit Batch
                </span>
              </div>
            </Modal.Header>
            <Modal.Body>
              <div className={classes.root}>
                <Grid container spacing={3}>
                  <Grid container item xs={12} spacing={3}>
                    <Grid item xs={12} md={12}>
                      {/* <Paper className={classes.paper}> */}
                      <TextField
                        style={{ margin: 8, width: "100%" }}
                        id="outlined-textarea"
                        label="Batch Name"
                        placeholder="Batch Name"
                        // defaultValue={specificBatchInfo.name}
                        multiline
                        size="small"
                        // fullWidth
                        variant="outlined"
                        name="batchName"
                        onChange={(e) => inputChangeHandler(e, "batchName")}
                        onBlur={(e) => inputBlurHandler(e, "batchName")}
                        value={addNewBatchForm.batchName.value}
                        // className={addNewBatchForm.course.invalid ? "border-danger" : ""}
                        error={addNewBatchForm.batchName.invalid}
                        helperText={addNewBatchForm.batchName.helperText}
                      />

                      {/* </Paper> */}
                    </Grid>
                  </Grid>

                  <Grid container item xs={12} md={12} spacing={3}>
                    <Grid item xs={6} md={6}>
                      {/* <Paper className={classes.paper}>item</Paper> */}
                      <FormControl
                        variant="outlined"
                        // required
                        // className={classes.formControl}
                        style={{ margin: 8, width: "100%" }}
                        disabled
                        size="small"
                      >
                        {courseArray.length > 0 &&
                          courseArray.map((course, j) => (
                            <React.Fragment>
                              <InputLabel id="demo-simple-select-required-label">
                                {course.name}
                                {/* course */}
                              </InputLabel>

                              <Select
                                labelId="demo-simple-select-required-label"
                                id="demo-simple-select-required"
                                // value="age"
                                // value={course.courseId}
                                // onChange={handleChange}
                                // label={course.name}
                                // value={addNewBatchForm.course.value}

                                placeholder={course.name}
                                // defaultValue={course.name}
                              >
                                {/* <MenuItem value="">
                                <em></em>
                              </MenuItem> */}
                                {/* {courseArray.length > 0 &&
                            courseArray.map((course, j) => (
                              <MenuItem value="" disabled>
                                <em>{course.name}</em>
                              </MenuItem>
                            ))} */}
                              </Select>
                            </React.Fragment>
                          ))}
                      </FormControl>
                    </Grid>

                    <Grid item xs={6} md={6}>
                      {/* <Paper className={classes.paper}>item</Paper> */}
{/* for multi select */}

<div style={{paddingTop:"10px"}}>
{console.log("slected teachersssss list",selectedTeacherList,teacherList)}

                  {/* mutiselect for teacher */}
<Multiselect

options={teacherList} // Options to display in the dropdown
selectedValues={selectedTeacherList} // Preselected value to persist in dropdown
onSelect={onSelectTeacherAdd} // Function will trigger on select event
onRemove={onSelectTeacherRemove} // Function will trigger on remove event
displayValue="name" // Property name to display in the dropdown options

showCheckbox={true}
placeholder="Select teacher "
onClick={handleCheck}


style={{ chips: { background:"#8499ff"}, searchBox: check ? { border: "none", "border": "1px solid red", "border-radius": "5px" }:
{border: "none", "border": "1px solid grey", "border-radius": "5px"} }}
/>


<span
//  className="error-message" 
style={{float:"left",fontSize:"12px",paddingLeft:"0px",color:"red"}}>
              {(check & selectedTeacherList.length == 0)
                ? "This field is required"
                : ""}
            </span>

{/* <span className="error-message">
              {(check & selectedTeacherList.length == 0)
                ? "This is Required field"
                : ""}
            </span> */}

  </div>



                      {/* <FormControl
                        variant="outlined"
                        required
                        // className={classes.formControl}
                        style={{ margin: 8, width: "100%" }}
                        size="small"
                        error={addNewBatchForm.teacher.invalid}
                      >
                       
                        <React.Fragment>
                          <InputLabel id="demo-simple-select-required-label">
                            Teacher
                          </InputLabel>

                          <Select
                            labelId="demo-simple-select-required-label"
                            id="demo-simple-select-required"
                            // value={teacher.teacherId}
                            // value={30}
                            // selectedValue={20}
                            //   onChange={handleChange}
                            label="Teachertest"
                            name="teacher"
                            onChange={(e) => inputChangeHandler(e, "teacher")}
                            onBlur={(e) => inputBlurHandler(e, "teacher")}
                            value={addNewBatchForm.teacher.value}
                          >
                            {teacherList.map((teacher, i) => (
                              <MenuItem key={i} value={teacher.id}>
                                {teacher.teacher}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText>
                            {addNewBatchForm.teacher.helperText}
                          </FormHelperText>
                        </React.Fragment>
                       
                      </FormControl> */}
                    </Grid>
                  </Grid>

                  <Grid container item xs={12} style={{ marginLeft: "0%" }}>
                    <Grid item xs={6}>
                      {/* <Paper className={classes.paper}>item</Paper> */}

                      <MuiPickersUtilsProvider
                        utils={DateFnsUtils}
                        //  className={classes.formControlNew}

                        style={{ width: "100%" }}
                      >
                        <KeyboardDatePicker
                          style={{ marginLeft: "5%", width: "91%" }}
                          margin="normal"
                          id="date-picker-dialog"
                          label="Start Date"
                          format="dd-MM-yyyy"
                          // minDate={new Date()}
                          minDate={selectedStartDate}
                          value={selectedStartDate}
                          onChange={handleDateChange}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>

                    <Grid item xs={6}>
                      {/* <Paper className={classes.paper}>item</Paper> */}
                      <MuiPickersUtilsProvider
                        utils={DateFnsUtils}
                        // className={classes.formControlNew}
                        style={{ width: "100%" }}
                      >
                        <KeyboardDatePicker
                          style={{ marginLeft: "5%", width: "91%" }}
                          margin="normal"
                          id="date-picker-dialog"
                          label="End Date"
                          format="dd-MM-yyyy"
                          minDate={selectedStartDate}
                          value={selectedEndDate}
                          onChange={handleEndDateChange}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                  </Grid>
                </Grid>
              </div>

              <Button
                //   id="create-test-btn"
                id={styles.save_editBatch_btn}
                // style={{float:"right"}}
                //  variant="primary"

                //   onClick={handleCreateNewBatch}
                onClick={() => {
                  handleSubmit();
                }}
                // onClick={props.onHide}
              >
                SAVE
              </Button>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </React.Fragment>
  );
};

export default enhancer(Index);
