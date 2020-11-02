import React, { useState, useEffect } from "react";
import styles from "./newFeesStructureStyle.module.css";

import enhancer from "./enhancer";

import "./style.css";

import { Modal, Button, Row, Col, Form } from "react-bootstrap";

import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";
import moment from "moment";
import { useLocation } from "react-router-dom";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
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
  Typography,
  Slider,
} from "./../../../../../../../node_modules/@material-ui/core";
// from "./../../../../../../node_modules/@material-ui/core";
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

    minWidth: 120,
    // minWidth: 100,
    // marginTop: -20,
    // marginLeft: 10,
  },
  slider: {
    width: "500px",
    //  top:'2%',
    left: "50%",
    //  right:"1%",
    marginTop: "3%",
    position: "absolute",
    transform: "translate(-50%,-50%)",
  },


}));

const AddNewFeesStructure = (props) => {
  let {
    selectedDate,
    selectedDate2,
    handleTotalAmountChange,
    months,
    handleChange,
    value,
    sliderTwoMax,
    handleChangetwo,
    valuetwo,
    questionList,
    handleInput,

    handleSubmit,
    loader,
    error,
    inputBlurHandler,
    inputChangeHandler,
    formIsValid,
    addNewBatchForm,
    totalAmount,
    batchName,
  } = props;

  const classes = useStyles();
  // batchId =
  // testing
  //  date dynamic calculations
  // 1) Batch duration calculation

  return (
    <div>
      <Grid
        container
      // spacing={3}
      >
        {/* Grid item paper for heading of create test  */}
        <Grid item xs={12}>
          <Paper elevation={2} id={styles.paper_edit_test_header}>
            <h3 className={styles.edit_test_text}>
              {batchName} - Add New Fee Structure
            </h3>
          </Paper>
        </Grid>
        {/* *************************************************************************************** */}
        {/* edit test screen paper */}

        <div style={{ marginTop: "3%", width: "100%" }}>
          <Grid item xs={12}>
            <Paper elevation={3} id={styles.paper_edit_test}>
              <Grid item xs={12} md={12}>
                <span
                  style={{
                    fontSize: "20px",
                    marginTop: "25px",
                    marginLeft: "15px",
                    color:"#175592"
                  }}
                >
                  Fees Details
                </span>
                <hr></hr>
              </Grid>
              <form
                // className={classes.root}
                noValidate
                autoComplete="off"
                style={{ width: "100%" }}
              >
                <div className={classes.root}>
                  {/* second grid */}
                  <Grid container spacing={3} className={classes.grid}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        className={classes.markSubTime}
                        id="outlined-textarea"
                        label="Name of Structure"
                        placeholder="Name of Structure"
                        //   multiline
                        variant="outlined"
                        size="small"
                        name="feesStructureName"
                        onChange={(e) =>
                          inputChangeHandler(e, "feesStructureName")
                        }
                        onBlur={(e) => inputBlurHandler(e, "feesStructureName")}
                        value={addNewBatchForm.feesStructureName.value}
                        // className={addNewBatchForm.course.invalid ? "border-danger" : ""}
                        error={addNewBatchForm.feesStructureName.invalid}
                        helperText={
                          addNewBatchForm.feesStructureName.helperText
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        className={classes.markSubTime}
                        disabled
                        id="filled-disabled"
                        // id="outlined-textarea"
                        // label={selectedDate}
                        label="Batch Start date"

                        // placeholder={selectedDate}
                        value={selectedDate}
                        //   multiline
                        variant="outlined"
                        size="small"
                      />
                      {/* <MuiPickersUtilsProvider
                        utils={DateFnsUtils}
                        //  className={classes.formControlNew}

                        style={{ width: "100%" }}
                      >


                   
                        <KeyboardDatePicker
                          style={{ marginLeft: "5%", width: "91%" }}
                          margin="normal"
                          id="date-picker-dialog1"
                          label="Start Date"
                          minDate={new Date()}
                          // minDate={new Date()}

                          // format="MM/dd/yyyy"
                          // format="yyyy/MM/dd"
                          format="dd-MM-yyyy"
                          value={selectedDate}
                          // value={props.feesStartDate}

                          onChange={handleDateChange}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />
                      </MuiPickersUtilsProvider> */}
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        className={classes.markSubTime}
                        disabled
                        id="filled-disabled"
                        // id="outlined-textarea"
                        label="Batch End date"
                        value={selectedDate2}

                        // label={selectedDate2}
                        // placeholder={selectedDate2}
                        //   multiline
                        variant="outlined"
                        size="small"
                      />
                      {/* <MuiPickersUtilsProvider
                        utils={DateFnsUtils}
                        // className={classes.formControlNew}
                        style={{ width: "100%" }}
                      >
                        <KeyboardDatePicker
                          style={{ marginLeft: "5%", width: "91%" }}
                          margin="normal"
                          id="date-picker-dialog2"
                          label="End Date"
                          minDate={new Date()}
                          format="dd-MM-yyyy"
                          // format="yyyy/MM/dd"
                          value={selectedDate2}
                          // value={props.feesEndDate}

                          onChange={handleDateChange2}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />
                      </MuiPickersUtilsProvider> */}
                    </Grid>

                    {/* next row */}


                        {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
                    {/* Currancy changes */}
                    <Grid item xs={12} md={2}>



                      <Form.Group as={Row}>
              
              <Col sm={12} md={12}>
                <Form.Control
                  as="select"
                  placeholder="currency"
                  label="currency"
                  type="text"
                  variant="outlined"
                  
                  name="currency"
                  onChange={(e) => inputChangeHandler(e, "currency")}
                  onBlur={(e) => inputBlurHandler(e, "currency")}
                  value={addNewBatchForm.currency.value}
                 
                  className={addNewBatchForm.currency.invalid ? "border-danger" : ""}
                >

                 
                   <option >Currency</option>

                   <option value={"INR"}>INR(Rs)</option>
                   <option value={"USD"}>USD($)</option>
                 
                </Form.Control>
              </Col>
              <span className="error-message">
                {addNewBatchForm.currency.invalid
                  ? addNewBatchForm.currency.helperText
                  : ""}
              </span>
            </Form.Group>
                      {/* <div style={{ width: "10px", height: "10px" }}> */}
                        {/* <FormControl variant="outlined" className={classes.formControlSelect} style={{ minHeight: "10px" }}>
                          <InputLabel htmlFor="outlined-age-native-simple" >Currency</InputLabel>
                          <Select
                           
                            native
                            // maxHeight="10px"
                            size="sm"
                            label="currency"
                            inputProps={{
                              name: 'currency',
                              id: 'outlined-age-native-simple',
                              size: 'sm'
                            }}


                            name="currency"
                            onChange={(e) => inputChangeHandler(e, "currency")}
                            onBlur={(e) => inputBlurHandler(e, "currency")}
                            value={addNewBatchForm.currency.value}
                            // value={"USD($)"}
                            error={addNewBatchForm.currency.invalid}
                            helperText={addNewBatchForm.currency.helperText}
                          >
                            <option aria-label="None" value="" />
                           <option value={"INR(Rs)"}>INR(Rs)</option>
                            <option value={"USD($)"}>USD($)</option>

                          </Select>
                        </FormControl> */}
                      {/* </div> */}
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        className={classes.markSubTime}
                        // disabled
                        //   id="filled-disabled"
                        id="outlined-textarea"
                        label="Amount"
                        placeholder="Amount"
                        //   multiline
                        variant="outlined"
                        size="small"
                        name="amount"
                        onChange={(e) => inputChangeHandler(e, "amount")}
                        onBlur={(e) => inputBlurHandler(e, "amount")}
                        value={addNewBatchForm.amount.value}
                        // className={addNewBatchForm.amount.invalid ? "border-danger" : ""}
                        error={addNewBatchForm.amount.invalid}
                        helperText={addNewBatchForm.amount.helperText}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        className={classes.markSubTime}
                        //   disabled
                        //   id="filled-disabled"
                        id="outlined-textarea"
                        label="Tax %"
                        placeholder="Tax %"
                        //   multiline
                        variant="outlined"
                        size="small"
                        name="tax"
                        onChange={(e) => inputChangeHandler(e, "tax")}
                        onBlur={(e) => inputBlurHandler(e, "tax")}
                        value={addNewBatchForm.tax.value}
                        // className={addNewBatchForm.amount.invalid ? "border-danger" : ""}
                        error={addNewBatchForm.tax.invalid}
                        helperText={addNewBatchForm.tax.helperText}
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <TextField
                        className={classes.markSubTime}
                        disabled
                        id="outlined-textarea"
                        //   id="filled-disabled"
                        //   id="Total Amount "
                        label="Total Amount"
                        // placeholder={totalAmount.toString()}
                        value={totalAmount.toString()}
                        //   multiline
                        variant="outlined"
                        // onChange={(e) => handleTotalAmountChange(e)}
                        size="small"
                      />
                    </Grid>


                
                    <Grid item xs={12} md={2}>
                      {/* <p>Batch Duration :{months} months</p> */}
                      <TextField
                        className={classes.markSubTime}
                        disabled
                        id="filled-disabled"
                        // id="outlined-textarea"
                        // label=({ month}).toString()
                        // placeholder={months.toString()}
                        label="Batch Duration"

                        value={months.toString()}
                        //   multiline
                        variant="outlined"
                        size="small"
                      />
                    </Grid>


                    {/* number of installments */}

                    <Grid item xs={12} md={3}>
                      <p>No. of installments</p>
                    </Grid>
                    <Grid item xs={12} md={7}>
                      {/* slider code  */}

                      <div className={classes.slider}>
                        {/* <Slider
                          defaultValue={0}
                          // value={value}
                          min={0}
                          step={1}
                          // max={12}
                          max={months}
                          scale={(x) => x ** 1}
                          // getAriaValueText={valueLabelFormat}
                          // valueLabelFormat={valueLabelFormat}
                          // marks
                          valueLabelDisplay='on'
                          onChange={handleChange}
                          // valueLabelDisplay="auto"
                          // aria-labelledby="discrete-slider"
                          aria-labelledby="non-linear-slider"
                          // aria-labelledby="discrete-slider-small-steps"
                        /> */}

                        <Slider

                          id='slider1'
                          name='slider1'
                          defaultValue={0}
                          // value={Number(value)} 
                          // defaultValue={parseInt(value)}

                          min={0}
                          step={1}

                          max={parseInt(months)}
                          scale={(x) => x ** 1}

                          onChange={handleChange('slider1')}
                          valueLabelDisplay="auto"
                          valueLabelDisplay='on'
                          aria-labelledby="non-linear-slider"
                        // onChangeCommitted={(e)=>handleChangeSlidertwo(e,value)} 
                        />
                      </div>

                      {/* <p>slider</p> */}
                    </Grid>
                    <Grid item xs={12} md={1}>
                      <Typography
                        id="font"
                        style={{
                          backgroundColor: "#DCDCDC",
                          padding: "10px",
                          borderRadius: "5px",
                        }}
                      >
                        <span
                          style={{
                            paddingLeft: "10px",
                            paddingRight: "10px",
                            paddingTop: "5px",
                            paddingLeft: "5px",
                            marginLeft: "5px",
                          }}
                        >
                          {value}
                        </span>
                      </Typography>
                      {/* <Typography id="font">selected:{valuetwo}</Typography> */}
                    </Grid>
                    <Grid item xs={12} md={1}>
                      {/* <p>number Field</p> */}
                    </Grid>

                    {/* Duration between installments */}

                    <Grid item xs={12} md={3}>
                      <p>Duration between installments</p>
                    </Grid>
                    <Grid item xs={12} md={7}>
                      {/* <p>slider</p>
                       */}

                      <div className={classes.slider}>
                        {/* <Slider
                          defaultValue={0}
                          // value={valuetwo}
                          min={0}
                          step={1}
                          // const [sliderTwoMax,setSliderTwoMax]=useState(0);

                          max={sliderTwoMax}
                          scale={(x) => x ** 1}
                          // getAriaValueText={valueLabelFormat}
                          // valueLabelFormat={valueLabelFormat}
                          // marks
                          onChange={handleChangetwo}
                          // valueLabelDisplay="auto"
                          valueLabelDisplay='on'
                          // aria-labelledby="discrete-slider"
                          aria-labelledby="non-linear-slider"
                          // aria-labelledby="discrete-slider-small-steps"
                        /> */}







                        <Slider

                          id='slider2'
                          name='slider2'
                          value={Number(valuetwo)}
                          // defaultValue={parseInt(value)}

                          min={0}
                          step={1}

                          max={parseInt(sliderTwoMax)}
                          scale={(x) => x ** 1}

                          onChange={handleChangetwo('slider2')}
                          valueLabelDisplay="auto"
                          valueLabelDisplay='on'
                          aria-labelledby="non-linear-slider"
                        //  aria-controls="sliderOutput"
                        //  onChangeCommitted={(e)=>handleChangeSlidertwo(e,valuetwo)} 

                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} md={1}>
                      <Typography
                        id="font"
                        style={{
                          backgroundColor: "#DCDCDC",
                          padding: "10px",
                          borderRadius: "5px",
                        }}
                      >
                        <span
                          style={{
                            paddingLeft: "10px",
                            paddingRight: "10px",
                            paddingTop: "5px",
                            paddingLeft: "5px",
                            marginLeft: "5px",
                          }}
                        >
                          {valuetwo}
                        </span>
                      </Typography>
                      {/* <Typography id="font">selected:{valuetwo}</Typography> */}
                    </Grid>
                    <Grid item xs={12} md={1}>
                      <span>Months</span>
                      {/* <Typography id="font" style={{bachgroundColor:"grey"}}>max:{sliderTwoMax}</Typography> */}
                    </Grid>
                  </Grid>
                </div>
              </form>
            </Paper>
          </Grid>
        </div>

        {/* installment calculator started */}
        <div style={{ marginTop: "2%", width: "100%" }}>
          <Grid item xs={12}>
            <Paper elevation={3} id={styles.paper_edit_test}>
              <Grid item xs={12} md={12}>
                <span
                  style={{
                    fontSize: "20px",
                    marginTop: "25px",
                    marginLeft: "15px",
                    color:"#175592",
                  }}
                >
                  Installment Calculator
                </span>
                <hr></hr>
              </Grid>
              {/* Installment Calculator form field */}
              <form
                // className={classes.root}
                noValidate
                autoComplete="off"
                style={{ width: "100%" }}
              >
                {/* Below installment div will repeate as per number of installments */}
                {questionList.map((mx, mi) => {
                  return (
                    <div key={mx.id} className={classes.root}>
                      <Grid container spacing={3} className={classes.grid}>
                        <Grid item xs={1} md={1}>
                          {mi + 1}
                        </Grid>
                        <Grid item xs={5} md={5}>
                          <TextField
                            className={classes.markSubTime}
                            disabled
                            // id="filled-disabled"
                            // id="outlined-textarea"
                            id={questionList[mi]["date"].value}
                            // label="Amount"
                            // label={questionList[mi]["date"].value}
                            placeholder={questionList[mi]["date"].value}
                            //   multiline
                            variant="outlined"
                            size="small"
                            value={questionList[mi]["date"].value}
                            onChange={(e) => handleInput(e, "date", mi)}
                          />

                          {/* <p>Hello : {futureMonth}</p> */}
                          {/* <p>Hello : {questionList[mi]["date"].value}</p> */}
                        </Grid>
                        {/* <Grid item xs={1} md={1}></Grid> */}
                        <Grid item xs={5} md={5}>
                          <TextField
                            className={classes.markSubTime}
                            disabled
                            // id="filled-disabled"
                            // id="outlined-textarea"
                            id={questionList[mi]["Amount"].value.toString()}
                            // label="Amount"
                            // label={(questionList[mi]["Amount"].value).toString()}
                            placeholder={questionList[mi][
                              "Amount"
                            ].value.toString()}
                            //   multiline
                            variant="outlined"
                            size="small"
                            value={questionList[mi]["Amount"].value}
                            onChange={(e) => handleInput(e, "Amount", mi)}
                          />
                        </Grid>
                      </Grid>
                    </div>
                  );
                })}
                {/* Upper installment div will repeate as per number of installments */}
              </form>
            </Paper>
          </Grid>
        </div>
        <Button
          id={styles.create_batch_btn}
          onClick={(e) => {
            handleSubmit();
          }}
        // onClick={props.onHide}
        >
          SAVE
        </Button>
      </Grid>
    </div>
  );
};

export default enhancer(AddNewFeesStructure);

// const RepeateDate = () => {
//   let tempArray = _.cloneDeep(questionList);
//   let p = tempArray.length;
//   console.log("array length", tempArray.length);
//   if (p == 0) {
//     for (let i = 0; i < value; i++) {
//       tempArray.push(Schema);
//       console.log("tempArray.push(Schema) at index", tempArray.length);
//     }
//     setQuestionList(tempArray);
//     console.log("array length after push", tempArray.length);
//   } else {
//     console.log("array lenth is greater than 0 which is =", p);
//     for (p; p > 0; p--) {
//       tempArray.pop(Schema);
//       console.log("tempArray.pop(Schema) at index", tempArray.length);
//     }
//     setQuestionList(tempArray);
//     console.log("array length after pop", tempArray.length, p);

//     if (p == 0) {
//       for (p; p < value; p++) {
//         console.log("hii i am inside RepeateDate function ");
//         if (p == 0) {
//           var currentDate = moment(dateString);
//           console.log(
//             "first date (todays ie slected date) with value of i ",
//             p,
//             currentDate.format("DD-MM-YYYY")
//           );
//           // var currentDate = moment(currentDate).//subtract(1, "M");
//           console.log(
//             "first date (1 month before todays date) with value of i ",
//             p,
//             currentDate.format("DD-MM-YYYY")
//           );

//           setFutureMonth(currentDate);
//         } else {
//           // var currentDate = moment(dateString);

//           var currentDate = futureMonth;
//         }
//         var futureMonth = moment(currentDate).add(valuetwo, "M");
//         var futureMonthEnd = moment(futureMonth).endOf("month");

//         if (
//           currentDate.date() != futureMonth.date() &&
//           futureMonth.isSame(futureMonthEnd.format("YYYY-MM-DD"))
//         ) {
//           futureMonth = futureMonth.add(1, "d");
//         }

//         // console.log(currentDate.format('DD-MM-YYYY'));
//         console.log("value of i is ", p, futureMonth.format("DD-MM-YYYY"));

//         Schema.date.value = moment(futureMonth).format("DD-MM-YYYY");
//         // const [totalAmount,setTotalAmount]= useState(0);
//         let amount = (totalAmount / value).toFixed(2);
//         Schema.Amount.value = amount;
//         console.log("Schema.date.value date pushed", Schema.date.value);
//         console.log("Schema.Amount.value date pushed", Schema.Amount.value);

//         console.log("schema  before pushing date", Schema);

//         tempArray.push(_.cloneDeep(Schema));
//         // tempArray.push( "Schema.date.value","Schema.Amount.value")

//         console.log("schema after pushing date", Schema);

//         console.log("tempArray.push(Schema) at index", tempArray.length);
//       }
//       setQuestionList(tempArray);
//       console.log("All array elements", tempArray);
//       console.log("array length after pop+ push", tempArray.length);
//     }
//   }
// }; // end function
