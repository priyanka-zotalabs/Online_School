import React, { useState, useEffect } from "react";
import styles from "./assignbatchStyle.module.css";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";

// import AssignTesttoBatchModal from "..././AddQuestionModal/index";
import AssignTesttoBatchModal from "./AssignTestToBatchModal/index";
import TestScoreModal from "./TestScoreModal/index";
import { urls } from "../../../../url";
import { appConfig } from "../../../../constants";
import _ from "lodash";
import moment from 'moment';
import Loading from "../../../../shared/Components/Loading";

import {
  Paper,
  Container,
  Grid,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  // ExpandMoreIcon,
  // ExpandMoreIcon ,
  CardActions,
  CardHeader,
  IconButton,
  // MoreVertIcon,
  CardMedia,
  CardContent,
  Typography,
  InputLabel,
  FormControl,
  Radio,
  RadioGroup,
  // FormControl,
  FormControlLabel,
  MenuItem,
  Select,
  TextField,
  // IconButton,
  FormHelperText,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useLocation } from "react-router-dom";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  paper: {
    padding: theme.spacing(2),
    // textAlign: "center",
    color: theme.palette.text.secondary,
  },
  cardHeading: {
    // maxWidth: 345,
    width: "100%",
  },
  table: {
    minWidth: 650,
  },

  editquestion: {
    width: "100%",
    marginTop: "3%",
    marginBottom: "3%",
  },
  editheading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 50,
  },
  radioInput: {

    minWidth: "100%",
  },
  markSubTime: {
    width: "100%"
  },
  formControlSelect: {
    margin: theme.spacing(1),
    minWidth: 100,
    marginTop: -20,
    marginLeft: 10,
  }
}));

function createData(courseName, batchName, assignmentDate, dueDate, scores) {
  return { courseName, batchName, assignmentDate, dueDate, scores };
}


const AssignBatch = (props) => {
  const classes = useStyles();
  const location = useLocation();
  // table functions &
  const [modalShow, setModalShow] = React.useState(false);

  const [scoremodalShow, setscoremodalShow] = React.useState(false);

  const [loader, setLoader] = useState(true);

  // to toggle edit , cross & save button
  // const [showEditIcon, setShowEditIcon] = React.useState(true);

  // const [showCrossIcon, setShowCrossIcon] = React.useState(false);
  // const [showSaveButton, setShowSaveButton] = React.useState(false);

  const [currentTestId, setCurrentTestId] = React.useState("");
  const [currentTestData, setCurrentTestData] = React.useState({});
  const [copyOfCurrentTestData, setCopyOfCurrentTestData] = React.useState({});

  // question schema 
  let [questionForm, setQuestionForm] = useState([]);
  let [optionDataForm, setOptionDataForm] = useState([]);

  let questionSchema = {
    question: {
      value: "",
      validation: {
        required: {
          value: true,
          errMsg: "This field is required",
        },
      },
      invalid: false,
      touched: true,
      helperText: "",
    },

    numberOfOptions: {
      value: "",
      validation: {
        required: {
          value: true,
          errMsg: "This field is required",
        },
      },
      invalid: false,
      touched: true,
      helperText: "",
    },

    correctAnswer: {
      value: "",
      validation: {
        required: {
          value: true,
          errMsg: "This field is required",
        },
      },
      invalid: false,
      touched: true,
      helperText: "",
    },

    explanation: {
      value: "",
      validation: {
        required: {
          value: true,
          errMsg: "This field is required",
        },
      },
      invalid: false,
      touched: true,
      helperText: "",
    },
    // marks for each Question
    marks: {
      value: "",
      validation: {
        required: {
          value: true,
          errMsg: "This field is required",
        },
      },
      invalid: false,
      touched: true,
      helperText: "",
    },

    marks: {
      value: "",
      validation: {
        required: {
          value: true,
          errMsg: "This field is required",
        },
      },
      invalid: false,
      touched: true,
      helperText: "",
    },

    //     editable: true
    // showEditIcon: true
    // showCrossIcon: false
    // showSaveButton: false
    options: [],

  };


  // Options Schema
  let optionSchema = {
    // radio buttons value
    option: {
      value: "",
      validation: {
        required: {
          value: true,
          errMsg: "This field is required",
        },
      },
      invalid: false,
      touched: true,
      helperText: "",
    },
    //   options respective text field value
    value: {
      value: "",
      validation: {
        required: {
          value: true,
          errMsg: "This field is required",
        },
      },
      invalid: false,
      touched: true,
      helperText: "",
    },
  };

  useEffect(() => {
    if (copyOfCurrentTestData.length > 0) {
      let tempArray = _.cloneDeep(questionForm);

      copyOfCurrentTestData.questions.forEach((element) => {
        console.log("elements of questons", element);

      })
      // for (let i = 0; i < copyOfCurrentTestData.questions.length; i++) {
      //   questionSchema.question.value=copyOfCurrentTestData.questions.question;



      //   tempArray.push(_.cloneDeep(questionSchema));

      // }

      setQuestionForm(tempArray)
    }

  }, [])



  console.log("questionForm", questionForm);
  console.log("currentTestData", currentTestData);
  console.log("copyOfCurrentTestData", copyOfCurrentTestData);

  if (copyOfCurrentTestData.questions != undefined) {
    let tempArray = _.cloneDeep(questionForm);

    copyOfCurrentTestData.questions.forEach((element) => {
      console.log("elements of questons", element);

    })

  }

  const togglingEditIcon = (e, currentQuestionIndex) => {
    let tempQuestionData = _.cloneDeep(currentTestData);
    tempQuestionData.questions[currentQuestionIndex].showEditIcon = false;
    tempQuestionData.questions[currentQuestionIndex].showCrossIcon = true;
    tempQuestionData.questions[currentQuestionIndex].showSaveButton = true;
    tempQuestionData.questions[currentQuestionIndex].editable = false;
    setCurrentTestData(currentTestData => _.cloneDeep(tempQuestionData));


  };

  const togglingCrossIcon = (e, currentQuestionIndex) => {
    let tempQuestionData = _.cloneDeep(currentTestData);
    tempQuestionData.questions[currentQuestionIndex] = _.cloneDeep(copyOfCurrentTestData.questions[currentQuestionIndex]);
    setCurrentTestData(currentTestData => _.cloneDeep(tempQuestionData));
  };



  let testId = location.state.testId;
  // console.log("Test Id", location.state.testId);
  useEffect(() => {
    getDataOfTest();
  }, []);



  const getDataOfTest = () => {
    setLoader(true);
    axios
      .get(`${appConfig.host}${urls.getSpecificTest}?testId=${testId}`)
      .then((success) => {
        // console.log("Success getting specific test", success.data.data);
        // setCurrentTestData(currentTestData => _.cloneDeep(success.data.data));
        let tempQuestionData = _.cloneDeep(success.data.data);
        if (tempQuestionData.questions) {
          tempQuestionData.questions.map(eachQuestion => {
            eachQuestion["editable"] = true;
            eachQuestion["showEditIcon"] = true;
            eachQuestion["showCrossIcon"] = false;
            eachQuestion["showSaveButton"] = false;
            return eachQuestion;
          })
        }
        // console.log("Editable content",tempQuestionData);
        setCurrentTestData(currentTestData => _.cloneDeep(tempQuestionData));
        setCopyOfCurrentTestData(copyOfCurrentTestData => _.cloneDeep(tempQuestionData));
        setLoader(false);
      })
      .catch((error) => {
        console.log("get specific test error", error);
        setLoader(false);
      });
  }

  const handleEditTest = (e) => {
    // props.history.push("/teacher/editTest");
    props.history.push({
      pathname: '/teacher/evalution/editTest',
      state: { detail: currentTestData }
    })
  };

  const handleInputFromQuestions = (e, fieldName, index) => {
    let tempQuestionData = _.cloneDeep(currentTestData);
    tempQuestionData.questions[index][fieldName] = e.target.value;

    setCurrentTestData(currentTestData => _.cloneDeep(tempQuestionData));
  }

  const saveTheChangesInQuestion = (e, currentQuestionIndex) => {
    let tempQuestionData = _.cloneDeep(currentTestData);
    tempQuestionData.questions[currentQuestionIndex].showEditIcon = true;
    tempQuestionData.questions[currentQuestionIndex].showCrossIcon = false;
    tempQuestionData.questions[currentQuestionIndex].showSaveButton = false;
    tempQuestionData.questions[currentQuestionIndex].editable = true;
    setCurrentTestData(currentTestData => _.cloneDeep(tempQuestionData));
    setCopyOfCurrentTestData(copyOfCurrentTestData => _.cloneDeep(tempQuestionData));

    let params = {
      testId: currentTestData._id,
      qId: currentTestData.questions[currentQuestionIndex].qId,
      question: currentTestData.questions[currentQuestionIndex].question,
      numberOfOptions: currentTestData.questions[currentQuestionIndex].numberOfOptions,
      marks: currentTestData.questions[currentQuestionIndex].marks,
      correctAnswer: currentTestData.questions[currentQuestionIndex].correctAnswer,
      explanation: currentTestData.questions[currentQuestionIndex].explanation,
      options: _.cloneDeep(currentTestData.questions[currentQuestionIndex].options).map(opt => {
        return {
          value: opt.value,
          option: opt.option
        }
      })
    }
    // console.log("Updated Questions",params);
    axios
      .put(`${appConfig.host}${urls.updateQuestion}`, params)
      .then((success) => {
        toast.success(`Question ${currentQuestionIndex + 1} changed !`);
      })
      .catch((error) => {
        toast.error(`Question update failed, Please try again !`);
        console.log("Failed to Update the Question Details", error);
      });

  }
  const correctAnswerAssignUsingRadioButton = (e, currentQuestionIndex, currentOptionIndex) => {
    let tempQuestionData = _.cloneDeep(currentTestData);
    tempQuestionData.questions[currentQuestionIndex].correctAnswer = currentOptionIndex + 1;

    setCurrentTestData(currentTestData => _.cloneDeep(tempQuestionData));
  }

  const optionInputChangeHandler = (e, currentQuestionIndex, currentOptionIndex) => {
    let tempQuestionData = _.cloneDeep(currentTestData);
    tempQuestionData.questions[currentQuestionIndex].options[currentOptionIndex].value = e.target.value;
    setCurrentTestData(currentTestData => _.cloneDeep(tempQuestionData));
  }


  // Get data of assigned batches 
  const [assignedBatches, setAssignedBatches] = useState([]);
  useEffect(() => {
    getDataOfAssignedBatches();
  }, [])

  const getDataOfAssignedBatches = () => {
    axios
      .get(`${appConfig.host}${urls.getAssignedTest}?testId=${testId}`)
      .then((success) => {
        // console.log("Success getting All Assigned Batches!", success.data.data);
        setAssignedBatches(assignedBatches => _.cloneDeep(success.data.data));
      })
      .catch((error) => {
        console.log("Error getting All Assigned Batches!", error);
      });
  }


  //Get Scores of Batch 
  const [selectedBatchId, setSelectedBatchId] = useState("");
  const [selbatchName, setBatchName] = useState("");
  const [seltotalMarks, setTotalMarks] = useState("");
  const viewScoreOfBatch = (e, batchId, testId, batchName, totalMarks) => {

    // console.log("From view", batchId, testId, batchName, totalMarks);
    setSelectedBatchId(selectedBatchId => batchId);
    setBatchName(selbatchName => batchName);
    setTotalMarks(seltotalMarks => totalMarks);
    setTimeout(() => {
      setscoremodalShow(true);
    }, 1000)

  }

  // console.log("currentTestData", currentTestData);
  return (
    <React.Fragment>
      {loader ? (<Loading isLoading={true} ></Loading>) : (<React.Fragment>
        <AssignTesttoBatchModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          testId={currentTestData._id}
          getAssign={getDataOfAssignedBatches}
        />

        <TestScoreModal
          show={scoremodalShow}
          batchId={selectedBatchId}
          testId={testId}
          batchName={selbatchName}
          totalMarks={seltotalMarks}
          onHide={() => setscoremodalShow(false)}
        ></TestScoreModal>

        <div className={classes.root}>

          <Paper
            className={classes.paper}
            elevation={1}
            id={styles.paper_test_header}
          >
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <div>
                  <span className={styles.create_test}>{currentTestData.subject}-{currentTestData.testTitle}</span>
                  <i
                    style={{ float: "right", paddingRight: "22px" }}
                    class="fas fa-pen"
                    onClick={handleEditTest}
                  ></i>
                </div>

              </Grid>
              <Grid container item xs={12}>
                <Grid item xs={3}>
                  <span className={styles.create_test}>Duration: {currentTestData.totalTime} Mins</span>
                </Grid>
                <Grid item xs={3}>
                  <span className={styles.create_test}>No. of Questions: {currentTestData.totalQuestions}</span>
                </Grid>
                <Grid item xs={3}>
                  <span className={styles.create_test}>Marks: {currentTestData.totalMarks}</span>
                </Grid>
              </Grid>
              {/* Discription of test */}
              <Grid item xs={12}>
                <span className={styles.create_test_discription}>
                  {currentTestData.testDescription}
                </span>
              </Grid>
            </Grid>
          </Paper>
          {/*  Table */}
          <Paper
            className={classes.paper}
            elevation={1}
            id={styles.paper_test_header}
          >
            <span
              className={styles.create_test_discription}
              style={{ fontSize: "16px" }}
            >
              Assign to Batch
          </span>

            <TableContainer style={{ marginBottom: "0.1%" }}>

              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Course Name</TableCell>
                    <TableCell align="center">Batch Name</TableCell>
                    <TableCell align="center">Date of Assignment</TableCell>
                    <TableCell align="center">Due Date</TableCell>
                    <TableCell align="center">Scores</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {console.log("Assigned Batches", assignedBatches)} */}
                  {assignedBatches.map((row) => (
                    <TableRow key={row.course.name}>
                      <TableCell component="th" scope="row">
                        {row.course.name}
                      </TableCell>
                      <TableCell align="center">{row.batch.name}</TableCell>
                      <TableCell align="center">{moment(row.startDate).format('MMMM Do YYYY')}</TableCell>
                      <TableCell align="center">{row.dueDate ? moment(row.dueDate).format('MMMM Do YYYY') : moment(row.startDate).format('MMMM Do YYYY')}</TableCell>
                      <TableCell align="center">
                        {" "}
                        <a
                          style={{ color: "blue", textDecoration: "underline" }}
                          onClick={(e) => viewScoreOfBatch(e, row.batch._id, testId, row.batch.name, currentTestData.totalMarks)}
                          value={row.batch._id}
                        >
                          view
                      </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Button
              //   id="create-test-btn"
              id={styles.assign_test_btn}
              // style={{float:"right"}}
              //  variant="primary"
              //   onClick={handleCreateTest}
              onClick={() => setModalShow(true)}
            >
              ASSIGN TO NEW BATCH
          </Button>
          </Paper>
        </div>
        {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
        <div className={classes.editquestion}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              
              <Typography className={classes.editheading} style={{backgrounfColor:"#175592 ", fontWeight:"bold"}} >Questions</Typography>
            </AccordionSummary>
            <AccordionDetails>



              <React.Fragment>
                {/* <Paper elevation={3} id="paper-create-test"> */}

                {/* Questions Start */}
                <Grid container spacing={3} xs={12} style={{ width: '100%' }}>
                  {currentTestData && currentTestData.questions && currentTestData.questions.map((currentQuestion, currentQuestionIndex) => {
                    return (
                      <>
                        <Grid item xs={12}>
                          <hr></hr>
                          <Grid item xs={12} md={12}>
                            <Grid container item xs={12} md={12} spacing={3}>
                              <Grid item style={{ marginTop: "1.5%" }}>
                                <span style={{ marginLeft: "15px", paddingTop: "20px" }}>{currentQuestionIndex + 1}</span>
                              </Grid>

                              <Grid item xs={10} md={10}>
                                <TextField
                                  style={{ margin: 8, width: "105%" }}
                                  id="outlined-textarea"
                                  // label="Test title"
                                  placeholder="Enter your question here....."
                                  multiline
                                  fullWidth
                                  // size="sm"
                                  size="small"
                                  variant="outlined"
                                  value={currentQuestion.question}
                                  onChange={(e) => handleInputFromQuestions(e, "question", currentQuestionIndex)}
                                  disabled={currentQuestion.editable}
                                  //   simple string length without space
                                  // error={(currentQuestion.question).length== 0 ? true :false}
                                  // helperText={(currentQuestion.question).length== 0 ?"This is requred field": " "}


                                  //   length of the sttring without space
                                  error={(((currentQuestion.question).replace(/\s/g, '')).length) == 0 ? true : false}

                                  helperText={(((currentQuestion.question).replace(/\s/g, '')).length) == 0 ? "This is required field" : " "}


                                // error={firstPageData.subject.invalid}
                                // helperText={firstPageData.subject.helperText}
                                />

                              </Grid>


 {/* var original_str = "S t r i n g"

//Strips all spaces
var space_stripped_str = original_str.replace(/\s/g,'');

alert(space_stripped_str + ' <---- Without spaces');

</script> */}

                              {console.log("question length without space", ((currentQuestion.question).replace(/\s/g, '')).length)}
                              {console.log("question name", (currentQuestion.question).split(" ").length, (currentQuestion.question).length, currentQuestion.question,)}
                              <Grid item xs={1} md={1}>
                                <div>
                                  <i
                                    id={styles.questionEditIcon}
                                    class="fas fa-pen"
                                    onClick={(e) => togglingEditIcon(e, currentQuestionIndex)}
                                    value={currentQuestionIndex}
                                    style={{ display: (currentQuestion.showEditIcon ? "inline" : "none") }}
                                  ></i>
                                  <i class="material-icons w3-large"
                                    id={styles.questionCrossIcon}
                                    value={currentQuestionIndex}
                                    onClick={(e) => togglingCrossIcon(e, currentQuestionIndex)}
                                    style={{ display: (currentQuestion.showCrossIcon ? "inline" : "none") }}

                                  >close</i>
                                  {/* <CloseRoundedIcon></CloseRoundedIcon> */}
                                </div>
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid container item xs={12} spacing={3}>
                            <Grid item xs={3} md={3}>
                              <span style={{ marginLeft: "53px", fontSize: "14px" }}>
                                Number of options:
                        </span>
                            </Grid>
                            <Grid item xs={2} md={2}>
                              <FormControl className={classes.formControlSelect} disabled>
                                <InputLabel htmlFor="age-native-simple" disabled>
                                  select
                          </InputLabel>
                                <Select native value={currentQuestion.numberOfOptions}>
                                  <option aria-label="None" value="" />
                                  <option value={1}>1</option>
                                  <option value={2}>2</option>
                                  <option value={3}>3</option>
                                  <option value={4}>4</option>
                                </Select>
                              </FormControl>
                            </Grid>

                            <Grid item xs={4} md={4}>
                              <TextField
                                id="outlined-textarea"
                                // label="Marks"
                                placeholder="Marks"
                                multiline
                                size="small"
                                variant="outlined"
                                disabled
                                value={currentQuestion.marks}
                              />
                            </Grid>
                          </Grid>

                          {/* radio buttons */}
                          <Grid item xs={12} md={12} spacing={3}>
                            <FormControl
                              component="fieldset"
                              className={classes.markSubTime}
                            >
                              {/* Options Display */}
                              <RadioGroup aria-label="option" name="option" value={parseInt(currentQuestion.correctAnswer)}>
                                {currentQuestion.options.map((optionData, optionIndex) => {
                                  return (<Grid
                                    item
                                    container
                                    xs={12}
                                    // spacing={3}
                                    style={{ margin: 4 }}
                                  >
                                    <Grid
                                      item
                                      xs={1}
                                      style={{ marginRight: "1.5em" }}
                                    >
                                      <FormControlLabel
                                        style={{
                                          marginLeft: "20px",
                                          flexBasis: " 4.333333%",
                                        }}
                                        value={parseInt(optionIndex) + 1}
                                        name={"Radio" + optionIndex}
                                        size="sm"
                                        // size="small"
                                        control={<Radio />}
                                        onClick={(e) => correctAnswerAssignUsingRadioButton(e, currentQuestionIndex, optionIndex)}
                                        onBlur={(e) => correctAnswerAssignUsingRadioButton(e, currentQuestionIndex, optionIndex)}
                                        disabled={currentQuestion.editable}
                                      />
                                    </Grid>
                                    <Grid item xs={4} style={{ marginTop: "1.5em" }} >
                                      <TextField
                                        className={classes.markSubTime}
                                        id="outlined-textarea"
                                        // label="option"
                                        placeholder={"Option " + (optionIndex + 1)}
                                        multiline
                                        fullWidth
                                        // size="sm"
                                        size="small"
                                        variant="outlined"
                                        name="value"
                                        // value={currentTestData.questions[currentQuestionIndex].options[optionIndex].value}
                                        value={currentQuestion.options[optionIndex].value}
                                        disabled={currentQuestion.editable}
                                        onChange={(e) => optionInputChangeHandler(e, currentQuestionIndex, optionIndex)}
                                        onBlur={(e) => optionInputChangeHandler(e, currentQuestionIndex, optionIndex)}
                                        // error={(currentQuestion.options[optionIndex].value).length== 0 ? true :false}
                                        // helperText={(currentQuestion.options[optionIndex].value).length== 0 ?"This is requred field": " "}
                                        error={(((currentQuestion.options[optionIndex].value).replace(/\s/g, '')).length) == 0 ? true : false}

                                        helperText={(((currentQuestion.options[optionIndex].value).replace(/\s/g, '')).length) == 0 ? "This is required field" : " "}

                                      />
                                    </Grid>
                                  </Grid>)
                                })}
                              </RadioGroup>
                            </FormControl>
                          </Grid>
                          {/* Explaination of correct answer */}
                          <Grid
                            item
                            xs={12}
                            md={12}
                            spacing={3}
                            style={{ marginTop: "10px" }}
                          >
                            <TextField
                              style={{ marginLeft: "6%", width: "92.5%" }}
                              id="outlined-textarea"
                              // style={{ marginLeft:"20px",marginRight:"20px",}}
                              // label="Enter your question here....."
                              placeholder="Explaination of correct answer"
                              multiline
                              fullWidth
                              rows={4}
                              size="small"
                              // defaultValue="Default Value"
                              variant="outlined"
                              value={currentQuestion.explanation}
                              onChange={(e) => handleInputFromQuestions(e, "explanation", currentQuestionIndex)}
                              disabled={currentQuestion.editable}
                              // error={(currentQuestion.explanation).length== 0 ? true :false}
                              // helperText={(currentQuestion.explanation).length== 0 ?"This is requred field": " "}
                              error={(((currentQuestion.explanation).replace(/\s/g, '')).length) == 0 ? true : false}

                              helperText={(((currentQuestion.explanation).replace(/\s/g, '')).length) == 0 ? "This is required field" : " "}
                            />
                            {/* <button>hiii</button> */}
                            <hr></hr>
                          </Grid>
                        </Grid>
                        <div
                          style={{
                            // float: "ri/ght",
                            marginLeft: "45%",
                            marginBottom: "2%",
                          }}
                        >
                          <Button
                            style={{ display: (currentQuestion.showSaveButton ? "inline" : "none") }}

                            id={styles.save_question_btn}
                            onClick={(e) => saveTheChangesInQuestion(e, currentQuestionIndex)}
                          // style={{ marginBottom: "2%" }}
                          // onClick={() => setModalShow(true)}
                          //  variant="orange"
                          // onClick={handleCreateTest}

                          >
                            save
                      </Button>
                        </div>
                      </>
                    )
                  })}
                </Grid>
                <br></br>


              </React.Fragment>

            </AccordionDetails>
          </Accordion>
        </div>
      </React.Fragment>)}
    </React.Fragment>
  );
};

export default AssignBatch;