import React, { useState } from "react";
import "./style.scss";

import AddQuestionModal from "./../AddQuestionModal/index";
import enhancer from "./enhancer";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import {
  Paper,
  Grid,
  // Button ,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  IconButton,
  FormHelperText,

  // FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from "./../../../../../node_modules/@material-ui/core";

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
  },
}));
// const classes = useStyles();

const CreateTest = (props) => {
  // All props call here
  let {
    // handleNext,
    // loader,
    // handleSubmit,
    // inputChangeHandler,

    // createTestForm,
    // inputBlurHandler,
    // formIsValid,
    // error,
    // handleTitleChange,
    // handleEvalutionCards,
    // modalShow,
    // setModalShow,
    // formActivePanel1,
    // swapFormActive

    modalShow,
    setModalShow,
    // handleNext,
    loader,
    // handleSubmit,
    // inputChangeHandler,

    // createTestForm,
    // inputBlurHandler,
    formIsValid,
    error,
    // handleTitleChange,
    handleEvalutionCards,
    formActivePanel1,
    swapFormActive,
    handleInput,

    inputBlurHandlerForQuestions,

    inputFirstPageChangedHandler,
    inputFirstPageBlurHandler,
    firstPageData,

    handleCreateTest,
    inputBlurHandlerForOptions,
    handleOptionInput,
    handleQuestionAddClick,
    questionList,

    togglingNo,
    togglingYes,
    togglingYesDiffmarks,
    togglingNoDiffmarks,
    diffOptions,
    diffMarks,
    correctAnswerAssignUsingRadioButton,

  } = props;

  const classes = useStyles();
  const history = useHistory();
  // console.log("diffMarks",diffMarks);
  // console.log("diffOptions",diffOptions);

  let number = 5;

  let [options, setOptions] = useState([
    {
      text: "1",
      value: "1",
    },
    {
      text: "2",
      value: "2",
    },
    {
      text: "3",
      value: "3",
    },
  ]);



  const color = "#8499ff";
  // console.log("First Page Data", firstPageData);
  return (
    <div>
      {/* <ul>{peopleLis()}</ul> */}

      {/* const [modalShow, setModalShow] = React.useState(false); */}
      <AddQuestionModal show={modalShow} onHide={() => setModalShow(false)} />

      <Grid
        container
      // spacing={3}
      >
        {/* Grid item paper for heading of create test  */}
        <Grid item xs={12}>
          <Paper
            elevation={2}
            id="paper-create-test-header"
          // className={classes.paper}
          >
            <h3 className="create-test-text">Create MCQ Test</h3>
          </Paper>
        </Grid>

        {/* Active panelstatus of details & Questions */}
        <Grid item xs={12}>
          <table id="create-test-table">
            <tr>
              {formActivePanel1 == 1 ? (
                <th
                  id="create-test-heading"
                  onClick={swapFormActive(1)(1)}
                  className="create-test-active-panel"
                >
                  Details
                </th>
              ) : (
                  <th id="create-test-heading" onClick={swapFormActive(1)(1)}>
                    Details
                  </th>
                )}
              {formActivePanel1 == 2 ? (
                <th
                  id="create-test-heading"
                  onClick={swapFormActive(1)(2)}
                  className="create-test-active-panel"
                >
                  Questions
                </th>
              ) : (
                  <th id="create-test-heading" onClick={swapFormActive(1)(2)}>
                    Questions
                  </th>
                )}
            </tr>
          </table>
        </Grid>

        {/* Details section  */}
        {formActivePanel1 == 1 && (
          <form
            // className={classes.root}
            noValidate
            autoComplete="off"
            style={{ width: "100%" }}
          >
            <Grid item xs={12}>
              <Paper elevation={3} id="paper-create-test">
                {/* // <div className="mt-2"> */}
                <div>
                  <Grid item xs={12} md={12}>
                    {/* return div(
                    for (let i=0; i <5; i++) {
                      
               } 
                  ) */}
                    <TextField
                      style={{ margin: 8, width: "98%" }}
                      id="outlined-textarea"
                      label="Test title"
                      placeholder="Test title"
                      multiline
                      size="small"
                      // fullWidth
                      variant="outlined"
                      // variant="filled"
                      // error
                      name="testTitle"
                      value={firstPageData.testTitle.value}
                      onChange={(e) =>
                        inputFirstPageChangedHandler(e, "testTitle")
                      }
                      onBlur={(e) => inputFirstPageBlurHandler(e, "testTitle")}
                      error={firstPageData.testTitle.invalid}
                      helperText={firstPageData.testTitle.helperText}
                    />
                    {/* <span className="error-message">
                {createTestForm.testTitle.invalid
                  ? createTestForm.testTitle.helperText
                  : ""}
              </span> */}
                  </Grid>

                  <TextField
                    style={{ margin: 8, width: "98%" }}
                    id="outlined-textarea"
                    label="Test Description"
                    placeholder="Test Description"
                    multiline
                    // fullWidth
                    size="small"
                    rows={4}
                    // defaultValue="Default Value"
                    variant="outlined"
                    name="testDescription"
                    value={firstPageData.testDescription.value}
                    onChange={(e) =>
                      inputFirstPageChangedHandler(e, "testDescription")
                    }
                    onBlur={(e) =>
                      inputFirstPageBlurHandler(e, "testDescription")
                    }
                    error={firstPageData.testDescription.invalid}
                    helperText={firstPageData.testDescription.helperText}
                  />

                  {/* sample grid items */}

                  {/* Grid for unequal No of options & Marks */}

                  <div className={classes.root}>
                    {/* second grid */}
                    <Grid container spacing={3} className={classes.grid}>
                      <Grid item xs={12} md={4}>
                        <TextField
                          className={classes.markSubTime}
                          id="outlined-textarea"
                          label="Total Questions"
                          placeholder="Total Questions"
                          multiline
                          variant="outlined"
                          size="small"
                          name="totalQuestions"
                          value={firstPageData.totalQuestions.value}
                          onChange={(e) =>
                            inputFirstPageChangedHandler(e, "totalQuestions")
                          }
                          onBlur={(e) =>
                            inputFirstPageBlurHandler(e, "totalQuestions")
                          }
                          error={firstPageData.totalQuestions.invalid}
                          helperText={firstPageData.totalQuestions.helperText}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          className={classes.markSubTime}
                          id="outlined-textarea"
                          label="Total Time (in Mins)"
                          placeholder="Total Time"
                          multiline
                          variant="outlined"
                          size="small"
                          name="totalTime"
                          value={firstPageData.totalTime.value}
                          onChange={(e) =>
                            inputFirstPageChangedHandler(e, "totalTime")
                          }
                          onBlur={(e) =>
                            inputFirstPageBlurHandler(e, "totalTime")
                          }
                          error={firstPageData.totalTime.invalid}
                          helperText={firstPageData.totalTime.helperText}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          className={classes.markSubTime}
                          id="outlined-textarea"
                          label="Subject"
                          placeholder="Subject"
                          multiline
                          variant="outlined"
                          size="small"
                          name="subject"
                          value={firstPageData.subject.value}
                          onChange={(e) =>
                            inputFirstPageChangedHandler(e, "subject")
                          }
                          onBlur={(e) =>
                            inputFirstPageBlurHandler(e, "subject")
                          }
                          error={firstPageData.subject.invalid}
                          helperText={firstPageData.subject.helperText}
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <div className={classes.root}>
                    {/* second grid */}
                    <Grid
                      container
                      xs={12}
                      md={12}
                      spacing={3}
                      className={classes.grid}
                    >
                      <Grid item xs={4} md={4}>
                        <span
                          className={classes.markSubTime}
                          id="create_test_qspan"
                        >
                          Do you want same number of options for each questions
                          ?
                        </span>
                        {/* <p>Do you want different marks to be distributed equally among all questions ?</p> */}
                      </Grid>
                      <Grid item xs={4} md={4}>
                        <div className="mb-3">
                          <Form>
                            <fieldset>
                              <Form.Group>
                                <Form.Check
                                  onClick={togglingYes}
                                  style={{ fontSize: "14px" }}
                                  inline
                                  aria-label="radio 1"
                                  type="radio"
                                  // id="default-radio"
                                  label="Yes"
                                  size="lg"
                                  value="Yes"
                                  checked={diffOptions}
                                  name="formHorizontalRadio1"
                                  id="formHorizontalRadios1"
                                />
                                <Form.Check
                                  onClick={togglingNo}
                                  style={{
                                    marginLeft: "45px",
                                    fontSize: "14px",
                                  }}
                                  inline
                                  aria-label="radio 1"
                                  type="radio"
                                  // id="default-radio"
                                  label="No"
                                  size="lg"
                                  checked={!diffOptions}
                                  value="No"
                                  name="formHorizontalRadio1"
                                  id="formHorizontalRadios1"
                                />
                              </Form.Group>
                            </fieldset>
                          </Form>
                        </div>
                      </Grid>

                      <Grid item xs={4} md={4}>
                        {diffOptions ? (
                          <div>
                            <span id="create_test_qspan">
                              Number of options:
                            </span>
                            <FormControl
                              className={classes.formControlSelect}
                            // error={questionList[mi]["numberOfOptions"].invalid}
                            >
                              <InputLabel htmlFor="age-native-simple">
                                Select
                              </InputLabel>
                              <Select
                                native
                                name="numberOfOptions"
                                // value={
                                //   questionList[mi]["numberOfOptions"].value
                                // }
                                // onChange={(e) =>
                                //   handleInput(e, "numberOfOptions", mi)
                                // }
                                // onBlur={(e) =>
                                //   inputBlurHandlerForQuestions(
                                //     e,
                                //     "numberOfOptions",
                                //     mi
                                //   )
                                // }
                                // error={questionList[mi]["numberOfOptions"].invalid}
                                // helperText={
                                //   questionList[mi]["numberOfOptions"]
                                //     .helperText
                                // }
                                onChange={(e) =>
                                  inputFirstPageChangedHandler(e, "options")
                                }
                                onBlur={(e) =>
                                  inputFirstPageBlurHandler(e, "options")
                                }
                                error={firstPageData.options.invalid}
                                helperText={firstPageData.options.helperText}
                                value={parseInt(firstPageData.options.value)}
                              >
                                <option aria-label="None" value="" />
                                <option value={1}> 1</option>
                                <option value={2}> 2</option>
                                <option value={3}> 3</option>
                                <option value={4}> 4</option>
                                {/* <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                                <option value={10}>10</option> */}
                              </Select>
                            </FormControl>
                          </div>
                        ) : null}
                      </Grid>
                    </Grid>
                  </div>

                  {/* distributed marks  */}
                  <div className={classes.root}>
                    {/* second grid */}
                    <Grid
                      container
                      xs={12}
                      md={12}
                      spacing={3}
                      className={classes.grid}
                    >
                      <Grid item xs={4} md={4}>
                        {/* <p>Do you want different number of options for each questions ?</p> */}
                        <span
                          className={classes.markSubTime}
                          id="create_test_qspan"
                        >
                          Do you want marks to be distributed equally among all
                          questions ?
                        </span>
                      </Grid>
                      <Grid item xs={4} md={4}>
                        <div className="mb-3">
                          <Form>
                            <fieldset>
                              <Form.Group>
                                <Form.Check
                                  onClick={togglingYesDiffmarks}
                                  style={{ fontSize: "14px" }}
                                  inline
                                  aria-label="radio 1"
                                  type="radio"
                                  // id="default-radio"
                                  label="Yes"
                                  checked={diffMarks}
                                  size="lg"
                                  value="Yes"
                                  name="formHorizontalRadio"
                                  id="formHorizontalRadios2"
                                />
                                <Form.Check
                                  onClick={togglingNoDiffmarks}
                                  style={{
                                    marginLeft: "45px",
                                    fontSize: "14px",
                                  }}
                                  inline
                                  aria-label="radio 1"
                                  type="radio"
                                  // id="default-radio"
                                  label="No"
                                  // defaultChecked
                                  checked={!diffMarks}
                                  size="lg"
                                  value="No"
                                  name="formHorizontalRadio"
                                  id="formHorizontalRadios2"
                                />
                              </Form.Group>
                            </fieldset>
                          </Form>
                        </div>
                      </Grid>

                      <Grid item xs={4} md={4}>
                        {diffMarks ? (
                          <TextField
                            className={classes.markSubTime}
                            id="outlined-textarea"
                            label="Marks"
                            placeholder="Marks"
                            multiline
                            size="small"
                            variant="outlined"
                            name="marks"
                            value={firstPageData.marks.value}
                            onChange={(e) =>
                              inputFirstPageChangedHandler(e, "marks")
                            }
                            onBlur={(e) =>
                              inputFirstPageBlurHandler(e, "marks")
                            }
                            error={firstPageData.marks.invalid}
                            helperText={firstPageData.marks.helperText}
                          />
                        ) : null}
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
                cancel
              </MDBBtn> */}
                </div>
                {/* </form> */}
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
                // variant="outline-cornflowerblue"
                // style={{borderColor:"#8499ff"}}
                id="create-test-details-btn1"
                size="md"
                onClick={() => history.push("/teacher/evalution")}
              >
                {" "}
                Cancel
              </Button>{" "}
              <Button
                // variant="#8499ff"
                style={{ backgrounfColor: "#8499ff" }}
                size="md"
                id="create-test-details-btn"
                onClick={swapFormActive(1)(2)}

                style={{ float: "right" }}
              // onClick={handleNext}
              >
                Next
              </Button>{" "}
            </Grid>
          </form>
        )}
      </Grid>

      {/* Create test Question section */}
      <div>
        {/* *************************************************************************************************** */}
        {formActivePanel1 == 2 && (
          <React.Fragment>
            <Paper elevation={3} id="paper-create-test">
              <Grid item xs={12} md={12}>
                <span
                  style={{
                    fontSize: "20px",
                    marginTop: "25px",
                    marginLeft: "15px",
                  }}
                >
                  {firstPageData.testTitle.value}
                </span>
                <hr></hr>
              </Grid>
              {console.log("Question List", questionList, typeof questionList, questionList instanceof Array)}
              {/* {questionList && Array.isArray(questionList) && */}

              {questionList &&

                questionList.map((mx, mi) => {
                  return (
                    <div key={mx.id}>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Grid item xs={12} md={12}>
                            <Grid container item xs={12} md={12} spacing={3}>
                              <Grid item style={{ marginTop: "1.5%" }}>
                                <span
                                  style={{
                                    marginLeft: "15px",
                                    paddingTop: "20px",
                                  }}
                                >
                                  {mi + 1}
                                </span>
                              </Grid>

                              <Grid item xs={11} md={11}>
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
                                  name="question"
                                  value={questionList[mi]["question"].value}
                                  onChange={(e) => handleInput(e, "question", mi)}
                                  onBlur={(e) =>
                                    inputBlurHandlerForQuestions(
                                      e,
                                      "question",
                                      mi
                                    )
                                  }
                                  error={questionList[mi]["question"].invalid}
                                  helperText={
                                    questionList[mi]["question"].helperText
                                  }

                                // onChange={(e) => inputChangeHandler(e, "question")}
                                // onBlur={(e) => inputBlurHandler(e, "question")}
                                // value={createTestForm.question.value}
                                // // className={createTestForm.testTitle.invalid ? "filled-error" : "outlined-textarea"}
                                // error={createTestForm.question.invalid}
                                // helperText={createTestForm.question.helperText}
                                />
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid container item xs={12} spacing={3}>
                            <Grid item xs={3} md={3}>
                              <span
                                style={{ marginLeft: "53px", fontSize: "14px" }}
                              >
                                Number of options:
                            </span>
                            </Grid>
                            <Grid item xs={2} md={2}>
                              <div>
                                <FormControl
                                  className={classes.formControlSelect}
                                  disabled={diffOptions}
                                  error={
                                    questionList[mi]["numberOfOptions"].invalid
                                  }
                                >
                                  <InputLabel htmlFor="age-native-simple">
                                    select
                                </InputLabel>
                                  <Select
                                    native
                                    name="numberOfOptions"
                                    value={
                                      parseInt(firstPageData.options.value)
                                        ? parseInt(firstPageData.options.value)
                                        : questionList[mi]["numberOfOptions"]
                                          .value
                                    }
                                    onChange={(e) =>
                                      handleInput(e, "numberOfOptions", mi)
                                    }
                                    onBlur={(e) =>
                                      inputBlurHandlerForQuestions(
                                        e,
                                        "numberOfOptions",
                                        mi
                                      )
                                    }
                                    // error={questionList[mi]["numberOfOptions"].invalid}
                                    helperText={
                                      questionList[mi]["numberOfOptions"]
                                        .helperText
                                    }
                                  >
                                    <option aria-label="None" value="" />
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                  </Select>
                                </FormControl>
                              </div>
                            </Grid>

                            <Grid item xs={4} md={4}>
                              <TextField
                                disabled={diffMarks}
                                id="outlined-textarea"
                                // label="Marks"
                                placeholder="Marks"
                                multiline
                                size="small"
                                variant="outlined"
                                name="marks"
                                value={
                                  parseInt(firstPageData.marks.value)
                                    ? parseInt(firstPageData.marks.value)
                                    : questionList[mi]["marks"].value
                                }
                                onChange={(e) => handleInput(e, "marks", mi)}
                                onBlur={(e) =>
                                  inputBlurHandlerForQuestions(e, "marks", mi)
                                }
                                error={questionList[mi]["marks"].invalid}
                                helperText={questionList[mi]["marks"].helperText}

                              // onChange={(e) => inputChangeHandler(e, "marks")}
                              // onBlur={(e) => inputBlurHandler(e, "marks")}
                              // value={createTestForm.marks.value}
                              // // className={createTestForm.testTitle.invalid ? "filled-error" : "outlined-textarea"}
                              // error={createTestForm.marks.invalid}
                              // helperText={createTestForm.marks.helperText}
                              />
                            </Grid>
                          </Grid>

                          {/* Options are here */}
                          <Grid item xs={12} md={12} spacing={3}>
                            <FormControl
                              component="fieldset"
                              className={classes.markSubTime}
                            >
                              <RadioGroup
                                aria-label="option"
                                name="option"
                                value={mx.correctAnswer.value}
                              // value={
                              //   questionList[mi]["options"][i]["option"]
                              //     .value
                              // }
                              // onChange={(e) =>
                              //   handleOptionInput(e, "option", mi, i)
                              // }
                              // onBlur={(e) =>
                              //   inputBlurHandlerForOptions(
                              //     e,
                              //     "option",
                              //     mi,
                              //     i
                              //   )
                              // }
                              // error={
                              //   questionList[mi]["options"][i]["option"]
                              //     .invalid
                              // }
                              // helperText={
                              //   questionList[mi]["options"][i]["option"]
                              //     .helperText
                              // }
                              >
                                {/* first option */}
                                {questionList[mi]["options"].map(
                                  (data, index) => {
                                    return (
                                      <Grid
                                        item
                                        container
                                        xs={12}
                                        // spacing={3}
                                        style={{ margin: 4 }}
                                      >
                                        <Grid
                                          item
                                          xs={1}
                                          style={{ marginRight: "1.5em" }}
                                        >
                                          <FormControlLabel
                                            style={{
                                              marginLeft: "20px",
                                              flexBasis: " 4.333333%",
                                            }}
                                            value={index + 1}
                                            name={"Radio" + index}
                                            size="sm"
                                            // size="small"
                                            control={<Radio />}
                                            onClick={(e) =>
                                              correctAnswerAssignUsingRadioButton(
                                                e,
                                                mi,
                                                index
                                              )
                                            }
                                          />
                                        </Grid>
                                        <Grid
                                          item
                                          xs={4}
                                          style={{ marginTop: "1.5em" }}
                                        >
                                          <TextField
                                            className={classes.markSubTime}
                                            id="outlined-textarea"
                                            // label="option"
                                            placeholder={"Option " + (index + 1)}
                                            multiline
                                            fullWidth
                                            // size="sm"
                                            size="small"
                                            variant="outlined"
                                            name="value"
                                            value={data.value.value}
                                            onChange={(e) =>
                                              handleOptionInput(
                                                e,
                                                "value",
                                                mi,
                                                index
                                              )
                                            }
                                            onBlur={(e) =>
                                              inputBlurHandlerForOptions(
                                                e,
                                                "value",
                                                mi,
                                                index
                                              )
                                            }
                                            error={
                                              questionList[mi]["options"][index][
                                                "value"
                                              ].invalid
                                            }
                                            helperText={
                                              questionList[mi]["options"][index][
                                                "value"
                                              ].helperText
                                            }
                                          />
                                        </Grid>
                                      </Grid>
                                    );
                                  }
                                )}
                              </RadioGroup>
                            </FormControl>
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
                              name="explanation"
                              value={questionList[mi]["explanation"].value}
                              onChange={(e) => handleInput(e, "explanation", mi)}
                              onBlur={(e) =>
                                inputBlurHandlerForQuestions(e, "explanation", mi)
                              }
                              error={questionList[mi]["explanation"].invalid}
                              helperText={
                                questionList[mi]["explanation"].helperText
                              }

                            // onChange={(e) => inputChangeHandler(e, "explanation")}
                            // onBlur={(e) => inputBlurHandler(e, "explanation")}
                            // value={createTestForm.explanation.value}
                            // // className={createTestForm.testTitle.invalid ? "filled-error" : "outlined-textarea"}
                            // error={createTestForm.explanation.invalid}
                            // helperText={createTestForm.explanation.helperText}
                            />
                            {/* <button>hiii</button> */}
                            <hr></hr>
                          </Grid>
                        </Grid>

                        {/* <p style={{color:"white"}}>here is text which is invisible now</p> */}
                        {/* <button  id="test-add-question-btn"
                    style={{ float: "right" }}
                    onClick={() => setModalShow(true)}>  ADD QUESTION</button> */}
                        {/* </div> */}
                      </Grid>
                    </div>
                  );
                })}
              <div
                style={{
                  float: "right",
                  marginLeft: "83%",
                  marginBottom: "2%",
                  marginTop: "2%",
                }}
              >
                <Button
                  id="test-add-questionbtn"
                  style={{
                    float: "right",
                    marginBottom: "2%",
                    marginTop: "2%",
                    width: "175px",
                  }}
                  onClick={() => handleQuestionAddClick()}
                //  variant="primary"
                // onClick={handleCreateTest}
                >
                  ADD QUESTION
                </Button>
              </div>
            </Paper>
            <Button
              // variant="outline-#8499ff"
              id="create-test-details-btn1"
              onClick={swapFormActive(1)(1)}
              size="md"
            >
              {" "}
              Back
            </Button>{" "}
            <Button
              // variant="#8499ff"

              size="md"
              id="create-test-details-btn"
              //  onClick={swapFormActive(1)(2)}
              onClick={handleCreateTest}
              style={{ float: "right", backgrounfColor: "#8499ff" }}
            >
              Create Test
            </Button>{" "}
          </React.Fragment>
        )}

        {/* </Paper> */}
      </div>
    </div>
  );
};

export default enhancer(CreateTest);
