import { useState, useEffect } from 'react';
import AgoraRTC, {
  IAgoraRTCClient, IAgoraRTCRemoteUser, MicrophoneAudioTrackInitConfig, ScreenVideoTrackInitConfig,
  CameraVideoTrackInitConfig, IMicrophoneAudioTrack, ICameraVideoTrack, ILocalVideoTrack, ILocalAudioTrack, ILocalTrack
} from 'agora-rtc-sdk-ng';

export default function useAgora(client: IAgoraRTCClient | undefined)
  : {
    localAudioTrack: ILocalAudioTrack | undefined,
    localVideoTrack: ILocalVideoTrack | undefined,
    localScreenVideoTrack: ILocalVideoTrack | undefined,
    joinState: boolean,
    leave: Function,
    join: Function,
    joinScreen: Function,
    createScreenVideo: Function,
    remoteUsers: IAgoraRTCRemoteUser[],
    muteMic: Function,
    unMuteMic: Function,
    muteVideo: Function,
    unMuteVideo: Function,
    muteState: boolean,
    videoState: boolean,
    screenShareState: boolean,
  } {
  const [localVideoTrack, setLocalVideoTrack] = useState<ILocalVideoTrack | undefined>(undefined);
  const [localScreenVideoTrack, setLocalScreenVideoTrack] = useState<ILocalVideoTrack | undefined>(undefined);
  const [localAudioTrack, setLocalAudioTrack] = useState<ILocalAudioTrack | undefined>(undefined);
  const [localMicrophoneTrack, setlocalMicrophoneTrack] = useState<ILocalAudioTrack | undefined>(undefined);

  const [joinState, setJoinState] = useState(false);
  const [screenShareState, setScreenShareState] = useState(false);
  const [muteState, setMuteState] = useState(false);
  const [videoState, setVideoState] = useState(false);
  const [remoteUsers, setRemoteUsers] = useState<IAgoraRTCRemoteUser[]>([]);

  async function createLocalTracks(audioConfig?: MicrophoneAudioTrackInitConfig, videoConfig?: CameraVideoTrackInitConfig)
    : Promise<[IMicrophoneAudioTrack, ICameraVideoTrack]> {
    const [microphoneTrack, cameraTrack] = await AgoraRTC.createMicrophoneAndCameraTracks(audioConfig, videoConfig);
    setLocalAudioTrack(microphoneTrack);
    setLocalVideoTrack(cameraTrack);
    return [microphoneTrack, cameraTrack];
  }

  async function createScreenVideo(screenConfig: ScreenVideoTrackInitConfig, withAudio: "disable"): Promise<ILocalVideoTrack> {
    const screenTrack = await AgoraRTC.createScreenVideoTrack(screenConfig, withAudio);
    setLocalScreenVideoTrack(screenTrack);
    return screenTrack;
  }
  async function createMicrophoneAudio(config?: MicrophoneAudioTrackInitConfig): Promise<IMicrophoneAudioTrack> {
    const audioTrack = await AgoraRTC.createMicrophoneAudioTrack(config);
    setlocalMicrophoneTrack(audioTrack);
    return audioTrack;
  }

  async function joinScreen(appid: string, channel: string, token?: string, uid?: string | number | null) {
    if (!screenShareState) {
      //Share the screen track
      if (!client) return;
      await client?.unpublish();
      const screenTrack = await createScreenVideo({ encoderConfig: "480p" }, "disable");
      const audioTrack = await createMicrophoneAudio();
      let tracks: ILocalTrack[] = [audioTrack, screenTrack];
      await client.publish(tracks);
      setScreenShareState(true);
    }
    else {
      // Share the camera track
      if (!client) return;
      await client?.unpublish();
      setLocalScreenVideoTrack(undefined);
      const [microphoneTrack, cameraTrack] = await createLocalTracks();
      await client.publish([microphoneTrack, cameraTrack]);
      setScreenShareState(false);
    }
  }

  async function join(appid: string, channel: string, token?: string, uid?: string | number | null) {
    setJoinState(true);
    if (!client) return;
    const [microphoneTrack, cameraTrack] = await createLocalTracks();

    await client.join(appid, channel, token || null, uid || null);
    await client.publish([microphoneTrack, cameraTrack]);

    (window as any).client = client;
    (window as any).videoTrack = cameraTrack;
  }

  // Mute mic
  async function muteMic() {
    if (localAudioTrack) {
      localAudioTrack.setEnabled(false);
    }
    setMuteState(true);
  }
  // Un mute mic
  async function unMuteMic() {
    if (localAudioTrack) {
      localAudioTrack.setEnabled(true);
    }
    setMuteState(false);
  }

  async function muteVideo() {
    if (localVideoTrack) {
      localVideoTrack.setEnabled(false);
    }
    setVideoState(true);
  }
  async function unMuteVideo() {
    if (localVideoTrack) {
      localVideoTrack.setEnabled(true);
    }
    setVideoState(false);
  }

  async function leave() {
    setJoinState(false);
    if (!screenShareState) {
      try {
        if (localAudioTrack) {
          localAudioTrack.stop();
          localAudioTrack.close();
        }
        if (localVideoTrack) {
          localVideoTrack.stop();
          localVideoTrack.close();
        }
      }
      catch (error) {
        console.log("Error ocucrred While closing the meeting!", error);
      }

    }
    else {
      try {
        if (localScreenVideoTrack) {
          localScreenVideoTrack.stop();
          localScreenVideoTrack.close();
        }
        if (localMicrophoneTrack) {
          localMicrophoneTrack.stop();
          localMicrophoneTrack.close();
        }
      } catch (error) {
        console.log("Error ocucrred While closing the meeting!", error);
      }
      setRemoteUsers([]);
      await client?.leave();
    }
  }

  useEffect(() => {
    if (!client) return;
    setRemoteUsers(client.remoteUsers);

    const handleUserPublished = async (user: IAgoraRTCRemoteUser, mediaType: 'audio' | 'video') => {
      await client.subscribe(user, mediaType);
      // toggle rerender while state of remoteUsers changed.
      setRemoteUsers(remoteUsers => Array.from(client.remoteUsers));
    }
    const handleUserUnpublished = (user: IAgoraRTCRemoteUser) => {
      setRemoteUsers(remoteUsers => Array.from(client.remoteUsers));
    }
    const handleUserJoined = (user: IAgoraRTCRemoteUser) => {
      setRemoteUsers(remoteUsers => Array.from(client.remoteUsers));
    }
    const handleUserLeft = (user: IAgoraRTCRemoteUser) => {
      setRemoteUsers(remoteUsers => Array.from(client.remoteUsers));
    }
    client.on('user-published', handleUserPublished);
    client.on('user-unpublished', handleUserUnpublished);
    client.on('user-joined', handleUserJoined);
    client.on('user-left', handleUserLeft);

    return () => {
      client.off('user-published', handleUserPublished);
      client.off('user-unpublished', handleUserUnpublished);
      client.off('user-joined', handleUserJoined);
      client.off('user-left', handleUserLeft);
    };
  }, [client]);

  return {
    localAudioTrack,
    localVideoTrack,
    joinState,
    leave,
    join,
    remoteUsers,
    unMuteMic,
    muteMic,
    unMuteVideo,
    muteVideo,
    muteState,
    videoState,
    localScreenVideoTrack,
    screenShareState,
    joinScreen,
    createScreenVideo
  };
}