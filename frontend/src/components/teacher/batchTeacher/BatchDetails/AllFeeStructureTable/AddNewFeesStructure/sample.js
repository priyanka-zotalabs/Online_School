import React, { useState, useEffect } from "react";
import styles from "./newFeesStructureStyle.module.css";

import { Modal, Button, Row, Col, Form } from "react-bootstrap";

import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";
import moment from "moment";

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
    minWidth: 100,
    marginTop: -20,
    marginLeft: 10,
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
  const classes = useStyles();

  // testing
  //  date dynamic calculations
  // 1) Batch duration calculation

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDate2, setSelectedDate2] = useState(new Date());
  const [batchDuration, setBatchDuration] = useState(0);

  const handleDateChange = (date) => {
    console.log("start date", date);

    setSelectedDate(date);
    // console.log("selected end date ", setSelectedDate(date));

    var startDate = new Date(date);

    console.log(
      "This is start date with the momet format ",
      moment(selectedDate).format("MM-DD-YYYY")
    );
  };

  const handleDateChange2 = (date) => {
    console.log("end date", date);
    setSelectedDate2(date);
    // console.log("selected end date ", setSelectedDate2(date));
  };

  const convert = (str) => {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join(",");
  };

  const convert2 = (str) => {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join(",");
  };

  const months = Math.round(
    moment.duration(moment(selectedDate2).diff(moment(selectedDate))).asMonths()
  );
  console.log("month diference calculation using moment pacakge", months);

  test(new Date(selectedDate), new Date(selectedDate2));

  // useEffect(() => {
  //   monthDiff()

  // },[selectedDate2> selectedDate]);
  // date & time
  //  start date

  function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }

  function test(d1, d2) {
    var diff = monthDiff(d1, d2);
    // setBatchDuration(monthDiff(d1, d2));
    console.log(
      d1.toISOString().substring(0, 10),
      "to",
      d2.toISOString().substring(0, 10),
      ":",
      // batchDuration
      diff
    );
  }

  console.log("batch duration", batchDuration);

  // ending of // 1) Batch duration calculation

  //   const handleAssignTestToBatch = (e) => {
  //     props.history.push("/batch/newFees/structure");
  //   };


//   slider one state
  const [value, setValue] = useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log("value ", value);

//   slider two state
  const [valuetwo, setValuetwo] = useState(0);

  const handleChangetwo = (event, newValue) => {
    setValuetwo(newValue);
  };
  console.log("value  2", valuetwo);
  // to set max value of the second sliders
  const [sliderTwoMax, setSliderTwoMax] = useState(0);
  console.log(" to set max value of the second sliders  2", sliderTwoMax);

  // for field repitation

  const [questionList, setQuestionList] = useState([]);

  const handleInput = (e, fieldName, mi) => {
    console.log("Question Index selected handleInput", mi);

    let tempArray = _.cloneDeep(questionList);
    tempArray[mi][fieldName].value = e.target.value;
    tempArray[mi][fieldName].invalid = false;
    tempArray[mi][fieldName].helperText = "";
    tempArray[mi][fieldName].touched = true;

    setQuestionList((questionList) => tempArray);
  };
  let Schema = {
    date: {
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

    Amount: {
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
  };
  const [futureMonth, setFutureMonth] = useState("");

  console.log("future months  ", futureMonth);
  useEffect(() => {
    RepeateField();
    // setValuetwo(0);
    setSliderTwoMax(Math.trunc(months / value));

    // const DurationBTWNMonths = (months / value);
  }, [value || valuetwo]);
  useEffect(() => {
    RepeateField();
  }, [valuetwo]);
  // useEffect(() => {
  //   RepeateDate();
  // }, [valuetwo]);

  console.log("current value", value);

  const RepeateDate = () => {
    console.log("RepeateDate function with vakue two ", valuetwo);
    console.log("Number of times date repeated", value);
    let tempArray = _.cloneDeep(questionList);
    // if(sliderTwoMax>0){// not needed now
    for (let i = 0; i < value; i++) {
      // var currentDate = moment('2020-08-17');// not need now here
      if (i == 0) {
        var currentDate = moment(selectedDate);
        console.log("first date", currentDate.format("DD-MM-YYYY"));
        setFutureMonth(currentDate);
        Schema.date.value = currentDate.format("DD-MM-YYYY");
        console.log(" i=0=> Schema.date.value= ", Schema.date.value);
        tempArray.push(Schema.date.value);
      } else {
        var currentDate = futureMonth;
        // Schema.date.value=currentDate.format("DD-MM-YYYY");
        // console.log(" i>0 => Schema.date.value= ",Schema.date.value)
        // tempArray.push(Schema.date.value)
      }
      var futureMonth = moment(currentDate).add(valuetwo, "M");
      var futureMonthEnd = moment(futureMonth).endOf("month");

      if (
        currentDate.date() != futureMonth.date() &&
        futureMonth.isSame(futureMonthEnd.format("DD-MM-YYYY"))
      ) {
        futureMonth = futureMonth.add(1, "d");
      }

      console.log("next date", futureMonth.format("DD-MM-YYYY"));
      setFutureMonth(futureMonth.format("DD-MM-YYYY"));
    }
    setQuestionList(tempArray);
    // }
  };

  const RepeateField = () => {
    // let tempArray =[];
    let tempArray = _.cloneDeep(questionList);
    if (value >= 0) {
      // for (let i = 0; i <value; i++) {
      console.log("array length", tempArray.length);
      let i = tempArray.length + 1;

      if (value >= i) {
        for (i; i <= value; i++) {
          if (valuetwo == 0) {
            console.log("is it executing or not");
            console.log("Schema", Schema);

            Schema.date.value = moment(selectedDate).format("DD-MM-YYYY");
            console.log("Schema.date.value", Schema.date.value);
            console.log("tempArray.push(Schema)", tempArray.push(Schema));
          }
          if (valuetwo > 0) {
            console.log(
              "if value of valueTwo is greater than 0 && value of i is ",
              i
            );
            Schema.date.value = moment(selectedDate).format("DD-MM-YYYY");
            // tempArray.push(Schema)
            console.log("Schema.date.value", Schema.date.value);
            console.log("tempArray.push(Schema)", tempArray.push(Schema));
            // if(i==0){
            //   Schema.date.value=moment(selectedDate).format("DD-MM-YYYY");
            //   console.log("Schema.date.value",Schema.date.value);
            //   console.log("tempArray.push(Schema)",tempArray.push(Schema));
            // }
            // else{

            // }
          }
        }
        setQuestionList(tempArray);
      }
      // second else if for testing :
      else if (value == i) {
        for (i; i <= value; i++) {
          if (valuetwo == 0) {
            console.log("is it executing or not");
            console.log("Schema", Schema);

            Schema.date.value = moment(selectedDate).format("DD-MM-YYYY");
            console.log("Schema.date.value", Schema.date.value);
            console.log("tempArray.push(Schema)", tempArray.push(Schema));
          }
          if (valuetwo > 0) {
            console.log(
              "if value of valueTwo is greater than 0 && value of i is ",
              i
            );
            Schema.date.value = moment(selectedDate).format("DD-MM-YYYY");
            // tempArray.push(Schema)
            console.log("Schema.date.value", Schema.date.value);
            console.log("tempArray.push(Schema)", tempArray.push(Schema));
            // if(i==0){
            //   Schema.date.value=moment(selectedDate).format("DD-MM-YYYY");
            //   console.log("Schema.date.value",Schema.date.value);
            //   console.log("tempArray.push(Schema)",tempArray.push(Schema));
            // }
            // else{

            // }
          }
        }
        setQuestionList(tempArray);
      }
      // removing elements from array

      // if (value< i) {
      else {
        for (i; i > value; i--) {
          // let i=i;
          // RepeateDate();

          tempArray.pop(Schema);
        }
        setQuestionList(tempArray);
      }

      // let p=i+1;
      // if((value)<p) {
      //     // tempArray.splice(i,(i-(value-1)));
      //     let newArray=[...tempArray]
      //     newArray.splice(newArray.length , ((newArray.length)+1)-(value))

      //     // for ( p ; p >=value; p--) {
      //     //     tempArray.splice(i,1);
      //     // }
      //     setQuestionList(newArray);
      // }
    }

    // setValue(0);
  };

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
              Batch A - Add New Fee Structure
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

                        //   disabled
                        //   id="filled-disabled"
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <MuiPickersUtilsProvider
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
                          // format="MM/dd/yyyy"
                          // format="yyyy/MM/dd"
                          format="dd-MM-yyyy"
                          value={selectedDate}
                          onChange={handleDateChange}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <MuiPickersUtilsProvider
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
                          onChange={handleDateChange2}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>

                    {/* next row */}
                    <Grid item xs={12} md={3}>
                      <TextField
                        className={classes.markSubTime}
                        disabled
                        //   id="filled-disabled"
                        id="outlined-textarea"
                        label="Amount"
                        placeholder="Amount"
                        //   multiline
                        variant="outlined"
                        size="small"
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
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        className={classes.markSubTime}
                        //   disabled
                        id="outlined-textarea"
                        //   id="filled-disabled"
                        //   id="Total Amount "
                        label="Total Amount"
                        placeholder="Total Amount"
                        //   multiline
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <p>Batch Duration :{months} months</p>
                      {/* <TextField
                        className={classes.markSubTime}
                        disabled
                        id="filled-disabled"
                        id="outlined-textarea"
                        label="Batch Duration"
                        placeholder="Batch Duration"
                        //   multiline
                        variant="outlined"
                        size="small"
                      /> */}
                    </Grid>

                    {/* number of installments */}

                    <Grid item xs={12} md={3}>
                      <p>No. of installments</p>
                    </Grid>
                    <Grid item xs={12} md={7}>
                      {/* slider code  */}

                      <div className={classes.slider}>
                        <Slider
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
                          onChange={handleChange}
                          valueLabelDisplay="auto"
                          // aria-labelledby="discrete-slider"
                          aria-labelledby="non-linear-slider"
                          // aria-labelledby="discrete-slider-small-steps"
                        />
                      </div>

                      {/* <p>slider</p> */}
                    </Grid>
                    <Grid item xs={12} md={2}>
                      {/* <p>number Field</p> */}
                      <Typography id="font">{value}</Typography>
                    </Grid>

                    {/* Duration between installments */}

                    <Grid item xs={12} md={3}>
                      <p>Duration between installments</p>
                    </Grid>
                    <Grid item xs={12} md={7}>
                      {/* <p>slider</p>
                       */}

                      <div className={classes.slider}>
                        <Slider
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
                          valueLabelDisplay="auto"
                          // aria-labelledby="discrete-slider"
                          aria-labelledby="non-linear-slider"
                          // aria-labelledby="discrete-slider-small-steps"
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} md={2}>
                      {/* <p>number Field</p> */}
                      <Typography id="font">{valuetwo}</Typography>
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
                          {/* <TextField
                        className={classes.markSubTime}
                        disabled
                        id="filled-disabled"
                        id="outlined-textarea"
                        label=" Date"
                        placeholder=" Date"
                        //   multiline
                        variant="outlined"
                        size="small"
                        value={questionList[mi]["Amount"].value}
                        onChange={(e) => handleInput(e, "Amount", mi)}
                      /> */}

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
                            id={questionList[mi]["date"].value}
                            // label="Amount"
                            label={questionList[mi]["date"].value}
                            placeholder={questionList[mi]["date"].value}
                            //   multiline
                            variant="outlined"
                            size="small"
                            value={questionList[mi]["date"].value}
                            onChange={(e) => handleInput(e, "date", mi)}
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
      </Grid>
    </div>
  );
};

export default AddNewFeesStructure;
