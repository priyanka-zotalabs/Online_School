import React, { useState, useEffect } from "react";
import styles from "./batchDetails.module.css";
import { makeStyles } from "@material-ui/core/styles";

import enhancer from "./enhancer";

// import FeeStructureTable from "./AllFeeStructureTable/index";
import AddNewStudentTable from "./AddNewStudents/index";
import OfflinePaymentTable from "./OfflinePaymentDetails/index";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import TestScoreModal from "./TestScoreModal/index";
import EditBatchDetails from "./EditBatchModal/index";
import DeleteStudentFrmBatchModal from "./DeleteStudentFromBatch/index";
// import moment from "moment";

import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from "mdbreact";

import { urls } from "../../../../url";
import { appConfig } from "../../../../constants";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Loading from "../../../../shared/Components/Loading";
import moment from "moment";
import _ from "lodash";

// import DeleteIcon from "@material-ui/icons/Delete";
import MaterialTable from "material-table";
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
  // let { auth } = props;

  const location = useLocation();
  const history = useHistory();
  let [loader, setLoader] = useState(false);

  const classes = useStyles();
  // table functions &
  const [modalShow, setModalShow] = useState(false);

  const [scoremodalShow, setscoremodalShow] = useState(false);
  const [deleteStudmodalShow, setdeleteStudmodalShow] = useState(false);

  const [specificBatchData, setSpecificBatchData] = useState([]);
  const [specificBatchInfo, setSpecificBatchInfo] = useState([]);
  const [teacherArray, setTeacherArray] = useState([]);
  const [studentArray, setStudentArray] = useState([]);
  const [courseArray, setCourseArray] = useState([]);

  const [selectedStartDate, setSelectedStartDate] = useState();
  const [selectedEndDate, setSelectedEndDate] = useState();


  const [instituteId,setInstituteId]=useState();
  const [feesStartDate, setFeesStartDate] = useState();
  const [feesEndDate, setFeesEndDate] = useState();
  let batchId = location.state.batchId;

  // student table :
  const [data, setData] = useState([]);
  const [testData, setTestData] = useState([]);

  const [passDeeleteStudId, setPassDeeleteStudId] = useState();
  const [passDeleteStud, setPassDeeleteStud] = useState();

  const handleDeleteStudentId = (e, studId, studName) => {
    console.log("Fees Id passed from table to delete modal", studId, studName);
    // let specificTestId = testId;
    if (studId !== undefined && studName !== undefined) {
      console.log("inside If to chk fees id", studId, studName);
      setPassDeeleteStudId(studId);
      setPassDeeleteStud(studName);
    }

    setdeleteStudmodalShow(true);
  };

  let argum = {
    feesStartDate: feesStartDate,
    feesEndDate: feesEndDate,
    batchId: batchId,
  };

  console.log("batch Id in Btach details", batchId);
  console.log("start date in fees passed in parent", feesStartDate);
  console.log("end date in fees passed in parent", feesEndDate);

  console.log("batchdetailcs selectedStartDate", selectedStartDate);
  console.log("batchdetailcs selectedEndDate", selectedEndDate);

  console.log(
    "specificBatchInfo.startDate in batch details",
    specificBatchInfo.startDate
  );

  console.log(
    "specificBatchInfo.endDate in batch details",
    specificBatchInfo.endDate
  );

  console.log("specificBatchInfo name batch details", specificBatchInfo.name);

//   Date.prototype.addDays = function(days) {
//     var date = new Date(this.valueOf());
//     date.setDate(date.getDate() + days);
//     return date;
// }
// function addDays(date, days) {
//   var result = new Date(date);
//   result.setDate(result.getDate() + days);
//   return result;
// }

  // console.log("one day added to start date",specificBatchInfo.startDate.addDays(1));

  useEffect(() => {
    if (
      specificBatchInfo.startDate !== undefined &&
      specificBatchInfo.startDate !== null
    ) {
      console.log("start date in if ", specificBatchInfo.startDate);
      console.log(
        "start date in dd mmm yyyy",
        moment(specificBatchInfo.startDate).format("DD MMMM YYYY")
      );
      let sDate = moment(specificBatchInfo.startDate).format("DD MMMM YYYY");
      setSelectedStartDate(sDate);

      let fsDate = moment(sDate).format("DD-MM-YYYY");

      // let fsDate = moment(specificBatchInfo.startDate).format("DD-MM-YYYY");
      console.log("Fees structire start date", fsDate);
      // console.log("to add 1 day to batch here",moment(fsDate).add(1,'d'));
      setFeesStartDate(fsDate);
      // const [feesStartDate, setFeesStartDate] = useState();
      // const [feesEndDate, setFeesEndDate] = useState();

      // let
    }
  }, [specificBatchInfo.startDate]);

  useEffect(() => {
    if (
      specificBatchInfo.endDate !== undefined &&
      specificBatchInfo.endDate !== null
    ) {
      console.log("end date in if ", specificBatchInfo.endDate);
      console.log(
        "end date in dd mmm yyyy",
        moment(specificBatchInfo.endDate).format("DD MMMM YYYY")
      );
      let eDate = moment(specificBatchInfo.endDate).format("DD MMMM YYYY");
      setSelectedEndDate(eDate);
      // let
      let fsDate = moment(eDate).format("DD-MM-YYYY");

      // let fsDate = moment(specificBatchInfo.startDate).format("DD-MM-YYYY");
      console.log("Fees structire start date", fsDate);
      setFeesEndDate(fsDate);
  // console.log("specificBatchInfo name batch details", addDays(fsDate,1));

      // const [feesStartDate, setFeesStartDate] = useState();
      // const [feesEndDate, setFeesEndDate] = useState();
    }
  }, [specificBatchInfo.endDate]);

  const [uniquebBatchId, setuniquebBatchId] = useState(batchId);
  console.log("uniquebBatchId", uniquebBatchId);

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
    getAllTestOfBatch();
  }, []);

  // const
  // useEffect(() => {
  //   getBatchList();
  // }, [Object.keys(specificBatchData).length > 0]);
  useEffect(() => {
    getBatchList();
  }, [specificBatchData]);
  useEffect(() => {
    console.log(" specificBatchInfo.teachers);", specificBatchInfo.teachers);
    console.log(" specificBatchInfo.students);", specificBatchInfo.students);

    if (
      typeof specificBatchInfo.course === "object" &&
      specificBatchInfo.course !== null
    ) {
      console.log(" specificBatchInfo.cours is  object and not null",specificBatchInfo,specificBatchInfo.course.courseId);
      let temp = [];
      temp.push(specificBatchInfo.course);
      var chkCourseArray = Array.isArray(temp);


      // if(temp){
      //   setCourseArray(temp);
      // }

      console.log("chkCourseArray is Array", chkCourseArray);
      if (chkCourseArray == true) {
        console.log("chkCourseArray is Array", chkCourseArray);
        setCourseArray([...temp]);
      }


      // set institute Id
      setInstituteId(specificBatchInfo.instituteId);
      // instituteId
    }

    var chkArray = Array.isArray(specificBatchInfo.teachers);
    var chkArayStudent = Array.isArray(specificBatchInfo.students);
    var chkArayStudent = Array.isArray(specificBatchInfo.students);

    console.log("specificBatchInfo.teachers is Array or not", chkArray);
    console.log("specificBatchInfo.students is Array or not", chkArayStudent);

    if (chkArray == true) {
      setTeacherArray(specificBatchInfo.teachers);
    }
    if (chkArayStudent == true) {
      setStudentArray(specificBatchInfo.students);
      // instituteId
      


    }

    console.log("TeacherArray inside usestatesidde", teacherArray);
  }, [specificBatchInfo]);

  
  console.log("insitute id",instituteId);
  // }, [Object.keys(specificBatchInfo).length > 0]);

  console.log("TeacherArray outsidde", teacherArray);
  console.log("StudentArray outsidde", studentArray.length, studentArray);
  console.log("courseArray outside", courseArray);

  // specificBatchInfo.startDate
  // specificBatchInfo.endDate

  const getBatchList = (event) => {
    console.log("before clone deep in batch details");
    console.log("batchlist list function enhancer", specificBatchData);
    setSpecificBatchInfo(_.cloneDeep(specificBatchData));
  };
  console.log("After clone deep", specificBatchInfo);
  const getDataOfBatch = (e) => {
    setLoader(true);
    axios
      .get(
        `${appConfig.host}${urls.specificBatchGetAPIbasedOnBatchId}?batchId=${batchId}`
      )
      .then((result) => {
        console.log("Success getting specific batch", result.data.data);

        setSpecificBatchData(_.cloneDeep(result.data.data));

        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
      });
  };

  const [passTestId, setPassTestId] = useState();
  const [passTestName, setPassTestName] = useState("");

  const passTestIdToScoreModal = (e, testId, testName) => {
    console.log("Hello Inside the passTestIdToScoreModal function", testId);
    // let specificTestId = testId;
    if (testId !== undefined && testName !== undefined) {
      console.log("inside If to chk test id", testId);
      setPassTestId(testId);
      setPassTestName(testName);
    }

    setscoremodalShow(true);
  };
  console.log("pass test id in batch details", passTestId);
  console.log("pass test name in batch details", passTestName);

  const getAllTestOfBatch = (e) => {
    let datatemp = [];
    setLoader(true);
    console.log("batch Id in Btach details inside get all test info", batchId);
    // getAllTests
    // axios
    //   .get(`${appConfig.host}${urls.getAllTests}`)
    axios
      .get(
        `${appConfig.host}${urls.getAllTestForBatchGETAPI}?batchId=${batchId}`
      )
      .then((result) => {
        console.log(
          "Success getting all test for specific batch",
          result.data.data
        );

        // setTestData(result.data.data);
        let getAllTests = result.data.data;
        setLoader(false);
        getAllTests &&
          getAllTests.length &&
          getAllTests.forEach((test) => {
            let temp = {};

            temp["testName"] = test.test.testTitle;
            temp["dateOfAssign"] = moment(test.startDate).format(" DD-MM-YYYY");
            temp["dueDate"] = moment(test.dueDate).format("DD-MM-YYYY");

            temp["scores"] = (
              <Grid container spacing={1} key={test._id}>
                <Grid>
                  <a
                    style={{ color: "blue", textDecoration: "underline" }}
                    // onClick={() => setscoremodalShow(true)}
                    onClick={(e) =>
                      passTestIdToScoreModal(
                        e,
                        test.test._id,
                        test.test.testTitle
                      )
                    }
                  >
                    Scores
                  </a>
                </Grid>
                {/* <Grid>
                <DeleteIcon onClick={() => onDelete(gallery._id)} />
              </Grid> */}
              </Grid>
            );
            // temp["delete"] = (
            //   <Grid container spacing={1} key={test._id}>
            //     <Grid>
            //       <DeleteIcon
            //         onClick={() =>
            //           onDeleteSpecificStudent(student.studentId, batchId)
            //         }
            //       />
            //     </Grid>
            //   </Grid>
            // );
            datatemp.push(temp);
          });

        setTestData(datatemp);

        // setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
      });
  };

  console.log("setSpecificBatchData out side axios call", specificBatchData);
  const handleEditTest = (e) => {
    // props.history.push("/teacher/editTest");
    history.push("/teacher/editTest");

  };
  // function execute to update batch deatils after clicked on save btn in edit
  function clickAlert() {
    console.log("Is this function called");
    getDataOfBatch();
  }
  // Student Name	Fees Structure 	Fees Status 	Details

  const onDeleteSpecificStudent = (studentId, batchId) => {
    console.log("batch id in specific student delete", batchId);
    console.log("student batch id in specific student delete", studentId);

    setLoader(true);
    axios
      .delete(
        `${appConfig.host}${urls.deleteSpecificStudentFromSpecificBatch}?batchId=${batchId}&studentId=${studentId}`
      )
      .then((result) => {
        console.log("delete Specific student API called ", result.data);

        // setAllBatchList(result.data.data);
        // console.log("batch list get scuessfully");
        // getDataOfBatch();
        clickAlert();
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
      });
  };
  // student columns
  const columns = [
    { title: "Student Name", field: "studentName" },
    // { title: "Fees Structure", field: "feesStructure" },
    // // { title: "Fees Status", field: "feesStatus" },
    // // { title: "Onbording Status", field: "onbordingStatus" },
    // // isFirstInstallmentPaid
    // {
    //   width: 300,
    //   title: "First Installment Status",
    //   field: "isFirstInstallmentPaid",
    
    // },

    { title: "Details", field: "details" },
    { title: "Delete", field: "delete" },
  ];
  const testcolumns = [
    { title: "Test Name", field: "testName" },
    { title: "Date of Assignment", field: "dateOfAssign" },
    { title: "Due Date", field: "dueDate" },
    { title: "Scores", field: "scores" },
  ];

  const handleStudentDetails = (e,studentId) => {
    // console.log("Batch to View", e.target.value);

    // props.history.push("/batch/details/students/viewdetails");
    // history.push("/batch/details/students/viewdetails");
    // instituteId:instituteId
    history.push({
      pathname: "/batch/details/students/viewdetails",
      state: { studentId: studentId,instituteId:instituteId },
    });
  };
  useEffect(() => {
    if (
      studentArray.length > 0
      // &&
      // studentArray !== undefined
    ) {
      let datatemp = [];

      studentArray.forEach((student, i) => {
        let temp = {};
        // {studentArray.length > 0 &&
        //   studentArray.map((student, j) => (
        //     <span key={student.studentId}>
        //       {student.feeStructure.installmentCalculator.length}
        //       {student.name} {student.status}
        //     </span>
        //   ))}
        temp["studentName"] = student.studentId.name;


        // temp["feesStructure"] = (
        //   <span style={{ textAlign: "center" }}>
        //     {" "}
        //     {student.feeStructure.installmentCalculator.length}
        //   </span>
        // );

     
        // temp["isFirstInstallmentPaid"] = (
        //   <span style={{ textAlign: "center", textTransform: "capitalize" }}>
        //     {/* {student.status} */}
        //     {student.isFirstInstallmentPaid}

        //     <span>
        //       {student.isFirstInstallmentPaid == true ? (
        //         <span> Completed </span>
        //       ) : (
        //         <span>Pending</span>
        //       )}
        //     </span>
        //   </span>
        // );
      

      

        temp["details"] = (
          <Grid container spacing={1} key={student.studentId._id}>
            <Grid onClick={(e) => handleStudentDetails(e,student.studentId._id)}>
              <a
                style={{ color: "blue", textDecoration: "underline" }}
                // onClick={(e) => handleStudentDetails(e)}
              >
                View Details
              </a>
            </Grid>
            {/* <Grid>
              <DeleteIcon onClick={() => onDelete(gallery._id)} />
            </Grid> */}
          </Grid>
        );
        temp["delete"] = (
          <Grid container spacing={1} key={student.studentId._id}>
            <Grid>
              <span>
                <i
                  style={{ float: "right", paddingRight: "22px" }}
                  class="fa fa-trash"
                  onClick={(e) =>
                    handleDeleteStudentId(e, student.studentId._id, student.studentId.name)
                  }
                ></i>
              </span>
              {/* <DeleteIcon
                // onClick={() => setModalShow(true)}

                // handleDeleteStudentId
               
                onClick={(e) => handleDeleteStudentId(e, student.studentId)}
              /> */}
            </Grid>
          </Grid>
        );
        datatemp.push(temp);
      });
      setData(datatemp);
    }
  }, [studentArray]);
  return (
    <React.Fragment>
      {loader ? (
        <Loading isLoading={true}></Loading>
      ) : (
        <div>
          <React.Fragment>
            <EditBatchDetails
              show={modalShow}
              onHide={() => setModalShow(false)}
              batchId={batchId}
              onChildClick={clickAlert}
            />
            <TestScoreModal
              show={scoremodalShow}
              onHide={() => setscoremodalShow(false)}
              passTestId={passTestId}
              batchId={batchId}
              batchName={specificBatchInfo.name}
              passTestName={passTestName}
            ></TestScoreModal>

            {/* const [deleteStudmodalShow, setdeleteStudmodalShow] = useState(false); */}

            <DeleteStudentFrmBatchModal
              show={deleteStudmodalShow}
              onHide={() => setdeleteStudmodalShow(false)}
              onChildClick={clickAlert}
              batchId={batchId}
              passDeeleteStudId={passDeeleteStudId}
              batchName={specificBatchInfo.name}
              passDeleteStud={passDeleteStud}
            ></DeleteStudentFrmBatchModal>
            <div className={classes.root}>
              {console.log("batchId inside function return", batchId)}
              <Paper
                className={classes.paper}
                elevation={1}
                id={styles.paper_batch_header}
              >
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <div>
                      <span className={styles.create_batch}>
                        {console.log(
                          "batch name after edit",
                          specificBatchInfo
                        )}
                        {specificBatchInfo.name}-
                        {courseArray.length > 0 &&
                          courseArray.map((course, j) => (
                            <span
                              style={{ marginLeft: "3px" }}
                              key={course.courseId}
                            >
                              {course.name}
                            </span>
                          ))}{" "}
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
                  <Grid item xs={12} md={12}>

{console.log("welcome teacher",teacherArray)}
<span className={styles.create_batch}>
  Teacher :
  {teacherArray.length > 0 &&
    teacherArray.map((teacher, j) => (
    <span key={teacher.teacherId}> {" "}{teacher.name} ,{" "}</span>
    ))}





  {/* {specificBatchInfo.teachers.map((teacher, j) => (
<span key={teacher.teacherId}>{teacher.name}</span>
))} */}
</span>
</Grid>
                    <Grid item xs={4} md={4}>
                      <span className={styles.create_batch}>
                       Start Date :<span> {selectedStartDate}</span>

                        {/* {moment(specificBatchInfo.startDate).format(
                          "dd/MM/yyyy"
                        )} */}
                        {/* {moment(specificBatchInfo.startDate).format(
                          "DD/MM/YYYY"
                        )} */}
                      </span>
                    </Grid>
                    <Grid item md={4} xs={4}>
                      <span className={styles.create_batch}>
                        End Date :
                        {/* <span> moment({selectedEndDate}).add(1,'d')</span> */}
                        <span> {selectedEndDate}</span>

                        {/* {moment(specificBatchInfo.endDate).format("DD/MM/YYYY")} */}
                        {/* {specificBatchInfo.endDate} */}
                        {/* {moment(specificBatchInfo.endDate).format(
                          "DD MMMM YYYY"
                        )} */}
                      </span>
                    </Grid>
                    <Grid item xs={4} md={4}>
                      <span className={styles.create_batch}>
                        No. Students :
                        <span> {studentArray.length}</span>
                      </span>
                    </Grid>
                    {/* <Grid item xs={3}>

                      {console.log("welcome teacher",teacherArray)}
                      <span className={styles.create_batch}>
                        Teacher:
                        {teacherArray.length > 0 &&
                          teacherArray.map((teacher, j) => (
                          <span key={teacher.teacherId}> {teacher.name},{" "}</span>
                          ))}

                      </span>
                    </Grid> */}
                  </Grid>
                </Grid>
              </Paper>
          {/* feestructure remove ie commented her for temporary  */}
         
              {/* <FeeStructureTable
                // {...argum}
                batchId={batchId}
                feesStartDate={feesStartDate}
                feesEndDate={feesEndDate}
                // clickAlert={clickAlert}
                onChildClick={clickAlert}
                batchName={specificBatchInfo.name}
              ></FeeStructureTable> */}




              {/* <OfflinePaymentTable></OfflinePaymentTable> */}
        
              <Grid item xs={12} style={{ marginTop: "20px" }}>
                {/* <span>Hello</span> */}
                <MaterialTable
                  title={
                    <span
                      className={styles.create_batch_discription}
                      style={{ fontSize: "16px", fontWeight: "bold" }}
                    >
                      Students
                    </span>
                  }
                  columns={columns}
                  data={data}
                />
              </Grid>{" "}
              {/* test table  */}
              <Grid item xs={12} style={{ marginTop: "20px" }}>
                {/* <span>Hello</span>  */}
                <MaterialTable
                  title={
                    <span
                      className={styles.create_batch_discription}
                      style={{ fontSize: "16px", fontWeight: "bold" }}
                    >
                      Test
                    </span>
                  }
                  columns={testcolumns}
                  data={testData}
                />
              </Grid>{" "}
              {/* </Paper> */}
              {/* <Paper
                className={classes.paper}
                elevation={1}
                id={styles.paper_batch_header}
              >


                <span className={styles.create_batch}>
                  student:
                  {studentArray.length > 0 &&
                    studentArray.map((student, j) => (
                      <span key={student.studentId}>
                        {student.feeStructure.installmentCalculator.length}
                        {student.name} {student.status}
                      </span>
                    ))}
              
                </span>
              </Paper> */}
              {/* <AddNewStudentTable></AddNewStudentTable> */}
              {/* commented Test atble info commented , can use further */}
              {/* <Paper
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
              
                <TableContainer style={{ marginBottom: "0.1%" }}>
                

                  <Table
                    className={classes.table}
                    size="small"
                    aria-label="a dense table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Test Name</TableCell>
                       
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
              </Paper> */}
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
