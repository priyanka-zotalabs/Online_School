import React, { Component } from "react";
import "./style.scss";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { urls } from "../../../url";
import { appConfig } from "../../../constants";
import moment from "moment";
import { toast } from "react-toastify";

import { makeStyles } from "@material-ui/core/styles";

import { ButtonComponent } from "@syncfusion/ej2-react-buttons";

import {
  Paper,
  Container,
  Grid,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Day,
  Week,
  Month,
  Agenda,
  Inject,
} from "@syncfusion/ej2-react-schedule";
import { Samplebase } from "./Samplebase";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  paper: {
    padding: theme.spacing(2),
    // textAlign: "center",
    marginBottom: 20,
    color: theme.palette.text.secondary,
  },
}));
// const classes = useStyles();
class TeacherDashBoard extends Samplebase {
  // const classes = useStyles();

  constructor() {
    super(...arguments);

    this.state = {
      data: [],
    };
  }
  change(args) {
    this.scheduleObj.selectedDate = args.value;
    this.scheduleObj.dataBind();
  }
  onDragStart(args) {
    args.navigation.enable = true;
  }
  componentDidMount() {
    this.getApprovedData();
  }
  getApprovedData() {
    // this.getStudentApprovedCourses();
    this.getTeacherApprovedBBBMeeting();
  }
  //Zoom Meeting Data
  getStudentApprovedCourses() {
    axios
      .get(`${appConfig.host}${urls.studentAllRegisterClasses}`)
      .then((success) => {
        let lRows = [];
        success.data.data.forEach((one) => {
          one.modules.forEach((two) => {
            two.chapters.forEach((three) => {
              three.schedules.forEach((data) => {
                let year = new Date(data.dateTime).getFullYear();
                let month = new Date(data.dateTime).getMonth();
                let day = new Date(data.dateTime).getDate();
                let hours = new Date(data.dateTime).getHours();
                let minutes = new Date(data.dateTime).getMinutes();
                let temp = {
                  key: data._id,
                  Subject: one.name + ", " + one.subject,
                  id: data._id,
                  url: data.url,
                  dateTime: data.dateTime,
                  StartTime: new Date(year, month, day, hours, minutes),
                  EndTime: new Date(year, month, day, hours, minutes + 30),
                  Button: "Join Course",
                  IsReadonly: true,
                };
                lRows.push(temp);
              });
            });
          });
        });
        this.setState({ data: lRows });
      })
      .catch((error) => {
        this.setState({ data: [] });
      });
  }

  // Big Blue Button
  getTeacherApprovedBBBMeeting() {
    axios
      .get(`${appConfig.host}${urls.studentAllSchedule}`)
      .then((success) => {
        console.log("BigBlueButton success Data", success.data.data);
        let lRows = [];
        success.data.data.forEach(data => {
          let year = new Date(data.dateTime).getFullYear();
          let month = new Date(data.dateTime).getMonth();
          let day = new Date(data.dateTime).getDate();
          let hours = new Date(data.dateTime).getHours();
          let minutes = new Date(data.dateTime).getMinutes();
          let temp = {
            key: data._id,
            Subject: data.name,
            id: data._id,
            sourceType: data.sourceType,
            courseId: data.courseId,
            moduleId: data.moduleId,
            chapterId: data.chapterId,
            dateTime: data.dateTime,
            channelName: data.sourceType == "Agora" ? data.channelName : "",
            StartTime: new Date(year, month, day, hours, minutes),
            EndTime: new Date(year, month, day, hours, minutes + 30),
            Button: "Join Course",
            IsReadonly: true
          }
          lRows.push(temp);
        });
        let tempArray = [...this.state.data, ...lRows];
        this.setState({ data: tempArray });
      })
      .catch((error) => {
        this.setState({ data: [] });
      });
    //console.log("data soething",this.state.data);
  }


  headerTemplate(props) {
    return (
      <div>
        {props.elementType === "cell" ? (
          <div className="e-cell-header">
            <div className="e-header-icon-wrapper">
              <button className="e-close" title="Close"></button>
            </div>
          </div>
        ) : (
            <div className="e-event-header">
              <div className="e-header-icon-wrapper">
                <button className="e-close" title="CLOSE"></button>
              </div>
            </div>
          )}
      </div>
    );
  }

  joinCourse(data) {
    // console.log("Selected Meeting", data);
    if (data.sourceType === "Agora") {
      try {
        let redirectUrl = "/student/myCourses/modules/chapter/" + data.chapterId;
        // console.log("Data of Agora", redirectUrl, data);
        toast.success("Redirecting to the Liveclass!");
        setTimeout(() => {
          // this.props.history.push(redirectUrl);
          this.props.history.push({
            pathname: redirectUrl,
            state: { detail: data }
          })
        }, 5000);
      } catch (e) {
        toast.error("Internal Error occurred while redirecting to the Liveclass");
        console.log("Error", e);
      }
    }
    else if (data.sourceType === "BigBlueButton") {
      try {
        let params =
        {
          scheduleId: data.id,
          courseId: data.courseId,
          moduleId: data.moduleId,
          chapterId: data.chapterId,
        }
        // console.log("Joining BigBlueButton", data, "params", params,"date time", data.dateTime);
        // console.log(`${appConfig.host}${urls.createBBBClass}`, params);
        axios.get(`${appConfig.host}${urls.createBBBClass}`, params).then((success) => {
          // console.log("Joining BBB Meeting");
          toast.success("Joining the meeting!");
          setTimeout(() => {
            window.open(success.data.data.meetingUrl, "_blank");
          }, 5000);

        }).catch(error => {
          console.log("BBB Error", error);
        });
      }
      catch (error) {
        toast.error("Internal Error occurred while starting the meeting");
      }
    }
    else {
      try {
        // console.log("Joining Zoom Meeting");
        toast.success("Joining the meeting!");
        setTimeout(() => {
          window.open(data.url, "_blank");
        }, 5000);
      } catch (error) {
        toast.error("Internal Error occurred while starting the meeting");
      }
    }

  }


  contentTemplate(props) {
    return (
      <div>
        {props.elementType === "cell" ? (
          <div className="e-cell-content">
            <form className="e-schedule-form">
              <div>
                <input
                  className="subject e-field"
                  type="text"
                  name="Subject"
                  placeholder="Title"
                />
              </div>
              <div>
                <input
                  className="assignee e-field"
                  type="text"
                  name="Assignee"
                  placeholder="Assignee"
                />
              </div>
              <div>
                <input
                  className="status e-field"
                  type="text"
                  name="Status"
                  placeholder="Status"
                />
              </div>
            </form>
          </div>
        ) : (
            <div className="e-event-content">
              <div className="e-subject-wrap">
                {props.Subject ? (
                  <div className="subject">{props.Subject}</div>
                ) : (
                    ""
                  )}
                {props.subject ? (
                  <div className="assignee">Subject: {props.subject}</div>
                ) : (
                    ""
                  )}
                {props.introduction ? (
                  <div className="status">Introdution: {props.introduction}</div>
                ) : (
                    ""
                  )}
                {props.exam ? (
                  <div className="status">Exam: {props.exam}</div>
                ) : (
                    ""
                  )}
                {props.dateTime ? (
                  <div className="status">
                    Date Time: {moment(props.dateTime).format("LLL")}
                  </div>
                ) : (
                    ""
                  )}
                {props.Button ? (
                  <Button
                    onClick={(e) => this.joinCourse(props)}
                    style={{ marginLeft: "100px" }}
                    variant="warning"
                  >
                    Join Course
                  </Button>
                ) : (
                    ""
                  )}
              </div>
            </div>
          )}
      </div>
    );
  }

  // To disable pops
  // onPopupOpen(args) {
  //   args.cancel = true;
  // }

  render() {
    return (
      <div
        className="schedule-control-section"
        // style={{ margin: "0% 5%" }}
      // className={classes.root}
      >
        <Paper
          //  className={classes.paper}
          elevation={1}
          id="paper_batch_header"
        >
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <div>
                <span className="create-batch">Schedule</span>
              </div>
            </Grid>
          </Grid>
        </Paper>

        {/* <div>
          <h3
            style={{ fontWeight: "600", paddingTop: "3%", paddingBottom: "2%" }}
          >
            Course Schedule
          </h3>
        </div> */}
        <div
          className="control-wrapper"
          style={{ marginTop: "8%", marginBottom: "3%" }}
        >
          <ScheduleComponent
            currentView="Month"
            // month view
            readonly={true} // don't open editor window
            height="auto"
            width="auto"
            ref={(schedule) => (this.scheduleObj = schedule)}
            selectedDate={new Date()}
            eventSettings={{ dataSource: this.state.data }}
            quickInfoTemplates={{
              header: this.headerTemplate.bind(this),
              content: this.contentTemplate.bind(this),
            }}
            showTimeIndicator={true}
          >
            <ViewsDirective>
              <ViewDirective option="Month" />
              <ViewDirective option="Day" />
              <ViewDirective
                option="Agenda"
                allowVirtualScrolling={false}
                style={{ height: "auto" }}
              />
            </ViewsDirective>
            <Inject services={[Day, Month, Agenda]} />
          </ScheduleComponent>
        </div>
      </div>
    );
  }
}

export default TeacherDashBoard;
