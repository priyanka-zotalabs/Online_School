import React, { useEffect, useState } from 'react';
import styles from "./index.module.css";
import _ from "lodash";
import axios from "axios";
import { urls } from "../../../../url";
import { appConfig } from "../../../../constants";
import Countdown from 'react-countdown';
import { toast } from "react-toastify";
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
import dummyData from "./dummyData";
import TestSubmitModal from "./testSubmitModal/testSubmitModal";
import Loading from "../../../../shared/Components/Loading";


const TestScreen = (props) => {

    const [currentTestData, setCurrentTestData] = useState();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [modalShow, setModalShow] = useState(false);
    const [endTime, setEndTime] = useState(props.location.state.endTime);
    const [loader, setLoader] = useState(true);
    const [batchId, setBatchId] = useState(props.location.state.batchId);
    const [studentId, setStudentId] = useState(props.location.state.studentId);
    const [testId, setTestId] = useState(props.location.state.Id);
    const [studentTestData, setStudentTestData] = useState();
    const [submitStatus, setSubmitStatus] = useState(false);
    const [scoredMarks, setScoredMarks] = useState(0);
    const [totalMarks, setTotalMarks] = useState(0);

    useEffect(() => {
        setCurrentTest();
    }, [])

    let sendQuestionSchema = {
        qId: "",
        question: "",
        markedAnswer: "",
        status: "", // 1="Not Marked", 2="Not Answers" , 3 = "Answered", 4 = "Not Visited"
    }
    const setCurrentTest = () => {
        let tempData = _.cloneDeep(props.location.state.detail);
        setCurrentTestData(props.location.state.detail);

        let sendData = [];
        tempData.questions.forEach((eachQuestion, index) => {
            let tempSendQuestionSchema = _.cloneDeep(sendQuestionSchema);
            tempSendQuestionSchema.qId = eachQuestion.qId;
            tempSendQuestionSchema.question = eachQuestion.question;
            tempSendQuestionSchema.status = index > 0 ? 4 : 1;
            sendData.push(tempSendQuestionSchema);
        });
        setStudentTestData(studentTestData => sendData);
        setTotalMarks(totalMarks => tempData.totalMarks)
        setLoader(false);
    }

    const correctAnswerAssignUsingRadioButton = (e, currentQuestionIndex, optionIndex) => {
        let tempStudentTestData = _.cloneDeep(studentTestData);
        tempStudentTestData[currentQuestionIndex].markedAnswer = optionIndex + 1;
        setStudentTestData(studentTestData => tempStudentTestData);
        // console.log("Answer selected", optionIndex + 1);
    }

    /* Countdown Renderer */
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            if (submitStatus) {
                return <Completionist />;
            }
            else {
                onSubmit();
                return <Completionist />;
            }
        } else {
            // Render a countdown
            return <span style={{
                float: "right",
                fontSize: "20px",
                marginLeft: "15px",
                paddingLeft: "10px",
            }}>{hours} hrs : {minutes} mins : {seconds} sec</span>;
        }
    };

    const Completionist = () => <span>Test Finished!</span>;

    const nextQuestion = () => {
        let newIndex = currentIndex;
        if (newIndex != currentTestData.questions.length - 1) {
            checkMarkedStatus(newIndex);
            newIndex += 1;
            setCurrentIndex(currentIndex => newIndex);
        }

    }
    const checkMarkedStatus = (currentIndex) => {
        let tempStudentTestData = _.cloneDeep(studentTestData);

        if (tempStudentTestData[currentIndex].markedAnswer) {
            tempStudentTestData[currentIndex].status = 3;
        }
        else {
            tempStudentTestData[currentIndex].status = 2;
        }
        setStudentTestData(studentTestData => tempStudentTestData);
    }

    const prevQuestion = () => {
        let newIndex = currentIndex;
        if (newIndex != 0) {
            checkMarkedStatus(newIndex);
            newIndex -= 1;
            setCurrentIndex(currentIndex => newIndex);
        }
    }

    const onSubmit = () => {
        setLoader(true);
        checkMarkedStatus(currentTestData.questions.length - 1);
        let newQuestions = [];
        studentTestData.forEach(eachQuestion => {
            newQuestions.push({
                qId: eachQuestion.qId,
                question: eachQuestion.question,
                markedAnswer: eachQuestion.markedAnswer
            })
        });
        let params = {
            testId: testId,
            batchId: batchId,
            questions: newQuestions
        }
        // console.log("params of submit test", params);
        axios
            .post(`${appConfig.host}${urls.testEvaluation}`, params).then(success => {
                // console.log("Test Submitted Sucess", success);
                setLoader(false);
                setSubmitStatus(true);
                getResult();
            }).catch(error => {
                console.log("Error Submitting the test", error);
                setLoader(false);
            })
    }

    const getResult = () => {
        let params =
        {
            batchId: batchId,
            testId: testId,
            studentUserId: studentId
        }
        // console.log("Get Result to show marks", params);
        axios.get(`${appConfig.host}${urls.testEvaluation}?batchId=${batchId}&testId=${testId}&studentUserId=${studentId}`).then(success => {
            // console.log("Result Fetched Success", success.data.data[0]);
            setScoredMarks(scoredMarks => success.data.data[0].score)
            setModalShow(modalShow => true);
        }).catch(error => {
            console.log("Error Fetching Results", error);
            // alert(error);
        })
    }


    const viewResult = () => {
        setModalShow(false);
        props.history.push({
            pathname: '/student/evalution/testResult',
            state: { Id: testId, batch: batchId, studentId: studentId }
        });
    };

    // Question Pallete
    const questionPallete = () => {
        return (<>
            <div className={styles.questionPallete}>
                <Grid item
                    container
                    direction="column"
                    justify="space-around"
                    alignItems="center"
                >
                    <Grid item xs={12}>
                        <span
                            style={{
                                fontSize: "20px",
                                marginTop: "25px",
                                marginLeft: "15px",
                            }}
                        >
                            Question Pallete
                    </span>
                    </Grid>
                    <Grid item xs={12} className={styles.boxContainer}>

                        {studentTestData.map((eachQuestion, index) => {
                            switch (eachQuestion.status) {
                                case 1:
                                    return (
                                        <div className={styles.NotMarkedBox}>
                                            {index + 1}
                                        </div>
                                    );
                                case 2:
                                    return (
                                        <div className={styles.NotAnsweredBox}>
                                            {index + 1}
                                        </div>
                                    );
                                case 3:
                                    return (
                                        <div className={styles.AnsweredBox}>
                                            {index + 1}
                                        </div>
                                    );
                                case 4:
                                    return (
                                        <div className={styles.NotVisitedBox}>
                                            {index + 1}
                                        </div>
                                    );
                            }
                        })}
                    </Grid>
                </Grid>
                <div style={{ marginTop: "55%" }}></div>
                <Grid container item xs={12} direction="row"
                    justify="space-around"
                    alignItems="center"
                >
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

            </div>
        </>);
    }


    // console.log("End Time", endTime);
    // console.log("currentTestData ", currentTestData);
    // console.log("studentTestData ", studentTestData);
    // console.log("Test id from test ", testId);
    // console.log("Bacth id from test", batchId);
    // console.log("User id from test", studentId);

    return (
        <>
            {loader ? (<Loading isLoading={true} ></Loading>) : (
                <>
                    <TestSubmitModal show={modalShow} scoredMarks={scoredMarks} outOf={totalMarks} onViewResult={viewResult} onHide={() => setModalShow(false)} />
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
                                    <Countdown
                                        date={endTime}
                                        renderer={renderer}
                                    />
                                </Grid>
                                <hr className={styles.hrWidth}></hr>
                            </Grid>
                            <Grid container item xs={12}>
                                <Grid item xs={8}>
                                    {/* Actual Question */}
                                    <Grid container spacing={3} xs={12} style={{ width: '100%' }}>
                                        {currentTestData && currentTestData.questions && currentTestData.questions.map((currentQuestion, currentQuestionIndex) => {
                                            if (currentQuestionIndex === currentIndex) {
                                                return (
                                                    <>
                                                        <Grid item xs={12}>
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
                                                                            // onChange={(e) => handleInputFromQuestions(e, "question", currentQuestionIndex)}
                                                                            disabled={true}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            {/* radio buttons */}
                                                            <Grid container item xs={12} md={12} spacing={3} direction="column">

                                                                <FormControl
                                                                    component="fieldset"
                                                                    className={styles.markSubTime}
                                                                >
                                                                    <Grid item>
                                                                        {/* Options Display */}
                                                                        <RadioGroup aria-label="option" name="option" value={parseInt(studentTestData[currentQuestionIndex].markedAnswer)}>
                                                                            {currentQuestion.options.map((optionData, optionIndex) => {
                                                                                return (<Grid
                                                                                    key={Math.random()}
                                                                                    item
                                                                                    container
                                                                                    xs={12}
                                                                                    style={{ margin: 4 }}
                                                                                >
                                                                                    <Grid
                                                                                        item
                                                                                        xs={1}
                                                                                        style={{ marginRight: "0.4em" }}
                                                                                    >
                                                                                        <FormControlLabel
                                                                                            value={parseInt(optionIndex) + 1}
                                                                                            name={"Radio" + optionIndex}
                                                                                            size="sm"
                                                                                            control={<Radio />}
                                                                                            onClick={(e) => correctAnswerAssignUsingRadioButton(e, currentQuestionIndex, optionIndex)}
                                                                                            onBlur={(e) => correctAnswerAssignUsingRadioButton(e, currentQuestionIndex, optionIndex)}
                                                                                        />
                                                                                    </Grid>
                                                                                    <Grid item xs={10} style={{ marginTop: "0.5em" }}>
                                                                                        <TextField
                                                                                            style={{ margin: 8, width: "100%" }}
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
                                                                                        />
                                                                                    </Grid>
                                                                                </Grid>)
                                                                            })}
                                                                        </RadioGroup>
                                                                    </Grid>
                                                                </FormControl>
                                                            </Grid>
                                                        </Grid>
                                                    </>
                                                )
                                            }
                                            return null;
                                        })}
                                    </Grid>
                                </Grid>
                                {/* Question Pallete */}
                                <Grid item xs={4}>
                                    {questionPallete()}
                                </Grid>
                            </Grid>
                        </Grid>
                        <hr className={styles.hrWidth}></hr>
                    </Paper>
                    <Grid container xs={12} justify="space-between"
                        alignItems="center" style={{ marginTop: "3%", marginBottom: "5%" }}>
                        <Grid item alignItems="left" justify="left">
                            {currentIndex != 0 ?
                                <Button
                                    className={styles.nextQuestion_btn}
                                    onClick={prevQuestion}
                                >
                                    PREVIOUS QUESTION
                        </Button>
                                :
                                null}
                        </Grid>
                        <Grid item alignItems="right" justify="right">
                            {currentIndex != currentTestData.questions.length - 1 ?
                                <Button className={styles.nextQuestion_btn}
                                    onClick={nextQuestion}
                                >
                                    NEXT QUESTION
                        </Button>
                                :
                                <Button className={styles.nextQuestion_btn}
                                    onClick={onSubmit} disabled={submitStatus}
                                >
                                    SUBMIT TEST
                        </Button>
                            }
                        </Grid>
                    </Grid>
                </>)}
        </>
    );
}
export default TestScreen;
