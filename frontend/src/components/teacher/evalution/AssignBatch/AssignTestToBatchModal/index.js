import React, { useEffect, useState } from 'react'
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import styles from "./assignTestModal.module.css"
import { connect } from "react-redux";

import DateFnsUtils from '@date-io/date-fns';

import _ from "lodash";
import 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import dummyData from "./dummyData";
import axios from "axios";
import { urls } from "../../../../../url";
import { appConfig } from "../../../../../constants";
import { toast } from "react-toastify";
import moment from "moment";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
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
  }
}));




const Index = (props) => {
  const classes = useStyles();
  let teacherCourse = props.teacherCourse;

  const [teacherId, setTeacherId] = useState(props.teacherData._id);
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [dueDate, setDueDate] = useState("");
  const [courseBatchData, setCourseBatchData] = useState(dummyData);

  const [currentFormData, setCurrentFormData] = useState({
    course:
    {
      id: "",
      name: "",
      index: "",
      valid: true,
      helperText: "This field is required"
    },
    module:
    {
      id: "",
      name: "",
      index: "",
      valid: true,
      helperText: "Select Module"
    },
    chapter:
    {
      id: "",
      name: "",
      index: "",
      valid: true,
      helperText: "Select Chapter"
    },
    batch:
    {
      id: "",
      name: "",
      index: "",
      valid: true,
      helperText: "This field is required"
    }
  });


  const [courseList, setCourseList] = useState([]);
  const [moduleList, setModuleList] = useState([]);
  const [chapterList, setChapterList] = useState([]);
  const [batchList, setBatchList] = useState([]);

  useEffect(() => {
    getCourseList();
  }, []);

  useEffect(() => {
    getModuleList();
  }, [currentFormData.course.name]);

  useEffect(() => {
    getChapterList();
  }, [currentFormData.module.name]);

  const getChapterList = () => {
    let moduleChapter = [];
    if (teacherCourse.length > 0) {
      teacherCourse.forEach((element) => {
        element.modules.forEach((module) => {
          // console.log("moduleid", module._id, currentFormData.module.id);
          if (module._id == currentFormData.module.id) {
            module.chapters.forEach((chap) => {
              moduleChapter.push({ id: chap._id, value: chap.name });
            });
            setChapterList([...moduleChapter]);
          }
        });
      });
    }
  };

  const getModuleList = () => {
    if (teacherCourse.length > 0) {
      teacherCourse.forEach((element) => {
        if (element._id == currentFormData.course.id) {
          let courseModules = [];
          element.modules.forEach((module) => {
            courseModules.push({ id: module._id, value: module.name });
          });
          setModuleList([...courseModules]);
          return;
        }
      });
    }
  };

  const getCourseList = () => {
    let temp = [];
    if (teacherCourse.length > 0) {
      teacherCourse.forEach((element) => {
        temp.push({ id: element._id, value: element.name });
      });
    }
    setCourseList([...temp]);
  };


  useEffect(() => {
    getData();
  }, []);

  const getData = () => {

    axios
      .get(`${appConfig.host}${urls.getTeacherBatches}?teacherId=${teacherId}`)
      .then((success) => {
        // console.log("Fetched Batch data ", success.data.data);
        setCourseBatchData(courseBatchData => success.data.data);
      })
      .catch((error) => {
        console.log("Failed to Fetched Batch data ", error);
      });

  }



  const inputChangeHandlerCourse = (e, inputIdentifier) => {
    e.persist();
    const updatedForm = _.cloneDeep(currentFormData)
    updatedForm[inputIdentifier].id = courseList[e.target.value].id;
    updatedForm[inputIdentifier].name = courseList[e.target.value].value;
    updatedForm[inputIdentifier].index = e.target.value;
    setCurrentFormData(updatedForm);
  };

  const inputChangeHandlerModule = (e, inputIdentifier) => {
    e.persist();
    const updatedForm = _.cloneDeep(currentFormData)
    updatedForm[inputIdentifier].id = moduleList[e.target.value].id;
    updatedForm[inputIdentifier].name = moduleList[e.target.value].value;
    updatedForm[inputIdentifier].index = e.target.value;
    setCurrentFormData(updatedForm);
  };

  const inputChangeHandlerChapter = (e, inputIdentifier) => {
    e.persist();
    const updatedForm = _.cloneDeep(currentFormData)
    updatedForm[inputIdentifier].id = chapterList[e.target.value].id;
    updatedForm[inputIdentifier].name = chapterList[e.target.value].value;
    updatedForm[inputIdentifier].index = e.target.value;
    setCurrentFormData(updatedForm);
  };

  const inputChangeHandlerBatch = (e, inputIdentifier) => {
    e.persist();
    const updatedForm = _.cloneDeep(currentFormData)
    updatedForm[inputIdentifier].id = batchList[e.target.value].id;
    updatedForm[inputIdentifier].name = batchList[e.target.value].value;
    updatedForm[inputIdentifier].index = e.target.value;
    setCurrentFormData(updatedForm);
  };

  useEffect(() => {
    getBatchList();
  }, [currentFormData.course.name]);

  const getBatchList = () => {
    let temp = [];
    if (courseBatchData.length > 0) {
      courseBatchData.forEach((eachBatch) => {
        if (eachBatch.course._id == currentFormData.course.id) {
          temp.push({ id: eachBatch._id, value: eachBatch.name });
        }
      });
    }
    setBatchList([...temp]);
  };

  const validateForm = () => {
    const updatedForm = _.cloneDeep(currentFormData);
    if (updatedForm["course"].id.length < 1 && updatedForm["batch"].id.length < 1) {
      updatedForm["course"].valid = false;
      updatedForm["batch"].valid = false;
      setCurrentFormData(currentFormData => updatedForm);
      return false;
    }
    else if (updatedForm["batch"].id.length < 1) {
      updatedForm["batch"].valid = false;
      setCurrentFormData(currentFormData => updatedForm);
      return false;
    }
    else if (updatedForm["course"].id.length < 1) {
      updatedForm["course"].valid = false;
      setCurrentFormData(currentFormData => updatedForm);
      return false;
    }
    else {
      updatedForm["course"].valid = true;
      updatedForm["batch"].valid = true;
      return true;
    }
  }
  const assignTestHandler = () => {
    /* 
This Call 
{
  "testId": "string",
  "courseId": "string",
  "moduleId": "string",
  "chapterId": "string",
  "batchId": "string",
  "startDate": "string",
  "dueDate": "string",
  "startTime": "string"
}
*/
    if (validateForm()) {


      let params = {
        testId: props.testId,
        courseId: currentFormData.course.id,
        moduleId: currentFormData.module.id,
        chapterId: currentFormData.chapter.id,
        batchId: currentFormData.batch.id,
        // startDate: `${new Date(startDate).getDate()}-${new Date(startDate).getMonth() + 1}-${new Date(startDate).getFullYear()}`,
        startDate: moment(startDate).utc(),
      }
      if (dueDate) {
        // params.dueDate = `${new Date(dueDate).getDate()}-${new Date(dueDate).getMonth() + 1}-${new Date(dueDate).getFullYear()}`;
        params.dueDate = moment(dueDate).utc();
      }
      else {
        // params.startTime = `${new Date(startTime).getHours()}-${new Date(startTime).getMinutes()}`
        params.startTime = moment(startDate).utc();
      }

      // console.log("Assign Details", params);
      axios
        .post(`${appConfig.host}${urls.assignTest}`, params)
        .then((success) => {
          toast.success("Sucessfully Assign Test to Batch!");
          resetCurrentForm();
        })
        .catch((error) => {
          console.log("Failed to Assign Test", error);
          toast.error("Failed to Assign Test!");
        });
      props.onHide();
    }
  }

  const resetCurrentForm = () => {
    setCurrentFormData({
      course:
      {
        id: "",
        name: "",
        index: "",
        valid: true,
        helperText: "This field is required"
      },
      module:
      {
        id: "",
        name: "",
        index: "",
        valid: true,
        helperText: "Select Module"
      },
      chapter:
      {
        id: "",
        name: "",
        index: "",
        valid: true,
        helperText: "Select Chapter"
      },
      batch:
      {
        id: "",
        name: "",
        index: "",
        valid: true,
        helperText: "This field is required"
      }
    });
    setStartDate(new Date());
    setStartTime(new Date());
    setDueDate(new Date());
    props.getAssign();
  }


  // console.log("Test ID into the modal", props.testId);
  // console.log("Teacher Courses", teacherCourse);
  // console.log("courseList", courseList);
  // console.log("moduleList", moduleList);
  // console.log("chapterList", chapterList);
  // console.log("batchList", batchList);
  // console.log("currentFormData",currentFormData);
  // console.log("Date of Assignment", startDate);
  // console.log("Time of Assignment", startTime);
  // console.log("DueDate of Assignment", dueDate);
  // console.log("Teacher ID",teacherId);
  // console.log("teacherBatches", courseBatchData);


  const handleDateChange = (date) => {
    setStartDate(date);
  };
  const handleTimeChange = (date) => {
    setStartTime(date);
  };
  const handleDueDateChange = (date) => {
    setDueDate(date);
  };

  const [selectedYes, setselectedYes] = useState(true);
  const [selectedNo, setselectedNo] = useState(false);


  const togglingYes = () => {
    setselectedYes(true)
    setselectedNo(false)
  };

  const togglingNo = () => {
    setselectedNo(true)
    setselectedYes(false)
  };



  return (
    <div>
      <Modal
        {...props}

        //   show={show}
        //   onHide={() => setShow(false)}
        //   dialogClassName="modal-90w"
        //   aria-labelledby="example-custom-modal-styling-title"
        //   size="xl"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered

        style={{ borderRadius: "25px", width: "100%" }}
      >


        <Modal.Header style={{ border: "none" }} closeButton>
          <div id={styles.testScoreModalHeading}>
            <span className={styles.score_Modal_heading}>Assign Test</span>
          </div>
        </Modal.Header>
        <Modal.Body>



          <p style={{ textAlign: "center", fontSize: "13px" }}>Select where your test will be placed in the student timeline:</p>

          <div className={classes.root}>
            <Grid container spacing={3}>


              <Grid container item xs={12} spacing={3}>
                <Grid item xs={4}>
                  {/* <Paper className={classes.paper}> */}
                  <FormControl variant="outlined" required className={classes.formControl} size="small" error={!currentFormData.course.valid}>
                    <InputLabel id="demo-simple-select-required-label">Course</InputLabel>

                    <Select

                      labelId="demo-simple-select-required-label"
                      id="demo-simple-select-required"

                      value={currentFormData.course.index}
                      onChange={e => inputChangeHandlerCourse(e, "course")}
                      label="Course"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {/* <MenuItem value={10}>Course 1</MenuItem>
                      <MenuItem value={20}>Course 2</MenuItem>
                      <MenuItem value={30}>Course 3</MenuItem> */}
                      {courseList.map((course, index) => {
                        return (
                          <MenuItem value={index}>{course.value}</MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText>{currentFormData.course.valid ? "" : currentFormData.course.helperText}</FormHelperText>
                  </FormControl>

                  {/* </Paper> */}
                </Grid>


                <Grid item xs={4}>
                  <FormControl variant="outlined" className={classes.formControl} size="small">
                    <InputLabel id="demo-simple-select-required-label">Module</InputLabel>

                    <Select

                      labelId="demo-simple-select-required-label"
                      id="demo-simple-select-required"

                      value={currentFormData.module.index}
                      onChange={e => inputChangeHandlerModule(e, "module")}
                      label="Module"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {moduleList.map((module, index) => {
                        return (
                          <MenuItem value={index}>{module.value}</MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  {/* <Paper className={classes.paper}>item</Paper> */}
                </Grid>
                <Grid item xs={4}>
                  {/* <Paper className={classes.paper}>item</Paper> */}
                  <FormControl variant="outlined" className={classes.formControl} size="small">
                    <InputLabel id="demo-simple-select-required-label">Chapter</InputLabel>

                    <Select

                      labelId="demo-simple-select-required-label"
                      id="demo-simple-select-required"
                      value={currentFormData.chapter.index}
                      onChange={e => inputChangeHandlerChapter(e, "chapter")}
                      label="Chapter"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {chapterList.map((chapter, index) => {
                        return (
                          <MenuItem value={index}>{chapter.value}</MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>

              </Grid>


              <Grid container item xs={12} spacing={3} >


                <Grid item xs={4}>
                  {/* <Paper className={classes.paper}>item</Paper> */}
                  <FormControl variant="outlined" required className={classes.formControl} size="small" error={!currentFormData.batch.valid}>
                    <InputLabel id="demo-simple-select-required-label">Batch</InputLabel>

                    <Select

                      labelId="demo-simple-select-required-label"
                      id="demo-simple-select-required"
                      value={currentFormData.batch.index}
                      onChange={e => inputChangeHandlerBatch(e, "batch")}
                      label="Batch"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {batchList.map((batch, index) => {
                        return (
                          <MenuItem value={index}>{batch.value}</MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText>{currentFormData.batch.valid ? "" : currentFormData.batch.helperText}</FormHelperText>
                  </FormControl>
                </Grid>







                <Grid item xs={4}>
                  <div
                    style={{ marginLeft: "8%", fontSize: "13px" }}
                  >
                    <span >Do you want to specify a limited time period for this test ?</span>
                  </div>
                </Grid>



                <Grid item xs={4}>
                  {/* <Paper className={classes.paper}>item</Paper> */}
                  <FormControl variant="outlined" required className={classes.formControlNew} size="small">
                    {/* <InputLabel id="demo-simple-select-required-label" value={'yes'}></InputLabel> */}

                    <Select

                      labelId="demo-simple-select-required-label"
                      id="demo-simple-select-required"
                    >
                      <MenuItem onClick={togglingYes} value={10}>Yes</MenuItem>
                      <MenuItem onClick={togglingNo} value={20}>No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

              </Grid>

              {
                selectedYes ?


                  <Grid container item xs={12} spacing={3}
                    style={{ marginLeft: "0%" }}>
                    <Grid item xs={5}    >

                      <MuiPickersUtilsProvider utils={DateFnsUtils}
                        //  className={classes.formControlNew} 
                        style={{ width: "100%" }}
                      >
                        <KeyboardDatePicker
                          style={{ marginLeft: "5%", width: "95%" }}
                          margin="normal"
                          id="date-picker-dialog"
                          label="Date of Assignment"
                          format="MM/dd/yyyy"
                          value={startDate}
                          onChange={handleDateChange}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                      </MuiPickersUtilsProvider>
                      {/* <Paper className={classes.paper}>item</Paper> */}

                    </Grid>
                    <Grid item xs={2} > </Grid>
                    <Grid item xs={5}  >
                      {/* <Paper className={classes.paper}>item</Paper> */}
                      <MuiPickersUtilsProvider utils={DateFnsUtils}
                        style={{ width: "100%" }}>
                        <KeyboardTimePicker

                          style={{ width: "95%" }}
                          margin="normal"
                          id="time-picker"
                          // id="time"

                          label="Start Time"
                          value={startDate}
                          onChange={handleDateChange}
                          KeyboardButtonProps={{
                            'aria-label': 'change time',
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>

                  </Grid>

                  : null

              }
              {
                selectedNo ?

                  <Grid container item xs={12} spacing={3}
                    style={{ marginLeft: "0%" }}>
                    <Grid item xs={5}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}
                        style={{ width: "100%" }}
                      >
                        <KeyboardDatePicker
                          style={{ marginLeft: "5%", width: "95%" }}
                          margin="normal"
                          id="date-picker-dialog"
                          label="Date of Assignment"
                          format="MM/dd/yyyy"
                          value={startDate}
                          onChange={handleDateChange}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                      </MuiPickersUtilsProvider>

                    </Grid>
                    <Grid item xs={2} > </Grid>
                    <Grid item xs={5}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}
                        style={{ width: "100%" }}
                      >
                        <KeyboardDatePicker
                          style={{ width: "95%" }}
                          margin="normal"
                          id="date-picker-dialog"
                          label="Due Date"
                          format="MM/dd/yyyy"
                          value={dueDate}
                          onChange={handleDueDateChange}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>

                  </Grid>
                  : null
              }
            </Grid>
          </div>
          <Button
            //   id="create-test-btn"
            id={styles.assign_test_btn}
            // style={{float:"right"}}
            //  variant="primary"
            //   onClick={handleCreateTest}
            // onClick={() => setModalShow(true)}
            // onClick={props.onHide}
            onClick={assignTestHandler}
          >
            ASSIGN TEST
        </Button>


        </Modal.Body>

      </Modal>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    teacherCourse: state.teacherCourse,
    teacherData: state.auth.currentMetaData,
  };
};
export default connect(mapStateToProps)(Index)
