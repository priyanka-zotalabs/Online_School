import React, { useEffect, useState } from 'react'
import "./style.scss";
// import CreateTest from "./CreateTest/index"
import CreateTest from "./CreateTest/index"
import { makeStyles } from '@material-ui/core/styles';
import DeleteTestModal from "./DeleteTestModal/index"
import { appConfig } from "../../../constants";
import { urls } from "../../../url";
import axios from "axios";
import _ from "lodash";
import { toast } from "react-toastify";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from "mdbreact";

import SelectTypeModal from "./SelectTypeModal";

import {
  Paper,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,

} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import Loading from "../../../shared/Components/Loading";
// import TeacherLiveClass from "../liveClass/Call";



const Evalution = (props) => {



  const [deleteTestmodalShow, setdeleteTestModalShow] = React.useState(false);
  const [selectTypeModalShow, setSelectTypeModalShow] = React.useState(false);

  const [loader, setLoader] = useState(true);

  const handleCreateMCQTest = (e) => {
    props.history.push("/teacher/evalution/createTest");
  };

  const handleCreateSubjectiveTest = (e) => {
    props.history.push("/teacher/evalution/createSubjectiveTest");
  };


  const handleAssignTestToBatch = (e) => {
    // console.log("Test to View", e.target.value);

    // props.history.push("/teacher/assignTest");
    props.history.push({
      pathname: "/teacher/evalution/assignTest",
      state: { testId: e.target.value }
    });
  };

  const [allTests, setAllTests] = useState([]);
  const getAllTests = () => {
    setLoader(true);
    axios
      .get(`${appConfig.host}${urls.getAllTests}`).then(success => {
        // console.log("All Test data",success.data.data);
        setAllTests(_.cloneDeep(success.data.data));
        setLoader(false);
      }).catch(error => {
        console.log("Error getting the value");
        setLoader(false);
      })
  }



  useEffect(() => {
    getAllTests();
  }, []);

  // console.log(allTests);

  const [currentTestInFocus, setCurrentTestInFocus] = useState(0);

  const deleteTestModalShow = (e) => {
    // setCurrentTestInFocus(e.target.value);
    // console.log("Value from clcik", e.target.value);
    window.CurrentTestId = e.target.value;
    // console.log("from state", window.CurrentTestId);
    setdeleteTestModalShow(true);
  }

  const deleteTest = (testId = window.CurrentTestId) => {
    axios
      .delete(`${appConfig.host}${urls.deleteTest}?testId=${testId}`)
      .then((success) => {
        // console.log("Delete Test Success", success.data);
        toast.success("Delete Test success");
        setdeleteTestModalShow(false);
        getAllTests();
      })
      .catch((error) => {
        console.log("Delete Test Error", error);
        toast.error("Delete Test Error");
        setdeleteTestModalShow(false);
      });
  }
  return (
    <React.Fragment>
      {loader ? (<Loading isLoading={true} ></Loading>) : (
        <React.Fragment>
          {/* Temp Jugaad */}
          {/* <TeacherLiveClass /> */}
          <DeleteTestModal
            show={deleteTestmodalShow}
            onHide={() => setdeleteTestModalShow(false)}
            onClickedDelete={() => deleteTest(window.CurrentTestId)}
          >
          </DeleteTestModal>

          <SelectTypeModal show={selectTypeModalShow} onHide={() => setSelectTypeModalShow(false)} onSelectMCQTest={handleCreateMCQTest} onSelectSubjectiveTest={handleCreateSubjectiveTest} />

          {/* evaluation card paper */}

          
          {/* import {Paper} from "@material-ui/core";  */}
          {/* import { Modal, Button, Row, Col, Form } from "react-bootstrap"; */}

          <Paper elevation={1} id="paper-test-header">
            {/* <Paper className={classes.paper} > */}
            <span className="create-test">Evaluation - Tests</span>
            <Button
              id="create-test-btn"
              // onClick={() => setSelectTypeModalShow(true)}
              onClick={(e) => handleCreateMCQTest()}
            >
              ADD NEW TEST
        </Button>
          </Paper>

          {/* <div className={classes.root} className="evalution_card"> */}

          <div className="evalution_card">
            {/* </Container> */}
            <Grid container spacing={3}>
              {allTests.map((testData, testIndex) => {
                return (
                  <Grid item xs={4}>
                    <Card className="evalution_cardHeading">
                      <CardContent id="evalution-card-heading-bgcolor">
                        <div >
                          {/* 3 verticle dots  */}
                          <div class="dropdown" style={{ display: "flex", float: "right", marginRight: "5px", marginTop: "5px" }}>

                            <a type="button" id="dropdownMenu2" data-toggle="dropdown"
                              aria-haspopup="true" aria-expanded="false" onClick={() => console.log("hello")}>
                              <i class="fas fa-ellipsis-v" style={{ marginLeft: "auto", }} ></i></a>
                            <div class="dropdown-menu dropdown-primary" style={{ marginLeft: "-130px" }} value={testData._id} >
                              <button class="dropdown-item"
                                onClick={(e) => deleteTestModalShow(e)}
                                // onClick={() => setModalShow(true)}
                                value={testData._id}
                              >Delete Test</button>
                            </div>
                          </div>

                          {/* card heading */}
                          <Typography gutterBottom variant="bold" component="h6" >
                            {testData.testTitle}
                          </Typography>

                          <Typography variant="body2" color="textSecondary" component="p" style={{ color: "white" }}>
                            {testData.subject}
                          </Typography>
                        </div>
                      </CardContent>
                      <CardContent>
                        <Typography variant="body2" component="p" style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                          {testData.testDescription}
                          <br />
                        </Typography>
                      </CardContent>
                      <CardContent>
                        <div>
                          <span style={{ fontWeight: "bold", fontSize: "13px", marginTop: "10px" }} >{" "} </span>
                          <button id="assign-test-btn" value={testData._id} onClick={(e) => handleAssignTestToBatch(e)}
                          >VIEW</button>
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>)
              })}
              {/* first card */}

              {/* First Card End Here */}
            </Grid>

          </div>

        </React.Fragment>)}
    </React.Fragment>
  )
}

export default Evalution
