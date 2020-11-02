import React, { useState } from "react";
import Plot from 'react-plotly.js';
import styles from "./adminDashboardStyle.module.css";
import Students from "./../../../images/Students.jpg";
import Institute from "./../../../images/Institute.jpg";
import Person1 from "./../../../images/person1.jpg";

// "start": "react-scripts start",
// "build": "react-scripts build",
import _ from "lodash";
import { useHistory } from "react-router-dom";
import {
  Paper,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import {
  Modal, Button, Row, Col, Form
} from "react-bootstrap";


import Loading from "../../../shared/Components/Loading";
import axios from "axios";
import { urls } from "../../../url";

import { appConfig } from "../../../constants";
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "3%",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));



// var trace1 = {
//   x: [0, 1, 2, 3, 4, 5, 6],
//   y: [1, 9, 4, 7, 5, 2, 4],
//   mode: 'markers',
//   marker: {
//       size: [20, 40, 25, 10, 60, 90, 30],
//   }
// };

// var data = [trace1];

// var layout = {
//   title: 'Create a Static Chart',
//   showlegend: false
// };
// Plotly.newPlot('myDiv', data, layout, {staticPlot: true});

const AdminDashboard = (props) => {
  const classes = useStyles();
  let [loader, setLoader] = useState(false);

  let history = useHistory();

  // let {
  //     auth,   
  //     loader,

  //   } = props;


  // Write here code for Admin DashBoard

  const [studClick, setStudClick] = useState(true);
  const [revenueClick, setRevenueClick] = useState(false);

  const handleStudentClick = (e) => {
    // alert("Student clicked")
    setStudClick(true);
    setRevenueClick(false);
  }

  const handleRevenueClick = (e) => {
    setStudClick(false);
    setRevenueClick(true);
  }

  return (
    <React.Fragment>

      <div>

        {loader ? (
          <Loading isLoading={true}></Loading>
        ) : (
            <React.Fragment>

              <div className={classes.root}>
                <Grid container spacing={3}>
                  {/* <Grid item xs={12} style={{backgroundColor:"red"}}> */}

                  <Grid item xs={12}>
                    <Row>

                      {/* first column */}
                      <Col sm={7} md={7}>
                        <Row>
                          <Col sm={6} md={6} >
                            <Paper elevation={1}
                              onClick={(e) => handleStudentClick(e)}
                              id={styles.paper_dashboard_header}>
                              <Row style={{ padding: "10px" }}>
                                <Col sm={4} md={4} >

                                  <img src={Students} height="100%" width="100%" />

                                </Col>
                                <Col sm={8} md={8} >
                                  <span id={styles.numberColor} >500</span>
                                  <br></br>
                                  <span style={{ fontSize: "10px" }}>Total Student</span>
                                </Col>

                              </Row>



                            </Paper>
                          </Col>
                          <Col sm={6} md={6} >

                            <Paper elevation={1}
                              onClick={(e) => handleRevenueClick(e)}
                              id={styles.paper_dashboard_header}>
                              <Row style={{ padding: "10px" }}>
                                <Col sm={4} md={4} >

                                  <img src={Institute} height="100%" width="100%" />
                                </Col>
                                <Col sm={8} md={8} >
                                  <span id={styles.numberColor}>50,000</span>
                                  <br></br>
                                  <span style={{ fontSize: "10px" }}>Total Revenue</span>
                                </Col>

                              </Row>



                            </Paper>
                          </Col>
                        </Row>


                        {/* first chart for student */}


                        {studClick ? (

                          <div>
                            <Row  >
                              <Col sm={12} md={12} id={styles.chart_card_margins}>
                                <Card className={styles.batch_cardHeading}>
                                  <CardContent id={styles.batch_card_heading_bgcolor}>
                                    Students by course
                  </CardContent>

                                  {/* dropdowns */}
                                  <Row style={{ marginTop: "15px", marginLeft: "10px", marginRight: "10px" }} >

                                    <Col sm={4} md={4}>
                                      <Form.Control
                                        as="select"
                                        placeholder="Month"
                                        label="Month"
                                        type="text"
                                        variant="outlined"

                                      // name="currency"
                                      // onChange={(e) => inputChangeHandler(e, "currency")}
                                      // onBlur={(e) => inputBlurHandler(e, "currency")}
                                      // value={addNewBatchForm.currency.value}

                                      // className={addNewBatchForm.currency.invalid ? "border-danger" : ""}
                                      >


                                        <option >Month</option>

                                        <option value={"Jan"}>Jan</option>
                                        <option value={"Feb"}>Feb</option>

                                      </Form.Control>
                                    </Col>
                                    {/* second dropdown */}
                                    <Col sm={4} md={4}>

                                      <Form.Control
                                        as="select"
                                        placeholder="Year"
                                        label="Year"
                                        type="text"
                                        variant="outlined"

                                      >


                                        <option >Year</option>

                                        <option value={"2010"}>2010</option>
                                        <option value={"2013"}>2013</option>

                                      </Form.Control>
                                    </Col>
                                    <Col sm={4} md={4}>

                                      <Form.Control
                                        as="select"
                                        placeholder="Course"
                                        label="Course"
                                        type="text"
                                        variant="outlined"

                                      >


                                        <option >Course</option>

                                        <option value={"Physics"}>Physics</option>
                                        <option value={"Chemistry"}>Chemistry</option>

                                      </Form.Control>
                                    </Col>

                                  </Row>
                                  <Plot
                                    data={[
                                      {
                                        type: 'bar',
                                        x: ["Course1", "Course2", "Course3"],
                                        y: [20, 12, 6],
                                        marker: {
                                          color: '#175592',

                                        },
                                      },
                                    ]}

                                    config={{
                                      displayModeBar: false
                                    }}
                                    layout={{ width: 550, height: 350, scrollZoom: false, }}

                                  // layout={{ width: 550, height: 350, showlegend: false, scrollZoom: false, title: 'Institute Strength' }}

                                  />


                                  {/* <div id='myDiv'></div> */}

                                </Card>
                              </Col>
                            </Row>

                            {/* second chart for student 2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222 */}
                            <Row  >
                              <Col sm={12} md={12} id={styles.chart_card_margins}>
                                <Card className={styles.batch_cardHeading}>
                                  <CardContent id={styles.batch_card_heading_bgcolor}>
                                    Student Trend
                  </CardContent>

                                  {/* dropdowns */}
                                  <Row style={{ marginTop: "15px", marginLeft: "10px", marginRight: "10px" }} >

                                    <Col sm={4} md={4}>
                                      <Form.Control
                                        as="select"
                                        placeholder="From Year"
                                        label="From Year"
                                        type="text"
                                        variant="outlined"

                                      // name="currency"
                                      // onChange={(e) => inputChangeHandler(e, "currency")}
                                      // onBlur={(e) => inputBlurHandler(e, "currency")}
                                      // value={addNewBatchForm.currency.value}

                                      // className={addNewBatchForm.currency.invalid ? "border-danger" : ""}
                                      >


                                        <option >From Year</option>

                                        <option value={"2000"}>2000</option>
                                        <option value={"2001"}>2001</option>

                                      </Form.Control>
                                    </Col>
                                    {/* second dropdown */}
                                    <Col sm={4} md={4}>

                                      <Form.Control
                                        as="select"
                                        placeholder="To Year"
                                        label="To Year"
                                        type="text"
                                        variant="outlined"

                                      >


                                        <option >To Year</option>

                                        <option value={"2010"}>2010</option>
                                        <option value={"2013"}>2013</option>

                                      </Form.Control>
                                    </Col>
                                    <Col sm={4} md={4}>

                                      <Form.Control
                                        as="select"
                                        placeholder="Course"
                                        label="Course"
                                        type="text"
                                        variant="outlined"

                                      >


                                        <option >Course</option>

                                        <option value={"Physics"}>Physics</option>
                                        <option value={"Chemistry"}>Chemistry</option>

                                      </Form.Control>
                                    </Col>

                                  </Row>
                                  <Plot
                                    data={[
                                      {
                                        x: [2014, 2015, 2016, 2017, 2018, 2019, 2020],
                                        y: [160, 50, 110, 90, 101, 123, 400],
                                        mode: 'lines',
                                        name: 'Physics'
                                      },
                                      {
                                        x: [2014, 2015, 2016, 2017, 2018, 2019, 2020],
                                        y: [190, 85, 110, 189, 180, 223, 300],
                                        mode: 'lines',
                                        name: 'Chemistry'
                                      },
                                      {
                                        x: [2014, 2015, 2016, 2017, 2018, 2019, 2020],
                                        y: [106, 65, 91, 90, 211, 333, 250],
                                        mode: 'lines',
                                        name: 'Maths'
                                      },
                                    ]}


                                    config={{
                                      displayModeBar: false
                                    }}
                                    layout={{ width: 550, height: 350, scrollZoom: false }}

                                  // layout={{ width: 550, height: 350, showlegend: false, scrollZoom: false, title: 'Students Trend' }}

                                  />


                                  {/* <div id='myDiv'></div> */}

                                </Card>
                              </Col>
                            </Row>
                          </div>

                        ) : null}
                        {/* 1) graph for Revenue*********************************************************************** */}
                        {revenueClick ? (
                          <div>
                            <Row  >
                              <Col sm={12} md={12} id={styles.chart_card_margins}>
                                <Card className={styles.batch_cardHeading}>
                                  <CardContent id={styles.batch_card_heading_bgcolor}>
                                    Revenue by course
                  </CardContent>

                                  {/* dropdowns */}
                                  <Row style={{ marginTop: "15px", marginLeft: "10px", marginRight: "10px" }} >

                                    <Col sm={4} md={4}>
                                      <Form.Control
                                        as="select"
                                        placeholder="Month"
                                        label="Month"
                                        type="text"
                                        variant="outlined"

                                      // name="currency"
                                      // onChange={(e) => inputChangeHandler(e, "currency")}
                                      // onBlur={(e) => inputBlurHandler(e, "currency")}
                                      // value={addNewBatchForm.currency.value}

                                      // className={addNewBatchForm.currency.invalid ? "border-danger" : ""}
                                      >


                                        <option >Month</option>

                                        <option value={"Jan"}>Jan</option>
                                        <option value={"Feb"}>Feb</option>

                                      </Form.Control>
                                    </Col>
                                    {/* second dropdown */}
                                    <Col sm={4} md={4}>

                                      <Form.Control
                                        as="select"
                                        placeholder="Year"
                                        label="Year"
                                        type="text"
                                        variant="outlined"

                                      >


                                        <option >Year</option>

                                        <option value={"2010"}>2010</option>
                                        <option value={"2013"}>2013</option>

                                      </Form.Control>
                                    </Col>
                                    <Col sm={4} md={4}>

                                      <Form.Control
                                        as="select"
                                        placeholder="Subject"
                                        label="Subject"
                                        type="text"
                                        variant="outlined"

                                      >


                                        <option >Subject</option>

                                        <option value={"Physics"}>Physics</option>
                                        <option value={"Chemistry"}>Chemistry</option>

                                      </Form.Control>
                                    </Col>

                                  </Row>
                                  <Plot
                                    data={[
                                      {
                                        type: 'bar',
                                        x: ["Students", "Teachers", "Courses"],
                                        y: [20, 12, 6],
                                        marker: {
                                          color:"#175592",

                                        },
                                      },
                                    ]}

                                    config={{
                                      displayModeBar: false
                                    }}
                                    layout={{ width: 550, height: 350, scrollZoom: false }}

                                  // layout={{ width: 550, height: 350, showlegend: false, scrollZoom: false, title: 'Institute Strength' }}

                                  />


                                  {/* <div id='myDiv'></div> */}

                                </Card>
                              </Col>
                            </Row>

                            {/* 2) second graph for Revenue********************************************************************* */}
                            <Row  >
                              <Col sm={12} md={12} id={styles.chart_card_margins}>
                                <Card className={styles.batch_cardHeading}>
                                  <CardContent id={styles.batch_card_heading_bgcolor}>
                                    Revenue by Fees
                  </CardContent>

                                  {/* dropdowns */}
                                  <Row style={{ marginTop: "15px", marginLeft: "10px", marginRight: "10px" }} >

                                    <Col sm={4} md={4}>
                                      <Form.Control
                                        as="select"
                                        placeholder="Month"
                                        label="Month"
                                        type="text"
                                        variant="outlined"

                                      // name="currency"
                                      // onChange={(e) => inputChangeHandler(e, "currency")}
                                      // onBlur={(e) => inputBlurHandler(e, "currency")}
                                      // value={addNewBatchForm.currency.value}

                                      // className={addNewBatchForm.currency.invalid ? "border-danger" : ""}
                                      >


                                        <option >Month</option>

                                        <option value={"Jan"}>Jan</option>
                                        <option value={"Feb"}>Feb</option>

                                      </Form.Control>
                                    </Col>
                                    {/* second dropdown */}

                                    <Col sm={4} md={4}>

                                      <Form.Control
                                        as="select"
                                        placeholder="Course"
                                        label="Course"
                                        type="text"
                                        variant="outlined"

                                      >
                                        <option >Course</option>

                                        <option value={"Physics"}>Physics</option>
                                        <option value={"Chemistry"}>Chemistry</option>

                                      </Form.Control>
                                    </Col>

                                    <Col sm={4} md={4}>

                                      <Form.Control
                                        as="select"
                                        placeholder="Batch"
                                        label="Batch"
                                        type="text"
                                        variant="outlined"

                                      >


                                        <option >Batch</option>

                                        <option value={"English"}>English</option>
                                        <option value={"Hindi"}>Hindi</option>

                                      </Form.Control>
                                    </Col>


                                  </Row>
                                  <Plot
                                    data={[
                                      {
                                        x: ["Physics", "Chemistry", "Maths"],
                                        y: [30, 40, 5],
                                        marker: {
                                          color: '#175592',
                                          width: 1
                                        },
                                        name: 'Fees Paid',
                                        type: 'bar'
                                      },
                                      {
                                        x: ["Physics", "Chemistry", "Maths"],
                                        y: [70, 10, 75],
                                        marker: {
                                          color: '#EE99B8',
                                          width: 1
                                        },
                                        name: 'Fees Not Paid',
                                        type: 'bar'
                                      },

                                    ]}

                                    config={{
                                      displayModeBar: false
                                    }}
                                    layout={{ width: 550, height: 350, scrollZoom: false, barmode: 'stack' }}

                                  // layout={{ width: 550, height: 350, showlegend: false, scrollZoom: false, title: 'Fees Status', barmode: 'stack' }}
                                  // layout={{ width: "auto", height: "30%", title: 'Fees Status', barmode: 'stack' }}
                                  />


                                  {/* <div id='myDiv'></div> */}

                                </Card>
                              </Col>
                            </Row>


                            {/* 3) Third graph for Revenue********************************************************************** */}

                            <Row  >
                              <Col sm={12} md={12} id={styles.chart_card_margins}>
                                <Card className={styles.batch_cardHeading}>
                                  <CardContent id={styles.batch_card_heading_bgcolor}>
                                    Revenue Trend
                  </CardContent>

                                  {/* dropdowns */}
                                  <Row style={{ marginTop: "15px", marginLeft: "10px", marginRight: "10px" }} >

                                    <Col sm={4} md={4}>
                                      <Form.Control
                                        as="select"
                                        placeholder="From Year"
                                        label="From Year"
                                        type="text"
                                        variant="outlined"

                                      // name="currency"
                                      // onChange={(e) => inputChangeHandler(e, "currency")}
                                      // onBlur={(e) => inputBlurHandler(e, "currency")}
                                      // value={addNewBatchForm.currency.value}

                                      // className={addNewBatchForm.currency.invalid ? "border-danger" : ""}
                                      >


                                        <option >From Year</option>

                                        <option value={"2000"}>2000</option>
                                        <option value={"2001"}>2001</option>

                                      </Form.Control>
                                    </Col>
                                    {/* second dropdown */}
                                    <Col sm={4} md={4}>

                                      <Form.Control
                                        as="select"
                                        placeholder="To Year"
                                        label="To Year"
                                        type="text"
                                        variant="outlined"

                                      >


                                        <option >To Year</option>

                                        <option value={"2010"}>2010</option>
                                        <option value={"2013"}>2013</option>

                                      </Form.Control>
                                    </Col>
                                    <Col sm={4} md={4}>

                                      <Form.Control
                                        as="select"
                                        placeholder="Subject"
                                        label="Subject"
                                        type="text"
                                        variant="outlined"

                                      >


                                        <option >Subject</option>

                                        <option value={"Physics"}>Physics</option>
                                        <option value={"Chemistry"}>Chemistry</option>

                                      </Form.Control>
                                    </Col>

                                  </Row>
                                  <Plot
                                    data={[
                                      {
                                        x: [2014, 2015, 2016, 2017, 2018, 2019, 2020],
                                        y: [160, 50, 110, 90, 101, 123, 400],
                                        mode: 'lines',
                                        name: 'Physics'
                                      },
                                      {
                                        x: [2014, 2015, 2016, 2017, 2018, 2019, 2020],
                                        y: [190, 85, 110, 189, 180, 223, 300],
                                        mode: 'lines',
                                        name: 'Chemistry'
                                      },
                                      {
                                        x: [2014, 2015, 2016, 2017, 2018, 2019, 2020],
                                        y: [106, 65, 91, 90, 211, 333, 250],
                                        mode: 'lines',
                                        name: 'Maths'
                                      },
                                    ]}


                                    config={{
                                      displayModeBar: false
                                    }}
                                    // layout={{ width: 550, height: 350, showlegend: false, scrollZoom: false }}
                                    layout={{ width: 550, height: 350, }}
                                  // layout={{ width: 550, height: 350, showlegend: false, scrollZoom: false, title: 'Students Trend' }}

                                  />


                                  {/* <div id='myDiv'></div> */}

                                </Card>
                              </Col>
                            </Row>
                          </div>
                        ) : null}
                        {/* Graphs end here */}
                      </Col>

                      {/* second column */}
                      <Col sm={5} md={5} >

                        <Row>

                          <Col sm={12} md={12} id={styles.chart_card_margins}>
                            <Card className={styles.batch_cardHeading}>
                              <CardContent id={styles.batch_card_heading_bgcolor}>
                                Updates/Notifications
                  </CardContent>
                              <Row style={{ marginTop: "15px", marginLeft: "10px", marginRight: "10px" }}>

                                <Col sm={3} md={3}>
                                  <div style={{ height: "50px", width: "50px" }}>
                                    <img id={styles.imageBorder} src={Person1} height="100%" width="100%" />
                                  </div>
                                </Col>
                                <Col sm={9} md={9}><span style={{ fontWeight: "bold", fontSize: "12px" }}>Jonh Deo</span><span style={{ fontSize: "12px" }}> sent you a message</span></Col>
                                <hr />
                              </Row>
                              <Row style={{ marginTop: "15px", marginLeft: "10px", marginRight: "10px" }}>

                                <Col sm={3} md={3}>
                                  <div style={{ height: "50px", width: "50px" }}>
                                    <img id={styles.imageBorder} src={Person1} height="100%" width="100%" />
                                  </div>
                                </Col>
                                <Col sm={9} md={9}><span style={{ fontWeight: "bold", fontSize: "12px" }}>Jonh Deo</span><span style={{ fontSize: "12px" }}> sent you a message</span></Col>
                                <hr />
                              </Row>

                            </Card>
                          </Col>
                        </Row>


                      </Col>
                    </Row>
                  </Grid>
                </Grid>
              </div>
            </React.Fragment>
          )}
      </div>
    </React.Fragment>

  );
};

export default AdminDashboard;
