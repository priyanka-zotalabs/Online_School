import React, { useState, useEffect } from "react";
// import styles from "./newFeesStructureStyle.module.css";
import styles from "./editFeesStructureStyle.module.css";

import enhancer from "./enhancer";

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

const EditNewFeesStructure = (props) => {
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
    slider1,
    slider2,
    handleChangeSlidertwo

  } = props;

  const classes = useStyles();
  // batchId =
  // testing
  //  date dynamic calculations
  // 1) Batch duration calculation
  // let stest=0;
  //   let sliderValue=Number(value);
  //   console.log("Slider va;ue for testing",sliderValue,typeof sliderValue)
  //   if(sliderValue !== NaN){
  //     stest=sliderValue;
  //   }
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
              {batchName}- Edit Fees Structure
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
                    color:"#175592",
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
                      {console.log(
                        "initial name",
                        addNewBatchForm.feesStructureName.value
                      )}
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
                        label="Batch Start date"
                        id="filled-disabled"
                        // id="outlined-textarea"

                        // label={selectedDate}
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
                        label="Batch End date"
                        id="filled-disabled"
                        // id="outlined-textarea"
                        // label={selectedDate2}
                        // placeholder={selectedDate2}
                        value={selectedDate2}
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


                    {/* <Grid item xs={12} md={2}>                   
            
            {/* <FormControl variant="outlined" className={classes.formControlSelect} size="sm">
              <InputLabel id="demo-simple-select-outlined-label" size="sm">Currancy</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                // value={age}
                // onChange={handleChange}
                label="Age"
                size="sm"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>   //
      
      
            <FormControl variant="outlined" className={classes.formControlSelect} style={{marginTop:"-10px"}}>
              <InputLabel htmlFor="outlined-age-native-simple" style={{padding:"2px"}}>Currency</InputLabel>
              <Select
              style={{padding:"0px"}}
                native
                // value={state.age}
                // onChange={handleChange}
                size="small"
                label="Age"
                inputProps={{
                  name: 'age',
                  id: 'outlined-age-native-simple',
                  size:'sm'
                }}
                 
      
                name="currency"
                onChange={(e) => inputChangeHandler(e, "currency")}
                onBlur={(e) => inputBlurHandler(e, "currency")}
                value={addNewBatchForm.currency.value}
                // className={addNewBatchForm.amount.invalid ? "border-danger" : ""}
                error={addNewBatchForm.currency.invalid}
                helperText={addNewBatchForm.currency.helperText}
              >
                <option aria-label="None" value="" />
      
               
                {/* <option value={"Rupees(Rs.)"}>Rupees(Rs.)</option>
                <option value={"Dollar($)"}>Dollar($)</option> //
                <option value={"INR(Rs)"}>INR(Rs)</option>
                <option value={"USD($)"}>USD($)</option>
               
              </Select>
            </FormControl>
                          </Grid> */}
                    <Grid item xs={12} md={2}>
                      {/* <p>Batch Duration :{months} months</p> */}
                      <TextField
                        className={classes.markSubTime}
                        disabled
                        label="Batch Duration"
                        id="filled-disabled"
                        // id="outlined-textarea"
                        // label=({ month}).toString()
                        // placeholder={months.toString()}
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
                        {console.log("slider 1 value in edit fees ", typeof value, value)}



                        <Slider

                          id='slider1'
                          name='slider1'
                          value={Number(value)}
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
                        {/* <Slider
                          defaultValue={parseInt(value)}
                          // marks
                          // value={value}
                          min={0}
                          step={1}
                          // max={12}
                          max={parseInt(months)}
                          scale={(x) => x ** 1}
                          // getAriaValueText={valueLabelFormat}
                          // valueLabelFormat={valueLabelFormat}
                          // marks
                          onChange={handleChange}
                          valueLabelDisplay="auto"
                          // aria-labelledby="discrete-slider"
                          aria-labelledby="non-linear-slider"
                          // aria-labelledby="discrete-slider-small-steps"
                        /> */}
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
                      {/* <Typography id="font">{value}</Typography> */}
                    </Grid>
                    <Grid item xs={12} md={1}>
                      {/* <Typography id="font">max:{sliderTwoMax}</Typography> */}
                    </Grid>
                    {/* Duration between installments */}

                    <Grid item xs={12} md={3}>
                      <p>Duration between installments</p>
                    </Grid>
                    <Grid item xs={12} md={7}>
                      {/* <p>slider</p>
                       */}

                      <div className={classes.slider}>
                        {console.log("slider 2 value in edit fees ", typeof valuetwo, valuetwo)}


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
                        {/* <Slider
                          defaultValue={parseInt(valuetwo)}
                          // value={valuetwo}
                          // marks
                          min={0}
                          step={1}
                          max={parseInt(sliderTwoMax)}
                          scale={(x) => x ** 1}
                          onChange={handleChangetwo}
                          valueLabelDisplay="auto"
                          // aria-labelledby="discrete-slider"
                          aria-labelledby="non-linear-slider"
                          // aria-labelledby="discrete-slider-small-steps"
                          // getAriaValueText={valueLabelFormat}
                          // valueLabelFormat={valueLabelFormat}
                          // marks
                        /> */}
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
                          {/* <input type="Number" id="sliderOutput"></input> */}
                          {/* {Number(slider2)} */}
                          {/* {slider2} */}
                          {Number(valuetwo)}
                        </span>
                      </Typography>
                      {/* <Typography id="font">selected:{valuetwo}</Typography> */}
                    </Grid>
                    <Grid item xs={12} md={1}>
                      <span>Months</span>
                      {/* <Typography id="font">max:{sliderTwoMax}</Typography> */}
                    </Grid>
                    {/* <Grid item xs={12} md={12}>
                    <div className={classes.slider}>
                    <Slider
                          defaultValue={ stest }
                          // marks
                          // value={value}
                          min={0}
                          step={1}
                          // max={12}
                          max={10}
                          scale={(x) => x ** 1}
                         
                          // onChange={handleChange}
                          // valueLabelDisplay="auto"
                        
                          // aria-labelledby="non-linear-slider"
                          
                        />
                        </div>
                    </Grid> */}
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

export default enhancer(EditNewFeesStructure);

// import React, { useState, useEffect } from "react";
// import styles from "./editFeesStructureStyle.module.css";

// import { Modal, Button, Row, Col, Form } from "react-bootstrap";

// import { makeStyles } from "@material-ui/core/styles";
// import _ from "lodash";
// import moment from "moment";
// // import { useLocation } from "react-router-dom";
// import { useHistory } from "react-router-dom";

// import { useLocation } from "react-router-dom";

// import DateFnsUtils from "@date-io/date-fns";
// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker,
// } from "@material-ui/pickers";
// import {
//   Paper,
//   Grid,
//   InputLabel,
//   FormControl,
//   MenuItem,
//   Select,
//   TextField,
//   IconButton,
//   FormHelperText,
//   Radio,
//   FormLabel,
//   RadioGroup,
//   FormControlLabel,
//   Typography,
//   Slider,
// } from "./../../../../../../../node_modules/@material-ui/core";
// // from "./../../../../../../node_modules/@material-ui/core";
// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     padding: theme.spacing(2),
//     textAlign: "center",
//     color: theme.palette.text.secondary,
//   },
//   grid: {
//     width: "100%",
//     margin: "0px",
//   },
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 50,
//   },
//   radioInput: {
//     minWidth: "100%",
//   },
//   markSubTime: {
//     width: "100%",
//   },
//   formControlSelect: {
//     margin: theme.spacing(1),
//     minWidth: 100,
//     marginTop: -20,
//     marginLeft: 10,
//   },
//   slider: {
//     width: "500px",
//     //  top:'2%',
//     left: "50%",
//     //  right:"1%",
//     marginTop: "3%",
//     position: "absolute",
//     transform: "translate(-50%,-50%)",
//   },
// }));

// const AddNewFeesStructure = (props) => {
//   const classes = useStyles();

//   const location = useLocation();
//   let history = useHistory();
//   let batchId = location.state.batchId;
//   let feesStartDate = location.state.feesStartDate;
//   let feesEndDate = location.state.feesEndDate;

//   let particularFees = location.state.particularFees;
//   console.log(
//     "particularFees & batch Id",
//     batchId,
//     particularFees,
//     feesStartDate,
//     feesEndDate
//   );

//   // batchId =
//   // testing
//   //  date dynamic calculations
//   // 1) Batch duration calculation

//   // useEffect(() => {
//   //   setSelectedDate(props.feesStartDate);
//   //   setSelectedDate2(props.feesEndDate);
//   // }, []);
//   // console.log("start date in fees passed from parent", props.feesStartDate);
//   // console.log("end date in fees passed from parent", props.feesEndDate);
//   // console.log("batch id in addnew fees structure", props.batchId);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [selectedDate2, setSelectedDate2] = useState(new Date());
//   const [batchDuration, setBatchDuration] = useState(0);
//   const [totalAmount, setTotalAmount] = useState(0);

//   const [parentData, setparentData] = useState();

//   //   const location = useLocation();

//   //   let startFeesDates = location.state.feesStartDate;
//   //   let endFeesDates = location.state.feesEndDate;
//   //   let batchIds = location.state.batchId;

//   //   console.log("startFeesDate add new fees", startFeesDates);
//   //   console.log("endFeesDatet add new fees", endFeesDates);
//   //   console.log("batchIds in add new fees", batchIds);

//   // useEffect(() => {
//   //   if (props.history.location.state) {
//   //     let params = props.history.location.state;
//   //     setparentData({ params });
//   //   }
//   // }, []);
//   console.log(" parentData from param", parentData);

//   const handleTotalAmountChange = (e) => {
//     setTotalAmount(e.target.value);
//   };
//   console.log("total amount", totalAmount);
//   const handleDateChange = (date) => {
//     console.log("start date", date);

//     setSelectedDate(date);
//     // console.log("selected end date ", setSelectedDate(date));

//     var startDate = new Date(date);

//     console.log(
//       "This is start date with the momet format ",
//       moment(selectedDate).format("MM-DD-YYYY")
//     );
//   };

//   const handleDateChange2 = (date) => {
//     console.log("end date", date);
//     setSelectedDate2(date);
//     // console.log("selected end date ", setSelectedDate2(date));
//   };

//   const convert = (str) => {
//     var date = new Date(str),
//       mnth = ("0" + (date.getMonth() + 1)).slice(-2),
//       day = ("0" + date.getDate()).slice(-2);
//     return [date.getFullYear(), mnth, day].join(",");
//   };

//   const convert2 = (str) => {
//     var date = new Date(str),
//       mnth = ("0" + (date.getMonth() + 1)).slice(-2),
//       day = ("0" + date.getDate()).slice(-2);
//     return [date.getFullYear(), mnth, day].join(",");
//   };

//   const months = Math.round(
//     moment.duration(moment(selectedDate2).diff(moment(selectedDate))).asMonths()
//   );
//   console.log("month diference calculation using moment pacakge", months);

//   // //test(new Date(selectedDate), new Date(selectedDate2));

//   // useEffect(() => {
//   //   monthDiff()

//   // },[selectedDate2> selectedDate]);
//   // date & time
//   //  start date

//   // // function monthDiff(d1, d2) {
//   // //   var months;
//   // //   months = (d2.getFullYear() - d1.getFullYear()) * 12;
//   // //   months -= d1.getMonth();
//   //  //   months += d2.getMonth();
//   // //   return months <= 0 ? 0 : months;
//   // // }

//   // // function test(d1, d2) {
//   //  //   var diff = monthDiff(d1, d2);
//   // //   // setBatchDuration(monthDiff(d1, d2));
//   // //   console.log(
//   // //     d1.toISOString().substring(0, 10),
//   // //     "to",
//   // //     d2.toISOString().substring(0, 10),
//   // //     ":",
//   // //     // batchDuration
//   // //     diff
//   // //   );
//   // // }

//   // console.log("batch duration", batchDuration);

//   // ending of // 1) Batch duration calculation

//   //   const handleAssignTestToBatch = (e) => {
//   //     props.history.push("/batch/newFees/structure");
//   //   };

//   const [value, setValue] = useState();

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };
//   console.log("value ", value);

//   const [valuetwo, setValuetwo] = useState(0);

//   const handleChangetwo = (event, newValue) => {
//     setValuetwo(newValue);
//   };
//   console.log("value  2", valuetwo);

//   const [sliderTwoMax, setSliderTwoMax] = useState(0);
//   console.log(" to set max value of the second sliders  2", sliderTwoMax);

//   // useful to calculate future month;
//   const [futureMonth, setFutureMonth] = useState("");

//   // for field repitation

//   const [questionList, setQuestionList] = useState([]);

//   const handleInput = (e, fieldName, mi) => {
//     console.log("Question Index selected handleInput", mi);

//     let tempArray = _.cloneDeep(questionList);
//     tempArray[mi][fieldName].value = e.target.value;
//     tempArray[mi][fieldName].invalid = false;
//     tempArray[mi][fieldName].helperText = "";
//     tempArray[mi][fieldName].touched = true;

//     setQuestionList((questionList) => tempArray);
//   };
//   let Schema = {
//     date: {
//       value: "",
//       validation: {
//         required: {
//           value: true,
//           errMsg: "This field is required",
//         },
//       },
//       invalid: false,
//       touched: false,
//       helperText: "",
//     },

//     Amount: {
//       value: "",
//       validation: {
//         required: {
//           value: true,
//           errMsg: "This field is required",
//         },
//       },
//       invalid: false,
//       touched: false,
//       helperText: "",
//     },
//   };

//   // selectedDate

//   // const [totalAmount,setTotalAmount]= useState(0);
//   useEffect(() => {
//     // RepeateField();
//     // let amount=(totalAmount/value)
//     RepeateDate();
//     // console.log("",valuetwo);
//   }, [totalAmount]);

//   useEffect(() => {
//     let Duration = Math.trunc(months / value);
//     setSliderTwoMax(Duration);
//     //  let resetSecondSlider=Math.trunc((months /2));

//     // if(value>(resetSecondSlider)){
//     //     setValuetwo(1);
//     //   }

//     console.log("first slider value change in useeffect", value);
//     // RepeateField();
//     RepeateDate();
//   }, [value]);

//   useEffect(() => {
//     // RepeateField();
//     RepeateDate();
//     console.log("second slider value change in useeffect", valuetwo);
//   }, [valuetwo]);
//   // to set max value of the second sliders

//   const RepeateDate = () => {
//     let tempArray = _.cloneDeep(questionList);
//     let p = tempArray.length;
//     console.log("array length", tempArray.length);
//     if (p == 0) {
//       for (let i = 0; i < value; i++) {
//         tempArray.push(Schema);
//         console.log("tempArray.push(Schema) at index", tempArray.length);
//       }
//       setQuestionList(tempArray);
//       console.log("array length after push", tempArray.length);
//     } else {
//       console.log("array lenth is greater than 0 which is =", p);
//       for (p; p > 0; p--) {
//         tempArray.pop(Schema);
//         console.log("tempArray.pop(Schema) at index", tempArray.length);
//       }
//       setQuestionList(tempArray);
//       console.log("array length after pop", tempArray.length, p);

//       if (p == 0) {
//         for (p; p < value; p++) {
//           console.log("hii i am inside RepeateDate function ");
//           if (p == 0) {
//             var currentDate = moment(selectedDate);
//             console.log(
//               "first date (todays ie slected date) with value of i ",
//               p,
//               currentDate.format("DD-MM-YYYY")
//             );
//             var currentDate = moment(currentDate).subtract(1, "M");
//             console.log(
//               "first date (1 month before todays date) with value of i ",
//               p,
//               currentDate.format("DD-MM-YYYY")
//             );

//             setFutureMonth(currentDate);
//           }
//           // else if(i>0) {
//           else {
//             var currentDate = futureMonth;
//           }
//           var futureMonth = moment(currentDate).add(valuetwo, "M");
//           var futureMonthEnd = moment(futureMonth).endOf("month");

//           if (
//             currentDate.date() != futureMonth.date() &&
//             futureMonth.isSame(futureMonthEnd.format("YYYY-MM-DD"))
//           ) {
//             futureMonth = futureMonth.add(1, "d");
//           }

//           // console.log(currentDate.format('DD-MM-YYYY'));
//           console.log("value of i is ", p, futureMonth.format("DD-MM-YYYY"));

//           Schema.date.value = moment(futureMonth).format("DD-MM-YYYY");
//           // const [totalAmount,setTotalAmount]= useState(0);
//           let amount = (totalAmount / value).toFixed(2);
//           Schema.Amount.value = amount;
//           console.log("Schema.date.value date pushed", Schema.date.value);
//           console.log("Schema.Amount.value date pushed", Schema.Amount.value);

//           console.log("schema  before pushing date", Schema);

//           tempArray.push(_.cloneDeep(Schema));
//           // tempArray.push( "Schema.date.value","Schema.Amount.value")

//           console.log("schema after pushing date", Schema);

//           console.log("tempArray.push(Schema) at index", tempArray.length);
//         }
//         setQuestionList(tempArray);
//         console.log("All array elements", tempArray);
//         console.log("array length after pop+ push", tempArray.length);
//       }
//     }
//   }; // end function

//   return (
//     <div>
//       <Grid
//         container
//         // spacing={3}
//       >
//         {/* Grid item paper for heading of create test  */}
//         <Grid item xs={12}>
//           <Paper elevation={2} id={styles.paper_edit_test_header}>
//             <h3 className={styles.edit_test_text}>
//               Batch A - Add New Fee Structure
//             </h3>
//           </Paper>
//         </Grid>
//         {/* *************************************************************************************** */}
//         {/* edit test screen paper */}

//         <div style={{ marginTop: "3%", width: "100%" }}>
//           <Grid item xs={12}>
//             <Paper elevation={3} id={styles.paper_edit_test}>
//               <Grid item xs={12} md={12}>
//                 <span
//                   style={{
//                     fontSize: "20px",
//                     marginTop: "25px",
//                     marginLeft: "15px",
//                   }}
//                 >
//                   Fees Details
//                 </span>
//                 <hr></hr>
//               </Grid>
//               <form
//                 // className={classes.root}
//                 noValidate
//                 autoComplete="off"
//                 style={{ width: "100%" }}
//               >
//                 <div className={classes.root}>
//                   {/* second grid */}
//                   <Grid container spacing={3} className={classes.grid}>
//                     <Grid item xs={12} md={6}>
//                       <TextField
//                         className={classes.markSubTime}
//                         id="outlined-textarea"
//                         label="Name of Structure"
//                         placeholder="Name of Structure"
//                         //   multiline
//                         variant="outlined"
//                         size="small"

//                         //   disabled
//                         //   id="filled-disabled"
//                       />
//                     </Grid>
//                     <Grid item xs={12} md={3}>
//                       <MuiPickersUtilsProvider
//                         utils={DateFnsUtils}
//                         //  className={classes.formControlNew}

//                         style={{ width: "100%" }}
//                       >
//                         <KeyboardDatePicker
//                           style={{ marginLeft: "5%", width: "91%" }}
//                           margin="normal"
//                           id="date-picker-dialog1"
//                           label="Start Date"
//                           minDate={new Date()}
//                           // minDate={new Date()}

//                           // format="MM/dd/yyyy"
//                           // format="yyyy/MM/dd"
//                           format="dd-MM-yyyy"
//                           value={selectedDate}
//                           // value={props.feesStartDate}

//                           onChange={handleDateChange}
//                           KeyboardButtonProps={{
//                             "aria-label": "change date",
//                           }}
//                         />
//                       </MuiPickersUtilsProvider>
//                     </Grid>
//                     <Grid item xs={12} md={3}>
//                       <MuiPickersUtilsProvider
//                         utils={DateFnsUtils}
//                         // className={classes.formControlNew}
//                         style={{ width: "100%" }}
//                       >
//                         <KeyboardDatePicker
//                           style={{ marginLeft: "5%", width: "91%" }}
//                           margin="normal"
//                           id="date-picker-dialog2"
//                           label="End Date"
//                           minDate={new Date()}
//                           format="dd-MM-yyyy"
//                           // format="yyyy/MM/dd"
//                           value={selectedDate2}
//                           // value={props.feesEndDate}

//                           onChange={handleDateChange2}
//                           KeyboardButtonProps={{
//                             "aria-label": "change date",
//                           }}
//                         />
//                       </MuiPickersUtilsProvider>
//                     </Grid>

//                     {/* next row */}
//                     <Grid item xs={12} md={3}>
//                       <TextField
//                         className={classes.markSubTime}
//                         disabled
//                         //   id="filled-disabled"
//                         id="outlined-textarea"
//                         label="Amount"
//                         placeholder="Amount"
//                         //   multiline
//                         variant="outlined"
//                         size="small"
//                       />
//                     </Grid>
//                     <Grid item xs={12} md={3}>
//                       <TextField
//                         className={classes.markSubTime}
//                         //   disabled
//                         //   id="filled-disabled"
//                         id="outlined-textarea"
//                         label="Tax %"
//                         placeholder="Tax %"
//                         //   multiline
//                         variant="outlined"
//                         size="small"
//                       />
//                     </Grid>
//                     <Grid item xs={12} md={3}>
//                       <TextField
//                         className={classes.markSubTime}
//                         //   disabled
//                         id="outlined-textarea"
//                         //   id="filled-disabled"
//                         //   id="Total Amount "
//                         label="Total Amount"
//                         placeholder="Total Amount"
//                         //   multiline
//                         variant="outlined"
//                         onChange={(e) => handleTotalAmountChange(e)}
//                         size="small"
//                       />
//                     </Grid>
//                     <Grid item xs={12} md={3}>
//                       <p>Batch Duration :{months} months</p>
//                       {/* <TextField
//                         className={classes.markSubTime}
//                         disabled
//                         id="filled-disabled"
//                         id="outlined-textarea"
//                         label="Batch Duration"
//                         placeholder="Batch Duration"
//                         //   multiline
//                         variant="outlined"
//                         size="small"
//                       /> */}
//                     </Grid>

//                     {/* number of installments */}

//                     <Grid item xs={12} md={3}>
//                       <p>No. of installments</p>
//                     </Grid>
//                     <Grid item xs={12} md={7}>
//                       {/* slider code  */}

//                       <div className={classes.slider}>
//                         <Slider
//                           defaultValue={0}
//                           // value={value}
//                           min={0}
//                           step={1}
//                           // max={12}
//                           max={months}
//                           scale={(x) => x ** 1}
//                           // getAriaValueText={valueLabelFormat}
//                           // valueLabelFormat={valueLabelFormat}
//                           // marks
//                           onChange={handleChange}
//                           valueLabelDisplay="auto"
//                           // aria-labelledby="discrete-slider"
//                           aria-labelledby="non-linear-slider"
//                           // aria-labelledby="discrete-slider-small-steps"
//                         />
//                       </div>

//                       {/* <p>slider</p> */}
//                     </Grid>
//                     <Grid item xs={12} md={2}>
//                       {/* <p>number Field</p> */}
//                       <Typography id="font">{value}</Typography>
//                     </Grid>

//                     {/* Duration between installments */}

//                     <Grid item xs={12} md={3}>
//                       <p>Duration between installments</p>
//                     </Grid>
//                     <Grid item xs={12} md={7}>
//                       {/* <p>slider</p>
//                        */}

//                       <div className={classes.slider}>
//                         <Slider
//                           defaultValue={0}
//                           // value={valuetwo}
//                           min={0}
//                           step={1}
//                           // const [sliderTwoMax,setSliderTwoMax]=useState(0);

//                           max={sliderTwoMax}
//                           scale={(x) => x ** 1}
//                           // getAriaValueText={valueLabelFormat}
//                           // valueLabelFormat={valueLabelFormat}
//                           // marks
//                           onChange={handleChangetwo}
//                           valueLabelDisplay="auto"
//                           // aria-labelledby="discrete-slider"
//                           aria-labelledby="non-linear-slider"
//                           // aria-labelledby="discrete-slider-small-steps"
//                         />
//                       </div>
//                     </Grid>
//                     <Grid item xs={12} md={1}>
//                       {/* <p>number Field</p> */};
//                       <Typography id="font">selected:{valuetwo}</Typography>
//                     </Grid>
//                     <Grid item xs={12} md={1}>
//                       {/* <p>number Field</p> */};
//                       <Typography id="font">max:{sliderTwoMax}</Typography>
//                     </Grid>
//                   </Grid>
//                 </div>
//               </form>
//             </Paper>
//           </Grid>
//         </div>

//         {/* installment calculator started */}
//         <div style={{ marginTop: "2%", width: "100%" }}>
//           <Grid item xs={12}>
//             <Paper elevation={3} id={styles.paper_edit_test}>
//               <Grid item xs={12} md={12}>
//                 <span
//                   style={{
//                     fontSize: "20px",
//                     marginTop: "25px",
//                     marginLeft: "15px",
//                   }}
//                 >
//                   Installment Calculator
//                 </span>
//                 <hr></hr>
//               </Grid>
//               {/* Installment Calculator form field */}
//               <form
//                 // className={classes.root}
//                 noValidate
//                 autoComplete="off"
//                 style={{ width: "100%" }}
//               >
//                 {/* Below installment div will repeate as per number of installments */}
//                 {questionList.map((mx, mi) => {
//                   return (
//                     <div key={mx.id} className={classes.root}>
//                       <Grid container spacing={3} className={classes.grid}>
//                         <Grid item xs={1} md={1}>
//                           {mi + 1}
//                         </Grid>
//                         <Grid item xs={5} md={5}>
//                           <TextField
//                             className={classes.markSubTime}
//                             disabled
//                             // id="filled-disabled"
//                             // id="outlined-textarea"
//                             id={questionList[mi]["date"].value}
//                             // label="Amount"
//                             // label={questionList[mi]["date"].value}
//                             placeholder={questionList[mi]["date"].value}
//                             //   multiline
//                             variant="outlined"
//                             size="small"
//                             value={questionList[mi]["date"].value}
//                             onChange={(e) => handleInput(e, "date", mi)}
//                           />

//                           {/* <p>Hello : {futureMonth}</p> */}
//                           {/* <p>Hello : {questionList[mi]["date"].value}</p> */}
//                         </Grid>
//                         {/* <Grid item xs={1} md={1}></Grid> */}
//                         <Grid item xs={5} md={5}>
//                           <TextField
//                             className={classes.markSubTime}
//                             disabled
//                             // id="filled-disabled"
//                             // id="outlined-textarea"
//                             id={questionList[mi]["Amount"].value.toString()}
//                             // label="Amount"
//                             // label={(questionList[mi]["Amount"].value).toString()}
//                             placeholder={questionList[mi][
//                               "Amount"
//                             ].value.toString()}
//                             //   multiline
//                             variant="outlined"
//                             size="small"
//                             value={questionList[mi]["Amount"].value}
//                             onChange={(e) => handleInput(e, "Amount", mi)}
//                           />
//                         </Grid>
//                       </Grid>
//                     </div>
//                   );
//                 })}
//                 {/* Upper installment div will repeate as per number of installments */}
//               </form>
//             </Paper>
//           </Grid>
//         </div>
//         <Button
//           id={styles.create_batch_btn}
//           // onClick={(e) => {
//           //   handleSubmit();
//           // }}
//           // onClick={props.onHide}
//         >
//           SAVE
//         </Button>
//       </Grid>
//     </div>
//   );
// };

// export default AddNewFeesStructure;
