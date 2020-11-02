import { compose } from "redux";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import ForumInit from "./discussionDemo";
import DiscussionBoard from ".";
import axios from "axios";
import { error } from "jquery";
import { urls } from "../../../../../../url";
import { appConfig } from "../../../../../../constants";
import { toast } from "react-toastify";

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


    // console.log("Auth", auth.currentRole.displayName);


    // console.log("currentCourse", courseData);
    // console.log("Batch List", batchList);
    // console.log(" module data", moduleData);
    // console.log(" chapter Data", chapterData);
    // console.log(" content data", contentData);
    // console.log("Props ",props);

    // let courseid = courseData._id;
    // let moduleid = moduleData._id;
    // let chapterid = chapterData._id;
    // let contentid = contentData._id;
    // let contentName = contentData.title;


    // Batch Start
    useEffect(() => {
      getBatchData();
    }, []);

    // Batch Started 
    const getBatchData = () => {
      axios
        .get(`${appConfig.host}${urls.getTeacherBatches}?teacherId=${teacherId}`)
        .then((success) => {
          console.log("Fetched Batch data ", success.data.data);
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
    // newMessage from discussion
    const [newMessage, setNewMessage] = useState("");
    const [loader, setLoader] = useState(true);
    const [allMessages, setAllMessages] = useState([]);
    const [startDiscussion, setStartDiscussion] = useState(true);
    const [temp, setTemp] = useState([]);

    useEffect(() => {
      getDiscussionData();
    }, [courseid, moduleid, chapterid, contentid, batchId]);


    const getDiscussionData = () => {
      const params = checkContentIdExist();
      if (params) {
        //Fetch data
        axios
          .get(`${appConfig.host}${urls.discussionForum}?courseId=${params.courseId}&moduleId=${params.moduleId}&chapterId=${params.chapterId}&contentId=${params.contentId}&batchId=${batchId}`)
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
    };

    //Sending Message to discussion board
    const handleMessageSendText = (value) => {
      setNewMessage(value);
    };

    const sendMessage = (event) => {
      event.preventDefault();

      //Parameters
      let params = {
        courseId: courseid,
        moduleId: moduleid,
        chapterId: chapterid,
        contentId: contentid,
        message: newMessage,
        batchId: batchId,
        role: auth.currentRole.displayName
      };
      //Send Message 
      if (startDiscussion) {
        axios
          .post(`${appConfig.host}${urls.discussionForum}`, params)
          .then((success) => {
            // console.log("Post Message to Discussion", success);
            afterSend(newMessage);
          })
          .catch((error) => {
            console.log(error);
            toast.error("Message failed to send, Please try again !");
          });
      } else {
        axios
          .put(`${appConfig.host}${urls.discussionForum}`, params)
          .then((success) => {
            // console.log("Put Message to Discussion", success);
            afterSend(newMessage);
          })
          .catch((error) => {
            console.log(error);
            toast.error("Message failed to send, Please try again !");
          });
      }
    };

    const afterSend = (newMessage) => {
      let array = _.cloneDeep(allMessages);
      let currentMessage = {
        date: new Date(),
        message: newMessage,
        senderDetails: {
          name: "Sent Success",
          type: "Teacher"
        }
      };
      array.push(currentMessage);
      setAllMessages(allMessages => _.cloneDeep(array));
      setStartDiscussion(false);
      setNewMessage("");
      setTimeout(() => {
        getDiscussionData();
      }, 2000);
    }

    return <DiscussionBoard {...props} {...{
      auth,
      teacherCurrentCourse,
      teacherModule,
      sendMessage,
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
      handleBatchChange
    }} />;
  }
);

export default enhancer;
