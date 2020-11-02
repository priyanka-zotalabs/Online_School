import React, { useEffect, useState } from 'react';
import styles from "./testScreen.module.css";
import _ from "lodash";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import axios from "axios";
import { urls } from "../../../../url";
import { appConfig } from "../../../../constants";
import { Link } from "react-router-dom";
import Loading from "../../../../shared/Components/Loading";
// import { toast } from "react-toastify";


const TestScreen = (props) => {
    const [testId, setTestId] = useState(props.location.state.Id);
    const [currentTestData, setCurrentTestData] = useState();
    const [loader, setLoader] = useState(true);
    const [batchId, setBatchId] = useState(props.location.state.batch);
    const [studentId, setStudentId] = useState(props.location.state.studentId);

    const gotoTestContentScreen = () => {
        let endTest = Date.now() + currentTestData.totalTime * 60 * 1000;
        props.history.push({
            pathname: '/student/evalution/testContentScreen',
            state: { detail: currentTestData, endTime: endTest, Id: testId, batchId: batchId, studentId: studentId }
        })
    }

    useEffect(() => {
        fetchTest();
    }, [])

    const fetchTest = () => {
        setLoader(true);
        axios
            .get(`${appConfig.host}${urls.getSpecificTest}?testId=${testId}`).then(success => {
                // console.log("Test data", success.data.data);
                setCurrentTestData(_.cloneDeep(success.data.data));
                setLoader(false);
            }).catch(error => {
                console.log("Error getting the current Test Data");
                setLoader(false);
            })
    }
    // console.log("Test id from Student cards", testId);
    // console.log("Bacth id from Student cards", batchId);
    // console.log("User id from Student cards", studentId);

    return (
        <>
            {loader ? (<Loading isLoading={true} ></Loading>) : (
                <><
                    Paper
                    elevation={3}
                    className={styles.paper_test_header}
                >
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <div>
                                <span className={styles.create_test}>{currentTestData.subject}-{currentTestData.testTitle}</span>
                            </div>
                        </Grid>
                        <Grid container item xs={12}>
                            <Grid item xs={4}>
                                <span className={styles.create_test}>Duration: {currentTestData.totalTime} Mins</span>
                            </Grid>
                            <Grid item xs={4}>
                                <span className={styles.create_test}>No. of Questions: {currentTestData.totalQuestions}</span>
                            </Grid>
                            <Grid item xs={4}>
                                <span className={styles.create_test}>Marks: {currentTestData.totalMarks}</span>
                            </Grid>
                        </Grid>
                        {/* Discription of test */}
                        <Grid item xs={12}>
                            <span className={styles.create_test_discription}>
                                {currentTestData.testDescription}
                            </span>
                        </Grid>

                        {/* Test Instruction */}
                        <Grid container item xs={12} style={{ marginTop: "5%" }}>
                            <Grid item xs={12}>
                                <span className={styles.create_test}>
                                    Test Instructions:
                    </span>
                            </Grid>
                            <Grid container item xs={12}>
                                <div className={styles.instruction_points}>
                                    <ol>
                                        <li>Once the Student clicks on Start Test the time of the test starts </li>
                                        <li>If the time runs out the test will be Auto Submitted</li>
                                        <li>After starting the test if the student closes the window the progress will not be saved and test will stand cancelled.</li>
                                        <li>Color Code-</li>
                                        <Grid container item xs={12} direction="row"
                                            justify="space-around"
                                            alignItems="center"
                                            styles={{ marginTop: "auto" }}>
                                            <Grid container direction="row" item xs={6} >
                                                <Grid item xs={2}>
                                                    <div className={styles.NotMarkedBox}>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={9}>
                                                    <span className={styles.boxTextFlag}>Not Marked</span>
                                                </Grid>
                                            </Grid>
                                            <Grid container direction="row" item xs={6} >
                                                <Grid item xs={2}>
                                                    <div className={styles.NotAnsweredBox}>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={9}>
                                                    <span className={styles.boxTextFlag}>Not Answered</span>
                                                </Grid>
                                            </Grid>
                                            <Grid container direction="row" item xs={6} >
                                                <Grid item xs={2}>
                                                    <div className={styles.AnsweredBox}>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={9}>
                                                    <span className={styles.boxTextFlag}>Answered</span>
                                                </Grid>
                                            </Grid>
                                            <Grid container direction="row" item xs={6} >
                                                <Grid item xs={2}>
                                                    <div className={styles.NotVisitedBox}>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={9}>
                                                    <span className={styles.boxTextFlag}>Not Visited</span>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <li>Clicking on Start means the student agrees and understand all the above conditions</li>
                                    </ol>
                                </div>
                            </Grid>
                        </Grid>


                    </Grid>

                </Paper>
                    <Grid container xs={12} justify="center"
                        alignItems="center" style={{ marginTop: "5%" }}>
                        < Grid item xs={2} >
                            <Button
                                className={styles.assign_test_btn} styles={{ color: "white", border: "none" }}
                                onClick={gotoTestContentScreen}
                            >
                                START TEST
                        </Button>
                        </Grid>
                    </Grid>

                </>)}
        </>
    );
}

export default TestScreen;