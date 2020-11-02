import { compose } from "redux";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import { urls } from "../../../url";
import { appConfig } from "../../../constants";
import axios from "axios";

export let enhancer = compose(
  connect(({ auth }) => ({ auth })),
  withRouter,
  (TeacherChatBox) => ({ auth, ...props }) => {
    const [chat, setChat] = useState([]);
    const [activeUser, setActiveUser] = useState({});
    const [newMessage, setNewMessage] = useState("");
    const [startChat, setStartChat] = useState(true);
    const [loader, setLoader] = useState(true);

    //My Logic
    const [studentsList, setStudentsList] = useState([]);
    const [recieverId, setRecieverId] = useState("");
    const [batchWiseData, setBatchWiseData] = useState([]);

    let senderId = auth._id;

    useEffect(() => {
      getAllRegisteredStudents();
    }, []);

    const getAllRegisteredStudents = () => {
      axios.get(`${appConfig.host}${urls.getTeacherBatchWiseStudents}`)
        .then((success) => {
          console.log("Success Getting Student List", success.data.data);
          setBatchWiseData(batchWiseData => _.cloneDeep(success.data.data));
          try {
            let tempStudentLists = [];
            success.data.data.forEach((eachBatch, index) => {
              eachBatch.students.forEach((eachStudent, index) => {
                tempStudentLists.push({
                  name: eachStudent.studentId.name,
                  id: eachStudent.studentId.userId,
                  batchId: eachBatch.batchID,
                  dp: eachStudent.studentId.imageUrl
                });
              });
            });

            if (tempStudentLists.length > 0) {
              setStudentsList(studentsList => _.cloneDeep(tempStudentLists));
              setActiveUser(activeUser => _.cloneDeep(tempStudentLists[0]));
            }
          }
          catch (error) {
            console.log("Failed at creating list", error);
          }
        }).catch(error => {
          console.log("Error fetching Student List", error);
        })
    }

    useEffect(() => {
      getChatBox();
    }, [activeUser.id]);

    console.log("Student List", studentsList);
    const getChatBox = () => {
      //Fetch Data
      axios
        .get(`${appConfig.host}${urls.chatBox}?senderId=${auth._id}&receiverId=${activeUser.id}`)
        .then((success) => {
          console.log("Success Fetching Chat Data on Teacher Side ", success.data.data);
          if (success.data.data.length == 0) {
            let arrayTemp = [];
            setChat(arrayTemp);
          } else {
            setStartChat(false);
            let arrayTemp = [...success.data.data[success.data.data.length - 1].messages];
            setChat(arrayTemp);
          }
          setLoader(false);
        })
        .catch((error) => {
          setLoader(false);
          console.log(error);
        });
    };

    const handleEvent = (user) => {
      setActiveUser(user);
      getChatBox();
    };
    const handleMessageSendText = (value) => {
      setNewMessage(value);
    };

    const sendMessage = (event) => {

      event.preventDefault();
      let params = {
        receiverId: activeUser.id,
        senderId: auth._id,
        message: newMessage,
      };
      setNewMessage("");
      if (startChat) {
        axios
          .post(`${appConfig.host}${urls.chatBox}`, params)
          .then((success) => {
            console.log("Post Message Sent", success);
            afterSend(params.message);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .put(`${appConfig.host}${urls.chatBox}`, params)
          .then((success) => {
            console.log("Put Message Sent", success);
            afterSend(params.message);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

    const afterSend = (newMessage) => {
      let array = [...chat];
      let currentMessage = {
        date: new Date(),
        isMessageFromTutor: true,
        message: newMessage,
        name: "Sent",
        type: "PERSONAL",
        _id: auth._id,
      };
      array.push(currentMessage);
      setChat(array);
      setNewMessage("");
      setStartChat(false);
      setTimeout(() => getChatBox(), 1000);
    }
    return (
      <TeacherChatBox
        {...props}
        {...{
          auth,
          handleEvent,
          chat,
          activeUser,
          handleMessageSendText,
          sendMessage,
          loader,
          studentsList,
          newMessage
        }}
      />
    );
  }
);

export default enhancer;