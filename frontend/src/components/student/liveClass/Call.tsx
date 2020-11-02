import React, { useState, useEffect } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import useAgora from './hooks/useAgora';
import MediaPlayer from './components/MediaPlayer';
import styles from './Call.module.css';
import { Paper, Grid } from "@material-ui/core";
import FullScreenModal from "./components/videoPlayerModal";
import axios from "axios";
import { connect } from "react-redux";
import { urls } from "../../../url";
import { appConfig } from "../../../constants";
import { toast } from "react-toastify";
import _ from "lodash";
import moment from "moment";
import { useLocation } from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';
import DiscussionBoard from "./components/discussionBoard";
import useSocket from "./hooks/useSocket";

const client = AgoraRTC.createClient({ codec: 'h264', mode: 'live', role: 'audience' });

function Call(props) {
  let location = useLocation();

  const [appid, setAppid] = useState('');
  const [token, setToken] = useState('');
  const [channel, setChannel] = useState('');
  const [fullScreen, setFullScreen] = useState(false);
  const {
    localAudioTrack, localVideoTrack, leave, join, joinState, remoteUsers, publishLocalStream,
    muteState, videoState, unMuteVideo, muteVideo, unMuteMic, muteMic
  } = useAgora(client);

  const [liveClassTime, setLiveClassTime] = useState([
    {
      dateTime: "2020-09-05T12:01:36.556Z",
    }
  ]);

  const [scheduleId, setScheduleId] = useState("");
  let redirectCourseId = location.state ? location.state.detail ? location.state.detail.courseId : "" : "";
  const [courseId, setCourseId] = useState(props.studentCurrentCourse._id ? props.studentCurrentCourse._id : redirectCourseId);
  const [showNotification, setShowNotifcation] = useState(false);
  const [batchId, setBatchId] = useState("");

  const { permissionToShare, socketMessages, sendHandRaiseOnSocket } = useSocket({
    name: "Shahid Student",
    scheduleId: "9876543210",
    auth: props.auth,
    client: client,
  })
  const agoraUserId = `${props.auth._id}-${props.auth.currentMetaData.name}`;

  useEffect(() => {
    // getSchedule();
    joinNow();
    return () => {
      leave();
    }
  }, []);

  const getSchedule = () => {
    axios
      .get(`${appConfig.host}${urls.getStudentScheduleForAgora}?courseId=${courseId}`).then(success => {
        console.log("Success Getting Student Schedule", success.data.data);
        let tempArray = success.data.data;
        tempArray = tempArray.filter((eachSchedule, index) => {
          if (moment(eachSchedule.dateTime).isAfter(moment(new Date().toUTCString()).subtract('20', 'minutes'))) {
            return eachSchedule;
          }
        });
        tempArray.sort((a: any, b: any) => {
          console.log("a", a.dateTime, "b", b.dateTime, moment(a).isAfter(moment(b)));
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
        console.log("Error getting the Student Schedule");
      })
  }

  const getToken = () => {
    if (moment(new Date()).isBetween(moment(liveClassTime[0].dateTime).subtract('30', 'minutes'), moment(liveClassTime[0].dateTime).add('30', 'minutes'))) {
      axios
        .get(`${appConfig.host}${urls.getStudentAgoraToken}?channelName=${channel}&scheduleId=${scheduleId}`).then(success => {
          // console.log("Student Token Success", success.data.token);
          setToken(token => success.data.token);
          joinNow();
        }).catch(error => {
          console.log("Error getting the Student Token");
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



  useEffect(() => {
    if (permissionToShare) {
      publishLocalStream();
    }
  }, [permissionToShare])


  const raiseHand = () => {
    sendHandRaiseOnSocket();
  }

  return (
    <>
      {!showNotification ? <>
        {joinState ?
          <Paper elevation={3} className={styles.paper_test_header}>
            <Grid container xs={12}
              justify="space-between"
              spacing={2}
              alignItems="center" >
              {/* Remote Video Track */}
              <Grid item xs={permissionToShare ? 6 : 12}>
                <div className={styles.call} style={{ backgroundColor: "green", padding: "2px", width: "100%", height: "100%", }}>
                  <div className={styles.player_container} style={{ backgroundColor: "blue", padding: "2px", width: "100%", height: "100%", }}>
                    {remoteUsers.length > 0 ? null : <MediaPlayer videoTrack={undefined} audioTrack={undefined} personName={"Video will be shared soon..."} personId={client.uid + ""}></MediaPlayer>}
                    {remoteUsers.map(user => (<div className='remote-player-wrapper' key={user.uid} style={{ width: "100%", height: "100%", backgroundColor: "red", padding: "2px" }}>
                      {/* <p className='remote-player-text'>{`Teacher(${user.uid})`}</p> */}
                      {fullScreen ? <FullScreenModal show={fullScreen} onHide={() => setFullScreen(false)} videoTrack={user.videoTrack} audioTrack={user.audioTrack} /> :
                        <MediaPlayer videoTrack={user.videoTrack} audioTrack={user.audioTrack} personId={user.uid.toString().split("-")[0]} personName={user.uid.toString().split("-")[1]}></MediaPlayer>}
                    </div>))}
                  </div>
                </div>
              </Grid>
              {/* Local Video Track */}
              {permissionToShare ? <Grid item xs={6}>
                <div className={styles.call} style={{ backgroundColor: "green", padding: "2px", width: "100%", height: "100%", }}>
                  <div className={styles.player_container} style={{ backgroundColor: "blue", padding: "2px", width: "100%", height: "100%", }}>
                    <div className='local-player-wrapper' style={{ width: "100%", height: "100%", backgroundColor: "red", padding: "2px" }}>
                      <MediaPlayer videoTrack={localVideoTrack} audioTrack={undefined} personName={"You"} personId={client.uid + ""}></MediaPlayer>
                    </div>
                  </div>
                </div>
              </Grid> : null}

              <Grid container item xs={12} justify="flex-end">
                {permissionToShare ? <><Grid item  >
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
                  </Grid></> : <Tooltip title="Share your Video" arrow>
                    <button className={`${styles.leave} btn btn-sm`}
                      style={{ backgroundColor: "#EB952D", fontWeight: "bold", color: "white" }}
                      type='button' onClick={() => raiseHand()}
                    > Share </button>
                  </Tooltip>}
                <Grid item>
                  <Tooltip title="Fullscreen" arrow>
                    <button className={`${styles.leave} btn btn-sm`} style={{ backgroundColor: "#EB952D", fontWeight: "bold", color: "white" }} type='button' onClick={() => setFullScreen(true)}> <i className="fas fa-expand"></i> </button>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title="Leave Liveclass" arrow>
                    <button className={`${styles.leave} btn btn-sm`} style={{ backgroundColor: "#EB952D", fontWeight: "bold", color: "white" }} type='button' disabled={!joinState} onClick={() => { leave() }}>Leave</button>
                  </Tooltip>
                </Grid>
              </Grid>
              <Grid item style={{ width: "100%", alignItems: "center", textAlign: "center", justifyContent: "center", paddingRight: "5%" }}>
                <div >
                  {/* <DiscussionBoard scheduleId={scheduleId} /> */}
                </div>
              </Grid>
            </Grid>
          </Paper> :
          <Paper elevation={3} className={styles.paper_test_header}>
            <Grid container xs={12}>
              <Grid item xs={8}>
                <div style={{ marginTop: "10px" }}>
                  <span className={styles.liveclass_Text} >Live Class {"@"} {moment(new Date(liveClassTime[0].dateTime)).format("hh:mm A")}</span>
                </div>
              </Grid>
              <Grid item>
                <Tooltip title="Start Liveclass" arrow>
                  <button className={`${styles.join} btn btn-sm`} style={{ backgroundColor: "#EB952D", fontWeight: "bold", color: "white" }} type='button' disabled={joinState} onClick={() => { getToken() }}>Join</button>
                </Tooltip>
              </Grid>
            </Grid>
          </Paper>}
      </>
        : null
      }
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    studentCurrentCourse: state.studentCurrentCourse,
    batchId: state.auth,
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Call);