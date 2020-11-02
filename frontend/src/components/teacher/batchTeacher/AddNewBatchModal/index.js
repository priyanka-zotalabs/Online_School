import React, { useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import styles from "./addNewBatchStyle.module.css";

import DateFnsUtils from "@date-io/date-fns";
import enhancer from "./enhancer";
import moment from "moment";
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
import $ from "jquery";
// import { Select } from "antd";

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
    // getTeacherList,
    selectedDate,
    selectedDate2,
    handleDateChange2,
    handleDateChange,
    handleTeacherDetails,
    selectedTeacherList,
    onSelectTeacherAdd,
    onSelectTeacherRemove,
    check,
    handleCheck
  } = props;

  const classes = useStyles();

  console.log("teacherList in index.js", teacherList);

  const handleCreateNewBatch = (e) => {
    props.history.push("/batch");
  };
  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ borderRadius: "25px", width: "100%" }}
      >
        <Modal.Header style={{ border: "none" }} closeButton>
          <div id={styles.batchModalHeading}>
            <span className={styles.batch_Modal_heading}>Add New Batch</span>
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
                    required
                    // className={classes.formControl}
                    style={{ margin: 8, width: "100%" }}
                    size="small"
                    error={addNewBatchForm.course.invalid}
                  >
                    <InputLabel id="demo-simple-select-required-label">
                      Course
                    </InputLabel>

                    <Select
                      labelId="demo-simple-select-required-label"
                      id="demo-simple-select-required"
                      //   value={age}
                      //   onChange={handleChange}
                      label="Course"
                      name="course"
                      onChange={(e) => inputChangeHandler(e, "course")}
                      onBlur={(e) => inputBlurHandler(e, "course")}
                      value={addNewBatchForm.course.value}
                      // className={addNewBatchForm.course.invalid ? "border-danger" : ""}
                    >
                      {/* <MenuItem key=""></MenuItem> */}
                      {/* <em>None</em> */}
                      {/* console.log("course list function index", courseList); */}
                      {courseList.map((course, i) => (
                        <MenuItem key={i} value={course.id}>
                          {course.value}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      {addNewBatchForm.course.helperText}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={6} md={6}>



<div style={{paddingTop:"10px"}}>



                  {/* mutiselect for teacher */}
<Multiselect

options={teacherList} // Options to display in the dropdown
selectedValues={selectedTeacherList} // Preselected value to persist in dropdown
onSelect={onSelectTeacherAdd} // Function will trigger on select event
onRemove={onSelectTeacherRemove} // Function will trigger on remove event
displayValue="teacher" // Property name to display in the dropdown options

showCheckbox={true}
placeholder="Select teacher "
// onClick={handleCheck}
// style={{borderColor:"red"}}
// // style={{
// //   borderColor: check ? 'red' : 'blue',
// // }}

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

  </div>

                  {/* <Paper className={classes.paper}>item</Paper> */}




                  {/* <FormControl
                    variant="outlined"
                    required
                    // className={classes.formControl}
                    style={{ margin: 8, width: "100%" }}
                    size="small"
                    error={addNewBatchForm.teacher.invalid}
                  >
                    <InputLabel id="demo-simple-select-required-label">
                      Teacher
                    </InputLabel>

                    <Select
                      labelId="demo-simple-select-required-label"
                      id="demo-simple-select-required"
                      //   value={age}
                      //   onChange={handleChange}
                      label="Teacher"
                      name="teacher"
                      // onChange={(e) =>handleTeacherDetails(e, "teacher")}

                      onChange={(e) => inputChangeHandler(e, "teacher")}
                      onBlur={(e) => inputBlurHandler(e, "teacher")}
                      value={addNewBatchForm.teacher.value}
                      // error={addNewBatchForm.teacher.invalid}
                      // helperText={addNewBatchForm.teacher.helperText}
                      // className={addNewBatchForm.course.invalid ? "border-danger" : ""}
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
                      id="date-picker-dialog1"
                      label="Start Date"
                      minDate={new Date()}
                      // format="MM/dd/yyyy"
                      // format="yyyy/MM/dd"
                      format="dd-MM-yyyy"
                      value={selectedDate}
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
                      id="date-picker-dialog2"
                      label="End Date"
                      // minDate={new Date()}
                      minDate={selectedDate}
                      format="dd-MM-yyyy"
                      // format="yyyy/MM/dd"
                      value={selectedDate2}
                      onChange={handleDateChange2}
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
            id={styles.create_batch_btn}
            onClick={() => {
              handleSubmit();
            }}
            // onClick={props.onHide}
          >
            CREATE BATCH
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default enhancer(Index);
