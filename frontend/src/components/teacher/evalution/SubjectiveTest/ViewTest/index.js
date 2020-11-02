import React, { useState, useEffect } from "react";
import styles from "./assignbatchStyle.module.css";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";

// import AssignTesttoBatchModal from "..././AddQuestionModal/index";
import AssignTesttoBatchModal from "./AssignTestToBatchModal/index";
import TestScoreModal from "./TestScoreModal/index";
import { urls } from "../../../../../url";
import { appConfig } from "../../../../../constants";
import _ from "lodash";
import moment from 'moment';
import Loading from "../../../../../shared/Components/Loading";

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


  const [currentTestId, setCurrentTestId] = React.useState("");
  const [currentTestData, setCurrentTestData] = React.useState({});
  const [copyOfCurrentTestData, setCopyOfCurrentTestData] = React.useState({});

  // question schema 
  let [questionForm, setQuestionForm] = useState([]);
  let [optionDataForm, setOptionDataForm] = useState([]);



  console.log("questionForm", questionForm);
  console.log("currentTestData", currentTestData);
  console.log("copyOfCurrentTestData", copyOfCurrentTestData);

  if (copyOfCurrentTestData.questions != undefined) {
    let tempArray = _.cloneDeep(questionForm);

    copyOfCurrentTestData.questions.forEach((element) => {
      console.log("elements of questons", element);

    })

  }



  let testId = (location.state && location.state.testId) ? location.state.testId : 404;
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
      pathname: '/teacher/evalution/editSubjectiveTest',
      state: { detail: currentTestData }
    })
  };


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
              id={styles.assign_test_btn}
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

              <Typography className={classes.editheading} style={{ backgrounfColor: "#175592 ", fontWeight: "bold" }} >Question Paper </Typography>
            </AccordionSummary>
            <AccordionDetails>

            </AccordionDetails>
          </Accordion>
        </div>
      </React.Fragment>)}
    </React.Fragment>
  );
};

export default AssignBatch;