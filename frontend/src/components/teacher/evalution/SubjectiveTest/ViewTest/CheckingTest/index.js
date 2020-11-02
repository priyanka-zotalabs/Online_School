import React, { useState } from 'react';
import { Grid, Paper, TextField } from "@material-ui/core";
import Styles from "./checkingTest.module.css";
import _ from "lodash";
import { Rating } from '@material-ui/lab';


const checkingForm = {
    remarks: {
        value: "",
        validation: {
            required: {
                value: true,
                errMsg: "This field is required",
            },
        },
        invalid: false,
        touched: true,
        helperText: "",
    },
    totalMarks: {
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
        touched: true,
        helperText: "",
    },

}
const CheckingTest = () => {

    const [formData, setFormData] = useState(checkingForm);

    //Handlers
    const formChangeHandler = (event, identifier) => {
        let tempFormData = _.cloneDeep(formData);
        tempFormData[identifier].value = event.target.value;
        tempFormData[identifier].invalid = false;
        tempFormData[identifier].touched = true;
        tempFormData[identifier].helperText = "";
        setFormData(tempFormData);
    }

    const formBlurHandler = (event, identifier) => {
        let tempFormData = _.cloneDeep(formData);
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


    return (
        <>
            <Grid container >
                <Grid item xs={12}>
                    <Paper
                        elevation={2}
                        id={Styles.paper_edit_test_header}
                    >
                        <h3 className={Styles.edit_test_text}>Test-1 Answer Sheet</h3>
                        <h3 className={Styles.edit_test_text}>Marks: 50</h3>
                    </Paper>
                </Grid>
                <Grid container xs={12}>
                    <div style={{ marginTop: "3%", width: "100%" }}>
                        <Paper elevation={3} id={Styles.paper_edit_test}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <div className={Styles.box}></div>
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container xs={12} direction="column">
                                        <Grid item>
                                            <h3 className={Styles.edit_test_text}>Submitted by: Zotalabs</h3>
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                style={{ margin: 8, width: "90%", borderRadius: "10px" }}
                                                id="outlined-textarea"
                                                label="Test Remarks"
                                                placeholder="Test Remarks"
                                                multiline
                                                size="small"
                                                rows={4}
                                                variant="outlined"
                                                name="testRemark"
                                                onChange={(e) =>
                                                    formChangeHandler(e, "testDescription")
                                                }
                                                onBlur={(e) => formBlurHandler(e, "testDescription")}
                                                value={formData.remarks.value}
                                            // // className={addNewBatchForm.testDescription.invalid ? "border-danger" : ""}
                                            // error={addNewBatchForm.testDescription.invalid}
                                            // helperText={
                                            //     addNewBatchForm.testDescription.helperText
                                            // }
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                style={{ margin: 8, width: "50%", borderRadius: "10px" }}
                                                id="outlined-textarea"
                                                label="Total Marks"
                                                placeholder="Total Marks"
                                                size="small"
                                                variant="outlined"
                                                name="totalMarks"
                                                onChange={(e) =>
                                                    formChangeHandler(e, "totalMarks")
                                                }
                                                onBlur={(e) => formBlurHandler(e, "totalMarks")}
                                                value={formData.totalMarks.value}
                                            // // className={addNewBatchForm.testDescription.invalid ? "border-danger" : ""}
                                            // error={addNewBatchForm.testDescription.invalid}
                                            // helperText={
                                            //     addNewBatchForm.testDescription.helperText
                                            // }
                                            />
                                        </Grid>
                                        <Grid item container direction="row">
                                            <Grid item xs={6}>

                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                </Grid>
            </Grid>
        </>
    );
}

export default CheckingTest;