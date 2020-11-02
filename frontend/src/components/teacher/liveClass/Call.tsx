import React, { useState, useEffect } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import useAgora from './hooks/useAgora';
import MediaPlayer from './components/MediaPlayer';
import { Paper, Grid } from "@material-ui/core";
import FullScreenModal from "./components/videoPlayerModal";
import styles from './Call.module.css';
import axios from "axios";
import { connect } from "react-redux";
import { urls } from "../../../url";
import { appConfig } from "../../../constants";
import { toast } from "react-toastify";
import _ from "lodash";
import moment from "moment";
import { useLocation } from "react-router-dom";
import DiscussionBoard from "./components/discussionBoard";
import Tooltip from '@material-ui/core/Tooltip';
import ScriptTag from 'react-script-tag';
import useSocket from "./hooks/useSocket";
import RequestModal from "./components/modal";

const client = AgoraRTC.createClient({ codec: 'h264', mode: 'live', role: 'host' });

function Call(props) {

  let location = useLocation();

  const [appid, setAppid] = useState('');
  const [token, setToken] = useState('');
  const [channel, setChannel] = useState('');
  const [fullScreen, setFullScreen] = useState(false);
  const {
    localAudioTrack, localVideoTrack, leave, join, joinState, remoteUsers, muteMic, unMuteMic, unMuteVideo, muteVideo, muteState, videoState, joinScreen, localScreenVideoTrack
  } = useAgora(client);
  const [liveClassTime, setLiveClassTime] = useState([
    {
      dateTime: "2020-09-05T12:01:36.556Z",
    }
  ]);
  const [scheduleId, setScheduleId] = useState("");
  let redirectCourseId = location.state ? location.state.detail ? location.state.detail.courseId : "" : "";
  const [courseId, setCourseId] = useState(props.teacherCurrentCourse._id ? props.teacherCurrentCourse._id : redirectCourseId);
  const [showNotification, setShowNotifcation] = useState(false);
  // console.log("From redirect", redirectCourseId, "course Id", courseId, "from props", props.teacherCurrentCourse._id);

  const agoraUserId = `${props.auth._id}-${props.auth.currentMetaData.name}`;

  const { socketMessages,
    setRequestModal,
    requestModal,
    requesterName,
    sendAgreedPermission
  } = useSocket({
    name: "Shahid Teacher",
    scheduleId: "9876543210",
    auth: props.auth,
  });

  useEffect(() => {
    //  getSchedule();
    joinNow();
    return ()=>{
      leave();
    }
  }, []);



  const getSchedule = () => {
    axios
      .get(`${appConfig.host}${urls.getTeacherScheduleForAgora}?courseId=${courseId}`).then(success => {
        console.log("Success Getting Teacher Schedule", success.data.data);
        let tempArray = success.data.data;
        tempArray = tempArray.filter((eachSchedule, index) => {
          if (moment(eachSchedule.dateTime).isAfter(moment(new Date().toUTCString()).subtract('20', 'minutes'))) {
            return eachSchedule;
          }
        });
        tempArray.sort((a: any, b: any) => {
          return moment(new Date(a.dateTime)).isAfter(moment(new Date(b.dateTime))) ? 1 : -1;
        });
        setLiveClassTime(liveClassTime => _.cloneDeep(tempArray));
        setScheduleId(tempArray[0]._id);
        setChannel(tempArray[0].channelName);
        let string = "You have a class at " + moment(new Date(tempArray[0].dateTime)).format("hh:mm A");
        toast.info(string);
        if (tempArray.length > 0) {
          setTimeout(() => {
            setShowNotifcation(true);
          }, 5000);
        }
      }).catch(error => {
        console.log("Error getting the Teacher Schedule");
      })
  }

  const getToken = () => {
    if (moment(new Date()).isBetween(moment(liveClassTime[0].dateTime).subtract('30', 'minutes'), moment(liveClassTime[0].dateTime).add('30', 'minutes'))) {
      axios
        .get(`${appConfig.host}${urls.getTeacherAgoraToken}?channelName=${channel}&scheduleId=${scheduleId}`).then(success => {
          setToken(token => success.data.token);
          joinNow();
        }).catch(error => {
          console.log("Error getting the Teacher Token");
          toast.error("Something went wrong ! Please try again");
        })
    }
    else {
      toast.info("Not the schedule time !");
    }
  }

  const joinNow = () => {
    toast.success("Starting Live Class!");
    // join(appConfig.agoraAppId, channel, token);
    join("018da7b782a24efe87939c17bfb823ac", "shahid", "006018da7b782a24efe87939c17bfb823acIAA8BF0MONX9kltAQ2zH8b3bIE1WH4Q09pUfPIqcq9MkeRGdiK4AAAAAEADJ+bHOZkqZXwEAAQBkSplf", agoraUserId)
  }



  console.log("Remote Users Teacher", remoteUsers);
  console.log("Socket Users Teacher", socketMessages);
  console.log("Client Object of Teacher", client.uid);

  return (
    <>
      {!showNotification ? <>
        {joinState ? <>
          <RequestModal open={requestModal}
            onClose={() => setRequestModal(false)}
            namePerson={requesterName}
            onAgree={() => sendAgreedPermission()}
          />
          <Paper elevation={3} className={styles.paper_test_header}>
            <Grid container xs={12} direction="column"
              justify="space-between"
              alignItems="center" >
              <Grid item xs={12}>
                <div className={styles.call}>
                  {/* Local Video Track */}
                  <div className={styles.player_container}>
                    <div className='local-player-wrapper'>
                      {fullScreen ? <FullScreenModal show={fullScreen} onHide={() => setFullScreen(false)} videoTrack={localScreenVideoTrack ? localScreenVideoTrack : localVideoTrack} audioTrack={undefined} /> :
                        <MediaPlayer videoTrack={localScreenVideoTrack ? localScreenVideoTrack : localVideoTrack} audioTrack={undefined} ></MediaPlayer>}
                    </div>
                  </div>
                </div>
                {remoteUsers.length > 0 ? <div className={styles.call}>
                  {/* Remote Student Remote Track */}
                  <div className={styles.player_container}>
                    {remoteUsers.map(user => (<div className='remote-player-wrapper' key={user.uid} style={{ width: "100%", height: "100%" }}>
                      <MediaPlayer videoTrack={user.videoTrack} audioTrack={user.audioTrack}></MediaPlayer>
                    </div>))}
                  </div>
                </div> : null}
              </Grid>
              <Grid container item xs={12} justify="space-evenly" spacing={1} style={{ marginRight: "25px" }}>
                <Grid item  >
                  <Tooltip title="Mute/Unmute Audio" arrow>
                    <button id='muteunmute' type='button' className={`${styles.leave} btn btn-sm`} disabled={!joinState} style={{ backgroundColor: "#EB952D", fontWeight: "bold", color: "white" }}
                      onClick={() => { { muteState ? unMuteMic() : muteMic() } }}> {muteState ? <i className="fas fa-microphone-slash"></i> : <i className="fas fa-microphone"></i>}</button>
                  </Tooltip>
                </Grid>
                <Grid item  >
                  <Tooltip title="Video On/Off" arrow>
                    <button id='muteunmute' type='button' className={`${styles.leave} btn btn-sm`} style={{ backgroundColor: "#EB952D", fontWeight: "bold", color: "white" }} disabled={!joinState}
                      onClick={() => { { videoState ? unMuteVideo() : muteVideo() } }}> {videoState ? <i className="fas fa-stop"></i> : <i className="fas fa-video"></i>}</button>
                  </Tooltip>
                </Grid>
                <Grid item >
                  <Tooltip title="Fullscreen" arrow>
                    <button className={`btn btn-sm`} style={{ backgroundColor: "#EB952D", fontWeight: "bold", color: "white" }} type='button' onClick={() => setFullScreen(true)}> <i className="fas fa-expand"></i> </button>
                  </Tooltip>
                </Grid>
                <Grid item >
                  <Tooltip title="Share Screen" arrow>
                    <button className={`${styles.leave} btn btn-sm`} style={{ backgroundColor: "#EB952D", fontWeight: "bold", color: "white" }} type='button' disabled={!joinState} onClick={() => { joinScreen(appid, channel, token) }}><i className="fas fa-photo-video"></i></button>
                  </Tooltip>
                </Grid>
                <Grid item >
                  <Tooltip title="Leave Liveclass" arrow>
                    <button className={`${styles.leave} btn btn-sm`} style={{ backgroundColor: "#EB952D", fontWeight: "bold", color: "white" }} type='button' disabled={!joinState} onClick={() => { leave() }}>Leave</button>
                  </Tooltip>
                </Grid>
                <Grid item >
                  <ScriptTag type="text/javascript" src="https://api.apowersoft.com/screen-recorder?lang=en" />
                  <Tooltip title="Start Screen Recorder" arrow>
                    <div className="start-screen-recording recording-style-orange"><div><div className="rec-dot"></div><span>Start</span></div></div>
                  </Tooltip>
                </Grid>
              </Grid>
              <Grid item style={{ width: "100%", alignItems: "center", textAlign: "center", justifyContent: "center", paddingRight: "15%" }}>
                <div >
                  <DiscussionBoard scheduleId={scheduleId} />
                </div>
              </Grid>
            </Grid>
          </Paper>
        </> :
          <Paper elevation={3} className={styles.paper_test_header}>
            <Grid container xs={12}>
              <Grid item xs={8}>
                <div style={{ marginTop: "10px" }}>
                  <span className={styles.liveclass_Text}>Live Class {"@"} {moment(new Date(liveClassTime[0].dateTime)).format("hh:mm A")}</span>
                </div>
              </Grid>
              <Grid item>
                <Tooltip title="Start Liveclass" arrow>
                  <button className={`${styles.join} btn btn-sm`} style={{ backgroundColor: "#EB952D", fontWeight: "bold", color: "white" }} type='button' disabled={joinState} onClick={() => { getToken() }}>Start</button>
                </Tooltip>
              </Grid>
            </Grid>
          </Paper>}
      </> : null}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    teacherCurrentCourse: state.teacherCurrentCourse,
    teacherCurrentModule: state.Module,
    auth: state.auth,
  };
};
export default connect(mapStateToProps)(Call);