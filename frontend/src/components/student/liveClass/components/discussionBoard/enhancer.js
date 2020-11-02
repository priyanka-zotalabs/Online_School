import { compose } from "redux";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { urls } from "../../../../../url";
import { appConfig } from "../../../../../constants";
import io from "socket.io-client";

let socket;
const ENDPOINT = `${appConfig.host}`;
socket = io(ENDPOINT);

export let enhancer = compose(
  connect(({ auth, }) => ({
    auth,
  })),
  withRouter,
  (DiscussionBoard) => ({
    auth,
    ...props
  }) => {

    // newMessage from discussion
    const [newMessage, setNewMessage] = useState("");
    const [loader, setLoader] = useState(true);
    const [allMessages, setAllMessages] = useState([]);
    const [startDiscussion, setStartDiscussion] = useState(true);
    const [temp, setTemp] = useState([]);

    //Sockets
    const [username, setUserame] = useState(auth.userMetaData.Student.name);
    const [room, setRoom] = useState(props.scheduleId);
    const [socketMessage, setSocketMessages] = useState([]);
    const [messageCounter, setMessageCounter] = useState(0);
    const [newMessageSchema, setNewMessageSchema] = useState({
      message: "",
      senderId: auth._id,
      name: auth.userMetaData.Student.name,
      imageUrl: auth.userMetaData.Student.imageUrl,
    });
    //Sockets start
    useEffect(() => {

      let roomId = room;
      let data = { username: username, room: roomId };
      console.log("Socket data", data);
      socket.emit('adduser', data);


      return () => {
        socket.emit('disconnect');
        socket.off();
        console.log("Disconnected from socket room at", roomId);
      }
    }, [ENDPOINT, username, room]);

    useEffect(() => {
      socket.on('updatelivechat', (message) => {
        console.log("Message from Socket", message);
        if (message.senderId != auth._id) {
          let currentMessage = {
            date: new Date(),
            message: message.text,
            senderDetails: {
              name: message.username,
              senderId: message.senderId,
              imageUrl: message.imageUrl,
            }
          };
          let tempAllMessage = _.cloneDeep(allMessages);
          tempAllMessage.push(currentMessage)
          setAllMessages(allMessages => tempAllMessage);
        }
        setMessageCounter(messageCounter => messageCounter + 1);
      });
    }, [allMessages])

    // function for sending message
    const sendMessageOnSocket = (event) => {
      event.preventDefault();
      if (newMessage) {
        let data = _.cloneDeep(newMessageSchema);
        data.message = newMessage;
        let currentMessage = {
          date: new Date(),
          message: newMessage,
          senderDetails: {
            name: "",
            senderId: auth._id,
          }
        };
        let tempAllMessage = _.cloneDeep(allMessages);
        tempAllMessage.push(currentMessage)
        setAllMessages(allMessages => tempAllMessage);
        socket.emit('livechat', data);
        setNewMessage("");
      }
    }
    // Sockets End


    //Sending Message to discussion board
    const handleMessageSendText = (value) => {
      setNewMessage(value);
    };



    return <DiscussionBoard {...props} {...{
      handleMessageSendText,
      newMessage,
      sendMessageOnSocket,
      allMessages,
      auth
    }} />;
  }
);

export default enhancer;