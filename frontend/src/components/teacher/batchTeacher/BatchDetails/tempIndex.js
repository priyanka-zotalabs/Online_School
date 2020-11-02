import React, { useState, useEffect } from "react";
import styles from "./batchDetails.module.css";
import { makeStyles } from "@material-ui/core/styles";

import enhancer from "./enhancer";

import FeeStructureTable from "./AllFeeStructureTable/index";
import AddNewStudentTable from "./AddNewStudents/index";
import OfflinePaymentTable from "./OfflinePaymentDetails/index";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import TestScoreModal from "./TestScoreModal/index";
import EditBatchDetails from "./EditBatchModal/index";

import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from "mdbreact";
import { urls } from "../../../../url";
import { appConfig } from "../../../../constants";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Loading from "../../../../shared/Components/Loading";
import moment from "moment";

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
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  paper: {
    padding: theme.spacing(2),
    // textAlign: "center",
    marginBottom: 20,
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
    width: "100%",
  },
  formControlSelect: {
    margin: theme.spacing(1),
    minWidth: 100,
    marginTop: -20,
    marginLeft: 10,
  },
}));

function createData(testName, assignmentDate, dueDate, scores) {
  return { testName, assignmentDate, dueDate, scores };
}

const rows = [
  createData(
    "Physics Test 1",

    "20 July 2020",
    "25 July 2020",
    "view"
  ),
  createData(
    "Test on Radiation",

    "20 July 2020",
    "25 July 2020",
    "view"
  ),
  createData(
    "Solid and Heat -Test",

    "20 July 2020",
    "25 July 2020",
    "view"
  ),
  createData(
    "Chemisty -Test 5",

    "20 July 2020",
    "25 July 2020",
    "view"
  ),
  createData(
    "Physics Class 14",

    "20 July 2020",
    "25 July 2020",
    "TBD"
  ),
];

const AssignBatch = (props) => {
  let { auth } = props;

  const location = useLocation();
  let [loader, setLoader] = useState(false);

  const classes = useStyles();
  // table functions &
  const [modalShow, setModalShow] = useState(false);

  const [scoremodalShow, setscoremodalShow] = useState(false);
  const [specificBatchData, setSpecificBatchData] = useState([]);
  const [specificBatchInfo, setSpecificBatchInfo] = useState([]);
  const [teacherArray, setTeacherArray] = useState([]);

  let batchId = location.state.batchId;

  // useEffect(() => {
  //   if (typeof specificBatchData !== "undefined" || specificBatchData != null) {
  //     console.log("Not Undefined or Not Null specificBatchData");
  //     setSpecificBatchInfo(specificBatchData);
  //   } else {
  //     console.log("Undefined or Null specificBatchData ");
  //   }
  // }, [specificBatchData]);
  console.log("specificBatchInfo", specificBatchInfo);
  useEffect(() => {
    getDataOfBatch();
  }, []);
  useEffect(() => {
    getBatchList();
  }, [Object.keys(specificBatchData).length > 0]);

  useEffect(() => {
    console.log(" specificBatchInfo.teachers);", specificBatchInfo.teachers);

    // if (specificBatchInfo.teachers == !undefined) {
    //   console.log("TeacherArray inside if loop  usestatesidde");

    setTeacherArray(specificBatchInfo.teachers);
    // }
    console.log("TeacherArray inside usestatesidde", teacherArray);
  }, [Object.keys(specificBatchInfo).length > 0]);
  console.log("TeacherArray outsidde", teacherArray);

  const getBatchList = (event) => {
    console.log("batchlist list function enhancer", specificBatchData);
    setSpecificBatchInfo(specificBatchData);
  };
  const getDataOfBatch = (e) => {
    setLoader(true);
    axios
      .get(
        `${appConfig.host}${urls.specificBatchGetAPIbasedOnBatchId}?batchId=${batchId}`
      )
      .then((result) => {
        console.log("Success getting specific batch", result.data.data);

        setSpecificBatchData(result.data.data);

        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
      });
  };

  console.log("setSpecificBatchData out side axios call", specificBatchData);
  const handleEditTest = (e) => {
    props.history.push("/teacher/editTest");
  };

  return (
    <React.Fragment>
      {loader ? (
        <Loading isLoading={true}></Loading>
      ) : (
        <div>
          {/* {
          specificBatchData.map((element) => (
    return (<div> */}
          {/* {specificBatchData.length > 0 &&
            specificBatchData.map((element) => {
             
              return ( */}

          <React.Fragment>
            <EditBatchDetails
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
            <TestScoreModal
              show={scoremodalShow}
              onHide={() => setscoremodalShow(false)}
            ></TestScoreModal>
            {/* {batchPresenst} */}
            {/* <p>hello !!!!</p> */}

            {/* 
{specificBatchData &&
  */}
            <Paper
              className={classes.paper}
              elevation={1}
              id={styles.paper_batch_header}
            >
              {specificBatchInfo.name}
              {moment(specificBatchInfo.startDate).format("DD MMMM YYYY")}
              {moment(specificBatchInfo.endDate).format("DD MMMM YYYY")}

              {/* {specificBatchInfo.endDate} */}
              <Grid item xs={3}>
                <span className={styles.create_batch}>
                  Teacher:
                  {/* {teacherArray.name} */}
                  {/* {teacherArray.length > 0 &&
                    teacherArray.map((teacher, j) => (
                      <span key={teacher.teacherId}>{teacher.name}</span>
                    ))} */}
                  {/* {
                  // specificBatchInfo.teachers== !undefined &&
                  Object.keys(specificBatchInfo.teachers).length>0 &&
                  Object.keys(specificBatchInfo.teachers).map((teacher, j) => (
                    <span key={teacher.teacherId}>{teacher.name}</span>
                  ))} */}
                </span>
              </Grid>
              {/* <Grid item xs={3}>
                <span className={styles.create_batch}>
                  Number of students:

                  {
                  
                  teacherArray.length>0 &&
                  teacherArray.map((teacher, j) => (
                    <span key={teacher.teacherId}>{teacher.name}</span>
                  ))}
                  
                </span>
              </Grid> */}
            </Paper>

            <div className={classes.root}>
              {/* <p>{specificBatchInfo.name}</p> */}
              {/* {batchDetailsHere()} */}
              {/* 
              <Paper
          className={classes.paper}
          elevation={1}
          id={styles.paper_batch_header}
        >
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <div>
                <span className={styles.create_batch}>
                  
                  {specificBatchInfo.name}-{specificBatchInfo.course.name}
                </span>
                <i
                  style={{ float: "right", paddingRight: "22px" }}
                  class="fas fa-pen"
                  // onClick={handleEditTest}
                  onClick={() => setModalShow(true)}
                ></i>
              </div>
            </Grid>

            <Grid container item xs={12}>
              <Grid item xs={3}>
                <span className={styles.create_batch}>
                  Start Date:{specificBatchInfo.startDate}
                </span>
              </Grid>
              <Grid item xs={3}>
                <span className={styles.create_batch}>
                  End Date:{specificBatchInfo.endDate}
                </span>
              </Grid>
              <Grid item xs={3}>
                <span className={styles.create_batch}>
                  No. Students:{specificBatchInfo.students.length}
                </span>
              </Grid>
              <Grid item xs={3}>
                <span className={styles.create_batch}>
                  Teacher:
                  {specificBatchInfo.teachers.map((teacher, j) => (
                    <span key={teacher.teacherId}>{teacher.name}</span>
                  ))}
                </span>
              </Grid>
            </Grid>
          </Grid>
        </Paper> */}

              <FeeStructureTable></FeeStructureTable>
              {/* <OfflinePaymentTable></OfflinePaymentTable> */}

              <AddNewStudentTable></AddNewStudentTable>

              <Paper
                className={classes.paper}
                elevation={1}
                id={styles.paper_batch_header}
              >
                <span
                  className={styles.create_batch_discription}
                  style={{ fontSize: "16px", fontWeight: "bold" }}
                >
                  Tests
                </span>
                {/* <span className={styles.create_batch}>Solids and Heat-Test</span> */}

                {/* <div className={classes.root}> */}

                <TableContainer style={{ marginBottom: "0.1%" }}>
                  {/* <span className={styles.create_batch_discription}>Assign to Batch</span> */}

                  <Table
                    className={classes.table}
                    size="small"
                    aria-label="a dense table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Test Name</TableCell>
                        {/* <TableCell align="center">Batch Name</TableCell> */}
                        <TableCell align="center">Date of Assignment</TableCell>
                        <TableCell align="center">Due Date</TableCell>
                        <TableCell align="center">Scores</TableCell>
                        <TableCell
                          align="center"
                          style={{ width: "300px" }}
                        ></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow key={row.testName}>
                          <TableCell component="th" scope="row">
                            {row.testName}
                          </TableCell>
                          {/* <TableCell align="center">{row.batchName}</TableCell> */}
                          <TableCell align="center">
                            {row.assignmentDate}
                          </TableCell>
                          <TableCell align="center">{row.dueDate}</TableCell>
                          <TableCell align="center">
                            {" "}
                            <a
                              style={{
                                color: "blue",
                                textDecoration: "underline",
                              }}
                              onClick={() => setscoremodalShow(true)}
                            >
                              {row.scores}
                            </a>
                          </TableCell>

                          <TableCell
                            align="center"
                            style={{ width: "300px" }}
                          ></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </div>
          </React.Fragment>

          {/* );
            })} */}
          {/* {specificBatchData.length == 0 && <h1>No batch is here...</h1>} */}
        </div>
      )}
    </React.Fragment>
  );
};

export default enhancer(AssignBatch);
