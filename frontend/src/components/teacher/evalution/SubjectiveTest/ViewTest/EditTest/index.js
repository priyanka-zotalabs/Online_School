import React, { useState, useEffect } from "react";
import styles from "./editTestStyle.module.css";


import { Modal, Button, Row, Col, Form } from "react-bootstrap";

import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import _ from "lodash";
import axios from "axios";
import { urls } from "../../../../../../url";
import { appConfig } from "../../../../../../constants";
import { validate } from "../../../../../../shared/helpers/formValidation";

import { toast } from "react-toastify";
import {
  Paper,
  Grid,

  InputLabel,
  FormControl,
  MenuItem,
  Select,
  TextField,
  IconButton,
  FormHelperText,
  Radio,

  FormLabel,
  RadioGroup,
  FormControlLabel,
} from "./../../../../../../../node_modules/@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  grid: {
    width: "100%",
    margin: "0px",
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
  }
}));


const EditTest = (props) => {
  const classes = useStyles();
  const location = useLocation();

  // console.log("test details", location.state.detail);
  const [testDetail, setTestDetail] = useState(location.state.detail);
  console.log("test details in test edit",testDetail);


  let [loader, setLoader] = useState(false);

  const [formIsValid, setFormIsValid] = useState(false);
  const [error, setError] = useState(null);
//  create form to save first apread fields
let [addNewBatchForm, setAddNewBatchForm] = useState({
testTitle: {
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
testDescription: {
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
    touched: true,
    helperText: "",
  },

})


useEffect(()=>{
  let tempArray = _.cloneDeep(addNewBatchForm);
  if (testDetail !== undefined && testDetail !== null) {
console.log("testDetails in useEffect function",testDetail.testTitle,testDetail.testDescription,)
console.log("temp array",tempArray.testTitle.value);

    let testTitle= testDetail.testTitle;
    let testDescription=testDetail.testDescription;
    let totalTime=testDetail.totalTime;

    tempArray.testTitle.value = testTitle;
    tempArray.testDescription.value = testDescription;
    tempArray.totalTime.value = totalTime;
    
   
  }
  setAddNewBatchForm(tempArray);

},[testDetail])



const isFormValid = (updatedForm) => {
  let tempFormIsValid = true;
  for (const key in updatedForm) {
    tempFormIsValid =
      !updatedForm[key].invalid &&
      updatedForm[key].touched &&
      tempFormIsValid;
  }
  return tempFormIsValid;
};
const showAllInputFieldError = () => {
  const updatedCourseForm = {
    ...addNewBatchForm,
  };
  for (const key in updatedCourseForm) {
    if (!updatedCourseForm[key].touched) {
      let helperText = "";
      for (const validationKey in updatedCourseForm[key].validation) {
        const validationResult = validate(
          validationKey,
          updatedCourseForm[key].validation[validationKey].value,
          updatedCourseForm[key].value
        );
        if (!validationResult) {
          helperText =
            updatedCourseForm[key].validation[validationKey].errMsg;
          break;
        }
      }

      updatedCourseForm[key].invalid = true;
      updatedCourseForm[key].helperText = helperText;
    }
  }
  setAddNewBatchForm({ ...updatedCourseForm });
};
const clearFormData = () => {
  let allFormKeys = Object.keys(addNewBatchForm);
  let formData = { ...addNewBatchForm };
  allFormKeys.forEach((formKey) => {
    formData[formKey].value = "";
    // formData[formKey].invalid = false;
    // formData[formKey].helperText = "";
    // formData[formKey].touched = true;
  });
  setAddNewBatchForm(formData);
};

const inputBlurHandler = (event, inputIdentifier) => {
  const updatedForm = {
    ...addNewBatchForm,

    // Date
    //   ...selectedDate,
  };
  const updatedFormElement = {
    ...updatedForm[inputIdentifier],
  };
  let validationResult = true;
  let helperText;
  updatedFormElement.value = event.target.value;
  for (const key in updatedFormElement.validation) {
    validationResult = validate(
      key,
      updatedFormElement.validation[key].value,
      event.target.value
    );

    if (!validationResult) {
      helperText = updatedFormElement.validation[key].errMsg;
      break;
    }
  }
  updatedFormElement.invalid = !validationResult;
  updatedFormElement.helperText = helperText;
  updatedForm[inputIdentifier] = updatedFormElement;

  // user detaiils code ends here
  let tempFormIsValid = true;
  for (const key in updatedForm) {
    tempFormIsValid =
      !updatedForm[key].invalid &&
      updatedForm[key].touched &&
      tempFormIsValid;
  }
  setFormIsValid(tempFormIsValid);
  setAddNewBatchForm({ ...updatedForm });
};

const inputChangeHandler = (event, inputIdentifier) => {
  const updatedForm = {
    ...addNewBatchForm,
  };
  updatedForm[inputIdentifier].value = event.target.value;
  console.log("onChange", event.target.value);
  updatedForm[inputIdentifier].invalid = false;
  updatedForm[inputIdentifier].helperText = "";
  updatedForm[inputIdentifier].touched = true;
  setAddNewBatchForm({ ...updatedForm });
  // if (inputIdentifier == "teacher") {
  //   console.log("Big Jugad is here");
  //   getTeacherName(addNewBatchForm.teacher.value);
  // }
};




  const saveTestDetails = (e) => {
    if (isFormValid(addNewBatchForm)) {

    let params = {
      testId: testDetail._id,
      // testTitle: testDetail.testTitle,
      // testDescription: testDetail.testDescription,
      // totalTime: testDetail.totalTime
      testTitle: addNewBatchForm.testTitle.value,
      testDescription: addNewBatchForm.testDescription.value ,
      totalTime:addNewBatchForm.totalTime.value

    }
    // console.log("Test Details Changed", params);
    axios
      .put(`${appConfig.host}${urls.updateTestDetails}`, params)
      .then((success) => {
        // console.log("Sucessfully Updated Test Details", success);
        toast.success("Sucessfully Updated Test Details!");
        setTimeout(() => {
          props.history.push({
            pathname: '/teacher/evalution/assignTest',
            state: { testId: params.testId }
          });
        }, 5000);
      })
      .catch((error) => {
        console.log("Failed to Update the Test Details", error);
      });
    // props.history.push("/teacher/assignTest");

    }
    else{
      showAllInputFieldError();

    }
  };

  const onChangeHadler = (e, fieldName) => {
    let testCopy = _.cloneDeep(testDetail);
    testCopy[fieldName] = e.target.value;
    setTestDetail(testCopy);
  }

  const onCancelHandler = () => {
    props.history.push({
      pathname: '/teacher/evalution/assignSubjectiveTest',
      state: { testId: testDetail._id }
    });
  }
  // console.log("Test Details", testDetail);
  return (
    <div>

      <Grid
        container
      // spacing={3}
      >
        {/* Grid item paper for heading of create test  */}
        <Grid item xs={12}>

          <Paper
            elevation={2}
            id={styles.paper_edit_test_header}
          >
            <h3 className={styles.edit_test_text}>Edit Test Details</h3>
          </Paper>
        </Grid>
        {/* *************************************************************************************** */}
        {/* edit test screen paper */}

        <div style={{ marginTop: "3%", width: "100%" }}>
          <Grid item xs={12}>
            <Paper elevation={3} id={styles.paper_edit_test}>
              <form
                // className={classes.root}
                noValidate
                autoComplete="off"
              >
                {/* // <div className="mt-2"> */}
                <div>
                  <Grid item xs={12} md={12} spacing={3}>
                    <TextField
                      style={{ margin: 8, width: "98%" }}
                      id="outlined-textarea"
                      label="Test title"
                      placeholder="Test title"
                      multiline
                      size="small"
                      // fullWidth
                      variant="outlined"

                      // value={testDetail.testTitle}
                      // name="testTitle"
                      
                      // // onChange={(e) => onChangeHadler(e, "testTitle")}
                      name="testTitle"
                        onChange={(e) =>
                          inputChangeHandler(e, "testTitle")
                        }
                        onBlur={(e) => inputBlurHandler(e, "testTitle")}
                        value={addNewBatchForm.testTitle.value}
                        // className={addNewBatchForm.testTitle.invalid ? "border-danger" : ""}
                        error={addNewBatchForm.testTitle.invalid}
                        helperText={
                          addNewBatchForm.testTitle.helperText
                        }
                    />
                  </Grid>

                  <TextField
                    style={{ margin: 8, width: "98%" }}
                    id="outlined-textarea"
                    label="Test Description"
                    placeholder="Test Description"
                    // value={testDetail.testDescription}
                    // onChange={(e) => onChangeHadler(e, "testDescription")}
                    multiline
                    // fullWidth
                    size="small"
                    rows={4}
                    // defaultValue="Default Value"
                    variant="outlined"
                    name="testDescription"
                    onChange={(e) =>
                      inputChangeHandler(e, "testDescription")
                    }
                    onBlur={(e) => inputBlurHandler(e, "testDescription")}
                    value={addNewBatchForm.testDescription.value}
                    // className={addNewBatchForm.testDescription.invalid ? "border-danger" : ""}
                    error={addNewBatchForm.testDescription.invalid}
                    helperText={
                      addNewBatchForm.testDescription.helperText
                    }
                  />

                  {/* sample grid items */}

                  <div className={classes.root}>
                    {/* second grid */}
                    <Grid container spacing={3} className={classes.grid}>
                      <Grid item xs={12} md={4}>
                        <TextField
                          className={classes.markSubTime}
                          //   id="outlined-textarea"
                          label="Total Marks"
                          placeholder="Total Marks"
                          //   multiline
                          variant="outlined"
                          size="small"
                          name="totalQuestions"
                          value={testDetail.totalQuestions}
                          disabled
                          id="filled-disabled"
                        //   label="Disabled"
                        //   defaultValue="Hello World"
                        //   variant="filled"
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          className={classes.markSubTime}
                          id="outlined-textarea"
                          label="Total Time (in Mins)"
                          placeholder="Total Time"
                          // //   multiline
                          // value={testDetail.totalTime}
                          // onChange={(e) => onChangeHadler(e, "totalTime")}
                          variant="outlined"
                          size="small"
                          name="totalTime"
                    onChange={(e) =>
                      inputChangeHandler(e, "totalTime")
                    }
                    onBlur={(e) => inputBlurHandler(e, "totalTime")}
                    value={addNewBatchForm.totalTime.value}
                    // className={addNewBatchForm.totalTime.invalid ? "border-danger" : ""}
                    error={addNewBatchForm.totalTime.invalid}
                    helperText={
                      addNewBatchForm.totalTime.helperText
                    }
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          className={classes.markSubTime}
                          disabled
                          id="filled-disabled"
                          //   id="outlined-textarea"
                          label="Subject"
                          placeholder="Subject"
                          multiline
                          variant="outlined"
                          value={testDetail.subject}
                          size="small"

                        />
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </form>
            </Paper>

            <Button
              id={styles.edit_test_btn1}
              size="md"
              onClick={onCancelHandler}
            >
              Cancel
            </Button>{" "}
            <Button
              style={{backgrounfColor:"#8499ff"}}

              size="md"
              id={styles.edit_test_btn}
              style={{ float: "right" }}
              onClick={saveTestDetails}
            >
              Save
            </Button>{" "}
          </Grid>
        </div>
      </Grid>
    </div>
  );
}

export default EditTest;
