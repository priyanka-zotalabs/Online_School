import React, { useState, useEffect } from "react";
// import styles from "./veiwStudentDetailsInBatch.module.css";
import styles from "./viewStudentDetailsInBatchStyle.module.css";
import { makeStyles } from "@material-ui/core/styles";
import enhancer from "./enhancer";

import { urls } from "../../../../../url";
import { appConfig } from "../../../../../constants";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Loading from "../../../../../shared/Components/Loading";
import moment from "moment";
import _ from "lodash";
import MaterialTable, { MTableBodyRow } from "material-table";
import dummyData from "./dummy";
// import { useLocation } from "react-router-dom";

import profileImage from "../../../../../images/profile.png";

import {
  Paper,
  //   Container,
  Grid,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

import { Container, Modal, Button, Row, Col, Form } from "react-bootstrap";

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

  paper2: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Index = (props) => {
  const classes = useStyles();
  let [loader, setLoader] = useState(false);
  const [studentProfileData, setStudentProfileData] = useState();
  const [studentName, setStudentName] = useState(" ");
  const [studentContactNo, SetStudentContactNo] = useState();
  const [studentClass, SetStudentClass] = useState();
  const [studentBoard, SetStudentBoard] = useState();
  const [studentLocation, SetStudentLocation] = useState();
  const [studentEmail, SetStudentEmail] = useState();
  const [studentImageUrl, SetStudentImageUrl] = useState("");
  const [studentCourseBatches, SetStudentCourseBatches] = useState([]);
  const [coursesBatchName, setBatchcoursesName] = useState([]);
  const [getTestDetails, setGetTestDetails] = useState([]);


 
  const [feesStructureDetails, setFeesStructureDetails] = useState();

  const [updatedfeesStructureDetails, setupdatedFeesStructureDetails] = useState();
  const [getFeesDetails, setGetFeesDetails] = useState([]);



  const location = useLocation();

  let studentId = location.state.studentId;
  let instituteId = location.state.instituteId;


  console.log("fees structure deatils", feesStructureDetails);
  console.log("studentCourseBatches", studentCourseBatches);
  console.log("stud id & institute id", studentId, instituteId);



  useEffect(() => {
    getParticularStudentProfile();
    getParticularStudentTestdetails();
    // getParticularStudentFeesDetails();
  }, [])


  const [localCurrency,setLocalCurrency]=useState();
  useEffect(() => {
    let temp = [];
    if (feesStructureDetails) {


      feesStructureDetails.forEach((element) => {
        console.log("element of fees list", element);

        element.installments.forEach((ele) => {

          console.log("fees list ", ele,ele.date);
          temp.push({
            courseName: element.courseId.name,
            amount: ele.amount,
            currency: element.currency,
            dueDate: ele.date,
            status: ele.status,
          })
        });


      });
      setupdatedFeesStructureDetails([...temp]);


    }

  }, [feesStructureDetails])

  console.log("updatedsimple  fees list ", updatedfeesStructureDetails);



  // instead of api call (update after get axios call)
  useEffect(() => {
    if (updatedfeesStructureDetails) {
      let datatemp = [];

      // let getFeesData = result.data.data;
      let getFeesData = updatedfeesStructureDetails;

      getFeesData &&
        getFeesData.length &&
        getFeesData.forEach((fees) => {
          let temp = {};
let currency=(fees.currency)== "INR" ?"Rs" : "$";

console.log("localCurrency",currency);
          console.log("Currency in student details",fees.currency,fees.dueDate);

          temp["course"] = fees.courseName;
        

          temp["amount"] = `${fees.amount} ${currency}`;


          // {
          //   row.currency== "INR" ?"Rs" : "$"
            
          //    }
          // temp["amount"] = `${fees.amount} `;


          // temp["dueDate"] = moment(fees.dueDate).format("DD-MM-YYYY");
          temp["dueDate"] =fees.dueDate;


          temp["status"] = fees.status;


          datatemp.push(temp);
        });

      setGetFeesDetails(datatemp);

    }
  }, [updatedfeesStructureDetails])

  useEffect(() => {
    if (studentProfileData) {
      console.log("student data only if data is present", studentProfileData);

      SetStudentImageUrl(studentProfileData.userMetaData.imageUrl);
      setStudentName(studentProfileData.userMetaData.name);
      SetStudentEmail(studentProfileData.email);
      SetStudentContactNo(studentProfileData.contactNumber);
      SetStudentBoard(studentProfileData.userMetaData.board);
      SetStudentClass(studentProfileData.userMetaData.class);
      SetStudentLocation(studentProfileData.userMetaData.location);
      SetStudentCourseBatches(studentProfileData.userMetaData.courses);


    }

  }, [studentProfileData])

  useEffect(() => {
    if (studentCourseBatches) {
      let temp = [];
      studentCourseBatches.forEach((element) => {
        console.log("element of course batch list", element);
        temp.push({

          courseBatchId: element._id,
          courseName: element.courseId.name,
          batchName: element.batchId.name,

        });

      });
      setBatchcoursesName([...temp]);
      // SetStudentCourseBatches([...temp]);
    }

  }, [studentCourseBatches])

  const getParticularStudentProfile = (e) => {
    console.log("get student profile function ")


    setLoader(true);

    axios
      .get(`${appConfig.host}${urls.studentProfileStudentDetails}?studentId=${studentId}`)
      .then((result) => {
        console.log("student profile  data", result.data.data);
        setStudentProfileData(result.data.data);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
      })

  }
  // for test deatils of students
  // getTestDetailsofStudent
  const getParticularStudentTestdetails = (e) => {
    console.log("get student profile function ")


    setLoader(true);
    let datatemp = [];
    axios
      .get(`${appConfig.host}${urls.getTestDetailsofStudent}?studentId=${studentId}`)
      .then((result) => {
        console.log("student test  data", result.data.data);

        // setGetTestDetails(result.data.data);
        let getAllTests = result.data.data;
        getAllTests &&
          getAllTests.length &&
          getAllTests.forEach((test) => {
            let temp = {};
            temp["test"] = test.testDetails.testTitle;
            temp["status"] = test.status;

            datatemp.push(temp);
          });

        setGetTestDetails(datatemp)

        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
      })
  }



  // for student fees details :instituteId
  const getParticularStudentFeesDetails = (e) => {
    console.log("get student profile function ")


    setLoader(true);

    axios
      .get(`${appConfig.host}${urls.getFeesDetailsofParticularStudent}?studentId=${studentId}&instituteId=${instituteId}`)
      .then((result) => {
        console.log("student fees  data", result.data.data);
        setFeesStructureDetails(result.data.data);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
      })

  }

  const columns = [
    { title: "Test ", field: "test" },
    { title: "Status", field: "status" },

  ];

  const feesColumns = [
    { title: "Course ", field: "course" },
    { title: "Amount", field: "amount" },
    { title: "Due Date", field: "dueDate" },
    { title: "Status", field: "status" },


  ];

  return (
    <React.Fragment>
      {loader ? (
        <Loading isLoading={true}></Loading>
      ) : (
          <div>
            <div className={classes.root}>
              <Paper
                className={classes.paper}
                elevation={1}
                id={styles.paper_batch_header}
              >
                <Container fluid>
                  <Row style={{ width: "100%" }}>
                    <Col md="2">
                      {/* <span>Profile of student</span> */}
                      <label htmlFor="contained-button-file">
                        <img
                          // src={profileImage}
                          src={
                            studentImageUrl === ""
                              ? profileImage
                              : studentImageUrl
                          }
                          component="span"
                          id={styles.student_profile_image}
                        ></img>
                      </label>
                    </Col>
                    <Col md="10">
                      <Row style={{ marginTop: "2%" }}>
                        <Col md="12">
                          <span id={styles.student_profile_name}>
                            {studentName}
                            {/* John Deo */}
                          </span>
                        </Col>
                      </Row>
                      <Row style={{ marginTop: "5px" }}>
                        <Col md="6" className={styles.student_profile_other_info}>
                          <span>Mobile No :</span>
                          <span>{" "}{studentContactNo}</span>
                        </Col>
                        <Col md="3" className={styles.student_profile_other_info}>
                          <span>Class :</span>
                          <span>{" "}{studentClass}</span>
                        </Col>

                        <Col md="3" className={styles.student_profile_other_info}>
                          <span>Board :</span>
                          <span>{" "}{studentBoard} </span>
                        </Col>
                      </Row>
                      <Row style={{ marginTop: "5px" }}>
                        <Col md="6" className={styles.student_profile_other_info}>
                          <span>Email Id :</span>
                          <span>{" "}{studentEmail} </span>
                        </Col>

                        <Col md="4" className={styles.student_profile_other_info}>
                          <span>Location :</span>
                          <span>{" "}{studentLocation} </span>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Container>
              </Paper>

              <Container fluid>
                <Row style={{ width: "100%" }}>


                  {/* 
                <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper2}>xs</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper2}>xs</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper2}>xs</Paper>
        </Grid>
      </Grid>
      </div> */}

                  {coursesBatchName && coursesBatchName.map((courseBatchNames, i) => (

                    // {studentCourseBatches.map((courseBatchNames,i)=>(
                    <Col md="4" >

                      <Paper
                        className={classes.paper}
                        elevation={1}
                        id={styles.paper_batch_header2}

                        key={i}

                        value={courseBatchNames.courseBatchId}
                      >
                        <div>
                          <Row><span id={styles.paper_batch_titleAtCenter} style={{ fontWeight: "bold" }}>{courseBatchNames.courseName}</span></Row>
                          <Row><span id={styles.paper_batch_titleAtCenter}>{courseBatchNames.batchName}</span></Row>
                        </div>
                        {/* </div> */}
                      </Paper>
                    </Col>
                  ))}



                </Row>
              </Container>

              {/* Test details */}
              <Grid item xs={12} style={{ marginTop: "20px" }}>
                <MaterialTable
                  title={
                    <span
                      className={styles.create_batch_discription}
                      style={{ fontSize: "16px", fontWeight: "bold" }}
                    >
                      Test Details
                  </span>
                  }

                  columns={columns}
                  data={getTestDetails}

                // options={{
                //   search: false,
                //   paging: false,
                // }}
                />
              </Grid>

              {/* Fees details  commented temporary here*/}


              {/* <Grid item xs={12} style={{ marginTop: "20px" }}>
                <MaterialTable

                  // to make table row responsive on duble click
                  // components={{
                  //   Row: props => (
                  //     <MTableBodyRow
                  //       {...props}
                  //       onDoubleClick={() => {
                  //         alert("Make row editable");
                  //       }}
                  //     />
                  //   )
                  // }}
                  title={
                    <span
                      className={styles.create_batch_discription}
                      style={{ fontSize: "16px", fontWeight: "bold" }}

                    >
                      Fees Details
                  </span>
                  }
                  columns={feesColumns}
                  data={getFeesDetails}
                // options={{
                //   search: false,
                //   paging: false,
                // }}
                />
              </Grid> */}
            </div>
          </div>
        )}
    </React.Fragment>
  );
};

export default Index;
