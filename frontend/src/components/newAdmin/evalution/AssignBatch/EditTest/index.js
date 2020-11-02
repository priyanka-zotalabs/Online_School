import React, { useState, useEffect } from "react";
import styles from "./editTestStyle.module.css";


import { Modal, Button, Row, Col, Form } from "react-bootstrap";

import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import _ from "lodash";
import axios from "axios";
import { urls } from "../../../../../url";
import { appConfig } from "../../../../../constants";
import { toast } from "react-toastify";
import {
  Paper,
  Grid,

  InputLabel,
  FormControl,
  Select,
  TextField,
} from "./../../../../../../node_modules/@material-ui/core";

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


  const saveTestDetails = (e) => {

    let params = {
      testId: testDetail._id,
      testTitle: testDetail.testTitle,
      testDescription: testDetail.testDescription,
      totalTime: testDetail.totalTime
    }
    // console.log("Test Details Changed", params);
    axios
      .put(`${appConfig.host}${urls.updateTestDetails}`, params)
      .then((success) => {
        // console.log("Sucessfully Updated Test Details", success);
        toast.success("Sucessfully Updated Test Details!");
        setTimeout(() => {
          props.history.push({
            pathname: '/teacher/assignTest',
            state: { testId: params.testId }
          });
        }, 5000);
      })
      .catch((error) => {
        console.log("Failed to Update the Test Details", error);
      });
    // props.history.push("/teacher/assignTest");
  };

  const onChangeHadler = (e, fieldName) => {
    let testCopy = _.cloneDeep(testDetail);
    testCopy[fieldName] = e.target.value;
    setTestDetail(testCopy);
  }

  const onCancelHandler = () => {
    props.history.push({
      pathname: '/teacher/assignTest',
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
                      value={testDetail.testTitle}
                      name="testTitle"
                      // fullWidth
                      variant="outlined"
                      onChange={(e) => onChangeHadler(e, "testTitle")}
                    />
                  </Grid>

                  <TextField
                    style={{ margin: 8, width: "98%" }}
                    id="outlined-textarea"
                    label="Test Description"
                    placeholder="Test Description"
                    value={testDetail.testDescription}
                    onChange={(e) => onChangeHadler(e, "testDescription")}
                    multiline
                    // fullWidth
                    size="small"
                    rows={4}
                    // defaultValue="Default Value"
                    variant="outlined"
                  />

                  {/* sample grid items */}

                  <div className={classes.root}>
                    {/* second grid */}
                    <Grid container spacing={3} className={classes.grid}>
                      <Grid item xs={12} md={4}>
                        <TextField
                          className={classes.markSubTime}
                          //   id="outlined-textarea"
                          label="Total Questions"
                          placeholder="Total Questions"
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
                          //   multiline
                          value={testDetail.totalTime}
                          onChange={(e) => onChangeHadler(e, "totalTime")}
                          variant="outlined"
                          size="small"
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

                  {/* Grid for unequal No of options & Marks */}

                  <div className={classes.root}>
                    {/* second grid */}
                    <Grid container spacing={3} className={classes.grid}>
                      <Grid item xs={4} md={4}>
                        <span
                          className={classes.markSubTime}
                          id={styles.edit_test_qspan}
                        >
                          Do you want same number of options for each questions ?
                        </span>

                      </Grid>
                      <Grid item xs={4} md={4}>
                        <div className="mb-3">
                          <Form>
                            <fieldset>
                              <Form.Group>
                                <Form.Check
                                  style={{ fontSize: "14px" }}
                                  inline
                                  aria-label="radio 1"
                                  type="radio"
                                  // id="default-radio"
                                  label="Yes"
                                  checked
                                  disabled
                                  size="lg"
                                  name="formHorizontalRadio1"
                                  id="formHorizontalRadios1"
                                />
                                <Form.Check
                                  style={{
                                    marginLeft: "45px",
                                    fontSize: "14px",
                                  }}
                                  inline
                                  disabled
                                  aria-label="radio 1"
                                  type="radio"
                                  // id="default-radio"
                                  label="No"
                                  size="lg"
                                  name="formHorizontalRadio1"
                                  id="formHorizontalRadios1"
                                />
                              </Form.Group>
                            </fieldset>
                          </Form>
                        </div>


                      </Grid>
                      <Grid item xs={4} md={4}>
                        <span id={styles.edit_test_qspan}>
                          Number of options:
                        </span>
                        <FormControl className={classes.formControlSelect} disabled>
                          <InputLabel
                            htmlFor="name-native-disabled"
                          //    id="demo-simple-select-disabled-label"
                          //   htmlFor="age-native-simple"

                          >
                            select
                          </InputLabel>
                          <Select
                            id="name-native-disabled"
                            //   labelId="demo-simple-select-disabled-label"
                            //    id="demo-simple-select-disabled"

                            native
                          >
                            <option aria-label="None" value="" />
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </div>

                  {/* distributed marks  */}
                  <div className={classes.root}>
                    {/* second grid */}
                    <Grid container spacing={3} className={classes.grid}>
                      <Grid item xs={4} md={4}>
                        <span
                          className={classes.markSubTime}
                          id={styles.edit_test_qspan}
                        >
                          Do you want marks to be distributed equally among all questions ?
                        </span>
                      </Grid>
                      <Grid item xs={4} md={4}>
                        <div className="mb-3">
                          <Form>
                            <fieldset>
                              <Form.Group>
                                <Form.Check
                                  style={{ fontSize: "14px" }}
                                  inline
                                  checked
                                  disabled
                                  aria-label="radio 1"
                                  type="radio"
                                  // id="default-radio"
                                  label="Yes"
                                  size="lg"
                                  name="formHorizontalRadio"
                                  id="formHorizontalRadios2"
                                />
                                <Form.Check
                                  style={{
                                    marginLeft: "45px",
                                    fontSize: "14px",
                                  }}
                                  inline
                                  disabled
                                  aria-label="radio 1"
                                  type="radio"
                                  // id="default-radio"
                                  label="No"
                                  size="lg"
                                  name="formHorizontalRadio"
                                  id="formHorizontalRadios2"
                                />
                              </Form.Group>
                            </fieldset>
                          </Form>
                        </div>

                      </Grid>
                      <Grid item xs={4} md={4}>
                        <TextField
                          className={classes.markSubTime}
                          //   id="outlined-textarea"
                          label="Marks"
                          placeholder="Marks"
                          multiline
                          size="small"
                          variant="outlined"
                          disabled
                          id="filled-disabled"
                        />
                      </Grid>
                    </Grid>
                  </div>

                  {/* <MDBBtn
                style={{ float:"left"}}
                color="orange"
                rounded
                // onClick={swapFormActive(1)(2)}
                size="sm"
              >
                Cancel
              </MDBBtn> */}
                </div>
              </form>
            </Paper>
            {/* <MDBBtn outline style={{ float: "left" }} color="orange">
                    Cancel
                  </MDBBtn>
                  <MDBBtn
                    style={{ float: "right", paddingTop:"8px", paddingBottom:"8px",}}
                    color="orange"
                    onClick={swapFormActive(1)(2)}
                  >
                    Next
                  </MDBBtn> */}
            <Button
              variant="outline-orange"
              id={styles.edit_test_btn}
              size="md"
              onClick={onCancelHandler}
            >
              Cancel
            </Button>{" "}
            <Button
              variant="orange"
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
