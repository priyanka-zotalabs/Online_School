import { ILocalVideoTrack, IRemoteVideoTrack, ILocalAudioTrack, IRemoteAudioTrack } from "agora-rtc-sdk-ng";
import React, { useRef, useEffect } from "react";
import { Grid } from "@material-ui/core";

export interface VideoPlayerProps {
  videoTrack: ILocalVideoTrack | IRemoteVideoTrack | undefined;
  audioTrack: ILocalAudioTrack | IRemoteAudioTrack | undefined;
  personName: String | undefined;
  personId: String | undefined;
}

const MediaPlayer = (props: VideoPlayerProps) => {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!container.current) return;
    props.videoTrack?.play(container.current, { fit: "contain", mirror: true });
    return () => {
      props.videoTrack?.stop();
    };
  }, [container, props.videoTrack]);
  useEffect(() => {
    props.audioTrack?.play();
    return () => {
      props.audioTrack?.stop();
    };
  }, [props.audioTrack]);
  return (
    <>
      <Grid container direction="column">
        <Grid item xs={12}>
          <div ref={container} className="video-player" style={{ width: "auto", height: "50vh", backgroundColor:"black" }}></div>
        </Grid>
        <Grid item xs={12}>
          <div style={{ width: "auto", textAlign: "center", height: "20px", backgroundColor: "black", color:"white"}}>{props.personName}</div>
        </Grid>
      </Grid>
    </>
  );
}

export default MediaPlayer;