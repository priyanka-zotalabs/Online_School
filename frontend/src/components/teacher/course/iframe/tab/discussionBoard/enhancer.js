import { compose } from "redux";
import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { urls } from "../../../../../../url";
import { appConfig } from "../../../../../../constants";
import { toast } from "react-toastify";
import io from "socket.io-client";

let socket;
const ENDPOINT = `${appConfig.host}`;
socket = io(ENDPOINT);

export let enhancer = compose(
  connect(({ auth, teacherCurrentCourse, teacherModule }) => ({
    auth,
    teacherCurrentCourse,
    teacherModule,
  })),
  withRouter,
  (DiscussionBoard) => ({
    auth,
    teacherCurrentCourse,
    teacherModule,
    ...props
  }) => {

    const [chapterData, setChapterData] = useState(props.topic);
    const [courseData, setCourseData] = useState(props.courseData);
    const [moduleData, setModuleData] = useState(props.data);
    const [contentData, setContentData] = useState(props.contentData);
    const [courseid, setCourseid] = useState(props.courseData._id);
    const [moduleid, setModuleid] = useState(props.data._id);
    const [chapterid, setChapterid] = useState(props.topic._id);
    const [contentid, setContentid] = useState(props.contentData._id);
    const [contentName, setContentName] = useState(props.contentData.title);
    const [batchList, setBatchList] = useState([]);
    const [courseBatchData, setCourseBatchData] = useState([]);
    const [teacherId, setTeacherId] = useState(auth.currentMetaData._id);
    const [batchId, setBatchId] = useState("");
    //Sockets
    const [username, setUserame] = useState(auth.userMetaData.Teacher.name);
    const [room, setRoom] = useState(props.contentData._id);
    const [socketMessage, setSocketMessages] = useState([]);
    const [messageCounter, setMessageCounter] = useState(0);
    const [newMessageSchema, setNewMessageSchema] = useState({
      courseId: props.courseData._id,
      batchId: "",
      contentId: props.contentData._id,
      message: "",
      senderId: auth._id,
      name: auth.userMetaData.Teacher.name,
      imageUrl: auth.userMetaData.Teacher.imageUrl,
    });
    // newMessage from discussion
    const [newMessage, setNewMessage] = useState("");
    const [loader, setLoader] = useState(true);
    const [allMessages, setAllMessages] = useState([]);
    const [startDiscussion, setStartDiscussion] = useState(true);
    const [temp, setTemp] = useState([]);


    // Batch Start
    useEffect(() => {
      getBatchData();
    }, []);

    // Batch Started 
    const getBatchData = () => {
      axios
        .get(`${appConfig.host}${urls.getTeacherBatches}?teacherId=${teacherId}`)
        .then((success) => {
          // console.log("Fetched Batch data ", success.data.data);
          setCourseBatchData(courseBatchData => success.data.data);
        })
        .catch((error) => {
          console.log("Failed to Fetched Batch data ", error);
        });

    }

    useEffect(() => {
      getBatchList();
    }, [courseBatchData]);

    const getBatchList = () => {
      let temp = [];
      if (courseBatchData.length > 0) {
        courseBatchData.forEach((eachBatch) => {
          if (eachBatch.course._id == courseData._id) {
            temp.push({ id: eachBatch._id, name: eachBatch.name });
          }
        });
      }
      setBatchList(_.cloneDeep(temp));
    };
    const handleBatchChange = (event) => {
      setBatchId(event.target.value);
    }

    // Batch End



    //Sockets start
    useEffect(() => {
      setNewMessageSchemaWithData();
    }, [batchId, props.courseData._id, props.contentData._id]);

    const setNewMessageSchemaWithData = () => {
      let temp = _.cloneDeep(newMessageSchema);
      temp.batchId = batchId;
      temp.courseId = courseid;
      temp.contentId = contentid;
      setNewMessageSchema(temp);
    };


    useEffect(() => {

      let roomId = room;
      let data = { username: username, room: roomId };
      // console.log("Socket data", data);
      socket.emit('adduser', data);


      return () => {
        socket.emit('disconnect');
        socket.off();
        console.log("Disconnected from socket room at", roomId);
      }
    }, [ENDPOINT, props.contentData._id, batchId]);

    useEffect(() => {
      socket.on('updatechat', (message) => {
        // console.log(message);
        if (message.senderId != auth._id && message.batchId === batchId) {

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
            name: "Sent Success",
            senderId: auth._id,
          }
        };
        let tempAllMessage = _.cloneDeep(allMessages);
        tempAllMessage.push(currentMessage)
        setAllMessages(allMessages => tempAllMessage);
        socket.emit('chatMessage', data);
        setNewMessage("");
      }
    }

    // Sockets End


    useEffect(() => {
      checkContentIdExist();
    }, []);

    const checkContentIdExist = () => {
      let isExistFlag = false;
      chapterData.content.forEach(eachContent => {
        if (contentData._id == eachContent._id) {
          isExistFlag = true;
        }
      });

      if (!isExistFlag) {
        courseData.modules.forEach((eachModule) => {
          eachModule.chapters.forEach(eachChapter => {
            eachChapter.content.forEach(eachContent => {
              if (contentData._id == eachContent._id) {
                setChapterData(chapterData => eachChapter);
                setModuleData(moduleData => eachModule);
                setModuleid(moduleid => eachModule._id);
                setChapterid(chapterid => eachChapter._id);
                return {
                  courseId: courseData._id,
                  moduleId: eachModule._id,
                  chapterId: eachChapter._id,
                  contentId: eachContent._id
                }
              }
            });
          });
        });
      }
      else {
        return {
          courseId: courseid,
          moduleId: moduleid,
          chapterId: chapterid,
          contentId: contentid,
        }
      }
    }


    useEffect(() => {
      getDiscussionData();
    }, [courseid, moduleid, chapterid, contentid, batchId]);


    const getDiscussionData = useCallback(() => {
      const params = checkContentIdExist();
      if (params) {
        //Fetch data
        axios
          .get(`${appConfig.host}${urls.discussionForum}?courseId=${params.courseId}&contentId=${params.contentId}&batchId=${batchId}`)
          .then((success) => {
            // console.log("Success getting data of Discussion", success);
            if (success.data.data.messages.length > 0) {
              //its old idscussion
              setStartDiscussion(false);
            }
            else {
              //its new discussion 
              setStartDiscussion(true);
            }
            setAllMessages(allMessages => _.cloneDeep(success.data.data.messages))
            setLoader(false);
          })
          .catch((error) => {
            setLoader(false);
            console.log("Error fetching discussion data", error);
          });
      }
      if (!batchId) {
        toast.info("Please select batch!");
      }
    }, [courseid, contentid, batchId, messageCounter]);

    //Sending Message to discussion board
    const handleMessageSendText = (value) => {
      setNewMessage(value);
    };

    return <DiscussionBoard {...props} {...{
      auth,
      teacherCurrentCourse,
      teacherModule,
      loader,
      allMessages,
      courseid,
      moduleid,
      chapterid,
      contentid,
      handleMessageSendText,
      newMessage,
      getDiscussionData,
      temp,
      contentName,
      batchList,
      handleBatchChange,
      sendMessageOnSocket
    }} />;
  }
);

export default enhancer;
