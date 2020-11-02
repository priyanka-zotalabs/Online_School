import React, { useEffect, useState } from 'react';
import styles from "./index.module.css";
import _ from "lodash";
import axios from "axios";
import { urls } from "../../../../url";
import { appConfig } from "../../../../constants";
import { toast } from "react-toastify";
import { orange } from '@material-ui/core/colors';
import {
    Paper,
    Container,
    Grid,
    Button,
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
import Loading from "../../../../shared/Components/Loading";


const TestResult = (props) => {
    const [currentTestData, setCurrentTestData] = useState({});
    const [loader, setLoader] = useState(true);
    const [batchId, setBatchId] = useState(props.location.state.batch);
    const [studentId, setStudentId] = useState(props.location.state.studentId);
    const [testId, setTestId] = useState(props.location.state.Id);
    const [testResult, setTestResult] = useState();

    const checkCorrectAnswer = (questionIndex, optionIndex) => {
        let colorString = "";
        if (currentTestData.questions[questionIndex].correctAnswer == optionIndex + 1) {
            colorString = "#C9FFC9";
        }
        else if (currentTestData.questions[questionIndex].markedAnswer == optionIndex + 1) {
            colorString = "#FBA2A2";
        }
        else {
            colorString = "white";
        }
        return colorString;
    }

    useEffect(() => {
        getResultData();
    }, []);

    const getResultData = () => {
        setLoader(true);

        let params =
        {
            batchId: batchId,
            testId: testId,
            studentUserId: studentId
        }

        // console.log("Get Result to show marks", params);
        axios.get(`${appConfig.host}${urls.testEvaluation}?batchId=${batchId}&testId=${testId}&studentUserId=${studentId}`).then(success => {
            // console.log("Result Fetched Success", success.data.data[0]);
            setTestResult(testResult => success.data.data[0]);
            setLoader(false);
        }).catch(error => {
            console.log("Error Fetching Results", error);
            setLoader(false);
        })
    }


    useEffect(() => {
        fetchTest();
    }, [testResult]);

    const fetchTest = () => {
        setLoader(true);
        axios
            .get(`${appConfig.host}${urls.getSpecificTest}?testId=${testId}`).then(success => {
                // console.log("Test data", success.data.data);
                let tempTestData = _.cloneDeep(success.data.data)
                // console.log("Test Result", testResult);
                tempTestData.score = testResult.score;
                tempTestData.questions.map((eachQuestion, index) => {
                    eachQuestion.markedAnswer = testResult.questions[index].markedAnswer;
                });
                // console.log("current Test Data after result", tempTestData);
                setCurrentTestData(currentTestData => tempTestData);
                setLoader(false);
            }).catch(error => {
                console.log("Error getting the current Test Data");
                setLoader(false);
            })
    }

    const getEachQuestionMarks = (markedAnswer, correctAnswer, marks) => {
        // value={{currentQuestion.markedAnswer == currentQuestion.correctAnswer ?  currentQuestion.marks : 0} + "/" + currentQuestion.marks + " Marks"}
        let result = markedAnswer == correctAnswer ? marks : 0;
        result += "/" + marks + " Marks";
        return result;
    }

    const gotoAllTestScreen = () => {
        props.history.push("/student/evalution");
    }
    return (
        <>
            {loader ? (<Loading isLoading={true} ></Loading>) : (
                <>
                    <Paper elevation={3} className={styles.paper_test_header}>
                        <span className={styles.create_test}>Evaluation {">"} Test Details</span>
                    </Paper>
                    <
                        Paper
                        elevation={3}
                        className={styles.paper_test_header}
                    >
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Grid item xs={12} md={12}>
                                    <span
                                        style={{
                                            fontSize: "20px",
                                            marginTop: "25px",
                                            marginLeft: "15px",
                                        }}
                                    >
                                        {currentTestData.testTitle}
                                    </span>
                                    <span style={{
                                        float: "right",
                                        fontSize: "20px",
                                        margin: "0 15px",
                                        padding: "0 10px",

                                    }}>Total Marks : {currentTestData.score}/{currentTestData.totalMarks}</span>
                            </Grid>
                                <hr className={styles.hrWidth}></hr>
                            </Grid>
                            <Grid container item xs={12}>
                                <Grid item xs={12}>
                                    {/* Actual Question */}
                                    <Grid container spacing={3} xs={12} style={{ width: '100%' }}>
                                        {currentTestData && currentTestData.questions && currentTestData.questions.map((currentQuestion, currentQuestionIndex) => {
                                            return (
                                                <>
                                                    <Grid container item xs={12}>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container item xs={12} md={12} spacing={1}>
                                                                <Grid item xs={1} style={{ marginTop: "1.5%" }}>
                                                                    <span style={{ marginLeft: "10px", paddingTop: "20px" }}>{currentQuestionIndex + 1}</span>
                                                                </Grid>

                                                                <Grid item xs={8} md={8}>
                                                                    <TextField
                                                                        style={{ marginTop: 8, marginLeft: -40, marginRight: 8, marginBottom: 8, width: "100%" }}
                                                                        id="outlined-textarea"
                                                                        // label="Test title"
                                                                        placeholder="Enter your question here....."
                                                                        multiline
                                                                        fullWidth
                                                                        // size="sm"
                                                                        size="small"
                                                                        variant="outlined"
                                                                        value={currentQuestion.question}
                                                                        disabled={true}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={2}>
                                                                    <TextField
                                                                        style={{ margin: 8 }}
                                                                        id="outlined-textarea"
                                                                        // label="Test title"
                                                                        placeholder="Marks"
                                                                        multiline
                                                                        fullWidth
                                                                        // size="sm"
                                                                        size="small"
                                                                        variant="outlined"
                                                                        // value={{currentQuestion.markedAnswer == currentQuestion.correctAnswer ?  currentQuestion.marks : 0} + "/" + currentQuestion.marks + " Marks"}
                                                                        value={getEachQuestionMarks(currentQuestion.markedAnswer, currentQuestion.correctAnswer, currentQuestion.marks)}
                                                                        disabled={true}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        {/* radio buttons */}
                                                        <Grid container item xs={12} md={12} spacing={3}>
                                                            <FormControl
                                                                component="fieldset"
                                                                className={styles.markSubTime}
                                                            >
                                                                <Grid item>
                                                                    {/* Options Display */}
                                                                    <RadioGroup aria-label="option" name="option"
                                                                    // value={parseInt(currentQuestion.correctAnswer)}
                                                                    >
                                                                        {currentQuestion.options.map((optionData, optionIndex) => {

                                                                            return (<Grid
                                                                                item
                                                                                container
                                                                                xs={12}
                                                                                style={{ margin: 4 }}
                                                                            >
                                                                                <Grid
                                                                                    item
                                                                                    xs={1}
                                                                                    style={{ marginRight: "1.5em" }}
                                                                                >
                                                                                    <FormControlLabel
                                                                                        value={parseInt(optionIndex) + 1}
                                                                                        name={"Radio" + optionIndex}
                                                                                        size="sm"
                                                                                        control={<Radio />}
                                                                                    />
                                                                                </Grid>
                                                                                <Grid item xs={10} style={{ marginTop: "0.5em" }}>
                                                                                    <TextField
                                                                                        style={{ margin: 8, width: "100%", backgroundColor: checkCorrectAnswer(currentQuestionIndex, optionIndex) }}
                                                                                        id="outlined-textarea"
                                                                                        // label="Test title"
                                                                                        placeholder={"Option " + (optionIndex + 1)}
                                                                                        multiline
                                                                                        fullWidth
                                                                                        // size="sm"
                                                                                        size="small"
                                                                                        variant="outlined"
                                                                                        name="value"
                                                                                        value={currentQuestion.options[optionIndex].value}
                                                                                        disabled={true}
                                                                                        className={styles.whiteTextBG}
                                                                                    />
                                                                                </Grid>
                                                                            </Grid>)
                                                                        })}
                                                                    </RadioGroup>
                                                                </Grid>
                                                            </FormControl>
                                                        </Grid>
                                                    </Grid>
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
                                                            disabled={true}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <hr className={styles.hrWidth}></hr>
                                                    </Grid>
                                                </>
                                            )
                                        })}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Paper>
                    <div style={{ marginTop: "2%", marginBotton: "5%", paddingTop: "5%", paddingBottom: "5%" }}>
                        <Grid container xs={12} justify="center"
                            alignItems="center" >
                            < Grid item xs={2} >
                                <Button className={styles.assign_test_btn} variant="outlined" color="orange" styles={{ border: "none", color: "#FFFFFF", margin: "50px", backgroundColor: "orange" }}
                                    onClick={gotoAllTestScreen}
                                >BACK</Button>
                            </Grid>
                        </Grid>
                    </div>
                </>)}
        </>
    );
}

export default TestResult;