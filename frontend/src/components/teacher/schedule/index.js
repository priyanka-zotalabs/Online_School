import React, { Component } from "react";
import "./style.scss";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { urls } from "../../../url";
import { appConfig } from "../../../constants";
import moment from "moment";
import { toast } from "react-toastify";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
// import scheduleModal  from "./ScheduleModal/scheduleModal";
import ScheduleModal from "./ScheduleModal/index.js";
// import NewScheduleModal from "./NewScheduleModal/index.js";

import { extend } from "@syncfusion/ej2-base";
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
import { withRouter } from 'react-router';

class TeacherDashBoard extends Samplebase {
  constructor() {
    super(...arguments);

    this.state = {
      data: [],
      meetingData: null,
      addModalShow: false,
    };
  }

  //   constructor() {
  //     super(...arguments);
  //     this.fifaEvents = extend([], fifaEventsData, null, true);
  //     this.timezone = new Timezone();
  // }
  // onCreate() {
  //     for (let fifaEvent of this.fifaEvents) {
  //         let event = fifaEvent;
  //         event.StartTime = this.timezone.removeLocalOffset(event.StartTime);
  //         event.EndTime = this.timezone.removeLocalOffset(event.EndTime);
  //     }


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

  getApprovedData = () => {
    this.getTeacherApprovedCourses();
    this.getTeacherApprovedBBBMeeting();
  }
  //Zoom Meeting Data
  getTeacherApprovedCourses() {
    axios
      .get(`${appConfig.host}${urls.teacherGetCourse}`)
      .then((success) => {
        let lRows = [];
        // console.log("zoom data source ", success.data.data);
        success.data.data.forEach((one) => {
          one.modules.forEach((two) => {
            two.chapters.forEach((three) => {
              three.schedules.forEach(data => {
                // console.log("zoom data", data);
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
                  IsReadonly: true
                }
                lRows.push(temp)
              });
            })
          });
        });
        let tempArray = [...this.state.data, ...lRows];
        this.setState({ data: tempArray });
      })
      .catch((error) => {
        this.setState({ data: [] });
      });
    //console.log("data soething",this.state.data);
  }
  // Big Blue Button
  getTeacherApprovedBBBMeeting() {
    axios
      .get(`${appConfig.host}${urls.teacherAllSchedule}`)
      .then((success) => {
        // console.log("BigBlueButton success Data", success.data.data);
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
  /*   getTeacherApprovedCourses() {
      axios
        .get(`${appConfig.host}${urls.teacherGetCourse}`)
        .then((success) => {
          console.log("This is the data",success.data.data);
          let lRows = [];
          success.data.data.forEach((one) => {
            let year = new Date(one.dateTime).getFullYear();
            let month = new Date(one.dateTime).getMonth();
            let day = new Date(one.dateTime).getDate();
            let hours = new Date(one.dateTime).getHours();
            let minutes = new Date(one.dateTime).getMinutes();
            let tempFormData = {
              key: one._id,
              Subject: "Course: " + one.name,
              status: one.status,
              id: one._id,
              subject: one.subjectName,
              // board: one.boardId.displayName,
              // grade: one.gradeId.displayName,
              // exam:
              //   one.examId && one.examId.displayName
              //     ? one.examId.displayName
              //     : "",
              dateTime: one.dateTime,
              StartTime: new Date(year, month, day, hours, minutes),
              EndTime: new Date(year, month, day, hours, minutes + 30),
              Button: "Join Course",
            };
            lRows.push(tempFormData);
          });
          this.setState({ data: lRows });
        })
        .catch((error) => {
          this.setState({ data: [] });
        });
    } */
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
    if (data.sourceType === "Agora") {
      try {
        // console.log("data", data);
        let redirectUrl = "/teacher/courses/modules/chapter/" + data.chapterId;
        // console.log("Data of Agora", redirectUrl);
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
          toast.success("Starting the meeting!");
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
        toast.success("Starting the meeting!");
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
                {props.board ? (
                  <div className="status">Board: {props.board}</div>
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
    // let addModalClose = () => this.setState({ addModalShow: false });

    return (
      <div >
        <ScheduleModal getAllMeetingData={this.getApprovedData} />
        {/* <NewScheduleModal getAllMeetingData={this.getApprovedData} /> */}

        {/* <Button
            variant="primary"
            onClick={ScheduleModal}
          >
            CREATE NEW SCHEDULE
          </Button>  */}
        {/* <ButtonToolbar>
          <Button
            variant="primary"
            onClick={() => this.setState({ addModalShow: true })}
          >
            CREATE NEW SCHEDULE
          </Button>
          <ScheduleModal
            open={this.state.addModalShow}
            onHide={addModalClose}
          />
        </ButtonToolbar> */}
        <div className="schedule-control-section">
          {/* <h3
          // style={{ fontWeight: "600", paddingTop: "3%", paddingBottom: "2%" }}
          >
            Course Schedule
          </h3> */}

          <div className="control-wrapper">
            <ScheduleComponent
              currentView="Month"
              // month view
              // created={this.onCreate.bind(this)}
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
                {/* 
              <ViewDirective option="Week" startHour="08:00" endHour="25:00" /> */}
                <ViewDirective option="Day" />
                <ViewDirective option="Agenda" />
              </ViewsDirective>
              <Inject services={[Day, Week, Month, Agenda]} />
            </ScheduleComponent>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(TeacherDashBoard);