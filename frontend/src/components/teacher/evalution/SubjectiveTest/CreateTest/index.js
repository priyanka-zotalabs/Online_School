import React, { useState, useRef } from 'react';
import Styles from "./index.module.css";
import { Paper, Grid, TextField, Button } from "@material-ui/core";
import _ from "lodash";
import { useHistory } from "react-router-dom";

//Basic Form Data
const formBase = {
    testTitle: {
        value: "",
        validation: {
            required: {
                value: true,
                errMsg: "This field is required",
            },
        },
        invalid: false,
        touched: false,
        helperText: "",
    },
    testDescription: {
        value: "",
        validation: {
            required: {
                value: true,
                errMsg: "This field is required",
            },
        },
        invalid: false,
        touched: false,
        helperText: "",
    },
    totalQuestions: {
        value: "",
        validation: {
            required: {
                value: true,
                errMsg: "This field is required",
            },
            regex: {
                value: /^[0-9]*$/,
                errMsg: "Enter Number Only",
            },
        },
        invalid: false,
        touched: false,
        helperText: "",
    },
    totalTime: {
        value: "",
        validation: {
            required: {
                value: true,
                errMsg: "This field is required",
            },
            regex: {
                value: /^[0-9]*$/,
                errMsg: "Enter Number Only",
            },
        },
        invalid: false,
        touched: false,
        helperText: "",
    },
    subject: {
        value: "",
        validation: {
            required: {
                value: true,
                errMsg: "This field is required",
            },
        },
        invalid: false,
        touched: false,
        helperText: "",
    },
    marks: {
        value: "",
        validation: {
            required: {
                value: true,
                errMsg: "This field is required",
            },
            regex: {
                value: /^[0-9]*$/,
                errMsg: "Enter Number Only",
            },
        },
        invalid: false,
        touched: false,
        helperText: "",
    },
}
const CreateSubjectiveTest = (props) => {

    //Variable
    let history = useHistory();
    let fileInput = useRef();


    //State
    const [formData, setFormData] = useState(formBase);
    const [selectedFiles, setSelectedFiles] = useState([]);



    //Handlers
    const formChangeHandler = (event, identifier) => {
        let tempFormData = { ...formData }
        tempFormData[identifier].value = event.target.value;
        tempFormData[identifier].invalid = false;
        tempFormData[identifier].touched = true;
        tempFormData[identifier].helperText = "";
        setFormData(tempFormData);
    }

    const formBlurHandler = (event, identifier) => {
        let tempFormData = { ...formData }
        tempFormData[identifier].value = event.target.value;
        if (tempFormData[identifier].value.length > 0) {
            tempFormData[identifier].invalid = false;
            tempFormData[identifier].touched = true;
            tempFormData[identifier].helperText = "";
            
        }
        else {
            tempFormData[identifier].invalid = true;
            tempFormData[identifier].touched = true;
            tempFormData[identifier].helperText = tempFormData[identifier].validation.required.errMsg;
        }

        setFormData(tempFormData);
    }

    const fileInputHandler = (event) => {
        const fileList = [];
        for (let file of event.target.files) {
            fileList.push(file);
        }
        setSelectedFiles([...selectedFiles, ...fileList]);
    }

    // Regressor 
    const getImageList = () => {
        console.log("Regressed Files", selectedFiles);
        if (selectedFiles.length > 0) {
            let fileList = [];
            selectedFiles.forEach((file, index) => {
                fileList.push(<div key={file.size + index}>
                    File: {file.name}
                </div>);
            });
            return fileList;
        }
        else {
            return null;
        }
    }

    return (
        <>
            <Paper
                elevation={5}
                className={Styles.paper_create_test_header}
            >
                <h3 className="create-test-text">Create Subjective Test</h3>
            </Paper>
            <Paper
                elevation={5}
                className={Styles.firstFormPaper}
            >
                <Grid container>
                    <Grid item xs={12} md={12}>
                        <TextField
                            style={{ margin: 8, width: "98%" }}
                            id="outlined-textarea"
                            label="Test title"
                            multiline
                            size="small"
                            variant="outlined"
                            name="testTitle"
                            value={formData.testTitle.value}
                            onChange={(e) =>
                                formChangeHandler(e, "testTitle")
                            }
                            onBlur={(e) => formBlurHandler(e, "testTitle")}
                            error={formData.testTitle.invalid}
                            helperText={formData.testTitle.helperText}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField
                            style={{ margin: 8, width: "98%" }}
                            id="outlined-textarea"
                            label="Test Description"
                            multiline
                            size="small"
                            rows={4}
                            variant="outlined"
                            name="testDescription"
                            value={formData.testDescription.value}
                            onChange={(e) =>
                                formChangeHandler(e, "testDescription")
                            }
                            onBlur={(e) =>
                                formBlurHandler(e, "testDescription")
                            }
                            error={formData.testDescription.invalid}
                            helperText={formData.testDescription.helperText}
                        />
                    </Grid>
                    <Grid container xs={12} item spacing={1} justify="center" alignItems="center">
                        <Grid item xs={4} md={4} >
                            <TextField
                                style={{ margin: 8, width: "90%" }}
                                id="outlined-textarea"
                                label="Total marks"
                                size="small"
                                variant="outlined"
                                name="totalTime"
                                value={formData.marks.value}
                                onChange={(e) =>
                                    formChangeHandler(e, "marks")
                                }
                                onBlur={(e) =>
                                    formBlurHandler(e, "marks")
                                }
                                error={formData.marks.invalid}
                                helperText={formData.marks.helperText}
                            />
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <TextField
                                style={{ margin: 8, width: "90%" }}
                                id="outlined-textarea"
                                label="Total Time"
                                size="small"
                                variant="outlined"
                                name="totalTime"
                                value={formData.totalTime.value}
                                onChange={(e) =>
                                    formChangeHandler(e, "totalTime")
                                }
                                onBlur={(e) =>
                                    formBlurHandler(e, "totalTime")
                                }
                                error={formData.totalTime.invalid}
                                helperText={formData.totalTime.helperText}
                            />
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <TextField
                                style={{ margin: 8, width: "90%" }}
                                id="outlined-textarea"
                                label="Subject"
                                size="small"
                                variant="outlined"
                                name="subject"
                                value={formData.subject.value}
                                onChange={(e) =>
                                    formChangeHandler(e, "subject")
                                }
                                onBlur={(e) =>
                                    formBlurHandler(e, "subject")
                                }
                                error={formData.subject.invalid}
                                helperText={formData.subject.helperText}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} style={{ textAlign: "center", margin: "2%" }}>
                            <input type="file" multiple style={{ display: "none" }} onChange={(e) => fileInputHandler(e)} ref={fileInput} />
                            <Button
                                size="md"
                                className={Styles.create_test_details_submit_btn}
                                onClick={() => fileInput.current.click()}
                            >
                                UPLOAD QUESTION PAPER
                            </Button>
                        </Grid>
                    </Grid>

                </Grid>
                {getImageList()}
            </Paper>
            <div style={{ paddingTop: "10%" }}>
                <Button
                    id="create-test-details-btn1"
                    className={Styles.create_test_details_cancel_btn}
                    size="md"
                    onClick={() => history.push("/teacher/evalution")}
                >
                    {" "}
                Cancel
              </Button>{" "}
                <Button
                    className={Styles.create_test_details_submit_btn}
                    onClick={() => alert("Test Created Success!")}
                    style={{ float: "right" }}
                >
                    CREATE TEST
              </Button>{" "}
            </div>
        </>
    );
}

export default CreateSubjectiveTest;