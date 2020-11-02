import React, { useEffect, useState } from 'react'
import "./style.scss";
import { makeStyles } from '@material-ui/core/styles';
import { appConfig } from "../../../constants";
import { urls } from "../../../url";
import axios from "axios";
import _ from "lodash";

import {
  Paper,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,

} from "@material-ui/core";
import Loading from "../../../shared/Components/Loading";
// import StudentLiveClass from "../../student/liveClass/Call";



const Evalution = (props) => {



  const [loader, setLoader] = useState(true);


  const handleAssignTestToBatch = (e) => {
    props.history.push({
      pathname: '/admin/evalution/assignTest',
      state: { testId: e.target.value }
    });
  };

  const [allTests, setAllTests] = useState([]);
  const getAllTests = () => {
    setLoader(true);
    axios
      .get(`${appConfig.host}${urls.getInstituteTests}`).then(success => {
        console.log("All Institute Tests", success.data.data);
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

  const [currentTestInFocus, setCurrentTestInFocus] = useState(0);

  return (
    <React.Fragment>
      {loader ? (<Loading isLoading={true} ></Loading>) : (
        <React.Fragment>

          {/* Temp Jugad */}
          {/* <StudentLiveClass /> */}
          
          {/* evaluation card paper */}
          <Paper elevation={1} id="paper-test-header">
            {/* <Paper className={classes.paper} > */}
            <span className="create-test">Evaluation - Tests</span>
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
                          <span style={{ fontWeight: "bold", fontSize: "13px", marginTop: "10px" }} >By: {testData.teacherId ? testData.teacherId.name : "Teacher"} </span>
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
