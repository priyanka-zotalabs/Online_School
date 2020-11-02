import React, { Component } from 'react';
import AgoraRTC from "agora-rtc-sdk-ng"

class VideoIntegration extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
      }

    componentDidMount() {
        const rtc = {
            // For the local client.
            client: null,
            // For the local audio and video tracks.
            localAudioTrack: null,
            localVideoTrack: null,
        };

        const options = {
            // Pass your app ID here.
            appId: "7d35efbd5bb14a538e72ff4273c3cf3e",
            // Set the channel name.
            channel: "shahid",
            // Pass a token if your project enables the App Certificate.
            token: "006829a5c9a157844118bcbd2d375c9ea40IAALZoq+sd8EYnI547vcv0KREQrzlN5WbAYEfhlpFWg0uRGdiK4AAAAAEABga1DedfIjXwEAAQB18iNf",
        };
        async function startBasicCall() {
            rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

            rtc.client.on("user-published", async (user, mediaType) => {
                // Subscribe to a remote user.
                await rtc.client.subscribe(user, mediaType);
                console.log("subscribe success");

                // If the subscribed track is video.
                if (mediaType === "video") {
                    // Get `RemoteVideoTrack` in the `user` object.
                    const remoteVideoTrack = user.videoTrack;
                    // Dynamically create a container in the form of a DIV element for playing the remote video track.
                    // const playerContainer = document.querySelector("#teacherVideoStream");
                    const playerContainer = document.createElement("div");
                    // Specify the ID of the DIV container. You can use the `uid` of the remote user.
                    playerContainer.id = user.uid.toString();
                    playerContainer.style.width = "640px";
                    playerContainer.style.height = "480px";
                    // document.body.append(playerContainer);
                    const node = this.myRef.current;
                    node.appendChild(playerContainer);

                    // Play the remote video track.
                    // Pass the DIV container and the SDK dynamically creates a player in the container for playing the remote video track.
                    remoteVideoTrack.play(playerContainer);

                    // Or just pass the ID of the DIV container.
                    // remoteVideoTrack.play(playerContainer.id);
                }

                // If the subscribed track is audio.
                if (mediaType === "audio") {
                    // Get `RemoteAudioTrack` in the `user` object.
                    const remoteAudioTrack = user.audioTrack;
                    // Play the audio track. No need to pass any DOM element.
                    remoteAudioTrack.play();
                }
            });
            rtc.client.on("user-unpublished", user => {
                // Get the dynamically created DIV container.
                const playerContainer = document.getElementById(user.uid);
                // Destroy the container.
                playerContainer.remove();
            });


            const uid = await rtc.client.join(options.appId, options.channel, options.token, null);
            // Create an audio track from the audio sampled by a microphone.
            rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
            // Create a video track from the video captured by a camera.
            rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
            // Publish the local audio and video tracks to the channel.
            await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);

            console.log("publish success! :) ");

        }

        startBasicCall();
        async function leaveCall() {
            // Destroy the local audio and video tracks.
            rtc.localAudioTrack.close();
            rtc.localVideoTrack.close();

            // Traverse all remote users.
            rtc.client.remoteUsers.forEach(user => {
                // Destroy the dynamically created DIV container.
                const playerContainer = document.getElementById(user.uid);
                playerContainer && playerContainer.remove();
            });

            // Leave the channel.
            await rtc.client.leave();
        }
    }


    render() {
        return (
            <React.Fragment>
                <h1>Live Classess</h1>
                <div id="teacherVideoStream"  ref={this.myRef}>

                </div>
            </React.Fragment>
        );
    }
}

export default VideoIntegration;