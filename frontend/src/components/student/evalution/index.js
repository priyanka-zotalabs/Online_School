import React, { useEffect, useState } from 'react'
import "./style.scss";
import { makeStyles } from '@material-ui/core/styles';
import { appConfig } from "../../../constants";
import { urls } from "../../../url";
import axios from "axios";
import _ from "lodash";

import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from "mdbreact";

import {
    Paper,
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    TextField,

} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';
import { connect } from "react-redux";
import DummyData from "./dummyData";
import moment from "moment";
import Loading from "../../../shared/Components/Loading";

const Evalution = (props) => {

    const goToTheTest = (e, testId, batchId, studentUserId) => {
        props.history.push({
            pathname: '/student/evalution/testScreen',
            state: { Id: testId, batch: batchId, studentId: studentUserId }
        });
    };

    const viewResult = (e, testId, batchId, studentUserId) => {
        // console.log("Test ID", testId, "batch ID", batchId, "studentUserId", studentUserId);
        props.history.push({
            pathname: '/student/evalution/testResult',
            state: { Id: testId, batch: batchId, studentId: studentUserId }
        });
    };

    const [filter, setFilter] = useState(false);
    const [allTests, setAllTests] = useState([]);
    const [allTestsOriginal, setAllTestsOriginal] = useState();
    const [filterName, setFilterName] = useState("");
    const [filterDate, setFilterDate] = useState(new Date());
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        getAllTests();
    }, [])
    const getAllTests = () => {
        setLoader(true);
        let batchString = `?studentId=${props.studentUserId}`;
        props.studentCourseBatchData.forEach(course => {
            batchString += "&batchId=" + course.batchId._id;
        });

        // console.log("All Tests Params", batchString);
        axios
            .get(`${appConfig.host}${urls.getStudentTests}${batchString}`).then(success => {
                console.log("All Test data", success.data.data);
                setAllTests(_.cloneDeep(success.data.data));
                setAllTestsOriginal(_.cloneDeep(success.data.data));
                setLoader(false);
            }).catch(error => {
                console.log("Error getting the value");
                setLoader(false);
            })
    }

    const getButton = (testIndex) => {

        const testId = allTests[testIndex].testQuestion._id;
        const batchId = allTests[testIndex].batch._id;
        const studentUserId = props.studentUserId;
        let status;
        switch (allTests[testIndex].status) {
            case "live":
                status = <div>
                    <span style={{ fontWeight: "bold", fontSize: "13px", marginTop: "10px" }} >Due Date:  {moment(allTests[testIndex].dueDate).format("DD/MM/YY")}</span>
                    <button id="assign-test-btn"
                        onClick={(e) => goToTheTest(e, testId, batchId, studentUserId)}
                    >Go To Test</button>
                </div>;
                // console.log("Go to Test");
                break;
            case "not started":
                status = <div>
                    <span style={{ fontWeight: "bold", fontSize: "13px", marginTop: "10px" }} >Live On:  {moment(allTests[testIndex].startDate).format("DD/MM/YY")}</span>
                    <button id="assign-test-btn" style={{ backgroundColor: "#9B9696" }}
                    >TBD</button>
                </div>;
                // console.log("Not Started");
                break;
            case "not given":
                status = <div>
                    <span style={{ fontWeight: "bold", fontSize: "13px", marginTop: "10px" }} >Due Date:  {moment(allTests[testIndex].dueDate).format("DD/MM/YY")}</span>
                    <button id="assign-test-btn" style={{ backgroundColor: "#9B9696" }}>Expired</button>
                </div>;
                // console.log("Expired");
                break;
            case "view result":
                status = <div>
                    <span style={{ fontWeight: "bold", fontSize: "13px", marginTop: "10px" }} >Due Date:  {moment(allTests[testIndex].dueDate).format("DD/MM/YY")}</span>
                    <button id="assign-test-btn"
                        onClick={(e) => viewResult(e, testId, batchId, studentUserId)}
                    >View Result</button>
                </div>;
                // console.log("View Result");
                break;
        }
        return status;
    }

    const onTestDateFilterChange = (date) => {
        // console.log("I am here !", date);
        setFilterDate(date);
        if (Array.isArray(allTestsOriginal)) {
            let tempAllData = _.cloneDeep(allTestsOriginal).filter((eachTest, index) => {
                if (moment(eachTest.dueDate).isAfter(moment(date).utc())) {
                    return eachTest;
                }
            });
            // console.log("ALL Test FIlter Data", tempAllData);
            setAllTests(_.cloneDeep(tempAllData));
        }
    }
    const onTestFilterChange = (event) => {
        setFilterName(event.target.value);
        if (Array.isArray(allTestsOriginal)) {
            let tempAllData = _.cloneDeep(allTestsOriginal).filter((eachTest, index) => {
                if (eachTest.testQuestion.testTitle.toLowerCase().includes(event.target.value.toLowerCase())) {
                    return eachTest;
                }
            });
            // console.log("ALL Test Filter Data", tempAllData);
            setAllTests(_.cloneDeep(tempAllData));
        }
    }
    return (
        <React.Fragment>
            {
                loader ? (<Loading isLoading={true} ></Loading>) : (
                    <React.Fragment>
                        {/* evaluation card paper */}

                        <Paper elevation={6} id="paper-test-header">
                            {/* <Paper className={classes.paper} > */}
                            <span className="create-test">Evaluation</span>
                        </Paper>

                        <div className="evalution_card">
                            <Grid container spacing={3} xs={12}>
                                <Grid item xs={6}>
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        style={{ marginTop: "7%", width: "98%" }}
                                        id="outlined-textarea"
                                        label="Search by test name"
                                        placeholder="Search by test name"
                                        multiline
                                        size="small"
                                        // fullWidth
                                        variant="outlined"
                                        name="testTitle"
                                        value={filterName}
                                        onChange={(e) => onTestFilterChange(e)}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <div className="flex-search-container">
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}
                                        //  className={classes.formControlNew} 
                                        // style={{ width: "100%" }}
                                        >
                                            <KeyboardDatePicker
                                                style={{ marginLeft: "5%", width: "95%" }}
                                                margin="normal"
                                                id="date-picker-dialog"
                                                label="Search by Due Date"
                                                format="dd/MM/yyyy"
                                                value={filterDate}
                                                onChange={onTestDateFilterChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </div>
                                </Grid>

                            </Grid>

                            {/* </Container> */}
                            <Grid container spacing={3}>
                                {allTests && allTests.map((eachTest, testIndex) => {
                                    return (
                                        <>
                                            <Grid item xs={4}>
                                                <Card className="evalution_cardHeading">
                                                    <CardContent id="evalution-card-heading-bgcolor">
                                                        <div >
                                                            {console.log("test in student view",allTests,eachTest,eachTest.testQuestion)}
                                                            <Typography gutterBottom variant="bold" component="h6" >
                                                                {eachTest.testQuestion.testTitle}
                                                            </Typography>

                                                            <Typography variant="body2" color="textSecondary" component="p" style={{ color: "white" }}>
                                                                {eachTest.testQuestion.subject}
                                                            </Typography>
                                                        </div>
                                                    </CardContent>
                                                    <CardContent>
                                                        <Typography variant="body2" component="p" style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                                                            {eachTest.testQuestion.testDescription}
                                                            <br />
                                                        </Typography>
                                                    </CardContent>
                                                    <CardContent>
                                                        {getButton(testIndex)}
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        </>
                                    );
                                })}
                                {allTests.length > 0 ? "" : "No Test Found"}
                            </Grid>
                        </div>
                    </React.Fragment>)
            }
        </React.Fragment >
    )
}

const mapStateToProps = (state) => {
    return {
        studentCourseBatchData: state.auth.currentMetaData.courses,
        studentUserId: state.auth.currentMetaData._id,
    };
};
export default connect(mapStateToProps)(Evalution);
